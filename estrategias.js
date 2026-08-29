/**
 * FGC 2026 Strategy Playbook Builder Logic
 * Team Colombia
 */

document.addEventListener('DOMContentLoaded', () => {
  const r1Role = document.getElementById('r1Role');
  const r1Climb = document.getElementById('r1Climb');
  const r2Role = document.getElementById('r2Role');
  const r2Climb = document.getElementById('r2Climb');
  const r3Role = document.getElementById('r3Role');
  const r3Climb = document.getElementById('r3Climb');
  const hpStrategy = document.getElementById('hpStrategy');
  const stratName = document.getElementById('stratName');
  const stratNotes = document.getElementById('stratNotes');

  const bestPointsEl = document.getElementById('bestPoints');
  const avgPointsEl = document.getElementById('avgPoints');
  const worstPointsEl = document.getElementById('worstPoints');
  const totalMultDisplay = document.getElementById('totalMultDisplay');
  const saveStratBtn = document.getElementById('saveStratBtn');
  const testInSimBtn = document.getElementById('testInSimBtn');
  const savedStratsList = document.getElementById('savedStratsList');
  const stratCountBadge = document.getElementById('stratCountBadge');

  const CLIMB_VALS = {
    zone3: 0.60,
    zone2: 0.40,
    zone1: 0.20,
    buddy: 0.60, // Buddy climber itself reaches top
    none: 0.00
  };

  function calculateProjections() {
    const c1 = CLIMB_VALS[r1Climb.value] || 0;
    const c2 = CLIMB_VALS[r2Climb.value] || 0;
    const c3 = CLIMB_VALS[r3Climb.value] || 0;
    
    // Alliance multiplier (1.0 base + sum of climb levels)
    const mult = 1.0 + c1 + c2 + c3;
    if (totalMultDisplay) {
      totalMultDisplay.textContent = `x${mult.toFixed(2)}`;
    }

    // Buddy climb extra points
    const buddiesCount = [r1Climb.value, r2Climb.value, r3Climb.value].filter(v => v === 'buddy').length;
    const buddyBonus = buddiesCount * 25;

    // HP Strategy bonus balls
    const hpBonus = hpStrategy.value === 'extinguisher_focus' ? 35 : hpStrategy.value === 'field_resupply' ? 45 : 25;

    // Base Suppression cycling estimations based on roles
    let bestBase = 120 + hpBonus;
    let avgBase = 75 + Math.round(hpBonus * 0.7);
    let worstBase = 35 + Math.round(hpBonus * 0.4);

    const roles = [r1Role.value, r2Role.value, r3Role.value];
    roles.forEach(r => {
      if (r === 'cycler') { bestBase += 35; avgBase += 20; worstBase += 10; }
      if (r === 'feeder') { bestBase += 25; avgBase += 15; worstBase += 5; }
      if (r === 'extinguisher') { bestBase += 40; avgBase += 25; worstBase += 10; }
    });

    const bestTotal = Math.round(bestBase * mult) + buddyBonus;
    const avgTotal = Math.round(avgBase * (1.0 + (mult - 1.0) * 0.75)) + Math.round(buddyBonus * 0.8);
    const worstTotal = Math.round(worstBase * 1.0);

    if (bestPointsEl) bestPointsEl.textContent = `${bestTotal} pts`;
    if (avgPointsEl) avgPointsEl.textContent = `${avgTotal} pts`;
    if (worstPointsEl) worstPointsEl.textContent = `${worstTotal} pts`;

    return { bestTotal, avgTotal, worstTotal, mult };
  }

  // Dynamic calculation event listeners
  [r1Role, r1Climb, r2Role, r2Climb, r3Role, r3Climb, hpStrategy].forEach(el => {
    if (el) el.addEventListener('change', calculateProjections);
  });

  calculateProjections();

  // Save Strategy to Supabase / Local
  if (saveStratBtn) {
    saveStratBtn.addEventListener('click', async () => {
      const name = stratName.value.trim() || 'Estrategia de Alianza';
      const proj = calculateProjections();
      
      const payload = {
        strategy_name: name,
        description: stratNotes.value.trim(),
        roles_config: {
          r1Role: r1Role.value,
          r1Climb: r1Climb.value,
          r2Role: r2Role.value,
          r2Climb: r2Climb.value,
          r3Role: r3Role.value,
          r3Climb: r3Climb.value
        },
        hp_strategy: hpStrategy.value,
        projected_points: {
          worstCase: proj.worstTotal,
          averageCase: proj.avgTotal,
          bestCase: proj.bestTotal
        }
      };

      try {
        saveStratBtn.disabled = true;
        saveStratBtn.textContent = '⏳ Guardando...';
        await StrategyService.saveStrategy(payload);
        alert('✓ ¡Estrategia guardada exitosamente en tu Playbook!');
        loadSavedStrategies();
      } catch (err) {
        alert('⚠️ ' + err.message);
      } finally {
        saveStratBtn.disabled = false;
        saveStratBtn.textContent = '💾 Guardar en Mi Playbook (Nube)';
      }
    });
  }

  // Test in 2D Simulator Launcher
  if (testInSimBtn) {
    testInSimBtn.addEventListener('click', () => {
      const strategyData = {
        name: stratName.value.trim(),
        r1Role: r1Role.value,
        r1Climb: r1Climb.value,
        r2Role: r2Role.value,
        r3Role: r3Role.value,
        hpStrategy: hpStrategy.value
      };
      sessionStorage.setItem('fgc_active_strategy', JSON.stringify(strategyData));
      window.location.href = 'simulacion.html?source=playbook';
    });
  }

  async function loadSavedStrategies() {
    if (!savedStratsList) return;
    const strats = await StrategyService.getStrategies();
    if (stratCountBadge) stratCountBadge.textContent = strats.length;

    if (strats.length === 0) {
      savedStratsList.innerHTML = '<p style="font-size: 0.78rem; color: #94a3b8; text-align: center; padding: 15px 0;">No tienes estrategias guardadas aún.</p>';
      return;
    }

    savedStratsList.innerHTML = strats.map(s => `
      <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="font-size: 0.82rem; color: #ffd700; display: block;">${SecurityUtils.sanitizeText(s.strategy_name)}</strong>
          <span style="font-size: 0.7rem; color: #94a3b8;">Est. Máx: ${s.projected_points?.bestCase || 0} pts</span>
        </div>
        <button class="load-strat-btn" data-id="${s.id}" style="background: rgba(255,215,0,0.15); border: 1px solid rgba(255,215,0,0.4); color: #ffd700; font-size: 0.72rem; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Cargar</button>
      </div>
    `).join('');

    savedStratsList.querySelectorAll('.load-strat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = strats.find(item => item.id === id);
        if (target) {
          stratName.value = target.strategy_name;
          stratNotes.value = target.description || '';
          if (target.roles_config) {
            if (target.roles_config.r1Role) r1Role.value = target.roles_config.r1Role;
            if (target.roles_config.r1Climb) r1Climb.value = target.roles_config.r1Climb;
            if (target.roles_config.r2Role) r2Role.value = target.roles_config.r2Role;
            if (target.roles_config.r2Climb) r2Climb.value = target.roles_config.r2Climb;
            if (target.roles_config.r3Role) r3Role.value = target.roles_config.r3Role;
            if (target.roles_config.r3Climb) r3Climb.value = target.roles_config.r3Climb;
          }
          if (target.hp_strategy) hpStrategy.value = target.hp_strategy;
          calculateProjections();
        }
      });
    });
  }

  // Load user profile & saved strategies
  AuthService.subscribe(() => {
    loadSavedStrategies();
  });
});
