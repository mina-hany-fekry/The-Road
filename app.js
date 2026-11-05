// =========================================================================
// DATAMASTER & SPIRIT - MAIN CONTROLLER (PWA)
// Bilingual (AR/EN) • 3D Glassmorphism • Tabbed Agpeya & Spiritual Books
// =========================================================================

const STORAGE_KEY = 'datamaster_spirit_state_v12';

const defaultAppState = {
  currentLang: 'ar',
  currentSection: 'spiritual', // 'spiritual' or 'study'
  
  // Spiritual sub-state
  spiritual: {
    activeSubTab: 'agpeya', // 'agpeya', 'bible', 'book', 'bustan'
    selectedAgpeyaHour: 'prime',
    agpeyaMode: 'tabbed', // 'tabbed' (Default), 'continuous', or 'slide'
    agpeyaActiveTab: 'intro', // 'intro', 'hour', 'psalms', 'gospel', 'troparia', 'kyrie', 'creed', 'absolution', 'conclusion'
    agpeyaPsalmIdx: 0,
    agpeyaPsalmViewMode: 'single', // 'single' or 'all'
    agpeyaSlideIdx: 0,
    agpeyaFontSize: 19,
    kyrieCounter: 0,
    
    // Bible state
    bibleBookId: 43, // John
    bibleChapter: 1,
    bibleTestament: 'all', // 'all', 'OT', 'NT'
    bibleSearchQuery: '',
    bibleFontSize: 19,
    
    // Life of Prayer Book state
    bookActiveTab: 'reader', // 'reader', 'toc', 'quick'
    bookPage: 1,
    bookTheme: 'day', // 'day', 'sepia', 'night'
    bookFontSize: 18,
    bookSearchQuery: '',
    
    // Bustan El-Rohban state
    bustanActiveTab: 'reader', // 'reader', 'toc', 'quick'
    bustanPage: 5,
    bustanTheme: 'day',
    bustanFontSize: 18,
    bustanSearchQuery: ''
  },

  // Study Tracker state
  study: {
    activeTab: 'today', // 'today', 'schedule', 'reschedule', 'timer', 'settings'
    lessons: [],
    timer: {
      durationSeconds: 3600,
      remainingSeconds: 3600,
      isRunning: false,
      intervalId: null
    },
    settings: {
      startDate: '2026-11-04',
      endDate: '2026-12-31',
      skipFridays: true,
      skipSaturdays: true,
      allowSaturdaysOnReschedule: false
    }
  }
};

let appState = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultAppState,
        ...parsed,
        spiritual: { ...defaultAppState.spiritual, ...(parsed.spiritual || {}) },
        study: { ...defaultAppState.study, ...(parsed.study || {}) }
      };
    }
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
  }
  return JSON.parse(JSON.stringify(defaultAppState));
}

function saveState() {
  try {
    const clone = {
      ...appState,
      study: {
        ...appState.study,
        timer: {
          ...appState.study.timer,
          intervalId: null
        }
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clone));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

function t(key) {
  const lang = appState.currentLang || 'ar';
  return (TRANSLATIONS && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || key;
}

// ==========================================
// NAVIGATION & SECTION SWITCHING
// ==========================================

function switchMainSection(section) {
  appState.currentSection = section;
  const secSpiritual = document.getElementById('main-section-spiritual');
  const secStudy = document.getElementById('main-section-study');
  const btnSpiritual = document.getElementById('btn-nav-spiritual');
  const btnStudy = document.getElementById('btn-nav-study');

  if (section === 'spiritual') {
    if (secSpiritual) secSpiritual.classList.remove('hidden');
    if (secStudy) secStudy.classList.add('hidden');
    if (btnSpiritual) {
      btnSpiritual.classList.add('bg-amber-600', 'text-white', 'shadow-md');
      btnSpiritual.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
    }
    if (btnStudy) {
      btnStudy.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      btnStudy.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
    }
    renderSpiritualSection();
  } else {
    if (secSpiritual) secSpiritual.classList.add('hidden');
    if (secStudy) secStudy.classList.remove('hidden');
    if (btnStudy) {
      btnStudy.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btnStudy.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
    }
    if (btnSpiritual) {
      btnSpiritual.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
      btnSpiritual.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
    }
    renderStudySection();
  }
  updateDockActiveState();
  saveState();
}

function switchSpiritualTab(subTab) {
  appState.spiritual.activeSubTab = subTab;
  
  // Update nav buttons
  document.querySelectorAll('[data-spiritual-tab]').forEach(btn => {
    const tabName = btn.getAttribute('data-spiritual-tab');
    if (tabName === subTab) {
      btn.classList.add('bg-amber-700', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-600', 'hover:bg-amber-50');
    } else {
      btn.classList.remove('bg-amber-700', 'text-white', 'shadow-sm');
      btn.classList.add('text-slate-600', 'hover:bg-amber-50');
    }
  });

  // Toggle subviews
  document.querySelectorAll('.spiritual-view').forEach(view => view.classList.add('hidden'));
  const targetView = document.getElementById(`spiritual-view-${subTab}`);
  if (targetView) targetView.classList.remove('hidden');

  renderSpiritualSection();
  updateDockActiveState();
  saveState();
}

function renderSpiritualSection() {
  const tab = appState.spiritual.activeSubTab;
  if (tab === 'agpeya') {
    renderAgpeya();
  } else if (tab === 'bible') {
    renderBible();
  } else if (tab === 'book') {
    renderBookOfPrayer();
  } else if (tab === 'bustan') {
    renderBustan();
  }
}

// ==========================================
// 3D GLASS SIDEBAR & FLOATING DOCK CONTROLLERS
// ==========================================

function toggleSidebar(show) {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar || !backdrop) return;

  const isClosed = sidebar.classList.contains('hidden') || sidebar.classList.contains('translate-x-full');
  const shouldOpen = typeof show === 'boolean' ? show : isClosed;

  if (shouldOpen) {
    backdrop.classList.remove('hidden');
    sidebar.classList.remove('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100');
      sidebar.classList.remove('translate-x-full');
    });
    document.body.style.overflow = 'hidden';
  } else {
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    sidebar.classList.add('translate-x-full');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('hidden');
        backdrop.classList.add('hidden');
      }
    }, 320);
  }
}

function sidebarNavigateAgpeya(hourId) {
  toggleSidebar(false);
  switchMainSection('spiritual');
  switchSpiritualTab('agpeya');
  selectAgpeyaHour(hourId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sidebarNavigateBible(testament) {
  toggleSidebar(false);
  switchMainSection('spiritual');
  switchSpiritualTab('bible');
  if (testament) {
    setBibleTestamentFilter(testament);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sidebarNavigate(targetView) {
  toggleSidebar(false);
  if (targetView === 'book' || targetView === 'bustan') {
    switchMainSection('spiritual');
    switchSpiritualTab(targetView);
  } else if (targetView === 'study') {
    switchMainSection('study');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sidebarNavigateStudy(studyTab) {
  toggleSidebar(false);
  switchMainSection('study');
  switchStudyTab(studyTab);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bottomNavSwitch(item) {
  if (item === 'menu') {
    toggleSidebar(true);
    return;
  }
  if (item === 'agpeya') {
    switchMainSection('spiritual');
    switchSpiritualTab('agpeya');
  } else if (item === 'bible') {
    switchMainSection('spiritual');
    switchSpiritualTab('bible');
  } else if (item === 'books') {
    switchMainSection('spiritual');
    const last = appState.spiritual.activeSubTab === 'bustan' ? 'bustan' : 'book';
    switchSpiritualTab(last);
  } else if (item === 'study') {
    switchMainSection('study');
  }
  updateDockActiveState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateDockActiveState() {
  const isSpiritual = appState.currentSection === 'spiritual';
  const sub = appState.spiritual.activeSubTab;

  const states = {
    agpeya: isSpiritual && sub === 'agpeya',
    bible: isSpiritual && sub === 'bible',
    books: isSpiritual && (sub === 'book' || sub === 'bustan'),
    study: appState.currentSection === 'study'
  };

  for (const [key, active] of Object.entries(states)) {
    const btn = document.getElementById(`dock-btn-${key}`);
    if (!btn) continue;
    if (active) {
      btn.classList.add('text-amber-800', 'bg-amber-100/90', 'shadow-sm', 'scale-105');
      btn.classList.remove('text-slate-600', 'hover:text-amber-800');
    } else {
      btn.classList.remove('text-amber-800', 'bg-amber-100/90', 'shadow-sm', 'scale-105');
      btn.classList.add('text-slate-600', 'hover:text-amber-800');
    }
  }
}


// ==========================================
// 1. THE COMPLETE AGPEYA (صلوات الأجبية كاملة)
// 3D Glass Liturgical Tabs • Slide Mode • Continuous Mode
// ==========================================

function renderAgpeya() {
  const hoursNav = document.getElementById('agpeya-hours-nav');
  const content = document.getElementById('agpeya-hour-content');
  if (!hoursNav || !content || typeof AGPEYA_FULL === 'undefined') return;

  const isAr = appState.currentLang === 'ar';
  const prayers = AGPEYA_FULL;

  // Render Horizontal Hour Tabs with 3D Glass Cards
  hoursNav.innerHTML = prayers.map(h => {
    const isActive = h.id === appState.spiritual.selectedAgpeyaHour;
    return `
      <button 
        onclick="selectAgpeyaHour('${h.id}')"
        class="px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-2 ${
          isActive 
            ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/20 scale-105 border border-amber-600' 
            : 'bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-900 shadow-sm'
        }"
      >
        <span class="text-base">${h.symbol}</span>
        <span>${isAr ? h.name_ar : h.name_en}</span>
      </button>
    `;
  }).join('');

  // Active Prayer
  const h = prayers.find(x => x.id === appState.spiritual.selectedAgpeyaHour) || prayers[0];
  const mode = appState.spiritual.agpeyaMode || 'tabbed';
  const slideIdx = appState.spiritual.agpeyaSlideIdx || 0;
  const currentSlide = h.slides && h.slides[slideIdx] ? h.slides[slideIdx] : (h.slides ? h.slides[0] : null);

  content.innerHTML = `
    <div class="space-y-6">
      
      <!-- Hour Header Banner with 3D Glass Styling -->
      <div class="glass-panel-amber rounded-3xl p-5 sm:p-7 shadow-md flex flex-col md:flex-row items-center justify-between gap-5">
        <div class="flex items-center gap-4 text-center md:text-right">
          <div class="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-300 text-amber-900 flex items-center justify-center text-3xl shadow-inner flex-shrink-0 icon-3d">
            ${h.symbol}
          </div>
          <div>
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-[10px] font-black tracking-wide uppercase border border-amber-300">
                ${isAr ? 'صلوات السواعي القبطية' : 'Canonical Hours'}
              </span>
              <span class="text-xs text-amber-700 font-bold">
                ${h.psalms ? h.psalms.length + ' مزموراً' : ''}
              </span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-black text-amber-950 mt-1">${isAr ? h.name_ar : h.name_en}</h3>
            <p class="text-xs sm:text-sm text-amber-800 leading-relaxed mt-1 font-serif">${h.theme || ''}</p>
          </div>
        </div>

        <!-- Mode Toggle (Tabbed vs Continuous vs Slide) -->
        <div class="flex items-center gap-2 flex-wrap justify-center">
          <div class="p-1.5 bg-white/90 backdrop-blur-md border border-amber-200 rounded-2xl flex items-center gap-1 text-xs font-bold shadow-sm">
            <button 
              onclick="setAgpeyaMode('tabbed')" 
              class="px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${mode === 'tabbed' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
              title="عرض الأقسام الكنسية كـ تبويبات مركزة"
            >
              <span>📑</span>
              <span>عرض التبويبات</span>
            </button>
            <button 
              onclick="setAgpeyaMode('continuous')" 
              class="px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${mode === 'continuous' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
              title="القراءة المتصلة لجميع الصلوات"
            >
              <span>📜</span>
              <span>قراءة متصلة</span>
            </button>
            <button 
              onclick="setAgpeyaMode('slide')" 
              class="px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${mode === 'slide' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
              title="عرض الشرائح الكنسي"
            >
              <span>📽️</span>
              <span>شرائح كنسية</span>
            </button>
          </div>

          <!-- Font Scaling Controls -->
          <div class="flex items-center gap-1 bg-white/90 border border-slate-200 rounded-2xl p-1 shadow-sm">
            <button onclick="adjustAgpeyaFontSize(2)" class="px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 text-xs font-bold" title="تكبير الخط">
              A+
            </button>
            <button onclick="adjustAgpeyaFontSize(-2)" class="px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 text-xs font-bold" title="تصغير الخط">
              A-
            </button>
          </div>
        </div>
      </div>

      <!-- Content Mode Router -->
      ${mode === 'tabbed' 
        ? renderAgpeyaTabbedView(h, isAr) 
        : (mode === 'slide' ? renderAgpeyaSlideView(h, slideIdx, currentSlide, isAr) : renderAgpeyaContinuousView(h, isAr))}

    </div>
  `;
}

// -------------------------------------------------------------
// A) TABBED AGPEYA VIEW (الأجبية بنظام التبويبات الكنسية الذكية)
// -------------------------------------------------------------

function getAgpeyaLiturgicalTabs(h, isAr) {
  return [
    { id: 'intro', name: isAr ? 'صلاة الابتداء والشكر' : 'Opening & Thanksgiving', icon: '🕊️' },
    { id: 'hour', name: isAr ? 'صلاة الساعة' : 'Hour Prayer', icon: '🔔' },
    { id: 'psalms', name: isAr ? `المزامير (${(h.psalms || []).length})` : `Psalms (${(h.psalms || []).length})`, icon: '📜' },
    { id: 'gospel', name: isAr ? 'الإنجيل المقدس' : 'Holy Gospel', icon: '✝️' },
    { id: 'troparia', name: isAr ? `القطع والطلبات (${(h.troparia || []).length})` : `Troparia (${(h.troparia || []).length})`, icon: '🕯️' },
    { id: 'kyrie', name: isAr ? 'كيرياليسون (41)' : 'Kyrie Eleison (41x)', icon: '📿' },
    { id: 'creed', name: isAr ? 'التقديسات والإيمان' : 'Trisagion & Creed', icon: '⛪' },
    { id: 'absolution', name: isAr ? 'التحليل المبارك' : 'Absolution', icon: '🕊️' },
    { id: 'conclusion', name: isAr ? 'الطلبة الجامعة والختام' : 'Conclusion & Blessing', icon: '👑' }
  ];
}

function renderAgpeyaTabbedView(prayer, isAr) {
  const fSize = appState.spiritual.agpeyaFontSize || 19;
  const activeTab = appState.spiritual.agpeyaActiveTab || 'intro';
  const tabs = getAgpeyaLiturgicalTabs(prayer, isAr);
  const currentTabIdx = Math.max(0, tabs.findIndex(t => t.id === activeTab));
  const currentTabObj = tabs[currentTabIdx] || tabs[0];

  const prevTabObj = currentTabIdx > 0 ? tabs[currentTabIdx - 1] : null;
  const nextTabObj = currentTabIdx < tabs.length - 1 ? tabs[currentTabIdx + 1] : null;

  return `
    <div class="space-y-6" style="font-size: ${fSize}px;">
      
      <!-- 3D Glass Tab Navigation Bar -->
      <div class="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-2.5 shadow-sm sticky top-16 z-30">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 max-w-full">
          ${tabs.map((tab, idx) => {
            const isActive = tab.id === activeTab;
            return `
              <button 
                onclick="selectAgpeyaTab('${tab.id}')"
                class="px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive 
                    ? 'bg-amber-700 text-white shadow-md scale-105 border border-amber-600' 
                    : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border border-slate-200'
                }"
              >
                <span>${tab.icon}</span>
                <span>${tab.name}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Active Tab Liturgical Content Card -->
      <article class="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 card-3d">
        
        <!-- Tab Content Inner Router -->
        ${renderActiveAgpeyaTabContent(activeTab, prayer, isAr, fSize)}

        <!-- Bottom Step-by-Step Navigation Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 mt-8">
          ${prevTabObj ? `
            <button 
              onclick="selectAgpeyaTab('${prevTabObj.id}')"
              class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 border border-slate-300 shadow-sm"
            >
              <span>❮</span>
              <span>السابق: ${prevTabObj.name}</span>
            </button>
          ` : `<div></div>`}

          <span class="text-xs text-slate-400 font-bold">
            قسم ${currentTabIdx + 1} من ${tabs.length}
          </span>

          ${nextTabObj ? `
            <button 
              onclick="selectAgpeyaTab('${nextTabObj.id}')"
              class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-900/20 border border-amber-600"
            >
              <span>التالي: ${nextTabObj.name}</span>
              <span>❯</span>
            </button>
          ` : `
            <button 
              onclick="selectAgpeyaTab('intro')"
              class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>✓ أتممت الصلاة بنعمة الله</span>
            </button>
          `}
        </div>

      </article>

    </div>
  `;
}

function renderActiveAgpeyaTabContent(activeTab, prayer, isAr, fSize) {
  if (activeTab === 'intro') {
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-amber-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🕊️</span>
            <div>
              <h4 class="text-lg sm:text-xl font-black text-amber-950">صلاة الابتداء وصلاة الشكر والمزمور الخمسون</h4>
              <p class="text-xs text-amber-800">افتتاح صلوات السواعي بالصلاة الربانية ورسم الصليب</p>
            </div>
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black border border-amber-200">
            البداية الكنسية
          </span>
        </div>

        <!-- 1. Sign of the Cross & Our Father -->
        <div class="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
          <p class="text-amber-950 font-black text-base text-center">
            باسم الآب والابن والروح القدس، الإله الواحد. آمين.
          </p>
          <p class="text-amber-900 font-serif leading-loose text-justify">
            ${prayer.intro || 'يا رب ارحم، يا رب ارحم، يا رب بارك. آمين. المجد للآب والابن والروح القدس، الآن وكل أوان وإلى دهر الدهور كلها. آمين.'}
          </p>
          <div class="p-3 bg-white/90 rounded-xl border border-amber-200 text-center font-serif text-amber-950 leading-loose">
            ${prayer.our_father || 'أبانا الذي في السموات. ليتقدس اسمك. ليأت ملكوتك. لتكن مشيئتك. كما في السماء كذلك على الأرض. خبزنا الذي للغد أعطنا اليوم. واغفر لنا ذنوبنا كما نغفر نحن أيضا للمذنبين إلينا. ولا تدخلنا في تجربة. لكن نجنا من الشرير. بالمسيح يسوع ربنا لأن لك الملك والقوة والمجد إلى الأبد. آمين.'}
          </div>
        </div>

        <!-- 2. Prayer of Thanksgiving -->
        <div class="space-y-3">
          <h5 class="text-base font-black text-amber-900 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span>صلاة الشكر الأرثوذكسية</span>
          </h5>
          <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify p-5 bg-[#faf8f5] rounded-2xl border border-amber-100">
            ${prayer.thanksgiving}
          </div>
        </div>

        <!-- 3. Psalm 50 -->
        <div class="space-y-3">
          <h5 class="text-base font-black text-amber-900 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span>المزمور الخمسون (ارحمني يا الله كعظيم رحمتك)</span>
          </h5>
          <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify p-5 bg-[#faf8f5] rounded-2xl border border-amber-100">
            ${prayer.psalm50}
          </div>
        </div>
      </div>
    `;
  }

  if (activeTab === 'hour') {
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-amber-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🔔</span>
            <div>
              <h4 class="text-lg sm:text-xl font-black text-amber-950">${prayer.hour_prayer_title || 'صلاة الساعة المباركة'}</h4>
              <p class="text-xs text-amber-800">التأمل الخاشع في نعمة هذه الساعة ومجد الفداء</p>
            </div>
          </div>
        </div>

        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify p-6 bg-[#faf8f5] rounded-2xl border border-amber-100">
          ${prayer.hour_prayer}
        </div>

        ${prayer.intro_extra ? `
          <div class="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl text-slate-900 font-serif leading-loose whitespace-pre-line">
            ${prayer.intro_extra}
          </div>
        ` : ''}
      </div>
    `;
  }

  if (activeTab === 'psalms') {
    const psalms = prayer.psalms || [];
    const viewMode = appState.spiritual.agpeyaPsalmViewMode || 'single';
    const selectedIdx = Math.min(psalms.length - 1, Math.max(0, appState.spiritual.agpeyaPsalmIdx || 0));
    const currentPsalm = psalms[selectedIdx] || psalms[0];

    return `
      <div class="space-y-6">
        
        <!-- Psalms Header & View Mode Switcher -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-amber-100 pb-4">
          <div class="flex items-center gap-3 text-center sm:text-right">
            <span class="text-2xl">📜</span>
            <div>
              <h4 class="text-lg sm:text-xl font-black text-amber-950">مزامير داود النبي للساعة (${psalms.length} مزموراً)</h4>
              <p class="text-xs text-amber-800">تلاوة ترانيم الروح القدس الخاشعة</p>
            </div>
          </div>

          <div class="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
            <button 
              onclick="setAgpeyaPsalmViewMode('single')"
              class="px-3 py-1.5 rounded-lg transition-all ${viewMode === 'single' ? 'bg-amber-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}"
            >
              التركيز على مزمور واحد
            </button>
            <button 
              onclick="setAgpeyaPsalmViewMode('all')"
              class="px-3 py-1.5 rounded-lg transition-all ${viewMode === 'all' ? 'bg-amber-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}"
            >
              عرض جميع المزامير
            </button>
          </div>
        </div>

        ${viewMode === 'single' ? `
          <!-- Single Psalm Focus Mode -->
          <div class="space-y-5">
            
            <!-- Horizontal Psalm Selector Pills -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 max-w-full">
              ${psalms.map((p, idx) => `
                <button 
                  onclick="selectAgpeyaPsalm(${idx})"
                  class="px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                    idx === selectedIdx 
                      ? 'bg-amber-700 text-white shadow-md scale-105 border border-amber-600' 
                      : 'bg-slate-100 hover:bg-amber-100 text-slate-700 border border-slate-200'
                  }"
                >
                  ${p.title.replace('المزمور', 'م').substring(0, 15)}
                </button>
              `).join('')}
            </div>

            <!-- Psalm Card Display -->
            ${currentPsalm ? `
              <div class="bg-gradient-to-b from-[#fdfbf7] to-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-inner space-y-4">
                <div class="flex items-center justify-between border-b border-amber-100 pb-3">
                  <h5 class="text-lg sm:text-xl font-black text-amber-950 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-amber-600"></span>
                    <span>${currentPsalm.title}</span>
                  </h5>
                  <span class="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold">
                    ${selectedIdx + 1} من ${psalms.length}
                  </span>
                </div>

                <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text py-2">
                  ${currentPsalm.text}
                </div>

                <!-- Psalm Prev / Next Buttons -->
                <div class="flex items-center justify-between pt-4 border-t border-amber-100 text-xs font-black">
                  <button 
                    onclick="selectAgpeyaPsalm(${selectedIdx - 1})"
                    ${selectedIdx <= 0 ? 'disabled' : ''}
                    class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 transition-all flex items-center gap-1"
                  >
                    ❮ المزمور السابق
                  </button>
                  <span class="text-slate-400">هللويا</span>
                  <button 
                    onclick="selectAgpeyaPsalm(${selectedIdx + 1})"
                    ${selectedIdx >= psalms.length - 1 ? 'disabled' : ''}
                    class="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white transition-all flex items-center gap-1 shadow-sm"
                  >
                    المزمور التالي ❯
                  </button>
                </div>
              </div>
            ` : ''}

          </div>
        ` : `
          <!-- All Psalms Mode -->
          <div class="space-y-6">
            ${psalms.map((p, idx) => `
              <div class="bg-[#faf8f5] border border-amber-100 rounded-2xl p-5 sm:p-7 space-y-3">
                <div class="flex items-center justify-between border-b border-amber-200/60 pb-2">
                  <h5 class="text-base font-black text-amber-950">${p.title}</h5>
                  <span class="text-xs text-amber-700 font-bold">مزمور ${idx + 1}</span>
                </div>
                <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text">
                  ${p.text}
                </div>
              </div>
            `).join('')}
          </div>
        `}

      </div>
    `;
  }

  if (activeTab === 'gospel') {
    const g = prayer.gospel || {};
    return `
      <div class="space-y-6">
        
        <!-- Gospel Title Header -->
        <div class="text-center space-y-2 border-b border-amber-100 pb-5">
          <span class="text-4xl">✝️</span>
          <h4 class="text-2xl sm:text-3xl font-black text-amber-950">
            ${g.title || 'الإنجيل المقدس'}
          </h4>
          <p class="text-xs text-amber-800 font-serif max-w-xl mx-auto">
            ${g.intro || 'قفوا بخوف أمام الله لسماع الإنجيل المقدس. ذوكصاصي أو ثيئوس إيمون، قدوس قدوس قدوس، فصل شريف من بشارة الإنجيل...'}
          </p>
        </div>

        <!-- Gospel Body Text -->
        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text p-6 sm:p-8 bg-[#fdfbf7] rounded-3xl border border-amber-200/80 shadow-inner">
          ${g.text}
        </div>

        <!-- Gospel Benediction -->
        <div class="text-center pt-2">
          <p class="text-base font-black text-amber-900 font-serif">
            ${g.conclusion || 'والمجد لله دائماً أبدياً. آمين.'}
          </p>
        </div>

      </div>
    `;
  }

  if (activeTab === 'troparia') {
    const trop = prayer.troparia || [];
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-amber-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🕯️</span>
            <div>
              <h4 class="text-lg sm:text-xl font-black text-amber-950">القطع والتضرعات الكنسية (${trop.length} قطع)</h4>
              <p class="text-xs text-amber-800">تسابيح وطلبات الآباء القديسين</p>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          ${trop.map((tText, i) => `
            <div class="bg-[#faf8f5] border border-amber-100 rounded-2xl p-5 sm:p-6 space-y-2">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black flex items-center justify-center">
                  ${i + 1}
                </span>
                <span class="text-xs font-bold text-amber-900">
                  ${i === 0 ? 'القطعة الأولى' : (i === 1 ? 'ذوكصاباتري (المجد للآب...)' : (i === 2 ? 'كاي نين (الآن وكل أوان...)' : `القطعة ${i + 1}`))}
                </span>
              </div>
              <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text pr-8">
                ${tText}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeTab === 'kyrie') {
    const kyrieCount = appState.spiritual.kyrieCounter || 0;
    const isDone = kyrieCount >= 41;

    return `
      <div class="space-y-8 text-center py-4">
        
        <div class="space-y-2">
          <span class="text-4xl">📿</span>
          <h4 class="text-2xl sm:text-3xl font-black text-amber-950">تسبيح كيرياليسون (41 مرة)</h4>
          <p class="text-xs sm:text-sm text-amber-800 font-serif">
            تضرع يا رب ارحم 39 جلدة للسيد المسيح + الحربة + إكليل الشوك = 41 مرة
          </p>
        </div>

        <!-- 3D Bead Progress Visualizer -->
        <div class="relative w-44 h-44 mx-auto flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-8 border-amber-100/80"></div>
          <div 
            class="absolute inset-0 rounded-full border-8 border-amber-600 transition-all duration-300"
            style="clip-path: polygon(50% 50%, 50% 0%, ${Math.min(100, (kyrieCount / 41) * 100)}% 0%, 100% 100%, 0% 100%);"
          ></div>
          
          <div class="text-center z-10">
            <span class="text-4xl font-black text-amber-950">${kyrieCount}</span>
            <span class="text-xs font-bold text-slate-400 block mt-0.5">من 41</span>
          </div>
        </div>

        ${isDone ? `
          <div class="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl max-w-md mx-auto text-emerald-900 font-black text-sm animate-bounce shadow-md">
            🕊️ أتممت الـ 41 كيرياليسون بنعمة المسيح مباركاً!
          </div>
        ` : ''}

        <!-- 3D Tap Button -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onclick="tapKyrieCounter()"
            class="w-full sm:w-auto px-8 py-4 rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 active:scale-95 text-white text-base sm:text-lg font-black transition-all shadow-xl shadow-amber-900/30 flex items-center justify-center gap-3 border border-amber-500"
          >
            <span>📿</span>
            <span>اضغط للتسبيح: يا رب ارحم (${kyrieCount}/41)</span>
          </button>

          <button 
            onclick="resetKyrieCounter()"
            class="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-300"
            title="تصفير العداد"
          >
            🔄 تصفير
          </button>
        </div>

      </div>
    `;
  }

  if (activeTab === 'creed') {
    return `
      <div class="space-y-6">
        
        <!-- 1. Trisagion (الثلاث تقديسات) -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 border-b border-amber-100 pb-3">
            <span class="text-2xl">⛪</span>
            <h4 class="text-lg font-black text-amber-950">الثلاث تقديسات (أجيوس أوثيئوس)</h4>
          </div>
          <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify p-5 bg-[#faf8f5] rounded-2xl border border-amber-100">
            ${prayer.trisagion || 'قدوس الله، قدوس القوي، قدوس الحي الذي لا يموت، الذي ولد من العذراء، ارحمنا...'}
          </div>
        </div>

        <!-- 2. Nicene Creed (قانون الإيمان) -->
        <div class="space-y-3 pt-4">
          <div class="flex items-center gap-2 border-b border-amber-100 pb-3">
            <span class="text-2xl">📜</span>
            <h4 class="text-lg font-black text-amber-950">قانون الإيمان النيقاوي الأرثوذكسي</h4>
          </div>
          <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify p-6 bg-[#faf8f5] rounded-2xl border border-amber-100">
            ${prayer.creed || 'بالحقيقة نؤمن بإله واحد، الله الآب، ضابط الكل، خالق السماء والأرض، ما يُرى وما لا يُرى... وننتظر قيامة الأموات وحياة الدهر الآتي. آمين.'}
          </div>
        </div>

      </div>
    `;
  }

  if (activeTab === 'absolution') {
    const absList = prayer.absolution || [];
    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-amber-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🕊️</span>
            <div>
              <h4 class="text-lg sm:text-xl font-black text-amber-950">التحليل المبارك للساعة</h4>
              <p class="text-xs text-amber-800">بركة التحليل الكنسي ومغفرة الخطايا</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          ${absList.map((item, idx) => `
            <div class="bg-[#faf8f5] border border-amber-100 rounded-2xl p-6 space-y-3">
              <h5 class="text-base font-black text-amber-900 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                <span>${item.title || `التحليل المبارك (${idx + 1})`}</span>
              </h5>
              <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text">
                ${item.text}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeTab === 'conclusion') {
    return `
      <div class="space-y-6">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-amber-200 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">👑</span>
            <div>
              <h4 class="text-lg sm:text-xl font-black text-amber-950">طلبة آخر كل ساعة والصلاة الربانية والختام</h4>
              <p class="text-xs text-amber-800">الصلاة الجامعة الكاملة غير المنقوصة مع البركة الختامية</p>
            </div>
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black border border-amber-200">
            صلاة الآباء الدائمة
          </span>
        </div>

        <!-- 1. The Full Canonical Conclusion -->
        <div class="bg-[#faf8f5] border border-amber-200 rounded-2xl p-6 space-y-3">
          <h5 class="text-base font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>طلبة آخر كل ساعة (كاملة من "ارحمنا يا الله ثم ارحمنا")</span>
          </h5>
          <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text">
            ${prayer.conclusion}
          </div>
        </div>

        <!-- 2. The Lord's Prayer -->
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center space-y-2">
          <h5 class="text-sm font-black text-amber-900">الصلاة الربانية</h5>
          <p class="text-slate-900 font-serif leading-loose max-w-2xl mx-auto">
            ${prayer.our_father || 'أبانا الذي في السموات. ليتقدس اسمك. ليأت ملكوتك. لتكن مشيئتك. كما في السماء كذلك على الأرض. خبزنا الذي للغد أعطنا اليوم. واغفر لنا ذنوبنا كما نغفر نحن أيضا للمذنبين إلينا. ولا تدخلنا في تجربة. لكن نجنا من الشرير. بالمسيح يسوع ربنا لأن لك الملك والقوة والمجد إلى الأبد. آمين.'}
          </p>
        </div>

        <!-- 3. Final Priestly Blessing -->
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5 text-center space-y-2">
          <h5 class="text-sm font-black text-amber-950">البركة الختامية الكنسية</h5>
          <p class="text-slate-800 font-serif leading-loose text-xs sm:text-sm max-w-2xl mx-auto">
            ${prayer.closing || 'حللونا وباركوا علينا، آمين. يا ربنا يسوع المسيح، خلصنا وارحمنا، واغفر لنا خطايانا الكثيرة، برأفتك يا محب البشر الصالح. بصلوات وشفاعات سيدتنا كلنا والدة الإله القديسة الطاهرة مريم، وجميع مصاف الملائكة والقديسين والشهداء والأبرار، ارحمنا وخلص نفوسنا. آمين.'}
          </p>
        </div>

      </div>
    `;
  }

  return '';
}

function selectAgpeyaTab(tabId) {
  appState.spiritual.agpeyaActiveTab = tabId;
  renderAgpeya();
  saveState();
  const el = document.getElementById('agpeya-hour-content');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function selectAgpeyaPsalm(idx) {
  const h = AGPEYA_FULL.find(x => x.id === appState.spiritual.selectedAgpeyaHour);
  if (!h || !h.psalms) return;
  if (idx < 0) idx = 0;
  if (idx >= h.psalms.length) idx = h.psalms.length - 1;
  appState.spiritual.agpeyaPsalmIdx = idx;
  renderAgpeya();
  saveState();
}

function setAgpeyaPsalmViewMode(mode) {
  appState.spiritual.agpeyaPsalmViewMode = mode;
  renderAgpeya();
  saveState();
}

function selectAgpeyaHour(hourId) {
  appState.spiritual.selectedAgpeyaHour = hourId;
  appState.spiritual.agpeyaActiveTab = 'intro';
  appState.spiritual.agpeyaSlideIdx = 0;
  appState.spiritual.agpeyaPsalmIdx = 0;
  renderAgpeya();
  saveState();
}

function setAgpeyaMode(mode) {
  appState.spiritual.agpeyaMode = mode;
  renderAgpeya();
  saveState();
}

function adjustAgpeyaFontSize(delta) {
  let size = (appState.spiritual.agpeyaFontSize || 19) + delta;
  if (size < 14) size = 14;
  if (size > 32) size = 32;
  appState.spiritual.agpeyaFontSize = size;
  renderAgpeya();
  saveState();
}

function tapKyrieCounter() {
  appState.spiritual.kyrieCounter = (appState.spiritual.kyrieCounter || 0) + 1;
  if (appState.spiritual.kyrieCounter === 41) {
    triggerCelebration();
  }
  renderAgpeya();
  saveState();
}

function resetKyrieCounter() {
  appState.spiritual.kyrieCounter = 0;
  renderAgpeya();
  saveState();
}

function nextAgpeyaSlide() {
  const h = AGPEYA_FULL.find(x => x.id === appState.spiritual.selectedAgpeyaHour);
  if (h && appState.spiritual.agpeyaSlideIdx < h.slides.length - 1) {
    appState.spiritual.agpeyaSlideIdx++;
    renderAgpeya();
    saveState();
  }
}

function prevAgpeyaSlide() {
  if (appState.spiritual.agpeyaSlideIdx > 0) {
    appState.spiritual.agpeyaSlideIdx--;
    renderAgpeya();
    saveState();
  }
}

function jumpToAgpeyaSlide(idx) {
  appState.spiritual.agpeyaSlideIdx = idx;
  renderAgpeya();
  saveState();
}

function renderAgpeyaSlideView(prayer, slideIdx, currentSlide, isAr) {
  const total = prayer.slides.length;
  return `
    <div class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
      
      <!-- Slide Control Top Bar -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <span class="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
          📽️ شريحة ${slideIdx + 1} من ${total}
        </span>

        <div class="flex items-center gap-2">
          <button 
            onclick="prevAgpeyaSlide()" 
            ${slideIdx === 0 ? 'disabled' : ''}
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 text-xs font-bold transition-all"
          >
            ❮ السابقة
          </button>
          <button 
            onclick="nextAgpeyaSlide()" 
            ${slideIdx === total - 1 ? 'disabled' : ''}
            class="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-sm"
          >
            التالية ❯
          </button>
        </div>
      </div>

      <!-- Slide Projector Display -->
      <div class="min-h-[280px] sm:min-h-[360px] flex items-center justify-center p-6 sm:p-10 bg-[#faf8f5] border-2 border-amber-100 rounded-2xl text-center shadow-inner">
        <div class="max-w-3xl space-y-4">
          ${(currentSlide ? currentSlide.paras : []).map(p => `
            <p class="text-lg sm:text-2xl font-black text-slate-900 leading-relaxed font-serif">
              ${p}
            </p>
          `).join('')}
        </div>
      </div>

      <!-- Slide Thumbnails Slider -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1">
        ${prayer.slides.map((s, idx) => `
          <button 
            onclick="jumpToAgpeyaSlide(${idx})"
            class="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              idx === slideIdx ? 'bg-amber-700 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }"
          >
            ${idx + 1}
          </button>
        `).join('')}
      </div>

    </div>
  `;
}

function renderAgpeyaContinuousView(prayer, isAr) {
  const fSize = appState.spiritual.agpeyaFontSize || 19;
  const kyrieCount = appState.spiritual.kyrieCounter || 0;
  
  return `
    <div class="space-y-6" style="font-size: ${fSize}px;">
      
      <!-- Font Resizer & Quick Navigation Bar -->
      <div class="bg-white border border-slate-200 rounded-2xl p-3 px-4 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30 backdrop-blur-md bg-white/95">
        <div class="flex items-center gap-1.5 overflow-x-auto text-[11px] sm:text-xs font-bold text-slate-700 py-1 max-w-full">
          <a href="#sec-intro" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">الابتداء</a>
          <a href="#sec-thanksgiving" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">الشكر</a>
          <a href="#sec-psalm50" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">المزمور 50</a>
          <a href="#sec-hour-prayer" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">صلاة الساعة</a>
          <a href="#sec-psalms" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">المزامير (${prayer.psalms.length})</a>
          <a href="#sec-gospel" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">الإنجيل</a>
          <a href="#sec-troparia" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">القطع (${prayer.troparia.length})</a>
          <a href="#sec-kyrie" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">كيرياليسون (41)</a>
          <a href="#sec-trisagion" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">التقديسات</a>
          ${prayer.creed ? '<a href="#sec-creed" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">قانون الإيمان</a>' : ''}
          <a href="#sec-absolution" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">التحليل</a>
          <a href="#sec-conclusion" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">طلبة كل ساعة</a>
          <a href="#sec-closing" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 whitespace-nowrap">الختام والبركة</a>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button onclick="adjustAgpeyaFontSize(2)" class="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300">
            A+ تكبير
          </button>
          <button onclick="adjustAgpeyaFontSize(-2)" class="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300">
            A- تصغير
          </button>
        </div>
      </div>

      <!-- 1. Opening Prayer -->
      <section id="sec-intro" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-amber-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>صلاة الابتداء والصلاة الربانية</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">افتتاح الصلاة</span>
        </div>
        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify">
          ${prayer.intro}
        </div>
      </section>

      <!-- 2. Thanksgiving Prayer -->
      <section id="sec-thanksgiving" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-amber-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>صلاة الشكر الكنسية</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">مقدمة كل ساعة</span>
        </div>
        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify">
          ${prayer.thanksgiving}
        </div>
      </section>

      <!-- 3. Psalm 50 -->
      <section id="sec-psalm50" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-amber-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>المزمور الخمسون (مزمور التوبة)</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">داود النبي</span>
        </div>
        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify">
          ${prayer.psalm50}
        </div>
      </section>

      <!-- 4. Hour Specific Prayer -->
      <section id="sec-hour-prayer" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-amber-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>${prayer.hour_prayer_title || 'صلاة الساعة المباركة'}</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">الصلوات التمهيدية</span>
        </div>
        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify">
          ${prayer.hour_prayer}
        </div>
      </section>

      <!-- 5. Psalms Collection -->
      <section id="sec-psalms" class="space-y-4">
        <div class="bg-gradient-to-r from-amber-100/80 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4 px-6 flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📖</span>
            <div>
              <h4 class="text-lg font-black text-amber-950">المزامير المقررة للساعة</h4>
              <p class="text-xs text-amber-800">${prayer.psalms.length} مزموراً ترتيلاً كاملاً بنعمة المسيح</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          ${prayer.psalms.map((p, idx) => `
            <details class="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm open:shadow-md transition-all" open>
              <summary class="flex items-center justify-between cursor-pointer list-none select-none font-bold text-amber-950 text-sm sm:text-base border-b border-transparent group-open:border-amber-100 group-open:pb-3">
                <span class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                    ${idx + 1}
                  </span>
                  <span>${p.title}</span>
                </span>
                <span class="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <div class="pt-4 text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text">
                ${p.text}
              </div>
            </details>
          `).join('')}
        </div>
      </section>

      <!-- 6. Gospel Section -->
      <section id="sec-gospel" class="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-10 shadow-md space-y-5">
        <div class="text-center space-y-2 border-b border-amber-100 pb-5">
          <span class="text-3xl">✝️</span>
          <h4 class="text-xl sm:text-2xl font-black text-amber-950">
            ${prayer.gospel.title}
          </h4>
          <p class="text-xs text-amber-800 leading-relaxed max-w-xl mx-auto font-serif">
            ${prayer.gospel.intro || 'قفوا بخوف أمام الله لسماع الإنجيل المقدس...'}
          </p>
        </div>

        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text text-base sm:text-lg font-medium p-4 sm:p-6 bg-[#fbf9f5] rounded-2xl border border-amber-100/70">
          ${prayer.gospel.text}
        </div>

        <div class="text-center pt-2 border-t border-amber-100">
          <p class="text-sm font-black text-amber-900 font-serif">
            ${prayer.gospel.conclusion || 'والمجد لله دائماً أبدياً. آمين.'}
          </p>
        </div>
      </section>

      <!-- 7. Troparia (القطع) -->
      <section id="sec-troparia" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div class="flex items-center justify-between border-b border-amber-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>قطع الساعة والتراتيل الروحية (${prayer.troparia.length} قطع)</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">القطع الكنسية</span>
        </div>

        <div class="space-y-4">
          ${prayer.troparia.map((tr, idx) => `
            <div class="p-4 sm:p-5 rounded-2xl bg-[#faf8f5] border border-amber-100 space-y-2">
              <span class="text-xs font-black text-amber-800 inline-block px-2.5 py-0.5 rounded-md bg-amber-100/70">
                القطعة (${idx + 1})
              </span>
              <p class="text-slate-900 leading-loose font-serif text-justify whitespace-pre-line">
                ${tr}
              </p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 8. Interactive Kyrie Eleison (41 Times) -->
      <section id="sec-kyrie" class="bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-100/50 border border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 text-center">
        <div class="space-y-1">
          <h4 class="text-lg sm:text-xl font-black text-amber-950">
            كيرياليسون (يا رب ارحم) ٤١ مرة
          </h4>
          <p class="text-xs text-amber-800">
            المسبحة الكنسية التفاعلية: اضغط على الزر مع كل طلبة لمتابعة العد
          </p>
        </div>

        <!-- Electronic Prayer Bead Counter -->
        <div class="flex flex-col items-center justify-center gap-3">
          <button 
            onclick="tapKyrieCounter()"
            class="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 active:scale-95 text-white font-black shadow-lg border-4 border-amber-200 flex flex-col items-center justify-center gap-1 transition-all"
          >
            <span class="text-2xl sm:text-3xl">${kyrieCount} / 41</span>
            <span class="text-[11px] font-bold opacity-90">يا رب ارحم</span>
          </button>

          <div class="flex items-center gap-2">
            <button 
              onclick="resetKyrieCounter()"
              class="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 shadow-sm transition-all"
            >
              🔄 إعادة العد
            </button>
            ${kyrieCount >= 41 ? `
              <span class="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                ✓ اكتملت التسبحة ٤١ مرة مباركاً
              </span>
            ` : ''}
          </div>
        </div>
      </section>

      <!-- 9. Trisagion (قدوس الله والثلاث تقديسات) -->
      <section id="sec-trisagion" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-amber-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>الثلاث تقديسات (قدوس الله... وقدوس قدوس قدوس رب الصباؤوت)</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">التسبيح الملائكي</span>
        </div>
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 leading-loose font-serif text-justify whitespace-pre-line">
          ${prayer.trisagion}
        </div>
      </section>

      <!-- 10. Creed (if present) -->
      ${prayer.creed ? `
        <section id="sec-creed" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-amber-100 pb-3">
            <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-amber-600"></span>
              <span>الأمانة الأرثوذكسية (قانون الإيمان المقدس)</span>
            </h4>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">قانون الإيمان</span>
          </div>
          <div class="p-5 rounded-2xl bg-[#faf7f2] border border-amber-200 text-slate-900 leading-loose font-serif text-justify">
            ${prayer.creed}
          </div>
        </section>
      ` : ''}

      <!-- 11. Absolution -->
      <section id="sec-absolution" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-amber-100 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>صلاة التحليل المبارك (${prayer.absolution.length} تحليل)</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">بركة الكنيسة</span>
        </div>
        <div class="space-y-4">
          ${prayer.absolution.map(abs => `
            <div class="p-5 rounded-2xl bg-[#faf7f2] border border-amber-200 text-slate-900 leading-loose font-serif text-justify whitespace-pre-line">
              <h5 class="text-xs font-black text-amber-900 mb-2">${abs.title}</h5>
              <p>${abs.text}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 12. Conclusion: Complete Prayer of the End of Every Hour -->
      <section id="sec-conclusion" class="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-md space-y-5">
        <div class="flex items-center justify-between border-b border-amber-200 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-600"></span>
            <span>طلبة آخر كل ساعة (كاملة غير منقوصة)</span>
          </h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">صلاة الآباء الدائمة</span>
        </div>
        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify text-base sm:text-lg p-5 bg-[#faf8f5] rounded-2xl border border-amber-100">
          ${prayer.conclusion}
        </div>
      </section>

      <!-- 13. Closing Prayer & Final Benediction -->
      <section id="sec-closing" class="bg-gradient-to-r from-amber-50 via-amber-100/60 to-orange-50 border border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-center">
        <div class="border-b border-amber-200/80 pb-3">
          <h4 class="text-base sm:text-lg font-black text-amber-950">
            الصلاة الربانية والبركة الختامية
          </h4>
          <span class="text-xs text-amber-800 font-bold">ختام صلوات السواعي الأرثوذكسية</span>
        </div>
        <div class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify max-w-2xl mx-auto p-4 bg-white/80 rounded-2xl border border-amber-200 font-medium">
          ${prayer.closing}
        </div>
      </section>

    </div>
  `;
}

function adjustAgpeyaFontSize(delta) {
  appState.spiritual.agpeyaFontSize = Math.max(14, Math.min(32, (appState.spiritual.agpeyaFontSize || 19) + delta));
  renderAgpeya();
  saveState();
}

function selectAgpeyaHour(hourId) {
  appState.spiritual.selectedAgpeyaHour = hourId;
  appState.spiritual.agpeyaSlideIdx = 0;
  renderAgpeya();
  saveState();
}

function setAgpeyaMode(mode) {
  appState.spiritual.agpeyaMode = mode;
  renderAgpeya();
  saveState();
}

function nextAgpeyaSlide() {
  const h = AGPEYA_FULL.find(x => x.id === appState.spiritual.selectedAgpeyaHour);
  if (h && appState.spiritual.agpeyaSlideIdx < h.slides.length - 1) {
    appState.spiritual.agpeyaSlideIdx++;
    renderAgpeya();
    saveState();
  }
}

function prevAgpeyaSlide() {
  if (appState.spiritual.agpeyaSlideIdx > 0) {
    appState.spiritual.agpeyaSlideIdx--;
    renderAgpeya();
    saveState();
  }
}

function jumpToAgpeyaSlide(idx) {
  appState.spiritual.agpeyaSlideIdx = idx;
  renderAgpeya();
  saveState();
}

function tapKyrieCounter() {
  appState.spiritual.kyrieCounter++;
  if (appState.spiritual.kyrieCounter === 41) {
    triggerCelebration();
  }
  renderAgpeya();
  saveState();
}


// ==========================================
// 2. THE COMPLETE HOLY BIBLE (الكتاب المقدس كامل)
// ==========================================

function renderBible() {
  const container = document.getElementById('bible-content');
  if (!container || typeof FULL_BIBLE_DATA === 'undefined') return;

  const isAr = appState.currentLang === 'ar';
  const books = FULL_BIBLE_DATA.books || [];
  const currentBookId = Number(appState.spiritual.bibleBookId) || 43; // John
  const currentChapter = Number(appState.spiritual.bibleChapter) || 1;
  const testamentFilter = appState.spiritual.bibleTestament || 'all';
  const currentBook = FULL_BIBLE_DATA.getBook(currentBookId) || books[0];

  // Filter books by testament
  let visibleBooks = books;
  if (testamentFilter === 'OT') visibleBooks = FULL_BIBLE_DATA.ot_books;
  else if (testamentFilter === 'NT') visibleBooks = FULL_BIBLE_DATA.nt_books;

  // Retrieve verses for the chapter
  const verses = FULL_BIBLE_DATA.getChapter(currentBookId, currentChapter);

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Bible Top Header & Search Bar -->
      <div class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50 border border-amber-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl">📜</span>
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-amber-950">
                ${t('bible_title')}
              </h3>
              <p class="text-xs text-amber-800">
                ${t('bible_desc')}
              </p>
            </div>
          </div>

          <!-- Testament Filter Tabs -->
          <div class="flex items-center p-1 bg-white border border-amber-200 rounded-xl shadow-sm text-xs font-bold">
            <button 
              onclick="setBibleTestamentFilter('all')" 
              class="px-3 py-1.5 rounded-lg transition-all ${testamentFilter === 'all' ? 'bg-amber-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}"
            >
              ${t('testament_all')}
            </button>
            <button 
              onclick="setBibleTestamentFilter('OT')" 
              class="px-3 py-1.5 rounded-lg transition-all ${testamentFilter === 'OT' ? 'bg-amber-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}"
            >
              ${t('testament_ot')}
            </button>
            <button 
              onclick="setBibleTestamentFilter('NT')" 
              class="px-3 py-1.5 rounded-lg transition-all ${testamentFilter === 'NT' ? 'bg-amber-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}"
            >
              ${t('testament_nt')}
            </button>
          </div>
        </div>

        <!-- Search Input with Live Results -->
        <div class="relative">
          <input 
            type="text" 
            id="bible-search-input"
            value="${appState.spiritual.bibleSearchQuery || ''}"
            placeholder="${t('bible_search_placeholder')}"
            onkeydown="if(event.key==='Enter') executeBibleSearch()"
            class="w-full bg-white border border-amber-300 text-slate-900 text-xs sm:text-sm font-bold rounded-2xl px-4 py-3 pl-12 pr-12 shadow-inner focus:ring-2 focus:ring-amber-500"
          >
          <button 
            onclick="executeBibleSearch()" 
            class="absolute left-3 top-2.5 px-3 py-1 bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm"
          >
            🔍 بحث
          </button>
        </div>

        <!-- Search Results Dropdown / Panel if query active -->
        <div id="bible-search-results-panel"></div>

      </div>

      <!-- Book & Chapter Selectors Bar -->
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
        
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <!-- Book Selector Dropdown -->
          <div class="flex items-center gap-2 w-full md:w-auto">
            <span class="text-xs font-bold text-slate-700 whitespace-nowrap">${t('select_book')}</span>
            <select 
              id="bible-book-select" 
              onchange="onBibleBookChange(event)"
              class="w-full md:w-80 bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500 shadow-sm"
            >
              ${visibleBooks.map(b => `
                <option value="${b.id}" ${b.id === currentBookId ? 'selected' : ''}>
                  ${b.id}. ${b.name_ar} - ${b.name_en} (${b.chapters} أصحاح)
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Font Scaling & Info -->
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-500 font-bold">
              ${currentBook ? (isAr ? currentBook.name_ar : currentBook.name_en) : ''} - الأصحاح ${currentChapter}
            </span>
            <div class="flex items-center gap-1">
              <button onclick="adjustBibleFontSize(2)" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200">
                A+ تكبير
              </button>
              <button onclick="adjustBibleFontSize(-2)" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200">
                A- تصغير
              </button>
            </div>
          </div>

        </div>

        <!-- Chapter Pill Badges -->
        <div class="pt-2 border-t border-slate-100">
          <div class="flex items-center gap-1.5 overflow-x-auto pb-2">
            ${Array.from({ length: currentBook ? currentBook.chapters : 1 }, (_, i) => i + 1).map(ch => `
              <button 
                onclick="selectBibleChapter(${ch})"
                class="min-w-[36px] h-9 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center ${
                  ch === currentChapter ? 'bg-amber-700 text-white shadow-md scale-105' : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
                }"
              >
                ${ch}
              </button>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- Chapter Reader Display (Every Single Verse) -->
      <article class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-6">
        
        <!-- Chapter Heading -->
        <div class="text-center space-y-1 border-b border-amber-100 pb-5">
          <h2 class="text-2xl sm:text-3xl font-black text-amber-950">
            ${currentBook ? currentBook.name_ar : ''} : الأصحاح ${currentChapter}
          </h2>
          <p class="text-xs text-amber-800">
            ${currentBook ? currentBook.name_en : ''} Chapter ${currentChapter} • ${verses.length} آية
          </p>
        </div>

        <!-- Verses List -->
        <div class="space-y-4" style="font-size: ${appState.spiritual.bibleFontSize || 19}px;">
          ${verses.length === 0 ? `
            <div class="text-center py-12 text-slate-400">
              <span class="text-4xl">📖</span>
              <p class="mt-2 text-sm">جاري تحميل آيات الأصحاح...</p>
            </div>
          ` : verses.map(v => `
            <div class="flex items-start gap-3 p-2 rounded-2xl hover:bg-amber-50/60 transition-colors group">
              <span class="w-8 h-8 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center text-xs font-black flex-shrink-0 mt-1 shadow-sm">
                ${v.v}
              </span>
              <p class="text-slate-900 leading-loose font-serif flex-1 select-text">
                ${v.t}
              </p>
            </div>
          `).join('')}
        </div>

        <!-- Next / Prev Chapter Controls -->
        <div class="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
          <button 
            onclick="prevBibleChapter()" 
            ${currentChapter <= 1 ? 'disabled' : ''}
            class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 text-xs font-bold transition-all"
          >
            ❮ الأصحاح السابق
          </button>
          <span class="text-xs text-slate-400 font-bold">
            ${currentChapter} من ${currentBook ? currentBook.chapters : 1}
          </span>
          <button 
            onclick="nextBibleChapter()" 
            ${currentBook && currentChapter >= currentBook.chapters ? 'disabled' : ''}
            class="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-sm"
          >
            الأصحاح التالي ❯
          </button>
        </div>

      </article>

    </div>
  `;
}

function onBibleBookChange(e) {
  appState.spiritual.bibleBookId = Number(e.target.value);
  appState.spiritual.bibleChapter = 1;
  renderBible();
  saveState();
}

function selectBibleChapter(ch) {
  appState.spiritual.bibleChapter = Number(ch);
  renderBible();
  saveState();
}

function setBibleTestamentFilter(testament) {
  appState.spiritual.bibleTestament = testament;
  renderBible();
  saveState();
}

function nextBibleChapter() {
  const currentBook = FULL_BIBLE_DATA.getBook(appState.spiritual.bibleBookId);
  if (currentBook && appState.spiritual.bibleChapter < currentBook.chapters) {
    appState.spiritual.bibleChapter++;
    renderBible();
    saveState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function prevBibleChapter() {
  if (appState.spiritual.bibleChapter > 1) {
    appState.spiritual.bibleChapter--;
    renderBible();
    saveState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function adjustBibleFontSize(delta) {
  appState.spiritual.bibleFontSize = Math.max(14, Math.min(32, (appState.spiritual.bibleFontSize || 19) + delta));
  renderBible();
  saveState();
}

function executeBibleSearch() {
  const input = document.getElementById('bible-search-input');
  if (!input) return;
  const q = input.value.trim();
  appState.spiritual.bibleSearchQuery = q;
  const panel = document.getElementById('bible-search-results-panel');
  if (!panel) return;

  if (q.length < 2) {
    panel.innerHTML = `<div class="p-3 bg-amber-50 rounded-xl text-xs text-amber-800">يرجى إدخال كلمتين على الأقل للبحث.</div>`;
    return;
  }

  const results = FULL_BIBLE_DATA.search(q, 30);
  if (results.length === 0) {
    panel.innerHTML = `<div class="p-4 bg-white border border-amber-200 rounded-2xl text-xs text-slate-600 text-center">لم يتم العثور على نتائج للكلمة "${q}". حاول البحث بكلمة أخرى أو بدون تشكيل.</div>`;
    return;
  }

  panel.innerHTML = `
    <div class="bg-white border border-amber-200 rounded-2xl p-4 shadow-lg space-y-3 max-h-96 overflow-y-auto">
      <div class="flex items-center justify-between border-b pb-2">
        <span class="text-xs font-bold text-amber-950">نتائج البحث (${results.length}):</span>
        <button onclick="document.getElementById('bible-search-results-panel').innerHTML=''" class="text-xs text-slate-400 hover:text-slate-700">إغلاق ✕</button>
      </div>
      <div class="space-y-2">
        ${results.map(r => `
          <div 
            onclick="jumpToBibleVerse(${r.bookId}, ${r.chapter})"
            class="p-3 rounded-xl bg-amber-50/50 hover:bg-amber-100/80 cursor-pointer transition-all border border-amber-200/50 text-right space-y-1"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-900">${r.bookName} ${r.chapter}: ${r.verse}</span>
              <span class="text-[10px] text-amber-700">انتقال للأصحاح ❯</span>
            </div>
            <p class="text-xs text-slate-800 leading-relaxed font-serif">${r.text}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function jumpToBibleVerse(bookId, chapter) {
  appState.spiritual.bibleBookId = bookId;
  appState.spiritual.bibleChapter = chapter;
  renderBible();
  saveState();
  window.scrollTo({ top: 300, behavior: 'smooth' });
}



// ==========================================
// 3. COMPLETE LIFE OF PRAYER BOOK (حياة الصلاة كامل)
// Interactive 3-Tab Controller: Reader • Table of Contents Grid • Quick Jump & Search
// ==========================================

function switchBookTab(tabKey) {
  appState.spiritual.bookActiveTab = tabKey;
  renderBookOfPrayer();
  saveState();
  const el = document.getElementById('book-reader-content');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderBookOfPrayer() {
  const container = document.getElementById('book-reader-content');
  if (!container || typeof BOOK_PRAYER_FULL === 'undefined') return;

  const data = BOOK_PRAYER_FULL;
  const currentPage = appState.spiritual.bookPage || 1;
  const activeTab = appState.spiritual.bookActiveTab || 'reader';
  const fontSize = appState.spiritual.bookFontSize || 18;

  const pageObj = data.pages.find(p => p.page === currentPage) || data.pages[0];

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Book Banner with 3D Glass Styling -->
      <div class="glass-panel-amber rounded-3xl p-5 sm:p-7 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-center md:text-right">
          <div class="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-300 text-amber-900 flex items-center justify-center text-3xl shadow-inner flex-shrink-0 icon-3d">
            📖
          </div>
          <div>
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-[10px] font-black uppercase border border-amber-300">
                أمهات الكتب الروحية
              </span>
              <span class="text-xs text-amber-700 font-bold">${data.total_pages} صفحة كاملة</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-black text-amber-950 mt-1">${data.title_ar}</h3>
            <p class="text-xs sm:text-sm text-amber-800 leading-relaxed font-serif">${data.author_ar}</p>
          </div>
        </div>

        <!-- Book Tabs Switcher (Reader vs TOC vs Search) -->
        <div class="flex items-center p-1.5 bg-white/90 backdrop-blur-md border border-amber-200 rounded-2xl shadow-sm text-xs font-bold gap-1 flex-wrap justify-center">
          <button 
            onclick="switchBookTab('reader')"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'reader' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
          >
            <span>📖</span>
            <span>قارئ الكتاب</span>
          </button>
          <button 
            onclick="switchBookTab('toc')"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'toc' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
          >
            <span>📑</span>
            <span>فهرس الفصول</span>
          </button>
          <button 
            onclick="switchBookTab('quick')"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'quick' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
          >
            <span>🔖</span>
            <span>البحث والانتقال</span>
          </button>
        </div>
      </div>

      <!-- Dynamic Tab View -->
      ${activeTab === 'reader' ? renderBookPrayerReader(data, pageObj, currentPage, fontSize) : ''}
      ${activeTab === 'toc' ? renderBookPrayerToc(data, currentPage) : ''}
      ${activeTab === 'quick' ? renderBookPrayerQuickSearch(data, currentPage) : ''}

    </div>
  `;
}

function renderBookPrayerReader(data, pageObj, currentPage, fontSize) {
  // Find current chapter from TOC
  let currentChapterTitle = 'مقدمة الكتاب';
  for (let i = 0; i < data.toc.length; i++) {
    if (currentPage >= data.toc[i].page) {
      currentChapterTitle = data.toc[i].title;
    }
  }

  return `
    <div class="space-y-6">
      
      <!-- Sub-Bar: Chapter Quick Dropdown & Font Controls -->
      <div class="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div class="flex items-center gap-2 w-full md:w-auto">
          <span class="text-xs font-bold text-slate-700 whitespace-nowrap">الفصل:</span>
          <select 
            onchange="jumpPrayerPage(event.target.value)"
            class="w-full md:w-96 bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500 shadow-sm"
          >
            ${data.toc.map(item => `
              <option value="${item.page}" ${currentPage >= item.page && (data.toc[data.toc.indexOf(item)+1] ? currentPage < data.toc[data.toc.indexOf(item)+1].page : true) ? 'selected' : ''}>
                ص ${item.page}: ${item.title}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Font Scaling & Page Jump Box -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 bg-slate-100 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 border border-slate-200">
            <span>صفحة</span>
            <input 
              type="number" 
              min="1" 
              max="${data.total_pages}" 
              value="${currentPage}"
              onchange="jumpPrayerPage(this.value)"
              class="w-14 bg-white border border-slate-300 rounded-lg px-1.5 py-0.5 text-center font-black text-amber-900 focus:ring-2 focus:ring-amber-500"
            >
            <span>من ${data.total_pages}</span>
          </div>

          <div class="flex items-center gap-1">
            <button onclick="adjustBookFontSize(2)" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200">
              A+ تكبير
            </button>
            <button onclick="adjustBookFontSize(-2)" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200">
              A- تصغير
            </button>
          </div>
        </div>

      </div>

      <!-- Daylight Paper Reading Card -->
      <article class="bg-[#fcfbfa] border-2 border-amber-200/80 rounded-3xl p-6 sm:p-12 shadow-md space-y-6 card-3d">
        
        <!-- Header Info -->
        <div class="flex items-center justify-between border-b border-amber-200/60 pb-4">
          <div class="space-y-0.5">
            <span class="text-xs text-amber-700 font-bold">كتاب حياة الصلاة الأرثوذكسي</span>
            <h4 class="text-base sm:text-lg font-black text-amber-950">${currentChapterTitle}</h4>
          </div>
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-200">
            صفحة ${currentPage}
          </span>
        </div>

        <!-- Page Text Body -->
        <div 
          class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text min-h-[420px] py-4"
          style="font-size: ${fontSize}px; line-height: 2.3;"
        >
          ${pageObj ? pageObj.text : 'جاري تحميل الصفحة...'}
        </div>

        <!-- Page Bottom Pagination -->
        <div class="flex items-center justify-between pt-6 border-t border-amber-200/60 text-xs font-black">
          <button 
            onclick="prevPrayerPage()"
            ${currentPage <= 1 ? 'disabled' : ''}
            class="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 transition-all flex items-center gap-2 border border-slate-300 shadow-sm"
          >
            <span>❮</span>
            <span>الصفحة السابقة</span>
          </button>

          <span class="text-slate-400 font-bold">
            ${currentPage} / ${data.total_pages}
          </span>

          <button 
            onclick="nextPrayerPage()"
            ${currentPage >= data.total_pages ? 'disabled' : ''}
            class="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white transition-all flex items-center gap-2 shadow-md shadow-amber-900/20 border border-amber-600"
          >
            <span>الصفحة التالية</span>
            <span>❯</span>
          </button>
        </div>

      </article>

    </div>
  `;
}

function renderBookPrayerToc(data, currentPage) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between border-b border-amber-100 pb-3">
        <div class="flex items-center gap-3">
          <span class="text-2xl">📑</span>
          <div>
            <h4 class="text-lg sm:text-xl font-black text-amber-950">فهرس أبواب وفصول كتاب حياة الصلاة</h4>
            <p class="text-xs text-amber-800">اضغط على أي فصل للانتقال الفوري وقراءته مباشرة</p>
          </div>
        </div>
        <span class="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900">
          ${data.toc.length} فصلاً وباباً
        </span>
      </div>

      <!-- TOC 3D Glass Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${data.toc.map((item, idx) => {
          const isCurrent = currentPage >= item.page && (data.toc[idx+1] ? currentPage < data.toc[idx+1].page : true);
          return `
            <div 
              onclick="jumpPrayerPage(${item.page}); switchBookTab('reader');"
              class="cursor-pointer p-4 rounded-2xl border transition-all card-3d ${
                isCurrent 
                  ? 'bg-amber-50 border-2 border-amber-500 shadow-md scale-102 ring-2 ring-amber-400/40' 
                  : 'bg-white hover:bg-amber-50/70 border-slate-200 hover:border-amber-300 shadow-sm'
              }"
            >
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-black px-2 py-0.5 rounded-lg ${isCurrent ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}">
                  ص ${item.page}
                </span>
                <span class="text-[10px] text-slate-400 font-bold">#${idx + 1}</span>
              </div>
              <h5 class="text-sm font-black text-amber-950 line-clamp-2 leading-relaxed">
                ${item.title}
              </h5>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderBookPrayerQuickSearch(data, currentPage) {
  const query = (appState.spiritual.bookSearchQuery || '').trim();
  let results = [];
  if (query.length >= 2) {
    for (const p of data.pages) {
      if (p.text && p.text.includes(query)) {
        results.push(p);
      }
    }
  }

  return `
    <div class="space-y-6">
      <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h4 class="text-lg font-black text-amber-950 flex items-center gap-2">
          <span>🔍</span>
          <span>البحث السريع في نصوص كتاب حياة الصلاة (262 صفحة)</span>
        </h4>

        <div class="relative">
          <input 
            type="text" 
            id="book-prayer-search-input"
            value="${query}"
            placeholder="اكتب كلمة أو عبارة للبحث (مثال: الهذيذ، التأمل، المذبح، الدموع، السكوت)..."
            onkeydown="if(event.key==='Enter') executeBookSearch(this.value)"
            class="w-full bg-slate-50 border border-amber-300 text-slate-900 text-xs sm:text-sm font-bold rounded-2xl px-4 py-3 pl-20 shadow-inner focus:ring-2 focus:ring-amber-500"
          >
          <button 
            onclick="executeBookSearch(document.getElementById('book-prayer-search-input').value)"
            class="absolute left-2.5 top-2 px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-sm"
          >
            بحث
          </button>
        </div>

        ${query.length >= 2 ? `
          <div class="pt-4 border-t border-slate-100 space-y-3">
            <p class="text-xs font-black text-slate-700">
              تم العثور على (${results.length}) صفحة مطابقة لعبارة: "${query}"
            </p>
            <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
              ${results.map(r => {
                const idx = r.text.indexOf(query);
                const snippet = r.text.substring(Math.max(0, idx - 60), Math.min(r.text.length, idx + 120));
                return `
                  <div 
                    onclick="jumpPrayerPage(${r.page}); switchBookTab('reader');"
                    class="p-4 rounded-2xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200 cursor-pointer transition-all card-3d"
                  >
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="font-black text-amber-900">صفحة ${r.page}</span>
                      <span class="text-amber-700 font-bold">انتقال للقراءة ❯</span>
                    </div>
                    <p class="text-xs text-slate-700 leading-relaxed font-serif">
                      ...${snippet.replace(query, `<mark class="bg-amber-300 text-amber-950 px-1 rounded">${query}</mark>`)}...
                    </p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function executeBookSearch(val) {
  appState.spiritual.bookSearchQuery = val;
  renderBookOfPrayer();
  saveState();
}

function jumpPrayerPage(pageVal) {
  let p = parseInt(pageVal);
  if (isNaN(p)) return;
  const max = BOOK_PRAYER_FULL.total_pages;
  if (p < 1) p = 1;
  if (p > max) p = max;
  appState.spiritual.bookPage = p;
  renderBookOfPrayer();
  saveState();
}

function nextPrayerPage() {
  const max = BOOK_PRAYER_FULL.total_pages;
  if ((appState.spiritual.bookPage || 1) < max) {
    appState.spiritual.bookPage = (appState.spiritual.bookPage || 1) + 1;
    renderBookOfPrayer();
    saveState();
  }
}

function prevPrayerPage() {
  if ((appState.spiritual.bookPage || 1) > 1) {
    appState.spiritual.bookPage = (appState.spiritual.bookPage || 1) - 1;
    renderBookOfPrayer();
    saveState();
  }
}

function adjustBookFontSize(delta) {
  let size = (appState.spiritual.bookFontSize || 18) + delta;
  if (size < 14) size = 14;
  if (size > 30) size = 30;
  appState.spiritual.bookFontSize = size;
  renderBookOfPrayer();
  saveState();
}

// ==========================================
// 4. COMPLETE BUSTAN EL-ROHBAN (بستان الرهبان كامل)
// Interactive 3-Tab Controller: Reader • Desert Fathers Directory • Quick Jump & Search
// ==========================================

function switchBustanTab(tabKey) {
  appState.spiritual.bustanActiveTab = tabKey;
  renderBustan();
  saveState();
  const el = document.getElementById('bustan-content');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderBustan() {
  const container = document.getElementById('bustan-content');
  if (!container || typeof BUSTAN_FULL === 'undefined') return;

  const data = BUSTAN_FULL;
  const currentPage = appState.spiritual.bustanPage || 5;
  const activeTab = appState.spiritual.bustanActiveTab || 'reader';
  const fontSize = appState.spiritual.bustanFontSize || 18;

  const pageObj = data.pages.find(p => p.page === currentPage) || data.pages[4];

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Bustan Banner with 3D Glass Styling -->
      <div class="glass-panel-amber rounded-3xl p-5 sm:p-7 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-center md:text-right">
          <div class="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-300 text-emerald-900 flex items-center justify-center text-3xl shadow-inner flex-shrink-0 icon-3d">
            🌿
          </div>
          <div>
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900 text-[10px] font-black uppercase border border-emerald-300">
                سير وأقوال آباء البرية
              </span>
              <span class="text-xs text-emerald-800 font-bold">${data.total_pages} صفحة كاملة</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-black text-amber-950 mt-1">${data.title_ar}</h3>
            <p class="text-xs sm:text-sm text-amber-800 leading-relaxed font-serif">${data.author_ar}</p>
          </div>
        </div>

        <!-- Bustan Tabs Switcher (Reader vs Fathers vs Search) -->
        <div class="flex items-center p-1.5 bg-white/90 backdrop-blur-md border border-amber-200 rounded-2xl shadow-sm text-xs font-bold gap-1 flex-wrap justify-center">
          <button 
            onclick="switchBustanTab('reader')"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'reader' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
          >
            <span>📖</span>
            <span>قارئ البستان</span>
          </button>
          <button 
            onclick="switchBustanTab('toc')"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'toc' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
          >
            <span>🌿</span>
            <span>شيوخ البرية والفصول</span>
          </button>
          <button 
            onclick="switchBustanTab('quick')"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'quick' ? 'bg-amber-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
          >
            <span>🔖</span>
            <span>البحث والانتقال</span>
          </button>
        </div>
      </div>

      <!-- Dynamic Tab Content -->
      ${activeTab === 'reader' ? renderBustanReader(data, pageObj, currentPage, fontSize) : ''}
      ${activeTab === 'toc' ? renderBustanToc(data, currentPage) : ''}
      ${activeTab === 'quick' ? renderBustanQuickSearch(data, currentPage) : ''}

    </div>
  `;
}

function renderBustanReader(data, pageObj, currentPage, fontSize) {
  let currentFatherTitle = 'مقدمة البستان';
  for (let i = 0; i < data.toc.length; i++) {
    if (currentPage >= data.toc[i].page) {
      currentFatherTitle = data.toc[i].title;
    }
  }

  return `
    <div class="space-y-6">
      
      <!-- Sub-Bar: Father Quick Dropdown & Font Controls -->
      <div class="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div class="flex items-center gap-2 w-full md:w-auto">
          <span class="text-xs font-bold text-slate-700 whitespace-nowrap">الأب / الباب:</span>
          <select 
            onchange="jumpBustanPage(event.target.value)"
            class="w-full md:w-96 bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500 shadow-sm"
          >
            ${data.toc.map(item => `
              <option value="${item.page}" ${currentPage >= item.page && (data.toc[data.toc.indexOf(item)+1] ? currentPage < data.toc[data.toc.indexOf(item)+1].page : true) ? 'selected' : ''}>
                ص ${item.page}: ${item.title}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 bg-slate-100 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 border border-slate-200">
            <span>صفحة</span>
            <input 
              type="number" 
              min="1" 
              max="${data.total_pages}" 
              value="${currentPage}"
              onchange="jumpBustanPage(this.value)"
              class="w-14 bg-white border border-slate-300 rounded-lg px-1.5 py-0.5 text-center font-black text-amber-900 focus:ring-2 focus:ring-amber-500"
            >
            <span>من ${data.total_pages}</span>
          </div>

          <div class="flex items-center gap-1">
            <button onclick="adjustBustanFontSize(2)" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200">
              A+ تكبير
            </button>
            <button onclick="adjustBustanFontSize(-2)" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200">
              A- تصغير
            </button>
          </div>
        </div>

      </div>

      <!-- Daylight Paper Reading Card -->
      <article class="bg-[#fcfbfa] border-2 border-amber-200/80 rounded-3xl p-6 sm:p-12 shadow-md space-y-6 card-3d">
        
        <div class="flex items-center justify-between border-b border-amber-200/60 pb-4">
          <div class="space-y-0.5">
            <span class="text-xs text-emerald-800 font-bold">بستان الرهبان - فردوس الآباء</span>
            <h4 class="text-base sm:text-lg font-black text-amber-950">${currentFatherTitle}</h4>
          </div>
          <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black border border-emerald-300">
            صفحة ${currentPage}
          </span>
        </div>

        <div 
          class="text-slate-900 leading-loose font-serif whitespace-pre-line text-justify select-text min-h-[420px] py-4"
          style="font-size: ${fontSize}px; line-height: 2.3;"
        >
          ${pageObj ? pageObj.text : 'جاري تحميل الصفحة...'}
        </div>

        <div class="flex items-center justify-between pt-6 border-t border-amber-200/60 text-xs font-black">
          <button 
            onclick="prevBustanPage()"
            ${currentPage <= 1 ? 'disabled' : ''}
            class="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 transition-all flex items-center gap-2 border border-slate-300 shadow-sm"
          >
            <span>❮</span>
            <span>الصفحة السابقة</span>
          </button>

          <span class="text-slate-400 font-bold">
            ${currentPage} / ${data.total_pages}
          </span>

          <button 
            onclick="nextBustanPage()"
            ${currentPage >= data.total_pages ? 'disabled' : ''}
            class="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white transition-all flex items-center gap-2 shadow-md shadow-amber-900/20 border border-amber-600"
          >
            <span>الصفحة التالية</span>
            <span>❯</span>
          </button>
        </div>

      </article>

    </div>
  `;
}

function renderBustanToc(data, currentPage) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between border-b border-amber-100 pb-3">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🌿</span>
          <div>
            <h4 class="text-lg sm:text-xl font-black text-amber-950">فهرس شيوخ البرية وأبواب الفضائل</h4>
            <p class="text-xs text-amber-800">اضغط على أي أب أو فضيلة للانتقال المباشر لأقواله وقراءتها</p>
          </div>
        </div>
        <span class="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-950">
          ${data.toc.length} قسماً
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${data.toc.map((item, idx) => {
          const isCurrent = currentPage >= item.page && (data.toc[idx+1] ? currentPage < data.toc[idx+1].page : true);
          return `
            <div 
              onclick="jumpBustanPage(${item.page}); switchBustanTab('reader');"
              class="cursor-pointer p-4 rounded-2xl border transition-all card-3d ${
                isCurrent 
                  ? 'bg-emerald-50 border-2 border-emerald-500 shadow-md scale-102 ring-2 ring-emerald-400/40' 
                  : 'bg-white hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300 shadow-sm'
              }"
            >
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-black px-2 py-0.5 rounded-lg ${isCurrent ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}">
                  ص ${item.page}
                </span>
                <span class="text-[10px] text-slate-400 font-bold">#${idx + 1}</span>
              </div>
              <h5 class="text-sm font-black text-amber-950 line-clamp-2 leading-relaxed">
                ${item.title}
              </h5>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderBustanQuickSearch(data, currentPage) {
  const query = (appState.spiritual.bustanSearchQuery || '').trim();
  let results = [];
  if (query.length >= 2) {
    for (const p of data.pages) {
      if (p.text && p.text.includes(query)) {
        results.push(p);
      }
    }
  }

  return `
    <div class="space-y-6">
      <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h4 class="text-lg font-black text-amber-950 flex items-center gap-2">
          <span>🔍</span>
          <span>البحث في بستان الرهبان وفردوس الآباء (353 صفحة)</span>
        </h4>

        <div class="relative">
          <input 
            type="text" 
            id="bustan-search-input"
            value="${query}"
            placeholder="اكتب اسم قديس أو كلمة (مثال: أنطونيوس، مقاريوس، الصمت، التواضع، المحبة، الإفراز)..."
            onkeydown="if(event.key==='Enter') executeBustanSearch(this.value)"
            class="w-full bg-slate-50 border border-emerald-300 text-slate-900 text-xs sm:text-sm font-bold rounded-2xl px-4 py-3 pl-20 shadow-inner focus:ring-2 focus:ring-emerald-500"
          >
          <button 
            onclick="executeBustanSearch(document.getElementById('bustan-search-input').value)"
            class="absolute left-2.5 top-2 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm"
          >
            بحث
          </button>
        </div>

        ${query.length >= 2 ? `
          <div class="pt-4 border-t border-slate-100 space-y-3">
            <p class="text-xs font-black text-slate-700">
              تم العثور على (${results.length}) صفحة مطابقة لعبارة: "${query}"
            </p>
            <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
              ${results.map(r => {
                const idx = r.text.indexOf(query);
                const snippet = r.text.substring(Math.max(0, idx - 60), Math.min(r.text.length, idx + 120));
                return `
                  <div 
                    onclick="jumpBustanPage(${r.page}); switchBustanTab('reader');"
                    class="p-4 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-200 cursor-pointer transition-all card-3d"
                  >
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="font-black text-emerald-950">صفحة ${r.page}</span>
                      <span class="text-emerald-700 font-bold">انتقال للقراءة ❯</span>
                    </div>
                    <p class="text-xs text-slate-700 leading-relaxed font-serif">
                      ...${snippet.replace(query, `<mark class="bg-amber-300 text-amber-950 px-1 rounded">${query}</mark>`)}...
                    </p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function executeBustanSearch(val) {
  appState.spiritual.bustanSearchQuery = val;
  renderBustan();
  saveState();
}

function jumpBustanPage(pageVal) {
  let p = parseInt(pageVal);
  if (isNaN(p)) return;
  const max = BUSTAN_FULL.total_pages;
  if (p < 1) p = 1;
  if (p > max) p = max;
  appState.spiritual.bustanPage = p;
  renderBustan();
  saveState();
}

function nextBustanPage() {
  const max = BUSTAN_FULL.total_pages;
  if ((appState.spiritual.bustanPage || 5) < max) {
    appState.spiritual.bustanPage = (appState.spiritual.bustanPage || 5) + 1;
    renderBustan();
    saveState();
  }
}

function prevBustanPage() {
  if ((appState.spiritual.bustanPage || 5) > 1) {
    appState.spiritual.bustanPage = (appState.spiritual.bustanPage || 5) - 1;
    renderBustan();
    saveState();
  }
}

function adjustBustanFontSize(delta) {
  let size = (appState.spiritual.bustanFontSize || 18) + delta;
  if (size < 14) size = 14;
  if (size > 30) size = 30;
  appState.spiritual.bustanFontSize = size;
  renderBustan();
  saveState();
}

// ==========================================
// 5. STUDY & DATA SCIENCE ROADMAP (القسم الدراسي)
// ==========================================

function renderStudySection() {
  // Ensure curriculum lessons loaded
  if ((!appState.study.lessons || appState.study.lessons.length === 0) && typeof CURRICULUM_DATA !== 'undefined') {
    appState.study.lessons = JSON.parse(JSON.stringify(CURRICULUM_DATA.days));
    saveState();
  }

  const subTab = appState.study.activeTab || 'today';

  // Update tab buttons
  document.querySelectorAll('[data-study-tab]').forEach(btn => {
    const tabName = btn.getAttribute('data-study-tab');
    if (tabName === subTab) {
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    }
  });

  // Toggle study views
  document.querySelectorAll('.study-view, .study-subview').forEach(v => v.classList.add('hidden'));
  const target = document.getElementById(`study-view-${subTab}`);
  if (target) target.classList.remove('hidden');

  if (subTab === 'today') renderTodayView();
  else if (subTab === 'schedule') renderScheduleView();
  else if (subTab === 'reschedule') renderRescheduleAnalysis();
  else if (subTab === 'timer') renderTimerView();

  updateGlobalStats();
}

function switchStudyTab(tab) {
  appState.study.activeTab = tab;
  renderStudySection();
  saveState();
}

function getTodayDateStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function renderTodayView() {
  const container = document.getElementById('study-today-content') || document.getElementById('today-plan-container');
  if (!container) return;

  const todayStr = getTodayDateStr();
  const isAr = appState.currentLang === 'ar';

  let d = appState.study.lessons.find(l => l.scheduledDate === todayStr);
  if (!d) {
    d = appState.study.lessons.find(l => !l.fullyCompleted);
  }

  if (!d) {
    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3 shadow-sm">
        <span class="text-5xl">🏆</span>
        <h3 class="text-xl font-black text-emerald-600">ألف مبروك! أتممت منهج علوم البيانات والذكاء الاصطناعي بالكامل</h3>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6 shadow-sm space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm">
            ${isAr ? `يوم ${d.id} من 43` : `Day ${d.id} of 43`}
          </span>
          <span class="text-xs font-semibold text-slate-700">
            ${d.dayNameAr} (${d.scheduledDate})
          </span>
        </div>

        <button 
          onclick="toggleTask(${d.id}, 'both')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            d.fullyCompleted ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-800 hover:border-emerald-500'
          }"
        >
          ${d.fullyCompleted ? t('day_completed') : t('mark_day_done')}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- SQL Hour -->
        <div class="bg-white border ${d.sqlCompleted ? 'border-emerald-400 bg-emerald-50/20' : 'border-slate-200'} rounded-2xl p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-blue-600">🗄️ ${t('sql_hour')}</span>
            <input type="checkbox" ${d.sqlCompleted ? 'checked' : ''} onchange="toggleTask(${d.id}, 'sql')" class="w-5 h-5 rounded text-blue-600 cursor-pointer">
          </div>
          <h5 class="text-xs font-bold text-slate-900">${d.sql.topic}</h5>
          <p class="text-xs text-slate-600 leading-relaxed">${d.sql.details}</p>
          <div class="p-3 rounded-xl bg-blue-50 text-xs text-blue-900">
            <strong>${t('sql_exercise')}</strong> ${d.sql.exercise}
          </div>
        </div>

        <!-- Python Hour -->
        <div class="bg-white border ${d.pythonCompleted ? 'border-emerald-400 bg-emerald-50/20' : 'border-slate-200'} rounded-2xl p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-amber-600">🐍 ${t('python_hour')}</span>
            <input type="checkbox" ${d.pythonCompleted ? 'checked' : ''} onchange="toggleTask(${d.id}, 'py')" class="w-5 h-5 rounded text-amber-600 cursor-pointer">
          </div>
          <h5 class="text-xs font-bold text-slate-900">${d.python.topic}</h5>
          <p class="text-xs text-slate-600 leading-relaxed">${d.python.details}</p>
          <div class="p-3 rounded-xl bg-amber-50 text-xs text-amber-900">
            <strong>${t('python_exercise')}</strong> ${d.python.exercise}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderScheduleView() {
  const container = document.getElementById('study-schedule-list') || document.getElementById('study-schedule-container');
  if (!container) return;

  const todayStr = getTodayDateStr();

  container.innerHTML = appState.study.lessons.map(d => {
    const isDone = d.fullyCompleted;
    const isOverdue = !isDone && d.scheduledDate < todayStr;
    const isToday = d.scheduledDate === todayStr;

    return `
      <div class="bg-white border ${
        isDone ? 'border-emerald-300' : isOverdue ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'
      } rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleTask(${d.id}, 'both')" class="w-5 h-5 rounded text-blue-600 cursor-pointer">
            <div>
              <span class="font-bold text-sm text-slate-900">يوم ${d.id}: ${d.phase}</span>
              <div class="text-xs text-slate-500">${d.dayNameAr} (${d.scheduledDate})</div>
            </div>
          </div>
          <span class="text-xs px-2.5 py-0.5 rounded-full font-bold ${
            isDone ? 'bg-emerald-100 text-emerald-800' : isToday ? 'bg-blue-100 text-blue-800' : isOverdue ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
          }">
            ${isDone ? '✓ مكتمل' : isToday ? 'اليوم' : isOverdue ? 'متأخر' : 'قيد الانتظار'}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function renderRescheduleAnalysis() {
  const container = document.getElementById('study-reschedule-container');
  if (!container) return;

  const todayStr = getTodayDateStr();
  const pending = appState.study.lessons.filter(l => !l.fullyCompleted);
  const overdue = appState.study.lessons.filter(l => !l.fullyCompleted && l.scheduledDate < todayStr);
  const available = getAvailableStudyDates(todayStr, appState.study.settings.endDate, true, true);

  container.innerHTML = `
    <div class="space-y-6">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div class="text-2xl font-black text-rose-600">${overdue.length}</div>
          <div class="text-xs text-slate-500 font-bold mt-1">دروس متأخرة</div>
        </div>
        <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div class="text-2xl font-black text-amber-600">${pending.length}</div>
          <div class="text-xs text-slate-500 font-bold mt-1">دروس متبقية</div>
        </div>
        <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div class="text-2xl font-black text-blue-600">${available.length}</div>
          <div class="text-xs text-slate-500 font-bold mt-1">أيام دراسة متاحة</div>
        </div>
        <div class="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div class="text-2xl font-black text-indigo-600">${(pending.length / Math.max(1, available.length)).toFixed(1)}</div>
          <div class="text-xs text-slate-500 font-bold mt-1">المعدل اليومي المطلوب</div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
        <h4 class="text-sm font-bold text-slate-900">خوارزمية إعادة التوزيع والجدولة التلقائية</h4>
        <p class="text-xs text-slate-600 leading-relaxed">
          تقوم هذه الخوارزمية بحساب الأيام المتبقية حتى نهاية العام (31 ديسمبر 2026) مع استبعاد أيام الجمعة والسبت، وإعادة توزيع الدروس غير المكتملة بالتساوي.
        </p>
        <button 
          onclick="performSmartRescheduling()"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          🔄 نفذ إعادة الجدولة التلقائية الآن
        </button>
      </div>
    </div>
  `;
}

function getAvailableStudyDates(startDateStr, endDateStr, skipFri = true, skipSat = true) {
  const dates = [];
  let cur = new Date(startDateStr);
  const end = new Date(endDateStr);

  while (cur <= end) {
    const dayOfWeek = cur.getDay(); // 0 Sun, 1 Mon, ... 5 Fri, 6 Sat
    const isFri = dayOfWeek === 5;
    const isSat = dayOfWeek === 6;

    if (!(skipFri && isFri) && !(skipSat && isSat)) {
      const year = cur.getFullYear();
      const month = String(cur.getMonth() + 1).padStart(2, '0');
      const day = String(cur.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function performSmartRescheduling() {
  const todayStr = getTodayDateStr();
  const availableDates = getAvailableStudyDates(todayStr, appState.study.settings.endDate, true, true);
  const uncompleted = appState.study.lessons.filter(l => !l.fullyCompleted);

  if (availableDates.length === 0) {
    alert('لا توجد أيام متبقية حتى نهاية العام!');
    return;
  }

  uncompleted.forEach((lesson, idx) => {
    const dateIdx = idx % availableDates.length;
    lesson.scheduledDate = availableDates[dateIdx];
  });

  saveState();
  renderStudySection();
  alert('تمت إعادة جدولة الدروس بنجاح على الأيام المتبقية!');
}

function toggleTask(id, type) {
  const lesson = appState.study.lessons.find(l => l.id === id);
  if (!lesson) return;

  if (type === 'sql') lesson.sqlCompleted = !lesson.sqlCompleted;
  else if (type === 'py') lesson.pythonCompleted = !lesson.pythonCompleted;
  else if (type === 'both') {
    const next = !lesson.fullyCompleted;
    lesson.sqlCompleted = next;
    lesson.pythonCompleted = next;
  }

  lesson.fullyCompleted = lesson.sqlCompleted && lesson.pythonCompleted;
  if (lesson.fullyCompleted) {
    triggerCelebration();
  }

  saveState();
  renderStudySection();
}

function updateGlobalStats() {
  const total = appState.study.lessons.length;
  const completed = appState.study.lessons.filter(l => l.fullyCompleted).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const countEl = document.getElementById('stat-completed-count');
  const percentEl = document.getElementById('stat-completed-percent');
  const barEl = document.getElementById('stat-progress-bar');
  const remainingDaysEl = document.getElementById('stat-remaining-days');

  if (countEl) countEl.textContent = `${completed} / ${total}`;
  if (percentEl) percentEl.textContent = `${percent}%`;
  if (barEl) barEl.style.width = `${percent}%`;

  if (remainingDaysEl) {
    const todayStr = getTodayDateStr();
    const available = getAvailableStudyDates(todayStr, appState.study.settings.endDate, true, true);
    remainingDaysEl.textContent = available.length;
  }
}

function triggerCelebration() {
  // Simple subtle visual feedback
  const header = document.querySelector('header');
  if (header) {
    header.classList.add('ring-4', 'ring-amber-400');
    setTimeout(() => header.classList.remove('ring-4', 'ring-amber-400'), 1000);
  }
}

function toggleLanguage() {
  appState.currentLang = appState.currentLang === 'ar' ? 'en' : 'ar';
  document.documentElement.lang = appState.currentLang;
  document.documentElement.dir = appState.currentLang === 'ar' ? 'rtl' : 'ltr';
  renderAll();
  saveState();
}

function renderAll() {
  if (appState.currentSection === 'spiritual') {
    switchMainSection('spiritual');
  } else {
    switchMainSection('study');
  }
}

// Global initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Bind top spiritual tab buttons
  document.querySelectorAll('[data-spiritual-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchSpiritualTab(btn.getAttribute('data-spiritual-tab'));
    });
  });

  // Bind top study tab buttons
  document.querySelectorAll('[data-study-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchStudyTab(btn.getAttribute('data-study-tab'));
    });
  });

  // Initialize UI
  document.documentElement.lang = appState.currentLang || 'ar';
  document.documentElement.dir = (appState.currentLang || 'ar') === 'ar' ? 'rtl' : 'ltr';
  renderAll();
});


// Force Update & Clear Cache Utility
window.forceAppUpdateAndClearCache = async function() {
  const msg = (appState && appState.currentLang === 'en')
    ? 'Do you want to clear cache and reload the latest updates for all books and prayers?'
    : 'هل تريد تحديث التطبيق ومسح التخزين المؤقت لتحميل أحدث نسخة كاملة لجميع الكتب والصلوات؟';

  if (confirm(msg)) {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
    }
    window.location.reload(true);
  }
};

// Register PWA Service Worker for Mobile & Offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js?v=15')
      .then(reg => {
        console.log('[PWA] Service Worker registered successfully:', reg.scope);
      })
      .catch(err => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });
  });
}



// ==========================================
// EXPLICIT WINDOW BINDINGS
// ==========================================
Object.assign(window, {
  toggleSidebar,
  sidebarNavigateAgpeya,
  sidebarNavigateBible,
  sidebarNavigate,
  sidebarNavigateStudy,
  bottomNavSwitch,
  updateDockActiveState,
  switchMainSection,
  switchSpiritualTab,
  switchStudyTab,
  selectAgpeyaHour,
  selectAgpeyaTab,
  selectAgpeyaPsalm,
  setAgpeyaPsalmViewMode,
  setAgpeyaMode,
  adjustAgpeyaFontSize,
  tapKyrieCounter,
  resetKyrieCounter,
  nextAgpeyaSlide,
  prevAgpeyaSlide,
  jumpToAgpeyaSlide,
  switchBookTab,
  jumpPrayerPage,
  nextPrayerPage,
  prevPrayerPage,
  adjustBookFontSize,
  executeBookSearch,
  switchBustanTab,
  jumpBustanPage,
  nextBustanPage,
  prevBustanPage,
  adjustBustanFontSize,
  executeBustanSearch,
  onBibleBookChange,
  selectBibleChapter,
  setBibleTestamentFilter,
  nextBibleChapter,
  prevBibleChapter,
  adjustBibleFontSize,
  executeBibleSearch,
  jumpToBibleVerse,
  toggleLanguage,
  triggerCelebration,
  toggleTask,
  performSmartRescheduling
});
