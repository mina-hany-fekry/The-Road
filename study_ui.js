// =========================================================================
// THE ROAD - DATA SCIENCE & ANALYSIS STUDY ENGINE (study_ui.js)
// Full Interactive Modules: Python, SQL Notes, 50 Interview Q&A, Statistics, World of Data, Charts
// =========================================================================

// Global Study UI State
const studyUIState = {
  activeModule: null, // 'python', 'sql_notes', 'sql_interview', 'statistics', 'data_world', 'charts', 'tracker'
  interviewSearch: '',
  interviewFilter: 'all',
  interviewTech: 'all', // 'all', 'SQL', 'Power BI'
  pythonActiveLevel: 'beginner',
  sqlActiveSection: 'basics',
  statsActiveSection: 'all',
  chartsSearch: ''
};

// =========================================================================
// 1. MASTER MODULE SWITCHER (ZERO-FAIL NAVIGATION)
// =========================================================================
window.switchStudyModule = function(moduleId) {
  const targetView = document.getElementById(`study-module-${moduleId}`);
  const isAlreadyOpen = targetView && !targetView.classList.contains('hidden') && studyUIState.activeModule === moduleId;

  if (isAlreadyOpen) {
    window.closeStudyModules();
    return;
  }

  studyUIState.activeModule = moduleId;

  // 1. Update 3D launcher card borders & highlights
  document.querySelectorAll('[data-study-card]').forEach(card => {
    const cardMod = card.getAttribute('data-study-card');
    if (cardMod === moduleId) {
      card.classList.add('ring-4', 'ring-cyan-400', 'border-blue-600', 'bg-blue-50/95', 'scale-[1.03]');
      card.classList.remove('bg-white/70');
    } else {
      card.classList.remove('ring-4', 'ring-cyan-400', 'border-blue-600', 'bg-blue-50/95', 'scale-[1.03]');
      card.classList.add('bg-white/70');
    }
  });

  // 2. Hide all module containers
  document.querySelectorAll('.study-module-container').forEach(el => el.classList.add('hidden'));

  // 3. Show target container & render content
  if (targetView) {
    targetView.classList.remove('hidden');
    renderSpecificStudyModule(moduleId);
    
    // Smooth scroll into view
    setTimeout(() => {
      targetView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }

  if (typeof saveState === 'function') saveState();
};

window.closeStudyModules = function() {
  studyUIState.activeModule = null;
  document.querySelectorAll('.study-module-container').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('[data-study-card]').forEach(card => {
    card.classList.remove('ring-4', 'ring-cyan-400', 'border-blue-600', 'bg-blue-50/95', 'scale-[1.03]');
    card.classList.add('bg-white/70');
  });
};

function renderSpecificStudyModule(moduleId) {
  switch (moduleId) {
    case 'python':
      renderPythonRoadmap();
      break;
    case 'sql_notes':
      renderSqlNotes();
      break;
    case 'sql_interview':
      renderSqlInterview();
      break;
    case 'statistics':
      renderStatisticsModule();
      break;
    case 'data_world':
      renderDataWorldModule();
      break;
    case 'charts':
      renderChartsGuide();
      break;
    case 'tracker':
      if (typeof renderStudySection === 'function') renderStudySection();
      break;
  }
}

// Utility: Copy text to clipboard with visual toast
window.copyCodeToClipboard = function(btn, codeText) {
  navigator.clipboard.writeText(codeText).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>✓</span> <span>تم النسخ!</span>';
    btn.classList.add('bg-emerald-600', 'text-white');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('bg-emerald-600', 'text-white');
    }, 2000);
  }).catch(() => {
    alert('تم تحديد الكود، يمكنك نسخه عبر Ctrl+C');
  });
};

// =========================================================================
// 2. PYTHON ROADMAP RENDERER (منهج البايثون)
// =========================================================================
function renderPythonRoadmap() {
  const container = document.getElementById('python-roadmap-content');
  if (!container || !window.STUDY_PYTHON_DATA) return;

  const data = window.STUDY_PYTHON_DATA;
  const activeLevelId = studyUIState.pythonActiveLevel;

  let html = `
    <!-- Top Summary Banner -->
    <div class="glass-panel rounded-3xl p-5 sm:p-6 border-l-4 border-emerald-500 shadow-sm space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h3 class="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>🐍</span>
          <span>${data.title_ar}</span>
        </h3>
        <span class="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
          مسار متكامل من الصفر حتى التخصص
        </span>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">${data.description_ar}</p>
      
      <!-- Level Tabs (Beginner / Intermediate / Advanced / Paths) -->
      <div class="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
  `;

  data.levels.forEach(lvl => {
    const isActive = lvl.id === activeLevelId;
    const activeClass = isActive
      ? 'bg-emerald-600 text-white shadow-md scale-105'
      : 'bg-white/80 hover:bg-emerald-50 text-slate-700 border border-slate-200';
    html += `
      <button 
        onclick="setPythonLevel('${lvl.id}')"
        class="py-2 px-4 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 btn-3d cursor-pointer ${activeClass}"
      >
        <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">${lvl.number}</span>
        <span>${lvl.name_ar}</span>
      </button>
    `;
  });

  html += `
      </div>
    </div>
  `;

  // Render content of selected level
  const activeLevel = data.levels.find(l => l.id === activeLevelId) || data.levels[0];
  if (activeLevel) {
    if (activeLevel.id === 'paths') {
      // Specialized Tracks Grid
      html += `
        <div class="space-y-4 pt-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-black text-slate-800">🎯 المسارات الوظيفية التخصصية (Pick Your Path):</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      `;
      activeLevel.specializations.forEach(spec => {
        html += `
          <div class="glass-panel rounded-3xl p-5 border-2 border-slate-200 hover:border-cyan-400 transition-all shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-2xl">${spec.icon}</span>
              <span class="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900">${spec.code}</span>
            </div>
            <div>
              <h4 class="text-base font-black text-slate-900">${spec.title_ar}</h4>
              <p class="text-[11px] text-slate-500 font-bold">${spec.title_en}</p>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">${spec.description_ar}</p>
            
            <!-- Skills Badges -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${spec.skills.map(s => `<span class="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-bold">${s}</span>`).join('')}
            </div>

            <!-- Code Sample -->
            <div class="relative rounded-2xl bg-slate-950 p-3 text-slate-100 font-mono text-[11px] overflow-x-auto shadow-inner text-left dir-ltr mt-2">
              <pre><code>${escapeHtml(spec.sample)}</code></pre>
            </div>
          </div>
        `;
      });
      html += `</div></div>`;
    } else {
      // Normal Level Topics
      html += `
        <div class="space-y-4 pt-2">
      `;
      activeLevel.topics.forEach((topic, idx) => {
        html += `
          <div class="glass-panel rounded-3xl p-5 sm:p-6 border border-white/80 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h4 class="text-base font-black text-slate-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">${idx + 1}</span>
                <span>${topic.title}</span>
              </h4>
              <span class="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">${activeLevel.name_ar}</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">${topic.summary_ar}</p>
            <p class="text-[11px] text-slate-500 font-medium italic dir-ltr text-left">${topic.summary_en}</p>
            
            <!-- Code Block with Copy -->
            <div class="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-inner text-left dir-ltr">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span class="text-[10px] text-emerald-400 font-mono font-bold">Python 3 Code</span>
                <button 
                  onclick="copyCodeToClipboard(this, ${escapeForJs(topic.code)})" 
                  class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>📋</span> <span>نسخ الكود</span>
                </button>
              </div>
              <pre class="font-mono text-xs text-emerald-300 overflow-x-auto"><code>${escapeHtml(topic.code)}</code></pre>
            </div>

            <!-- Pro Tip Alert -->
            <div class="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 text-xs font-medium flex items-start gap-2">
              <span class="text-base">💡</span>
              <span class="leading-relaxed">${topic.tips_ar}</span>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }
  }

  container.innerHTML = html;
}

window.setPythonLevel = function(lvlId) {
  studyUIState.pythonActiveLevel = lvlId;
  renderPythonRoadmap();
};

// =========================================================================
// 3. SQL TOPPER NOTES RENDERER (مذكرات وقواعد SQL)
// =========================================================================
function renderSqlNotes() {
  const container = document.getElementById('sql-notes-content');
  if (!container || !window.STUDY_SQL_DATA) return;

  const data = window.STUDY_SQL_DATA;
  const activeSecId = studyUIState.sqlActiveSection;

  let html = `
    <!-- Top Summary Banner -->
    <div class="glass-panel rounded-3xl p-5 sm:p-6 border-l-4 border-cyan-500 shadow-sm space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h3 class="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>🗄️</span>
          <span>${data.title_ar}</span>
        </h3>
        <span class="text-xs px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 font-bold border border-cyan-300">
          مرجع القواعد الأساسية والمتوسطة
        </span>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">${data.description_ar}</p>
      
      <!-- Section Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
  `;

  data.sections.forEach(sec => {
    const isActive = sec.id === activeSecId;
    const activeClass = isActive
      ? 'bg-blue-600 text-white shadow-md scale-105'
      : 'bg-white/80 hover:bg-blue-50 text-slate-700 border border-slate-200';
    html += `
      <button 
        onclick="setSqlSection('${sec.id}')"
        class="py-2 px-3.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 btn-3d cursor-pointer ${activeClass}"
      >
        <span>${sec.icon}</span>
        <span>${sec.title_ar.split('(')[0].trim()}</span>
      </button>
    `;
  });

  html += `
      </div>
    </div>
  `;

  // Render selected SQL Section
  const activeSection = data.sections.find(s => s.id === activeSecId) || data.sections[0];
  if (activeSection) {
    html += `
      <div class="space-y-4 pt-2">
    `;

    activeSection.cards.forEach(card => {
      html += `
        <div class="glass-panel rounded-3xl p-5 sm:p-6 border border-white/80 shadow-sm space-y-4 hover:shadow-md transition-all">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <h4 class="text-base font-black text-slate-900 flex items-center gap-2">
              <span class="text-cyan-600 font-black">●</span>
              <span>${card.title}</span>
            </h4>
          </div>

          ${card.details_ar ? `<p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">${card.details_ar}</p>` : ''}
          ${card.details_en ? `<p class="text-[11px] text-slate-500 font-medium italic dir-ltr text-left">${card.details_en}</p>` : ''}

          <!-- Code or Syntax -->
          ${card.code || card.syntax ? `
            <div class="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-inner text-left dir-ltr">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span class="text-[10px] text-cyan-400 font-mono font-bold">SQL Syntax / Example</span>
                <button 
                  onclick="copyCodeToClipboard(this, ${escapeForJs(card.code || card.syntax)})" 
                  class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>📋</span> <span>نسخ</span>
                </button>
              </div>
              <pre class="font-mono text-xs text-cyan-300 overflow-x-auto"><code>${escapeHtml(card.code || card.syntax)}</code></pre>
            </div>
          ` : ''}

          <!-- Specific structured tables (e.g. DELETE vs TRUNCATE vs DROP or DDL categories) -->
          ${card.table ? renderGenericTable(card.table) : ''}

          <!-- Examples List -->
          ${card.examples ? `
            <div class="space-y-2 pt-1">
              ${card.examples.map(ex => `
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-blue-900">${ex.cmd || ex.pattern}</span>
                    <span class="text-[11px] text-slate-600 font-bold">${ex.desc || ex.meaning}</span>
                  </div>
                  ${ex.code ? `
                    <div class="relative rounded-xl bg-slate-900 p-2 text-cyan-300 font-mono text-[11px] text-left dir-ltr overflow-x-auto">
                      <code>${escapeHtml(ex.code)}</code>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Joins / Items List -->
          ${card.types ? `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              ${card.types.map(t => `
                <div class="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2">
                  <span class="text-xs font-black text-blue-900 px-2 py-0.5 rounded-full bg-blue-100">${t.name}</span>
                  <p class="text-xs text-slate-700 font-medium">${t.desc}</p>
                  ${t.code ? `
                    <div class="rounded-xl bg-slate-900 p-2.5 text-cyan-300 font-mono text-[10px] text-left dir-ltr overflow-x-auto">
                      <code>${escapeHtml(t.code)}</code>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Constraints items -->
          ${card.items ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              ${card.items.map(it => `
                <div class="p-3 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span class="text-xs font-black text-cyan-800">${it.name || it.fn}</span>
                  <p class="text-xs text-slate-600 font-medium">${it.desc}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${card.notes_ar ? `
            <div class="p-3 rounded-2xl bg-amber-50 text-amber-950 text-xs font-bold border border-amber-200">
              💡 ${card.notes_ar}
            </div>
          ` : ''}
        </div>
      `;
    });

    html += `</div>`;
  }

  container.innerHTML = html;
}

window.setSqlSection = function(secId) {
  studyUIState.sqlActiveSection = secId;
  renderSqlNotes();
};

function renderGenericTable(tableData) {
  if (!tableData || !tableData.length) return '';
  const keys = Object.keys(tableData[0]);
  let html = `
    <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mt-2">
      <table class="w-full text-xs text-right">
        <thead class="bg-slate-100 text-slate-800 font-black border-b border-slate-200">
          <tr>
            ${keys.map(k => `<th class="p-2.5 whitespace-nowrap">${formatTableHeader(k)}</th>`).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white font-medium">
          ${tableData.map(row => `
            <tr class="hover:bg-slate-50 transition-colors">
              ${keys.map(k => `<td class="p-2.5 text-slate-700 whitespace-nowrap">${row[k]}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  return html;
}

function formatTableHeader(k) {
  const map = {
    category: 'التصنيف', commands: 'الأوامر', purpose: 'الهدف والاستخدام',
    feature: 'وجه المقارنة', delete: 'DELETE', truncate: 'TRUNCATE', drop: 'DROP'
  };
  return map[k] || k;
}

// =========================================================================
// 4. 80 INTERVIEW QUESTIONS RENDERER (SQL & POWER BI أسئلة المقابلات)
// =========================================================================
function renderSqlInterview() {
  const container = document.getElementById('sql-interview-content');
  if (!container || !window.STUDY_INTERVIEW_DATA) return;

  const allQuestions = window.STUDY_INTERVIEW_DATA;
  const currentTech = studyUIState.interviewTech || 'all';
  const currentFilter = studyUIState.interviewFilter;
  const query = (studyUIState.interviewSearch || '').trim().toLowerCase();

  // Tech counts
  const sqlCount = allQuestions.filter(q => (q.tech || 'SQL') === 'SQL').length;
  const pbiCount = allQuestions.filter(q => q.tech === 'Power BI').length;

  // Filter by technology first
  const techFiltered = allQuestions.filter(q => {
    if (currentTech === 'all') return true;
    return (q.tech || 'SQL') === currentTech;
  });

  // Extract unique categories for this tech selection
  const categories = ['all', ...new Set(techFiltered.map(q => q.category))];

  // Filter questions by Category and Search Query
  const filtered = techFiltered.filter(q => {
    const matchesCat = (currentFilter === 'all') || (q.category === currentFilter);
    if (!matchesCat) return false;
    if (!query) return true;
    return (
      q.question.toLowerCase().includes(query) ||
      q.question_ar.toLowerCase().includes(query) ||
      q.answer.toLowerCase().includes(query) ||
      q.answer_ar.toLowerCase().includes(query) ||
      (q.example && q.example.toLowerCase().includes(query)) ||
      (q.note && q.note.toLowerCase().includes(query))
    );
  });

  let html = `
    <!-- Top Filter & Search Banner -->
    <div class="glass-panel rounded-3xl p-5 sm:p-6 border-l-4 border-indigo-500 shadow-sm space-y-4">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h3 class="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>🎯</span>
          <span>80 سؤال وجواب لمقابلات العمل (80 SQL & Power BI Q&A)</span>
        </h3>
        <span class="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold border border-indigo-300">
          معروض: ${filtered.length} من أصل ${allQuestions.length} سؤالاً
        </span>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
        بنك أسئلة المقابلات الشامل: 50 سؤال SQL من السلايدات الرسمية + 30 سؤال Power BI & DAX ونمذجة البيانات، بإجابات نموذجية ثنائية اللغة وأكواد وأسرار المقابلات.
      </p>

      <!-- Technology Tabs (All / SQL / Power BI) -->
      <div class="flex items-center gap-2 pt-1 border-b border-slate-200/80 pb-3">
        <button 
          onclick="setInterviewTech('all')"
          class="py-2 px-4 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 btn-3d cursor-pointer ${currentTech === 'all' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-white hover:bg-indigo-50 text-slate-700 border border-slate-200'}"
        >
          <span>⭐</span>
          <span>الكل (${allQuestions.length})</span>
        </button>
        <button 
          onclick="setInterviewTech('SQL')"
          class="py-2 px-4 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 btn-3d cursor-pointer ${currentTech === 'SQL' ? 'bg-cyan-600 text-white shadow-md scale-105' : 'bg-white hover:bg-cyan-50 text-slate-700 border border-slate-200'}"
        >
          <span>🗄️</span>
          <span>أسئلة SQL (${sqlCount})</span>
        </button>
        <button 
          onclick="setInterviewTech('Power BI')"
          class="py-2 px-4 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 btn-3d cursor-pointer ${currentTech === 'Power BI' ? 'bg-amber-600 text-white shadow-md scale-105' : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'}"
        >
          <span>📊</span>
          <span>أسئلة Power BI (${pbiCount})</span>
        </button>
      </div>

      <!-- Instant Search Input -->
      <div class="relative">
        <input 
          type="text" 
          id="interview-search-input"
          oninput="handleInterviewSearch(this.value)"
          value="${escapeHtml(studyUIState.interviewSearch)}"
          placeholder="ابحث في أي سؤال، دالة (مثل CALCULATE أو JOIN أو RLS) أو إجابة..."
          class="w-full py-3 px-4 pr-10 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
        >
        <span class="absolute right-3.5 top-3.5 text-slate-400 text-base pointer-events-none">🔍</span>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 no-scrollbar">
        ${categories.map(cat => {
          const isActive = cat === currentFilter;
          const label = (cat === 'all') ? `⭐ جميع أقسام ${currentTech === 'all' ? 'المقابلات' : currentTech} (${techFiltered.length})` : cat;
          const cls = isActive
            ? 'bg-indigo-600 text-white shadow-md scale-105'
            : 'bg-white/80 hover:bg-indigo-50 text-slate-700 border border-slate-200';
          return `
            <button 
              onclick="setInterviewFilter('${cat}')" 
              class="py-1.5 px-3 rounded-xl text-xs font-black transition-all whitespace-nowrap btn-3d cursor-pointer ${cls}"
            >
              ${label}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Render question cards list
  if (filtered.length === 0) {
    html += `
      <div class="glass-panel rounded-3xl p-8 text-center space-y-2">
        <span class="text-3xl">🔍</span>
        <h4 class="text-base font-black text-slate-800">لم يتم العثور على نتائج</h4>
        <p class="text-xs text-slate-500 font-medium">جرب البحث بكلمة أخرى أو تصفح كل الأقسام.</p>
        <button onclick="clearInterviewSearch()" class="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold btn-3d">عرض كل الأسئلة</button>
      </div>
    `;
  } else {
    html += `<div class="space-y-4 pt-2">`;
    filtered.forEach(q => {
      const isPBI = q.tech === 'Power BI';
      const badgeCls = isPBI ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-indigo-50 text-indigo-800 border-indigo-200';
      const numberCls = isPBI ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-indigo-100 text-indigo-900 border-indigo-200';
      const exampleTitle = isPBI ? 'Power BI / DAX / Architecture Pattern' : 'SQL Query Example';

      html += `
        <div class="glass-panel rounded-3xl p-5 sm:p-6 border border-white/80 shadow-sm space-y-4 hover:shadow-md transition-all">
          <!-- Question Header -->
          <div class="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
            <div class="flex items-start gap-3">
              <span class="w-8 h-8 rounded-2xl ${numberCls} font-black text-sm flex items-center justify-center flex-shrink-0 shadow-sm border">
                ${q.id}
              </span>
              <div>
                <h4 class="text-base font-black text-slate-900 leading-snug">${q.question_ar}</h4>
                <p class="text-xs ${isPBI ? 'text-amber-800' : 'text-indigo-800'} font-bold dir-ltr text-left mt-0.5">${q.question}</p>
              </div>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-lg ${isPBI ? 'bg-amber-500 text-white' : 'bg-cyan-600 text-white'}">${q.tech || 'SQL'}</span>
              <span class="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600">${q.slide}</span>
              <span class="text-[10px] font-bold px-2.5 py-1 rounded-xl ${badgeCls} border">${q.category_ar || q.category}</span>
            </div>
          </div>

          <!-- Answer Sections (Arabic + English) -->
          <div class="space-y-2 pt-1">
            <div class="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line shadow-sm">
              <span class="font-bold ${isPBI ? 'text-amber-900' : 'text-indigo-900'} block mb-1">الإجابة النموذجية:</span>
              ${q.answer_ar}
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium leading-relaxed dir-ltr text-left whitespace-pre-line">
              <span class="font-bold text-slate-800 block mb-0.5">English Answer:</span>
              ${q.answer}
            </div>
          </div>

          <!-- Code / Example with Copy -->
          ${q.example ? `
            <div class="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-inner text-left dir-ltr">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span class="text-[10px] ${isPBI ? 'text-amber-400' : 'text-indigo-400'} font-mono font-bold">${exampleTitle}</span>
                <button 
                  onclick="copyCodeToClipboard(this, ${escapeForJs(q.example)})" 
                  class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>📋</span> <span>نسخ الكود / الشرح</span>
                </button>
              </div>
              <pre class="font-mono text-xs ${isPBI ? 'text-amber-200' : 'text-indigo-200'} overflow-x-auto whitespace-pre"><code>${escapeHtml(q.example)}</code></pre>
            </div>
          ` : ''}

          <!-- Note / Takeaway -->
          ${q.note ? `
            <div class="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs font-bold flex items-start gap-2">
              <span class="text-base flex-shrink-0">⭐</span>
              <span class="leading-relaxed">نصيحة المقابلة: ${q.note}</span>
            </div>
          ` : ''}
        </div>
      `;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

window.handleInterviewSearch = function(val) {
  studyUIState.interviewSearch = val;
  renderSqlInterview();
};

window.setInterviewTech = function(tech) {
  studyUIState.interviewTech = tech;
  studyUIState.interviewFilter = 'all';
  renderSqlInterview();
};

window.setInterviewFilter = function(cat) {
  studyUIState.interviewFilter = cat;
  renderSqlInterview();
};

window.clearInterviewSearch = function() {
  studyUIState.interviewSearch = '';
  studyUIState.interviewFilter = 'all';
  studyUIState.interviewTech = 'all';
  renderSqlInterview();
};

// =========================================================================
// 5. STATISTICS FOR DATA ANALYSIS RENDERER (درس الإحصاء)
// =========================================================================
function renderStatisticsModule() {
  const container = document.getElementById('statistics-module-content');
  if (!container || !window.STUDY_STATS_DATA) return;

  const data = window.STUDY_STATS_DATA;

  let html = `
    <!-- Top Summary Banner -->
    <div class="glass-panel rounded-3xl p-5 sm:p-6 border-l-4 border-amber-500 shadow-sm space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h3 class="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>📊</span>
          <span>${data.title_ar}</span>
        </h3>
        <span class="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
          مرجع إحصائي ثنائي اللغة (AR/EN)
        </span>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">${data.description_ar}</p>
      
      <!-- Golden Rule Callout -->
      <div class="p-3.5 rounded-2xl bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black flex items-center gap-2.5">
        <span class="text-xl">🏆</span>
        <span>القاعدة الذهبية: ${data.golden_rule_ar}</span>
      </div>
    </div>

    <!-- 8 Sections List -->
    <div class="space-y-5 pt-2">
  `;

  data.sections.forEach(sec => {
    html += `
      <div class="glass-panel rounded-3xl p-5 sm:p-6 border border-white/80 shadow-sm space-y-4 hover:shadow-md transition-all">
        <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
            <span class="text-xl">${sec.icon}</span>
            <span>${sec.number}. ${sec.title_ar}</span>
          </h4>
          <span class="text-xs text-slate-500 font-bold dir-ltr">${sec.title_en}</span>
        </div>

        ${sec.definition_ar ? `
          <div class="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
            <span class="font-bold text-amber-900 block mb-1">التعريف الأساسي:</span>
            ${sec.definition_ar}
            <div class="text-[11px] text-slate-500 font-medium dir-ltr text-left mt-1.5 italic">${sec.definition_en}</div>
          </div>
        ` : ''}

        <!-- Process Steps (Collect -> Organize -> Analyze...) -->
        ${sec.steps ? `
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
            ${sec.steps.map(st => `
              <div class="p-3 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
                <span class="text-2xl block">${st.icon}</span>
                <span class="text-xs font-black text-slate-900 block">${st.name_ar}</span>
                <span class="text-[10px] text-slate-500 font-bold block dir-ltr">${st.name_en}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Types of Data -->
        ${sec.types ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            ${sec.types.map(tp => `
              <div class="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-3">
                <h5 class="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <span class="text-amber-600 font-black">●</span>
                  <span>${tp.category_ar}</span>
                </h5>
                <p class="text-xs text-slate-600 font-medium">${tp.desc_ar}</p>
                <div class="space-y-2 pt-1">
                  ${tp.subtypes.map(sub => `
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-amber-900">${sub.name_ar}</span>
                        <span class="text-[10px] text-slate-500 font-bold">${sub.rule_ar}</span>
                      </div>
                      <p class="text-[11px] text-slate-600 font-medium">أمثلة: ${sub.examples}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          ${sec.note_ar ? `<div class="p-3 rounded-xl bg-blue-50 text-blue-950 text-xs font-bold border border-blue-200">${sec.note_ar}</div>` : ''}
        ` : ''}

        <!-- Measures of Central Tendency or Dispersion -->
        ${sec.measures ? `
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            ${sec.measures.map(m => `
              <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div class="flex items-center justify-between">
                  <h5 class="text-xs sm:text-sm font-black text-slate-900">${m.name_ar}</h5>
                </div>
                <div class="p-2 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs font-bold text-center dir-ltr">
                  ${m.formula}
                </div>
                <p class="text-xs text-slate-600 font-medium leading-relaxed">${m.desc_ar}</p>
                ${m.example ? `<p class="text-[11px] text-slate-500 font-bold bg-slate-50 p-2 rounded-lg">${m.example}</p>` : ''}
                ${m.alert_ar ? `<p class="text-[10px] text-rose-800 font-bold bg-rose-50 p-1.5 rounded-lg border border-rose-200">⚠️ ${m.alert_ar}</p>` : ''}
              </div>
            `).join('')}
          </div>
          ${sec.symmetry_rule_ar ? `<div class="p-3 rounded-xl bg-emerald-50 text-emerald-950 text-xs font-bold border border-emerald-200">🎯 ${sec.symmetry_rule_ar}</div>` : ''}
        ` : ''}

        <!-- Distributions or Tests -->
        ${sec.items ? `
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            ${sec.items.map(it => `
              <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <span class="text-xs font-black text-amber-900 px-2 py-0.5 rounded-full bg-amber-100">${it.name_ar}</span>
                <p class="text-xs text-slate-700 font-medium">${it.desc_ar}</p>
                <div class="p-2 rounded-xl bg-slate-50 text-[11px] text-slate-600 font-bold">
                  <span>الاستخدام: </span><span>${it.use_case}</span>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${sec.tests ? `
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            ${sec.tests.map(ts => `
              <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <span class="text-xs font-black text-indigo-900 px-2 py-0.5 rounded-full bg-indigo-100">${ts.name_ar}</span>
                <p class="text-xs text-slate-700 font-medium">${ts.purpose_ar}</p>
                <p class="text-[11px] text-slate-500 font-bold bg-slate-50 p-2 rounded-lg">مثال: ${ts.example}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Correlation & Regression -->
        ${sec.concepts ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            ${sec.concepts.map(cp => `
              <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                <div class="flex items-center justify-between">
                  <h5 class="text-sm font-black text-slate-900">${cp.name_ar}</h5>
                  <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800">${cp.range || cp.formula}</span>
                </div>
                <p class="text-xs text-slate-700 font-medium whitespace-pre-line leading-relaxed">${cp.desc_ar}</p>
                ${cp.golden_warning ? `<p class="text-[11px] font-black text-rose-800 bg-rose-50 p-2 rounded-xl border border-rose-200">${cp.golden_warning}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Steps list -->
        ${sec.process ? `
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            ${sec.process.map(pr => `
              <div class="p-3 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs mx-auto flex items-center justify-center">${pr.num}</span>
                <span class="text-xs font-black text-slate-900 block">${pr.title_ar}</span>
                <span class="text-[10px] text-slate-500 font-bold block dir-ltr">${pr.title_en}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// =========================================================================
// 6. THE WORLD OF DATA RENDERER (درس الداتا)
// =========================================================================
function renderDataWorldModule() {
  const container = document.getElementById('data-world-content');
  if (!container || !window.STUDY_WORLD_DATA) return;

  const data = window.STUDY_WORLD_DATA;

  let html = `
    <!-- Top Summary Banner -->
    <div class="glass-panel rounded-3xl p-5 sm:p-6 border-l-4 border-sky-500 shadow-sm space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h3 class="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>🌐</span>
          <span>${data.title_ar}</span>
        </h3>
        <span class="text-xs px-3 py-1 rounded-full bg-sky-100 text-sky-900 font-bold border border-sky-300">
          منظومة وهندسة البيانات الحديثة
        </span>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">${data.description_ar}</p>
      
      <!-- Motto -->
      <div class="p-3.5 rounded-2xl bg-gradient-to-r from-sky-100 to-sky-50 border border-sky-300 text-sky-950 text-xs sm:text-sm font-black flex items-center gap-2.5">
        <span class="text-xl">💡</span>
        <span>شعار المحلل: ${data.motto_ar}</span>
      </div>
    </div>

    <!-- 5 Sections -->
    <div class="space-y-5 pt-2">
  `;

  data.sections.forEach(sec => {
    html += `
      <div class="glass-panel rounded-3xl p-5 sm:p-6 border border-white/80 shadow-sm space-y-4 hover:shadow-md transition-all">
        <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span class="text-xl">${sec.icon}</span>
            <span>${sec.title_ar}</span>
          </h4>
          <span class="text-xs text-slate-500 font-bold dir-ltr">${sec.title_en}</span>
        </div>

        ${sec.definition_ar ? `
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">${sec.definition_ar}</p>
        ` : ''}

        <!-- EPL Phases -->
        ${sec.phases ? `
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            ${sec.phases.map(ph => `
              <div class="p-4 rounded-2xl bg-white border-2 border-sky-100 hover:border-sky-300 space-y-2 shadow-sm transition-all text-center">
                <span class="w-10 h-10 rounded-2xl bg-sky-100 text-sky-900 text-lg font-black flex items-center justify-center mx-auto">${ph.letter}</span>
                <h5 class="text-sm font-black text-slate-900">${ph.name_ar}</h5>
                <p class="text-xs text-slate-600 font-medium leading-relaxed">${ph.desc_ar}</p>
              </div>
            `).join('')}
          </div>
          ${sec.key_takeaways ? `
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 pt-2">
              <span class="text-xs font-black text-slate-900 block mb-1">النقاط الجوهرية (Key Takeaways):</span>
              ${sec.key_takeaways.map(t => `<div class="text-xs text-slate-700 font-medium flex items-center gap-2"><span class="text-sky-600">✓</span><span>${t}</span></div>`).join('')}
            </div>
          ` : ''}
        ` : ''}

        <!-- 5 V's of Big Data -->
        ${sec.five_vs ? `
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
            ${sec.five_vs.map(v => `
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1.5 shadow-sm">
                <span class="text-2xl block">${v.icon}</span>
                <span class="text-xs font-black text-sky-900 block">${v.name_ar}</span>
                <p class="text-[11px] text-slate-600 font-medium leading-tight">${v.desc_ar}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Storage Architecture Comparison (Warehouse vs Lake vs Lakehouse) -->
        ${sec.comparison ? `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            ${sec.comparison.map((comp, idx) => {
              const borderCls = idx === 2 ? 'border-2 border-sky-400 bg-sky-50/40' : 'border border-slate-200 bg-white';
              return `
                <div class="p-4 rounded-3xl ${borderCls} space-y-2.5 shadow-sm">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xs sm:text-sm font-black text-slate-900">${comp.model}</h5>
                    ${idx === 2 ? '<span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">الأحدث والأقوى</span>' : ''}
                  </div>
                  <p class="text-xs text-slate-600 font-medium">${comp.desc_ar}</p>
                  
                  <div class="space-y-1.5 text-[11px] font-medium pt-1">
                    <div class="p-2 rounded-xl bg-slate-100/80"><b>المخطط:</b> ${comp.schema}</div>
                    <div class="p-2 rounded-xl bg-slate-100/80"><b>البيانات:</b> ${comp.data_types}</div>
                    <div class="p-2 rounded-xl bg-slate-100/80"><b>الاستخدام الأمثل:</b> ${comp.best_for}</div>
                    <div class="p-2 rounded-xl bg-slate-100/80"><b>التكلفة:</b> ${comp.cost}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Data Flow Pipeline -->
        ${sec.pipeline ? `
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
            ${sec.pipeline.map(pl => `
              <div class="p-3 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
                <span class="text-xs font-black text-sky-900 block">${pl.stage}</span>
                <p class="text-[11px] text-slate-600 font-medium leading-tight">${pl.desc}</p>
                <div class="p-1.5 rounded-lg bg-sky-50 text-[10px] font-mono text-sky-800 font-bold">${pl.tools}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Popular Tools Matrix -->
        ${sec.categories ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            ${sec.categories.map(cg => `
              <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span class="text-xs font-black text-slate-900 block">${cg.category_ar}</span>
                <div class="flex flex-wrap gap-1.5">
                  ${cg.tools.map(t => `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">${t}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// =========================================================================
// 7. CHARTS & VISUALIZATION GUIDE RENDERER (دليل الشارتات)
// =========================================================================
function renderChartsGuide() {
  const container = document.getElementById('charts-guide-content');
  if (!container || !window.STUDY_CHARTS_DATA) return;

  const data = window.STUDY_CHARTS_DATA;
  const query = (studyUIState.chartsSearch || '').trim().toLowerCase();

  const filtered = data.charts.filter(c => {
    if (!query) return true;
    return (
      c.name_ar.toLowerCase().includes(query) ||
      c.name_en.toLowerCase().includes(query) ||
      c.when_to_use_ar.toLowerCase().includes(query) ||
      c.when_to_use_en.toLowerCase().includes(query) ||
      c.data_type_ar.toLowerCase().includes(query)
    );
  });

  let html = `
    <!-- Top Summary Banner -->
    <div class="glass-panel rounded-3xl p-5 sm:p-6 border-l-4 border-rose-500 shadow-sm space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h3 class="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <span>📈</span>
          <span>${data.title_ar}</span>
        </h3>
        <span class="text-xs px-3 py-1 rounded-full bg-rose-100 text-rose-900 font-bold border border-rose-300">
          دليل استخدام كل رسم بياني بالعربي والإنجليزي
        </span>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">${data.description_ar}</p>
      
      <!-- Search Input -->
      <div class="relative pt-1">
        <input 
          type="text" 
          oninput="handleChartsSearch(this.value)"
          value="${escapeHtml(studyUIState.chartsSearch)}"
          placeholder="ابحث عن نوع الرسم (مثل Bar أو Histogram أو Box Plot)..."
          class="w-full py-2.5 px-4 pr-10 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium"
        >
        <span class="absolute right-3.5 top-3.5 text-slate-400 text-base pointer-events-none">🔍</span>
      </div>
    </div>

    <!-- Charts Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
  `;

  filtered.forEach(ch => {
    html += `
      <div class="glass-panel rounded-3xl p-5 sm:p-6 border border-white/80 shadow-sm space-y-3.5 hover:shadow-md transition-all flex flex-col justify-between">
        <div class="space-y-3">
          <!-- Header -->
          <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">${ch.icon}</span>
              <div>
                <h4 class="text-base font-black text-slate-900">${ch.name_ar}</h4>
                <p class="text-[11px] text-slate-500 font-bold dir-ltr text-left">${ch.name_en}</p>
              </div>
            </div>
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
              ${ch.data_type_ar.split('+')[0].trim()}
            </span>
          </div>

          <!-- When to use (AR) -->
          <div class="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs font-medium space-y-1">
            <span class="font-black text-emerald-900 block flex items-center gap-1">
              <span>✅</span> <span>متى يُستخدم؟</span>
            </span>
            <p class="leading-relaxed">${ch.when_to_use_ar}</p>
          </div>

          <!-- When to use (EN) -->
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium leading-relaxed dir-ltr text-left">
            <span class="font-bold text-slate-800 block mb-0.5">When to use:</span>
            ${ch.when_to_use_en}
          </div>

          <!-- When to avoid -->
          <div class="p-3 rounded-2xl bg-rose-50/60 border border-rose-200 text-rose-950 text-xs font-medium space-y-1">
            <span class="font-black text-rose-900 block flex items-center gap-1">
              <span>⛔</span> <span>متى تتجنبه؟</span>
            </span>
            <p class="leading-relaxed">${ch.when_to_avoid_ar}</p>
          </div>

          <!-- Pro Tip -->
          <div class="p-2.5 rounded-xl bg-amber-50 text-amber-950 text-[11px] font-bold border border-amber-200 flex items-start gap-1.5">
            <span class="text-sm">💡</span>
            <span>نصيحة المحترف: ${ch.pro_tip_ar}</span>
          </div>
        </div>

        <!-- Python Code snippet -->
        <div class="relative rounded-2xl bg-slate-900 border border-slate-800 p-3 shadow-inner text-left dir-ltr mt-2">
          <div class="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-1.5">
            <span class="text-[10px] text-rose-400 font-mono font-bold">Python Code (Seaborn / Matplotlib)</span>
            <button 
              onclick="copyCodeToClipboard(this, ${escapeForJs(ch.python_snippet)})" 
              class="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[9px] font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>📋</span> <span>نسخ</span>
            </button>
          </div>
          <pre class="font-mono text-[11px] text-rose-200 overflow-x-auto"><code>${escapeHtml(ch.python_snippet)}</code></pre>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

window.handleChartsSearch = function(val) {
  studyUIState.chartsSearch = val;
  renderChartsGuide();
};

// =========================================================================
// HELPER UTILITIES
// =========================================================================
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeForJs(str) {
  return JSON.stringify(str || '');
}
