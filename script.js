/* ==========================================
   SARAH ATEF — script.js
   Animations, Interactions, 3D Effects
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========== LOADER ==========
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2200);
  });

  // ========== CUSTOM CURSOR ==========
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effects
    document.querySelectorAll('a, button, .service-card, .gallery-item, .price-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        follower.style.width = '60px';
        follower.style.height = '60px';
        follower.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.opacity = '0.5';
      });
    });
  }

  // ========== PARTICLES ==========
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const colors = ['#e91e8c', '#f06ab2', '#ffb3d1', '#ffd6e8', '#ff8cbf'];
    
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 8 + 3;
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 8 + 6}s;
        animation-delay: ${Math.random() * 5}s;
        opacity: ${Math.random() * 0.4 + 0.1};
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ========== NAVBAR ==========
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ========== BACK TO TOP ==========
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== SCROLL REVEAL ==========
  function addRevealClasses() {
    // About section
    const aboutVisual = document.querySelector('.about-visual');
    const aboutContent = document.querySelector('.about-content');
    if (aboutVisual) aboutVisual.classList.add('reveal-left');
    if (aboutContent) aboutContent.classList.add('reveal-right');

    // Service cards
    document.querySelectorAll('.service-card').forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 0.1}s`;
    });

    // Price cards
    document.querySelectorAll('.price-card').forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 0.08}s`;
    });

    // Gallery items
    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      item.classList.add('reveal');
      item.style.transitionDelay = `${i * 0.1}s`;
    });

    // Testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 0.1}s`;
    });

    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
      el.classList.add('reveal');
    });

    // Contact grid items
    document.querySelectorAll('.contact-info, .contact-form-wrap').forEach(el => {
      el.classList.add('reveal');
    });
  }

  addRevealClasses();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  // ========== 3D CARD TILT ==========
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // ========== PRICE TABS ==========
  const tabs = document.querySelectorAll('.price-tab');
  const panels = document.querySelectorAll('.price-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        // Re-trigger reveal animations for newly shown cards
        targetPanel.querySelectorAll('.price-card').forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 60);
        });
      }
    });
  });

  // ========== TESTIMONIALS SLIDER ==========
  const slider = document.getElementById('testimonialsSlider');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (slider) {
    const totalCards = slider.querySelectorAll('.testimonial-card').length;
    let currentSlide = 0;
    const visibleSlides = window.innerWidth < 768 ? 1 : 3;
    const maxSlide = totalCards - visibleSlides;

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i <= maxSlide; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentSlide = Math.max(0, Math.min(index, maxSlide));
      const cardWidth = slider.querySelectorAll('.testimonial-card')[0].offsetWidth;
      const gap = 24; // 1.5rem
      slider.style.transform = `translateX(${currentSlide * (cardWidth + gap)}px)`;

      // Update dots
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1 > maxSlide ? 0 : currentSlide + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1 < 0 ? maxSlide : currentSlide - 1);
      });
    }

    // Auto-play
    let autoPlay = setInterval(() => {
      goToSlide(currentSlide + 1 > maxSlide ? 0 : currentSlide + 1);
    }, 4000);

    slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
    slider.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        goToSlide(currentSlide + 1 > maxSlide ? 0 : currentSlide + 1);
      }, 4000);
    });

    // Touch/swipe support
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    slider.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
      }
    });
  }

  // ========== HERO PARALLAX ==========
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
    }
  });

  // ========== SMOOTH ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ========== STATS COUNTER ANIMATION ==========
  const statNums = document.querySelectorAll('.stat-num');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const text = entry.target.textContent;
        // Just a subtle scale animation for Arabic numerals
        entry.target.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
          entry.target.style.animation = '';
        }, 600);
      }
    });
  });
  statNums.forEach(el => statsObserver.observe(el));

  // ========== NAV BOOK BTN ==========
  const navBookBtn = document.querySelector('.nav-book-btn');
  if (navBookBtn) {
    navBookBtn.addEventListener('click', () => {
      const contact = document.getElementById('contact');
      if (contact) {
        const navHeight = navbar.offsetHeight;
        window.scrollTo({ top: contact.offsetTop - navHeight - 20, behavior: 'smooth' });
      }
    });
  }

  // ========== ABOUT CARD 3D HOVER ==========
  const aboutCard = document.querySelector('.about-card-front');
  if (aboutCard) {
    const aboutVisual = document.querySelector('.about-visual');
    if (aboutVisual) {
      aboutVisual.addEventListener('mousemove', (e) => {
        const rect = aboutVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rX = ((y - cy) / cy) * -5;
        const rY = ((x - cx) / cx) * 5;
        aboutCard.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg)`;
      });
      aboutVisual.addEventListener('mouseleave', () => {
        aboutCard.style.transform = 'rotateY(-5deg) rotateX(3deg)';
      });
    }
  }

});

// ========== FORM SUBMIT ==========
function submitForm() {
  const inputs = document.querySelectorAll('.form-input');
  let allFilled = true;
  inputs.forEach(input => {
    if (!input.value.trim() || input.value === '') {
      if (input.tagName !== 'SELECT' || input.value === '') {
        if (input.tagName === 'SELECT' && input.value === '') allFilled = false;
        else if (input.tagName !== 'SELECT' && !input.value.trim()) allFilled = false;
      }
    }
  });

  const btn = document.querySelector('.btn-primary.full-width');
  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ تم الإرسال بنجاح!';
    btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 3000);
  }
}
