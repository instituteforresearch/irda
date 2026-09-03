// ===== Animated stat counters =====
document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600; // ms
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    counters.forEach(animateCounter);
  }
});

// ===== Accordion (Programme Structure / Admission Requirements / How To Apply) =====
document.addEventListener('DOMContentLoaded', function () {
  var toggles = document.querySelectorAll('.collapse-toggle');
  if (!toggles.length) return;

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.collapse-item');
      if (!item) return;
      var isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
});

// ===== Programme tabs (PhD / Master's / Diploma switcher) =====
document.addEventListener('DOMContentLoaded', function () {
  var tabBtns = document.querySelectorAll('.programme-tab-btn');
  if (!tabBtns.length) return;

  function activateTab(target) {
    if (!target) return;
    var matchBtn = null;
    tabBtns.forEach(function (b) {
      var isMatch = b.getAttribute('data-target') === target;
      b.classList.toggle('active', isMatch);
      if (isMatch) matchBtn = b;
    });
    if (!matchBtn) return;
    document.querySelectorAll('.programme-panel').forEach(function (panel) {
      panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
    });
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateTab(btn.getAttribute('data-target'));
    });
  });

  // Allow linking directly to a programme tab, e.g. programme.html#masters
  var hash = (window.location.hash || '').replace('#', '');
  if (hash) activateTab(hash);
});

// ===== Mobile navigation menu (hamburger) =====
// Wires up the .menu-toggle button to open the slide-in #mobile-menu overlay,
// the close button + backdrop to close it, and the .m-nolink items to expand
// their submenus. This fixes the issue where on mobile the nav links simply
// disappeared instead of collapsing into a working menu.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var backdrop = document.querySelector('.mobile-overlay-backdrop');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) closeMenu(); else openMenu();
  });

  var closeBtn = menu.querySelector('.mobile-menu-close');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });

  // Expand/collapse submenus inside the mobile menu
  menu.querySelectorAll('.m-nolink').forEach(function (nolink) {
    nolink.addEventListener('click', function () {
      var submenu = nolink.nextElementSibling;
      if (submenu && submenu.classList.contains('m-submenu')) {
        submenu.classList.toggle('open');
      }
    });
  });

  // Close the mobile menu after clicking any real link
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      // Only close if it is an actual navigation link (not a # placeholder)
      var href = link.getAttribute('href') || '';
      if (href && href !== '#') closeMenu();
    });
  });
});
