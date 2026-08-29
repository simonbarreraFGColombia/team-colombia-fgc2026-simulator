/**
 * Admin Master Secret • Espionage Intelligence Center
 * FGC 2026 Platform - Team Colombia
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const gatekeeperOverlay = document.getElementById('mfaGatekeeperOverlay');
  const adminAppContainer = document.getElementById('adminAppContainer');
  const step1Form = document.getElementById('step1Form');
  const step2Form = document.getElementById('step2Form');
  const adminPassInput = document.getElementById('adminPassInput');
  const togglePassBtn = document.getElementById('togglePassVisibility');
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  const authErrorMsg = document.getElementById('authErrorMsg');
  const mfaInputs = document.querySelectorAll('.mfa-digit-input');
  const fullMfaCode = document.getElementById('fullMfaCode');
  const sessionCountdown = document.getElementById('sessionCountdown');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  // Dashboard Table & Search Elements
  const espionageSearchInput = document.getElementById('espionageSearchInput');
  const espionageTableBody = document.getElementById('espionageTableBody');
  const tableRecordsCounter = document.getElementById('tableRecordsCounter');
  const countAll = document.getElementById('countAll');
  const filterPills = document.querySelectorAll('.filter-pill');
  const btnExportAllJSON = document.getElementById('btnExportAllJSON');
  const btnExportAllCSV = document.getElementById('btnExportAllCSV');
  const btnRefreshData = document.getElementById('btnRefreshData');

  // Deep Inspection Modal Elements
  const inspectionModal = document.getElementById('inspectionModal');
  const btnCloseModal = document.getElementById('btnCloseModal');

  // State
  let allTeamsData = [];
  let currentFilter = 'all';
  let searchQuery = '';
  let sessionTimerInterval = null;

  // ═════════════════════════════════════════════════════════════
  // 1. AUTHENTICATION & MFA 2FA GATEKEEPER
  // ═════════════════════════════════════════════════════════════
  
  function checkSession() {
    if (typeof AdminAuthService !== 'undefined' && AdminAuthService.isAuthorized()) {
      unlockDashboard();
    } else {
      lockDashboard();
    }
  }

  function unlockDashboard() {
    if (gatekeeperOverlay) gatekeeperOverlay.style.display = 'none';
    if (adminAppContainer) adminAppContainer.style.display = 'flex';
    startSessionTimer();
    loadEspionageIntelligence();
  }

  function lockDashboard() {
    if (gatekeeperOverlay) gatekeeperOverlay.style.display = 'flex';
    if (adminAppContainer) adminAppContainer.style.display = 'none';
    if (step1Form) step1Form.style.display = 'flex';
    if (step2Form) step2Form.style.display = 'none';
    if (authErrorMsg) authErrorMsg.style.display = 'none';
    clearInterval(sessionTimerInterval);
  }

  // Toggle Password Visibility
  if (togglePassBtn && adminPassInput) {
    togglePassBtn.addEventListener('click', () => {
      adminPassInput.type = adminPassInput.type === 'password' ? 'text' : 'password';
    });
  }

  // Step 1: Submit Password
  if (step1Form) {
    step1Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = adminPassInput.value;
      if (AdminAuthService.verifyPassword(pass)) {
        authErrorMsg.style.display = 'none';
        step1Form.style.display = 'none';
        step2Form.style.display = 'flex';
        mfaInputs[0].focus();
      } else {
        showAuthError("⚠️ Contraseña maestra incorrecta. Intento registrado en audit logs.");
      }
    });
  }

  // Step 2: Auto-focus & MFA Input Handling
  mfaInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.length === 1 && index < mfaInputs.length - 1) {
        mfaInputs[index + 1].focus();
      }
      collectMfaCode();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        mfaInputs[index - 1].focus();
      }
    });

    // Handle paste event for full 6 digits
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text').trim();
      if (/^\d{6}$/.test(pasted)) {
        pasted.split('').forEach((ch, i) => {
          if (mfaInputs[i]) mfaInputs[i].value = ch;
        });
        collectMfaCode();
        step2Form.dispatchEvent(new Event('submit'));
      }
    });
  });

  function collectMfaCode() {
    let code = '';
    mfaInputs.forEach(inp => code += inp.value);
    fullMfaCode.value = code;
    return code;
  }

  // Step 2: Submit MFA
  if (step2Form) {
    step2Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = collectMfaCode();
      if (AdminAuthService.verifyMFA(code)) {
        AdminAuthService.createSession();
        unlockDashboard();
      } else {
        showAuthError("⚠️ Código MFA de 6 dígitos inválido o expirado. Usa 772901 o 991823.");
      }
    });
  }

  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => {
      step2Form.style.display = 'none';
      step1Form.style.display = 'flex';
      authErrorMsg.style.display = 'none';
    });
  }

  function showAuthError(msg) {
    if (authErrorMsg) {
      authErrorMsg.textContent = msg;
      authErrorMsg.style.display = 'block';
    }
  }

  // Session countdown timer
  function startSessionTimer() {
    clearInterval(sessionTimerInterval);
    const expiry = parseInt(sessionStorage.getItem('fgc_admin_auth_expiry') || '0');

    function update() {
      const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      if (remaining <= 0) {
        clearInterval(sessionTimerInterval);
        AdminAuthService.clearSession();
        lockDashboard();
        return;
      }

      const hrs = Math.floor(remaining / 3600).toString().padStart(2, '0');
      const mins = Math.floor((remaining % 3600) / 60).toString().padStart(2, '0');
      const secs = (remaining % 60).toString().padStart(2, '0');
      if (sessionCountdown) sessionCountdown.textContent = `${hrs}:${mins}:${secs}`;
    }

    update();
    sessionTimerInterval = setInterval(update, 1000);
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      AdminAuthService.clearSession();
      lockDashboard();
    });
  }

  // ═════════════════════════════════════════════════════════════
  // 2. DATA INGESTION & KPI METRICS COMPUTATION
  // ═════════════════════════════════════════════════════════════

  async function loadEspionageIntelligence() {
    try {
      allTeamsData = await EspionageScoutingService.getAllTeamsAnalytics();
      computeGlobalKPIs();
      renderTable();
    } catch (err) {
      console.error("Failed to load espionage intelligence:", err);
    }
  }

  function computeGlobalKPIs() {
    const total = allTeamsData.length;
    document.getElementById('kpiTotalTeams').textContent = total;
    if (countAll) countAll.textContent = total;
    document.getElementById('kpiTotalUsers').textContent = `${total} competidores registrados`;

    if (total === 0) return;

    let sumCycleTime = 0;
    let sumBallsCycle = 0;
    let linearCount = 0;
    let buddyCount = 0;
    let sumFireShieldPct = 0;
    const climbZoneCount = { zone1: 0, zone2: 0, zone3: 0 };

    allTeamsData.forEach(t => {
      sumCycleTime += (t.avg_cycle_time || 18.0);
      sumBallsCycle += (t.avg_balls_per_cycle || 3.5);
      if (t.robot_config?.has_expandable_hopper || (t.expansion_direction && t.expansion_direction.length > 0)) {
        linearCount++;
      }
      if (t.climb_type === 'buddy_carrier' || t.climb_type === 'buddy_piggyback') {
        buddyCount++;
      }
      sumFireShieldPct += (t.shots_fire_shield_pct || 0);
      const z = t.target_brace_zone || 'zone3';
      climbZoneCount[z] = (climbZoneCount[z] || 0) + 1;
    });

    const avgCycle = (sumCycleTime / total).toFixed(1);
    const avgBalls = (sumBallsCycle / total).toFixed(1);
    const expRate = Math.round((linearCount / total) * 100);
    const buddyRate = Math.round((buddyCount / total) * 100);
    const avgFS = Math.round(sumFireShieldPct / total);
    const avgSup = 100 - avgFS;

    let topZone = 'Zone 3';
    let maxZCount = 0;
    for (const [z, c] of Object.entries(climbZoneCount)) {
      if (c > maxZCount) { maxZCount = c; topZone = z.toUpperCase(); }
    }

    document.getElementById('kpiAvgCycleDuration').textContent = `${avgCycle} s`;
    document.getElementById('kpiAvgBallsCycle').textContent = `${avgBalls} pelotas / ciclo`;
    document.getElementById('kpiExpansionRate').textContent = `${expRate}%`;
    document.getElementById('kpiBuddyClimbRatio').textContent = `${buddyRate}%`;
    document.getElementById('kpiTopClimbZone').textContent = `Zona preferida: ${topZone}`;
    document.getElementById('kpiShotRatio').textContent = `${avgSup}% / ${avgFS}%`;
  }

  // ═════════════════════════════════════════════════════════════
  // 3. TABLE FILTERING & RENDERING
  // ═════════════════════════════════════════════════════════════

  function renderTable() {
    if (!espionageTableBody) return;

    let filtered = allTeamsData.filter(team => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const cInfo = getCountryInfo(team.country_code);
        const match = team.team_name.toLowerCase().includes(q) ||
                      team.username.toLowerCase().includes(q) ||
                      team.email.toLowerCase().includes(q) ||
                      team.country_code.toLowerCase().includes(q) ||
                      cInfo.name.toLowerCase().includes(q) ||
                      team.role.toLowerCase().includes(q) ||
                      team.climb_type.toLowerCase().includes(q);
        if (!match) return false;
      }

      // 2. Pill Filter
      if (currentFilter === 'mentor') return team.role === 'mentor';
      if (currentFilter === 'student') return team.role === 'student';
      if (currentFilter === 'buddy') return team.climb_type === 'buddy_carrier' || team.climb_type === 'buddy_piggyback';
      if (currentFilter === 'linear') return team.robot_config?.has_expandable_hopper;
      if (currentFilter === 'fast') return team.avg_cycle_time > 0 && team.avg_cycle_time < 16.0;

      return true;
    });

    if (tableRecordsCounter) {
      tableRecordsCounter.textContent = `Mostrando ${filtered.length} de ${allTeamsData.length} equipos interceptados`;
    }

    if (filtered.length === 0) {
      espionageTableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 36px; color: #94a3b8;">
            <div style="font-size: 1.5rem; margin-bottom: 8px;">🛰️</div>
            No se encontraron equipos que coincidan con la búsqueda o filtro activo.
          </td>
        </tr>
      `;
      return;
    }

    espionageTableBody.innerHTML = filtered.map((t, idx) => {
      const cInfo = getCountryInfo(t.country_code);
      const rc = t.robot_config || RobotConfigService.getDefaultConfig();
      const initVol = (rc.initial_volume_cm3 || (rc.initial_length_cm * rc.initial_width_cm * rc.initial_height_cm) || 81000).toLocaleString();
      const finalVol = (rc.final_volume_cm3 || (rc.final_length_cm * rc.final_width_cm * rc.final_height_cm) || 227500).toLocaleString();
      const expDirs = (rc.expansion_directions || ['left', 'right', 'up']).join(', ');

      const climbLabel = rc.climber_type === 'buddy_carrier' ? '🤝 Buddy Carrier' : 
                        (rc.climber_type === 'buddy_piggyback' ? '🪝 Piggyback' : '🧗 Solo');

      return `
        <tr>
          <td style="font-family: var(--font-mono); color: #64748b;">${idx + 1}</td>
          
          <td>
            <div class="team-cell">
              <span class="team-flag-lg">${cInfo.flag}</span>
              <div>
                <strong class="team-name-strong">${SecurityUtils.sanitizeText(t.team_name)}</strong>
                <span class="team-country-lbl">${cInfo.name} (${t.country_code})</span>
              </div>
            </div>
          </td>

          <td>
            <div class="user-cell">
              <strong>@${SecurityUtils.sanitizeText(t.username)}</strong>
              <span class="role-badge ${t.role}">${t.role === 'mentor' ? '🛡️ Mentor' : '🎓 Student'}</span>
            </div>
          </td>

          <td>
            <div class="dim-tag">
              <span style="color: #38bdf8;">${rc.initial_length_cm}×${rc.initial_width_cm}×${rc.initial_height_cm}cm</span><br>
              <small style="color: #64748b;">(${initVol} cm³)</small>
            </div>
          </td>

          <td>
            <div style="font-size: 0.75rem;">
              <strong style="color: #f59e0b;">${rc.expanded_capacity || 14}b</strong> <small style="color:#64748b;">(Base: ${rc.non_expanded_capacity || 6}b)</small><br>
              <span style="color: #94a3b8; font-size: 0.68rem;">Dirs: ${expDirs} (${rc.expansion_duration_sec || 2.5}s)</span>
            </div>
          </td>

          <td>
            <div style="font-size: 0.75rem; font-family: var(--font-mono);">
              <span>🏃 ${rc.drive_speed_mps || 2.8} m/s</span><br>
              <span style="color: #10b981;">🎯 Acc: ${rc.robot_accuracy_pct || 92}%</span>
            </div>
          </td>

          <td>
            <div style="font-size: 0.75rem;">
              <strong style="color: #ffd700;">${climbLabel}</strong><br>
              <small style="color: #94a3b8;">${(rc.target_brace_zone || 'zone3').toUpperCase()} • ${rc.climb_latch_time_sec || 2.5}s</small>
            </div>
          </td>

          <td>
            <div style="font-size: 0.75rem; font-family: var(--font-mono);">
              <strong style="color: #38bdf8;">${t.avg_cycles || 4} ciclos</strong><br>
              <small style="color: #94a3b8;">${t.avg_cycle_time || 18.0}s / ciclo</small>
            </div>
          </td>

          <td>
            <div style="font-size: 0.75rem;">
              <span style="color: #38bdf8;">🎯 ${t.shots_suppression_pct || 100}%</span> / <span style="color: #f59e0b;">🔥 ${t.shots_fire_shield_pct || 0}%</span><br>
              <small style="color: #10b981;">Inicio: ${t.most_visited_zone || 'Zone 2'}</small>
            </div>
          </td>

          <td>
            <button type="button" class="btn-inspect-team" data-index="${idx}">
              🔍 Espiar
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach inspect listeners
    espionageTableBody.querySelectorAll('.btn-inspect-team').forEach(btn => {
      btn.addEventListener('click', () => {
        const teamIndex = parseInt(btn.dataset.index);
        const teamObj = filtered[teamIndex];
        if (teamObj) openInspectionModal(teamObj);
      });
    });
  }

  // Search input event
  if (espionageSearchInput) {
    espionageSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderTable();
    });
  }

  // Filter Pills event
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderTable();
    });
  });

  if (btnRefreshData) {
    btnRefreshData.addEventListener('click', () => {
      loadEspionageIntelligence();
    });
  }

  // ═════════════════════════════════════════════════════════════
  // 4. DEEP ESPIONAGE INSPECTION MODAL
  // ═════════════════════════════════════════════════════════════

  function openInspectionModal(team) {
    if (!inspectionModal) return;
    const cInfo = getCountryInfo(team.country_code);
    const rc = team.robot_config || RobotConfigService.getDefaultConfig();

    document.getElementById('modalFlag').textContent = cInfo.flag;
    document.getElementById('modalTeamName').textContent = team.team_name;
    document.getElementById('modalUserSubtitle').textContent = `@${team.username} • ${cInfo.name} • ${team.role === 'mentor' ? '🛡️ Mentor' : '🎓 Student'}`;

    // Contact & Profile
    document.getElementById('modalEmail').textContent = team.email || 'N/A';
    document.getElementById('modalUsername').textContent = `@${team.username}`;
    document.getElementById('modalRole').textContent = team.role === 'mentor' ? 'Lead Mentor / Coach' : 'Student Pilot & Engineer';
    document.getElementById('modalAvatar').textContent = `${(AVATAR_PRESETS.find(a=>a.id===team.avatar_url)?.icon || '🤖')} ${team.avatar_url || 'pilot'}`;
    document.getElementById('modalMatchesCount').textContent = team.total_matches || (team.matches ? team.matches.length : 0);
    document.getElementById('modalBestScore').textContent = `${team.best_score || 0} pts`;

    // Dimensions & Blueprint
    const initVol = (rc.initial_volume_cm3 || (rc.initial_length_cm * rc.initial_width_cm * rc.initial_height_cm) || 81000).toLocaleString();
    const finalVol = (rc.final_volume_cm3 || (rc.final_length_cm * rc.final_width_cm * rc.final_height_cm) || 227500).toLocaleString();
    document.getElementById('modalInitDims').textContent = `${rc.initial_length_cm} × ${rc.initial_width_cm} × ${rc.initial_height_cm} cm`;
    document.getElementById('modalInitVol').textContent = `${initVol} cm³`;
    document.getElementById('modalFinalDims').textContent = `${rc.final_length_cm} × ${rc.final_width_cm} × ${rc.final_height_cm} cm`;
    document.getElementById('modalFinalVol').textContent = `${finalVol} cm³`;
    document.getElementById('modalExpDirections').textContent = (rc.expansion_directions || ['left', 'right', 'up']).map(d => d.toUpperCase()).join(', ');
    document.getElementById('modalExpDuration').textContent = `${rc.expansion_duration_sec || 2.5} s`;
    document.getElementById('modalHasExpHopper').textContent = rc.has_expandable_hopper ? 'SÍ (Linear Motion Telescópico)' : 'NO (Tolva Fija)';

    // Storage
    document.getElementById('modalCapBase').textContent = `${rc.non_expanded_capacity || 6} pelotas`;
    document.getElementById('modalCapExpanded').textContent = `${rc.expanded_capacity || 14} pelotas`;
    document.getElementById('modalFillTime').textContent = `${rc.storage_fill_time_sec || 12.5} s`;

    // Kinematics
    document.getElementById('modalMoveSpeed').textContent = `${rc.drive_speed_mps || 2.8} m/s`;
    document.getElementById('modalIntakeSpeed').textContent = `${rc.intake_speed_bps || 2.5} pelotas/s`;
    document.getElementById('modalShootingSpeed').textContent = `${rc.shooting_speed_bps || 3.2} pelotas/s`;
    document.getElementById('modalAccuracy').textContent = `${rc.robot_accuracy_pct || 92}%`;
    document.getElementById('modalShootingStrategy').textContent = rc.game_mode_strategy === 'feeder_human_player' ? '🔥 Feeder a Fire Shield' : '🎯 Shooter a Supresión';
    document.getElementById('modalController').textContent = rc.controller_mapping || 'Teclado WASD';

    // Climber
    const climbName = rc.climber_type === 'buddy_carrier' ? '🤝 Buddy Carrier (Nodriza con enganche)' : 
                     (rc.climber_type === 'buddy_piggyback' ? '🪝 Buddy Piggyback (Colgado de Aliado)' : '🧗 Solo Climber (Subida Individual)');
    document.getElementById('modalClimberType').textContent = climbName;
    document.getElementById('modalClimbSpeed').textContent = `${rc.climb_speed_mps || 0.8} m/s`;
    document.getElementById('modalLatchTime').textContent = `${rc.climb_latch_time_sec || 2.5} s`;
    document.getElementById('modalTargetZone').textContent = (rc.target_brace_zone || 'zone3').toUpperCase();
    document.getElementById('modalApproachTime').textContent = `${rc.climb_start_time_remaining_sec || 25} s restantes`;

    // Cycle & In-Match Metrics
    document.getElementById('modalAvgCycles').textContent = team.avg_cycles || 4;
    document.getElementById('modalAvgCycleDuration').textContent = `${team.avg_cycle_time || 18.0} s`;
    document.getElementById('modalAvgBallsPerCycle').textContent = team.avg_balls_per_cycle || 3.8;
    document.getElementById('modalFirstZone').textContent = team.most_visited_zone || 'ZONE 2';

    // Shot Bar & Heatmap
    const supPct = team.shots_suppression_pct || 100;
    const fsPct = team.shots_fire_shield_pct || 0;
    document.getElementById('modalSupPct').textContent = `${supPct}%`;
    document.getElementById('modalFSPct').textContent = `${fsPct}%`;
    document.getElementById('modalShotBar').style.width = `${supPct}%`;

    // Raw JSON
    document.getElementById('modalRawJSON').textContent = JSON.stringify(team, null, 2);

    inspectionModal.style.display = 'flex';
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      inspectionModal.style.display = 'none';
    });
  }

  if (inspectionModal) {
    inspectionModal.addEventListener('click', (e) => {
      if (e.target === inspectionModal) inspectionModal.style.display = 'none';
    });
  }

  // ═════════════════════════════════════════════════════════════
  // 5. EXPORT UTILITIES (JSON & CSV)
  // ═════════════════════════════════════════════════════════════

  if (btnExportAllJSON) {
    btnExportAllJSON.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allTeamsData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `FGC2026_ESPIONAGE_DATASET_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  if (btnExportAllCSV) {
    btnExportAllCSV.addEventListener('click', () => {
      if (allTeamsData.length === 0) {
        alert("No hay datos para exportar.");
        return;
      }

      const headers = [
        "team_name", "username", "email", "country_code", "role", "best_score", "total_matches",
        "init_length_cm", "init_width_cm", "init_height_cm", "init_volume_cm3",
        "final_length_cm", "final_width_cm", "final_height_cm", "final_volume_cm3",
        "expansion_directions", "expansion_time_sec", "has_expandable_hopper",
        "non_exp_cap", "exp_cap", "storage_fill_time_sec",
        "drive_speed_mps", "intake_speed_bps", "shooting_speed_bps", "accuracy_pct",
        "climber_type", "climb_speed_mps", "latch_time_sec", "target_brace_zone", "climb_start_time_sec",
        "avg_cycles", "avg_cycle_time_sec", "avg_balls_cycle", "shots_sup_pct", "shots_fs_pct", "first_zone"
      ];

      const rows = allTeamsData.map(t => {
        const rc = t.robot_config || {};
        return [
          `"${t.team_name || ''}"`,
          `"${t.username || ''}"`,
          `"${t.email || ''}"`,
          `"${t.country_code || ''}"`,
          `"${t.role || ''}"`,
          t.best_score || 0,
          t.total_matches || 0,
          rc.initial_length_cm || 45,
          rc.initial_width_cm || 45,
          rc.initial_height_cm || 40,
          rc.initial_volume_cm3 || 81000,
          rc.final_length_cm || 65,
          rc.final_width_cm || 50,
          rc.final_height_cm || 70,
          rc.final_volume_cm3 || 227500,
          `"${(rc.expansion_directions || []).join(';')}"`,
          rc.expansion_duration_sec || 2.5,
          rc.has_expandable_hopper ? 'true' : 'false',
          rc.non_expanded_capacity || 6,
          rc.expanded_capacity || 14,
          rc.storage_fill_time_sec || 12.5,
          rc.drive_speed_mps || 2.8,
          rc.intake_speed_bps || 2.5,
          rc.shooting_speed_bps || 3.2,
          rc.robot_accuracy_pct || 92,
          `"${rc.climber_type || 'solo'}"`,
          rc.climb_speed_mps || 0.8,
          rc.climb_latch_time_sec || 2.5,
          `"${rc.target_brace_zone || 'zone3'}"`,
          rc.climb_start_time_remaining_sec || 25,
          t.avg_cycles || 0,
          t.avg_cycle_time || 0,
          t.avg_balls_per_cycle || 0,
          t.shots_suppression_pct || 100,
          t.shots_fire_shield_pct || 0,
          `"${t.most_visited_zone || 'Zone 2'}"`
        ].join(',');
      });

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", encodeURI(csvContent));
      downloadAnchor.setAttribute("download", `FGC2026_ESPIONAGE_DATASET_${Date.now()}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  // Check session on load
  checkSession();
});
