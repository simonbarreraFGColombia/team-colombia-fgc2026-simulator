/**
 * FGC 2026 Strategy Playbook Builder Logic
 * Team Colombia • Coach Tactics Board
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
    buddy: 0.60,
    none: 0.00
  };

  const TACTIC_PRESETS = {
    attack: {
      name: '⚔️ Full Ataque & Ciclado Rápido',
      hp: 'field_resupply',
      r1Role: 'cycler',
      r1Climb: 'zone3',
      r2Role: 'cycler',
      r2Climb: 'zone3',
      r3Role: 'feeder',
      r3Climb: 'zone2'
    },
    carrier: {
      name: '🤝 Estrategia Nodriza / Buddy Climb',
      hp: 'balanced',
      r1Role: 'carrier',
      r1Climb: 'zone3',
      r2Role: 'extinguisher',
      r2Climb: 'buddy',
      r3Role: 'feeder',
      r3Climb: 'buddy'
    },
    shield: {
      name: '🛡️ Escudo de Fuego & Control Defensivo',
      hp: 'extinguisher_focus',
      r1Role: 'extinguisher',
      r1Climb: 'zone2',
      r2Role: 'defender',
      r2Climb: 'zone2',
      r3Role: 'cycler',
      r3Climb: 'zone3'
    },
    balanced: {
      name: '⚖️ Alianza Equilibrada (Standard)',
      hp: 'balanced',
      r1Role: 'cycler',
      r1Climb: 'zone3',
      r2Role: 'extinguisher',
      r2Climb: 'zone3',
      r3Role: 'feeder',
      r3Climb: 'buddy'
    }
  };

  function applyTacticPreset(presetKey) {
    const p = TACTIC_PRESETS[presetKey];
    if (!p) return;

    if (stratName) stratName.value = p.name;
    if (hpStrategy) hpStrategy.value = p.hp;
    if (r1Role) r1Role.value = p.r1Role;
    if (r1Climb) r1Climb.value = p.r1Climb;
    if (r2Role) r2Role.value = p.r2Role;
    if (r2Climb) r2Climb.value = p.r2Climb;
    if (r3Role) r3Role.value = p.r3Role;
    if (r3Climb) r3Climb.value = p.r3Climb;

    document.querySelectorAll('.preset-tactic-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tactic === presetKey);
      btn.style.borderColor = btn.dataset.tactic === presetKey ? '#ffd700' : 'rgba(255,255,255,0.15)';
    });

    calculateProjections();
  }

  document.querySelectorAll('.preset-tactic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTacticPreset(btn.dataset.tactic);
    });
  });

  function calculateProjections() {
    const c1 = CLIMB_VALS[r1Climb?.value] || 0;
    const c2 = CLIMB_VALS[r2Climb?.value] || 0;
    const c3 = CLIMB_VALS[r3Climb?.value] || 0;
    
    // Alliance multiplier (1.0 base + sum of climb levels)
    const mult = 1.0 + c1 + c2 + c3;
    if (totalMultDisplay) {
      totalMultDisplay.textContent = `x${mult.toFixed(2)}`;
    }

    // Buddy climb extra points (+20 pts per piggybacked robot)
    const buddiesCount = [r1Climb?.value, r2Climb?.value, r3Climb?.value].filter(v => v === 'buddy').length;
    const buddyBonus = buddiesCount * 20;

    // HP Strategy bonus balls
    const hpBonus = hpStrategy?.value === 'extinguisher_focus' ? 40 : hpStrategy?.value === 'field_resupply' ? 50 : 30;

    // Base cycling estimations based on roles
    let bestBase = 130 + hpBonus;
    let avgBase = 85 + Math.round(hpBonus * 0.7);
    let worstBase = 45 + Math.round(hpBonus * 0.4);

    const roles = [r1Role?.value, r2Role?.value, r3Role?.value];
    roles.forEach(r => {
      if (r === 'cycler') { bestBase += 45; avgBase += 25; worstBase += 12; }
      if (r === 'feeder') { bestBase += 30; avgBase += 18; worstBase += 8; }
      if (r === 'extinguisher') { bestBase += 40; avgBase += 22; worstBase += 10; }
      if (r === 'carrier') { bestBase += 25; avgBase += 15; worstBase += 5; }
      if (r === 'defender') { bestBase += 15; avgBase += 10; worstBase += 15; }
    });

    const bestTotal = Math.round(bestBase * mult) + buddyBonus;
    const avgTotal = Math.round(avgBase * (1.0 + (mult - 1.0) * 0.75)) + Math.round(buddyBonus * 0.85);
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
      const name = stratName?.value.trim() || 'Estrategia de Alianza';
      const proj = calculateProjections();
      
      const payload = {
        strategy_name: name,
        description: `Roles: R1(${r1Role?.value}), R2(${r2Role?.value}), R3(${r3Role?.value})`,
        roles_config: {
          r1Role: r1Role?.value,
          r1Climb: r1Climb?.value,
          r2Role: r2Role?.value,
          r2Climb: r2Climb?.value,
          r3Role: r3Role?.value,
          r3Climb: r3Climb?.value
        },
        hp_strategy: hpStrategy?.value,
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
        alert('✓ ¡Táctica guardada exitosamente en tu Playbook!');
        loadSavedStrategies();
      } catch (err) {
        alert('⚠️ ' + err.message);
      } finally {
        saveStratBtn.disabled = false;
        saveStratBtn.textContent = '💾 Guardar Táctica en Playbook Nube';
      }
    });
  }

  // Test in 2D Simulator Launcher
  if (testInSimBtn) {
    testInSimBtn.addEventListener('click', () => {
      const strategyData = {
        name: stratName?.value.trim() || 'Táctica Playbook',
        r1Role: r1Role?.value || 'cycler',
        r1Climb: r1Climb?.value || 'zone3',
        r2Role: r2Role?.value || 'extinguisher',
        r2Climb: r2Climb?.value || 'zone3',
        r3Role: r3Role?.value || 'feeder',
        r3Climb: r3Climb?.value || 'buddy',
        hpStrategy: hpStrategy?.value || 'balanced'
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
      savedStratsList.innerHTML = '<p style="font-size: 0.74rem; color: #94a3b8; text-align: center; padding: 10px 0;">No tienes tácticas guardadas aún.</p>';
      return;
    }

    savedStratsList.innerHTML = strats.map(s => `
      <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="font-size: 0.78rem; color: #ffd700; display: block;">${SecurityUtils.sanitizeText(s.strategy_name)}</strong>
          <span style="font-size: 0.68rem; color: #94a3b8;">Est. Máx: ${s.projected_points?.bestCase || 0} pts</span>
        </div>
        <button class="load-strat-btn" data-id="${s.id}" style="background: rgba(255,215,0,0.15); border: 1px solid rgba(255,215,0,0.4); color: #ffd700; font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Cargar</button>
      </div>
    `).join('');

    savedStratsList.querySelectorAll('.load-strat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const target = strats.find(item => item.id === id);
        if (target) {
          if (stratName) stratName.value = target.strategy_name;
          if (target.roles_config) {
            if (target.roles_config.r1Role && r1Role) r1Role.value = target.roles_config.r1Role;
            if (target.roles_config.r1Climb && r1Climb) r1Climb.value = target.roles_config.r1Climb;
            if (target.roles_config.r2Role && r2Role) r2Role.value = target.roles_config.r2Role;
            if (target.roles_config.r2Climb && r2Climb) r2Climb.value = target.roles_config.r2Climb;
            if (target.roles_config.r3Role && r3Role) r3Role.value = target.roles_config.r3Role;
            if (target.roles_config.r3Climb && r3Climb) r3Climb.value = target.roles_config.r3Climb;
          }
          if (target.hp_strategy && hpStrategy) hpStrategy.value = target.hp_strategy;
          calculateProjections();
        }
      });
    });
  }

  // Load user profile & saved strategies
  if (typeof AuthService !== 'undefined') {
    AuthService.subscribe(() => {
      loadSavedStrategies();
    });
  }
  loadSavedStrategies();
});
