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

    // Touch/Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const sliderWrapper = document.querySelector('.slider-wrapper');

    if (sliderWrapper) {
      sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const swipeThreshold = 50; // минимальное расстояние для свайпа
        const horizontalDiff = touchEndX - touchStartX;
        const verticalDiff = Math.abs(touchEndY - touchStartY);

        // Проверяем что свайп горизонтальный (не вертикальный скролл)
        if (Math.abs(horizontalDiff) > swipeThreshold && Math.abs(horizontalDiff) > verticalDiff) {
          const visibleCards = getVisibleCards();

          if (horizontalDiff < 0) {
            // Свайп влево - следующая карточка
            currentIndex = (currentIndex + 1) % visibleCards.length;
          } else {
            // Свайп вправо - предыдущая карточка
            currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
          }

          updateCarousel();
        }
      }
    }

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
          <a href="rules.html" class="${activePage === 'rules' ? 'active' : ''}">Правила</a>
          <a href="contacts.html" class="${activePage === 'contacts' ? 'active' : ''}">Контакты</a>
        </div>
        <div class="menu-toggle">☰</div>
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
          <a href="https://t.me/meowwgirlssz" class="social-icon">✈️</a>
          <a href="https://t.me/giftgirlss" class="social-icon">🎁</a>
          <a href="https://t.me/sorryforlove" class="social-icon">💬</a>
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
    initMobileMenu(); // Re-initialize mobile menu after injection
    if (pageId === 'rules') initRulesAccordion();
  }
  if (footerEl) footerEl.innerHTML = components.footer();
}
