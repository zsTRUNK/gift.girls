// Mobile Menu Logic
const initMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });
  }
};

// Rules Accordion Logic
const initRulesAccordion = () => {
  if (window.innerWidth > 768) return;

  const ruleItems = document.querySelectorAll('.rule-item');
  ruleItems.forEach(item => {
    const header = item.querySelector('.rule-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        ruleItems.forEach(i => i.classList.remove('active'));

        // Toggle current
        if (!isActive) item.classList.add('active');

        // Scroll to item
        if (!isActive) {
          setTimeout(() => {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 300);
        }
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 3D Carousel Logic with Toggle Support
  const carouselCards = document.querySelectorAll('.card');
  const nextBtn = document.querySelector('.arrow-next');
  const prevBtn = document.querySelector('.arrow-prev');
  const toggleBtns = document.querySelectorAll('.toggle-btn');

  if (carouselCards.length > 0 && nextBtn && prevBtn) {
    let currentIndex = 0;
    let currentViewMode = 'regular'; // 'regular' or 'admin'
    const counterDisplay = document.querySelector('.slider-counter');

    function getVisibleCards() {
      return Array.from(carouselCards).filter(card => {
        return card.dataset.type === currentViewMode && !card.classList.contains('hidden');
      });
    }

    function updateCarousel() {
      const visibleCards = getVisibleCards();

      carouselCards.forEach((card) => {
        card.classList.remove('active', 'prev', 'next');
      });

      if (visibleCards.length > 0) {
        visibleCards.forEach((card, index) => {
          if (index === currentIndex) {
            card.classList.add('active');
          } else if (index === (currentIndex - 1 + visibleCards.length) % visibleCards.length) {
            card.classList.add('prev');
          } else if (index === (currentIndex + 1) % visibleCards.length) {
            card.classList.add('next');
          }
        });

        if (counterDisplay) {
          counterDisplay.textContent = `${currentIndex + 1} / ${visibleCards.length}`;
        }
      }
    }

    function switchView(viewType) {
      currentViewMode = viewType;
      currentIndex = 0;

      // Hide all cards first
      carouselCards.forEach(card => {
        card.classList.add('hidden');
        card.classList.remove('active', 'prev', 'next');
      });

      // Show cards matching current view
      carouselCards.forEach(card => {
        if (card.dataset.type === currentViewMode) {
          card.classList.remove('hidden');
        }
      });

      // Update toggle buttons
      toggleBtns.forEach(btn => {
        if (btn.dataset.view === viewType) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      updateCarousel();
    }

    // Toggle button event listeners
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const viewType = btn.dataset.view;
        switchView(viewType);
      });
    });

    nextBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      currentIndex = (currentIndex + 1) % visibleCards.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
      updateCarousel();
    });

    // Touch/Swipe Support for Mobile - Enhanced
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isSwiping = false;
    const sliderWrapper = document.querySelector('.slider-wrapper');

    if (sliderWrapper) {
      sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = true;
      }, { passive: true });

      sliderWrapper.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;

        const currentX = e.changedTouches[0].screenX;
        const diff = currentX - touchStartX;

        // Visual feedback during swipe
        const activeCard = document.querySelector('.card.active');
        if (activeCard && Math.abs(diff) > 10) {
          const scale = 1 - Math.abs(diff) / 1000;
          activeCard.style.transform = `translate(-50%, -50%) scale(${Math.max(0.95, scale)})`;
        }
      }, { passive: true });

      sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        // Reset card transform
        const activeCard = document.querySelector('.card.active');
        if (activeCard) {
          activeCard.style.transform = '';
        }

        handleSwipe();
        isSwiping = false;
      }, { passive: true });

      function handleSwipe() {
        const swipeThreshold = 40; // Reduced for easier swiping
        const horizontalDiff = touchEndX - touchStartX;
        const verticalDiff = Math.abs(touchEndY - touchStartY);

        // Check horizontal swipe (not vertical scroll)
        if (Math.abs(horizontalDiff) > swipeThreshold && Math.abs(horizontalDiff) > verticalDiff) {
          const visibleCards = getVisibleCards();

          if (horizontalDiff < 0) {
            // Swipe left - next card
            currentIndex = (currentIndex + 1) % visibleCards.length;
          } else {
            // Swipe right - previous card
            currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
          }


          updateCarousel();
        }
      }
    }

    // Keyboard Navigation (Arrow Keys)
    document.addEventListener('keydown', (e) => {
      // Check if user is typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      const visibleCards = getVisibleCards();

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        updateCarousel();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % visibleCards.length;
        updateCarousel();
      }
    });

    // Initial state - show regular users
    switchView('regular');
  }

  // Lightbox for Telegram post images
  const initLightbox = () => {
    const modal = document.getElementById('tgModal');
    const modalImg = document.getElementById('tgModalImg');
    const tgImages = document.querySelectorAll('.tg-post-images img');

    if (modal && modalImg && tgImages.length > 0) {
      tgImages.forEach(img => {
        img.addEventListener('click', () => {
          modalImg.src = img.src;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scroll
        });
      });

      modal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
      });
    }
  };

  // Reactions Interactivity
  const initReactions = () => {
    const reactions = document.querySelectorAll('.tg-reaction');

    reactions.forEach(reaction => {
      reaction.addEventListener('click', () => {
        const countEl = reaction.querySelector('.tg-reaction-count');
        const emojiEl = reaction.querySelector('.tg-reaction-emoji');
        let count = parseInt(countEl.textContent);

        if (reaction.classList.contains('selected')) {
          reaction.classList.remove('selected');
          countEl.textContent = count - 1;
        } else {
          reaction.classList.add('selected');
          countEl.textContent = count + 1;

          // Add pop animation
          reaction.classList.add('pop-animation');
          setTimeout(() => reaction.classList.remove('pop-animation'), 300);
        }
      });
    });
  };

  initLightbox();
  initReactions();
});

// Component Loader (simulating small framework behavior for header/footer)
const components = {
  header: (activePage) => `
    <div class="container">
      <nav>
        <a href="index.html" class="logo">girls.</a>
        <div class="nav-links">
          <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Главная</a>
          <a href="chat.html" class="${activePage === 'chat' ? 'active' : ''}">Чат</a>
          <a href="channel.html" class="${activePage === 'channel' ? 'active' : ''}">Канал</a>
          <a href="roulette.html" class="${activePage === 'roulette' ? 'active' : ''}">Рулетка</a>
          <a href="rules.html" class="${activePage === 'rules' ? 'active' : ''}">Правила</a>
          <a href="contacts.html" class="${activePage === 'contacts' ? 'active' : ''}">Контакты</a>
        </div>
        <div class="nav-controls">
            <button id="settingsBtn" class="settings-btn" aria-label="Settings">⚙️</button>
            <div class="menu-toggle">☰</div>
        </div>
      </nav>
    </div>
  `,
  footer: () => `
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <div class="logo">girls.</div>
          <p>© 2026 Все права защищены</p>
        </div>
        <div class="social-icons">
          <a href="https://t.me/meowwgirlssz" class="social-text">Chat</a>
          <a href="https://t.me/giftgirlss" class="social-text">Channel</a>
          <a href="https://t.me/sorryforlove" class="social-text">Связь</a>
        </div>
      </div>
    </div>
  `,
  settingsModal: () => `
    <div id="settingsModal" class="settings-modal-overlay">
        <div class="settings-modal glass">
            <div class="settings-header">
                <h3>Настройки</h3>
                <button id="closeSettings" class="close-btn">✕</button>
            </div>
            
            <div class="settings-list">
                <!-- Theme -->
                <div class="setting-item">
                    <span class="setting-label">Тема</span>
                    <div class="toggle-wrapper compact">
                        <label class="theme-switch">
                            <input type="checkbox" id="themeToggle">
                            <span class="theme-slider round">
                                <span class="theme-icon sun">☀️</span>
                                <span class="theme-icon moon">🌙</span>
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Animations -->
                <div class="setting-item">
                    <span class="setting-label">Анимации</span>
                    <div class="toggle-wrapper compact">
                        <label class="switch">
                            <input type="checkbox" id="animToggle" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- Sound -->
                <div class="setting-item">
                    <span class="setting-label">Звук</span>
                    <div class="toggle-wrapper compact">
                        <label class="switch">
                            <input type="checkbox" id="soundToggle" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
};

function injectComponents(pageId) {
  const headerEl = document.querySelector('header');
  const footerEl = document.querySelector('footer');

  if (headerEl) {
    headerEl.innerHTML = components.header(pageId);
    initMobileMenu();
    if (pageId === 'rules') initRulesAccordion();
  }

  if (footerEl) footerEl.innerHTML = components.footer();

  // Inject settings modal at body level (not inside header)
  if (!document.getElementById('settingsModal')) {
    document.body.insertAdjacentHTML('beforeend', components.settingsModal());
  }

  // Initialize settings after modal is in DOM
  initSettings();
}

// Settings & Theming Logic
const initSettings = () => {
  const modal = document.getElementById('settingsModal');
  const btn = document.getElementById('settingsBtn');
  const close = document.getElementById('closeSettings');
  const themeToggle = document.getElementById('themeToggle');
  const animToggle = document.getElementById('animToggle');

  // 1. Modal Logic
  if (modal && btn && close) {
    btn.addEventListener('click', () => modal.classList.add('active'));
    close.addEventListener('click', () => modal.classList.remove('active'));

    // Close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // 4. Sound Logic
  const soundToggle = document.getElementById('soundToggle');
  let isSoundOn = localStorage.getItem('site_sound') !== 'false'; // Default true

  // Pleasant Pop Sound using Web Audio API
  const playClickSound = () => {
    if (!isSoundOn) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Sound Design: Soft "Pop" / "Bubble"
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.1, ctx.currentTime); // Gentle volume
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error('Audio play failed', e);
    }
  };

  if (soundToggle) {
    soundToggle.checked = isSoundOn;
    soundToggle.addEventListener('change', (e) => {
      isSoundOn = e.target.checked;
      localStorage.setItem('site_sound', isSoundOn);
      if (isSoundOn) playClickSound(); // Preview sound
    });
  }

  // Global Click Listener for UI Sounds
  document.addEventListener('click', (e) => {
    // Check if clicked element is interactive
    const target = e.target.closest('button, a, input, .card, .slider-arrow, .menu-toggle, .tg-reaction');
    if (target) {
      playClickSound();
    }
  });

  // 2. Theme Toggle Logic
  const savedTheme = localStorage.getItem('site_theme') || 'light';
  const isDark = savedTheme === 'dark';

  document.body.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.checked = isDark;

    themeToggle.addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('site_theme', theme);
    });
  }

  // 3. Animation Logic
  const savedAnim = localStorage.getItem('site_animations');
  const isAnimEnabled = savedAnim === 'false' ? false : true;

  if (animToggle) {
    animToggle.checked = isAnimEnabled;
    if (!isAnimEnabled) document.body.classList.add('no-animations');

    animToggle.addEventListener('change', (e) => {
      const enabled = e.target.checked;
      if (enabled) {
        document.body.classList.remove('no-animations');
      } else {
        document.body.classList.add('no-animations');
      }
      localStorage.setItem('site_animations', enabled);
    });
  }
};
