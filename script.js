    const jobDetails = {
      almamater: {
        period: 'Альма-матер',
        title: 'МГУ им. Н.П. Огарёва',
        role: 'Студент / Дизайнер',
        points: [
          'Заложил фундамент в проектировании и дизайне',
          'Разрабатывал визуальные концепции для студенческого совета',
          'Организовывал креативные проекты и мероприятия внутри вуза',
          'Получил базу, с которой стартовал коммерческий путь'
        ]
      },
      farteam: {
        period: 'Апрель 2023 —',
        title: 'FarTeam',
        role: 'Web-дизайнер',
        points: [
          'Оформлял соцсети компании: посты, шапки, сторис в единой визуальной стилистике',
          'Разрабатывал рекламные креативы для таргетированной рекламы',
          'Делал превью и обложки для YouTube-роликов',
          'Собирал баннеры для сайта и партнёрских размещений'
        ]
      },
      sinergium: {
        period: 'Август 2025 — Февраль 2026',
        title: 'Синергиум',
        role: 'Креативный дизайнер',
        points: [
          'Создавал рекламные креативы для таргета и контекстной рекламы под разные ниши клиентов',
          'Оформлял соцсети и брендинг для партнёров агентства',
          'Делал карточки товаров и компаний для Яндекса',
          'Внедрял нейросети в рабочий процесс: генерация и обработка визуала',
          'Занимался анимацией, монтажом и инфографикой для рекламных роликов'
        ]
      },
      gosinform: {
        period: 'Март 2026 — настоящее время',
        title: 'ГАУ РМ «Госинформ»',
        role: 'Аналитик',
        points: [
          'Разрабатываю дизайн презентаций для внутренних и внешних задач учреждения',
          'Готовлю рекламные и информационные материалы',
          'Визуализирую данные и делаю инфографику для отчётов',
          'Верстаю сайты и информационные системы',
          'Собираю моушен-инфографику и монтирую видеоролики'
        ]
      },
      kostenkov: {
        period: 'Март 2024 — Август 2025',
        title: 'ИП Костенков',
        role: 'Графический дизайнер',
        points: [
          'Разрабатывал макеты для соцсетей и рекламных кампаний',
          'Готовил презентации и каталоги продукции',
          'Занимался анимацией и монтажом коротких видео',
          'Создавал логотипы и фирменный стиль для клиентов',
          'Проектировал дизайн для сайтов и моби приложений'
        ]
      },
      ija: {
        period: 'Ноябрь 2023 — Февраль 2024',
        title: 'IJA',
        role: 'Дизайнер',
        points: [
          'Оформлял офферы и email/push-рассылки',
          'Делал баннеры для акций и распродаж',
          'Работал с MidJourney и другими нейросетями для генерации визуала',
          'Верстал страницы сайта',
          'Монтировал Reels для соцсетей бренда'
        ]
      }
    };

    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalPeriod = document.getElementById('modalPeriod');
    const modalRole = document.getElementById('modalRole');
    const modalList = document.getElementById('modalList');

    function openModal(key){
      const data = jobDetails[key];
      if (!data) return;
      modalTitle.textContent = data.title;
      modalPeriod.textContent = data.period;
      modalRole.textContent = data.role;
      modalList.innerHTML = data.points.map(p => `<li>${p}</li>`).join('');
      modalOverlay.classList.add('open');
    }
    function closeModal(){ modalOverlay.classList.remove('open'); }

    document.getElementById('modalClose').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    // Hidden "vibes" page — TEMPORARILY DISABLED. The overlay markup/logic below is kept
    // as-is so it's a one-line swap to re-enable: just call openVibes() from secretCue again.
    const secretCue = document.getElementById('secretCue');
    const secretTooltip = document.getElementById('secretTooltip');
    const vibesOverlay = document.getElementById('vibesOverlay');
    const vibesClose = document.getElementById('vibesClose');
    function openVibes(){ vibesOverlay.classList.add('open'); document.body.classList.add('vibes-open'); }
    function closeVibes(){ vibesOverlay.classList.remove('open'); document.body.classList.remove('vibes-open'); }
    let secretTooltipTimer = null;
    secretCue.addEventListener('click', (e) => {
      e.stopPropagation();
      secretTooltip.classList.add('show');
      clearTimeout(secretTooltipTimer);
      secretTooltipTimer = setTimeout(() => secretTooltip.classList.remove('show'), 2600);
    });
    document.addEventListener('click', () => secretTooltip.classList.remove('show'));
    vibesClose.addEventListener('click', closeVibes);
    vibesOverlay.addEventListener('click', (e) => { if (e.target === vibesOverlay) closeVibes(); });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape'){ closeModal(); closeVibes(); toggleMobileMenu(false); secretTooltip.classList.remove('show'); } });

    const jobCards = document.querySelectorAll('#experience .card');
    jobCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.details-btn')) return;
        const isSelected = card.classList.contains('selected');
        jobCards.forEach(c => c.classList.remove('selected'));
        if (!isSelected) card.classList.add('selected');
      });
    });
    document.querySelectorAll('.details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.card');
        jobCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        openModal(btn.dataset.detail);
      });
    });

    const nav = document.getElementById('siteNav');
    const sections = {
      hero: document.getElementById('hero'),
      experience: document.getElementById('experience'),
      portfolio: document.getElementById('portfolio'),
      about: document.getElementById('about'),
      contacts: document.getElementById('contacts'),
    };
    const navItems = document.querySelectorAll('.nav-links li, .mobile-menu li');

    function goTo(id){ sections[id].scrollIntoView({ behavior: 'smooth' }); }

    // Theme toggle — dark by default, manual switch persisted in localStorage
    const themeToggle = document.getElementById('themeToggle');
    const rootEl = document.documentElement;
    function applyTheme(theme){
      rootEl.setAttribute('data-theme', theme);
      try { localStorage.setItem('lummb-theme', theme); } catch(e){}
    }
    let savedTheme = 'dark';
    try { savedTheme = localStorage.getItem('lummb-theme') === 'light' ? 'light' : 'dark'; } catch(e){}
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', () => {
      const current = rootEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });

    document.getElementById('scrollBtn').addEventListener('click', () => goTo('about'));

    // Mouse-reactive aurora gradient on the hero screen — desktop/mouse only,
    // and the loop stops once it settles instead of running forever in the background
    const heroSection = document.getElementById('hero');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (heroSection && !prefersReducedMotion && hasFinePointer){
      let targetMX = 0, targetMY = 0, curMX = 0, curMY = 0, rafId = null;
      function ensureTicking(){
        if (rafId !== null) return;
        rafId = requestAnimationFrame(tickAurora);
      }
      function tickAurora(){
        curMX += (targetMX - curMX) * 0.07;
        curMY += (targetMY - curMY) * 0.07;
        heroSection.style.setProperty('--mx', curMX.toFixed(2) + 'px');
        heroSection.style.setProperty('--my', curMY.toFixed(2) + 'px');
        const settled = Math.abs(targetMX - curMX) < 0.05 && Math.abs(targetMY - curMY) < 0.05;
        if (settled){ rafId = null; return; }
        rafId = requestAnimationFrame(tickAurora);
      }
      heroSection.addEventListener('mousemove', (e) => {
        const r = heroSection.getBoundingClientRect();
        const relX = (e.clientX - r.left) / r.width - 0.5;
        const relY = (e.clientY - r.top) / r.height - 0.5;
        targetMX = relX * 70;
        targetMY = relY * 70;
        ensureTicking();
      });
      heroSection.addEventListener('mouseleave', () => { targetMX = 0; targetMY = 0; ensureTicking(); });
    }

    // Portfolio carousel arrows
    const portfolioTrack = document.getElementById('portfolioTrack');
    const portfolioPrev = document.getElementById('portfolioPrev');
    const portfolioNext = document.getElementById('portfolioNext');
    if (portfolioTrack && portfolioPrev && portfolioNext){
      const scrollAmount = () => (portfolioTrack.querySelector('.flat-card')?.offsetWidth || 290) + 18;
      portfolioPrev.addEventListener('click', () => portfolioTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
      portfolioNext.addEventListener('click', () => portfolioTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

      // Grab-to-pan dragging with the mouse (touch keeps native swipe scrolling).
      // Important: only flip into "dragging" mode once the pointer has actually moved —
      // doing it immediately on pointerdown was disabling clicks on the card links.
      let isPointerDown = false, isDragging = false, dragStartX = 0, dragScrollStart = 0, dragMoved = 0, activePointerId = null;
      portfolioTrack.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse') return;
        isPointerDown = true; isDragging = false; dragMoved = 0;
        dragStartX = e.clientX; dragScrollStart = portfolioTrack.scrollLeft;
        activePointerId = e.pointerId;
      });
      portfolioTrack.addEventListener('pointermove', (e) => {
        if (!isPointerDown) return;
        const dx = e.clientX - dragStartX;
        dragMoved = Math.max(dragMoved, Math.abs(dx));
        if (!isDragging && dragMoved > 6){
          isDragging = true;
          portfolioTrack.classList.add('dragging');
          try { portfolioTrack.setPointerCapture(activePointerId); } catch(err){}
        }
        if (isDragging) portfolioTrack.scrollLeft = dragScrollStart - dx;
      });
      const endDrag = () => {
        isPointerDown = false;
        if (!isDragging) return;
        isDragging = false;
        portfolioTrack.classList.remove('dragging');
      };
      portfolioTrack.addEventListener('pointerup', endDrag);
      portfolioTrack.addEventListener('pointerleave', endDrag);
      portfolioTrack.addEventListener('pointercancel', endDrag);
      portfolioTrack.addEventListener('click', (e) => {
        if (dragMoved > 6) e.preventDefault();
      }, true);
    }

    const videoSpoilerToggle = document.getElementById('videoSpoilerToggle');
    const videoSpoilerBody = document.getElementById('videoSpoilerBody');
    if (videoSpoilerToggle && videoSpoilerBody){
      videoSpoilerToggle.addEventListener('click', () => {
        const isOpen = videoSpoilerToggle.getAttribute('aria-expanded') === 'true';
        videoSpoilerToggle.setAttribute('aria-expanded', String(!isOpen));
        videoSpoilerBody.hidden = isOpen;
        if (!isOpen){
          setTimeout(() => videoSpoilerToggle.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
        }
      });
    }

    // =====================================================================
    // СПИСОК ВИДЕО — редактируй здесь. Раскомментируй/скопируй нужный тип
    // объекта для каждого нового видео. Порядок в массиве = порядок на сайте.
    //
    // Поля title / category — необязательны, но желательны.
    // По умолчанию карточка вертикальная (9/16, формат reels/shorts).
    // Если видео горизонтальное — добавь `vertical: false`.
    // =====================================================================
    const videoWorks = [

      // --- Тип 1: mp4-файл, лежащий прямо в этом репозитории (GitHub Pages) ---
      // Залей файл (и, по желанию, картинку-превью) в папку /video/ рядом с index.html.
      // { src: 'video/reklama-1.mp4', poster: 'video/reklama-1.jpg', title: 'Название работы', category: 'Реклама' },

      // --- Тип 2: ссылка на YouTube — распознаётся автоматически, встраивается плеером ---
      // { url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', title: 'Название работы', category: 'Личный проект', vertical: false },

      // --- Тип 3: ссылка на Vimeo — тоже встраивается плеером ---
      // { url: 'https://vimeo.com/XXXXXXXXX', title: 'Название работы', category: 'Реклама', vertical: false },

      // --- Тип 4: ссылка на любой другой ресурс (VK Видео, RuTube, Диск и т.п.) ---
      // Плеер туда не встроить, поэтому карточка кликабельна и открывает ссылку в новой вкладке.
      // Можно указать poster — картинку-превью, иначе будет однотонная заглушка со стрелкой.
      // { url: 'https://vk.com/video-XXXXXXXX_XXXXXXXXX', title: 'Название работы', category: 'Реклама', poster: 'video/preview.jpg' },

    ];

    function escapeHtml(str){
      return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => (
        { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
      ));
    }

    // Достаём embed-ссылку из обычной ссылки на YouTube/Vimeo. Если ресурс не
    // распознан — вернём null, и карточка отрисуется как внешняя ссылка (тип 4).
    function getVideoEmbedUrl(rawUrl){
      let u;
      try { u = new URL(rawUrl); } catch(e){ return null; }
      const host = u.hostname.replace(/^www\./, '');

      if (host === 'youtu.be'){
        const id = u.pathname.slice(1);
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (host === 'youtube.com' || host === 'm.youtube.com'){
        let id = u.searchParams.get('v');
        if (!id && u.pathname.startsWith('/shorts/')) id = u.pathname.split('/')[2];
        if (!id && u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (host === 'vimeo.com' || host === 'player.vimeo.com'){
        const id = u.pathname.split('/').filter(Boolean).pop();
        return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
      }
      return null;
    }

    function renderVideoWorks(){
      const grid = document.getElementById('videoGrid');
      const badge = document.getElementById('videoSpoilerBadge');
      if (!grid) return;

      if (!videoWorks.length){
        grid.innerHTML = '<p class="video-empty-note">Материалы в процессе загрузки — скоро здесь появятся видео.</p>';
        if (badge) badge.textContent = 'Скоро';
        return;
      }

      if (badge) badge.textContent = videoWorks.length === 1 ? '1 видео' : `${videoWorks.length} видео`;

      grid.innerHTML = videoWorks.map((item) => {
        const ratioStyle = item.vertical === false ? 'style="--vratio:16/9"' : '';
        const title = escapeHtml(item.title || '');
        const cat = item.category ? `<span class="cat">${escapeHtml(item.category)}</span>` : '';
        const info = `<div class="video-card-info"><h4>${title}</h4>${cat}</div>`;

        // Тип 1 — локальный mp4-файл
        if (item.src){
          const posterAttr = item.poster ? ` poster="${escapeHtml(item.poster)}"` : '';
          return `<div class="video-card" ${ratioStyle}>
            <video src="${escapeHtml(item.src)}"${posterAttr} controls preload="metadata" playsinline></video>
            ${info}
          </div>`;
        }

        if (item.url){
          const embedUrl = getVideoEmbedUrl(item.url);

          // Тип 2/3 — YouTube или Vimeo, встраиваем плеером
          if (embedUrl){
            return `<div class="video-card" ${ratioStyle}>
              <iframe src="${embedUrl}" loading="lazy" title="${title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
              ${info}
            </div>`;
          }

          // Тип 4 — произвольная ссылка, встроить нельзя — открываем в новой вкладке
          const thumbStyle = item.poster
            ? ` style="background-image:url('${escapeHtml(item.poster)}')"`
            : '';
          return `<a class="video-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener" ${ratioStyle}>
            <div class="video-card-thumb"${thumbStyle}><span class="video-card-play">↗</span></div>
            ${info}
          </a>`;
        }

        return '';
      }).join('');
    }

    renderVideoWorks();

    const navBurger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    function toggleMobileMenu(open){
      const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', shouldOpen);
      navBurger.classList.toggle('open', shouldOpen);
      navBurger.setAttribute('aria-expanded', String(shouldOpen));
    }
    navBurger.addEventListener('click', () => toggleMobileMenu());
    document.querySelectorAll('.mobile-menu li').forEach(li => {
      li.addEventListener('click', () => toggleMobileMenu(false));
    });

    const navTooltip = document.getElementById('navTooltip');
    document.getElementById('topBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      navTooltip.classList.toggle('show');
    });
    document.addEventListener('click', () => navTooltip.classList.remove('show'));

    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => goTo('hero'));

    navItems.forEach(li => li.addEventListener('click', () => goTo(li.dataset.target)));

    const navMap = { experience: 'experience', portfolio: 'portfolio', about: 'about', contacts: 'contacts' };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        nav.classList.toggle('scrolled', id !== 'hero');
        backToTop.classList.toggle('show', id !== 'hero');

        navItems.forEach(li => li.classList.remove('active'));
        if (navMap[id]){
          document.querySelectorAll(`.nav-links li[data-target="${id}"], .mobile-menu li[data-target="${id}"]`)
            .forEach(match => match.classList.add('active'));
        }
      });
    }, { threshold: 0.55 });

    Object.values(sections).forEach(s => observer.observe(s));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));