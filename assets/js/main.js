/**
 * VORTEX STUDIO - Main Interactive Engine
 * Handles Hero Video Controls, FAQ Accordion, Lead Form, and Dynamic Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const headerWrap = document.querySelector('.header');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      headerWrap.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        headerWrap.classList.remove('mobile-open');
      });
    });
  }

  // 3. Hero Video Controls
  const heroVideo = document.getElementById('hero-video');
  const toggleSound = document.getElementById('toggle-sound');
  const togglePlay = document.getElementById('toggle-play');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = document.getElementById('sound-text');
  const playIcon = document.getElementById('play-icon');
  const playText = document.getElementById('play-text');

  const icons = {
    muted: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    unmuted: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
    pause: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
    play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`
  };

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(e => console.log('Autoplay muted attempt', e));

    if (toggleSound) {
      toggleSound.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;
        if (heroVideo.muted) {
          soundIcon.innerHTML = icons.muted;
          soundText.textContent = 'Sound Off';
        } else {
          soundIcon.innerHTML = icons.unmuted;
          soundText.textContent = 'Sound On';
        }
      });
    }

    if (togglePlay) {
      togglePlay.addEventListener('click', () => {
        if (heroVideo.paused) {
          heroVideo.play();
          playIcon.innerHTML = icons.pause;
          playText.textContent = 'Pause';
        } else {
          heroVideo.pause();
          playIcon.innerHTML = icons.play;
          playText.textContent = 'Play';
        }
      });
    }
  }

  // 4. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Booking Form Budget Pill Selector
  const budgetPills = document.querySelectorAll('.budget-pill');
  const budgetInput = document.getElementById('selected-budget');
  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (budgetInput) {
        budgetInput.value = pill.getAttribute('data-value');
      }
    });
  });

  // 6. Lead Form Submission Feedback
  const bookingForm = document.getElementById('agency-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('.btn-form-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<span>Inquiry Sent Successfully! ✨</span>`;
      submitBtn.style.background = '#10b981';

      setTimeout(() => {
        bookingForm.reset();
        budgetPills.forEach(p => p.classList.remove('active'));
        if (budgetPills[0]) budgetPills[0].classList.add('active');
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 4000);
    });
  }

  // 7. Video Testimonial Preview Clicks (Simulate Modal or Play)
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const author = card.querySelector('.video-author')?.textContent;
      console.log('Video testimonial clicked for:', author);
    });
  });
});
