(function () {
  "use strict";

  // Scroll toggle on header
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header || (!header.classList.contains('scroll-up-sticky') &&
                    !header.classList.contains('sticky-top') &&
                    !header.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Mobile Nav Toggle
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToggle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  // Hide mobile nav on nav link click
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  // Mobile dropdown toggles
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      const dropdown = this.parentNode.nextElementSibling;
      if (dropdown) {
        dropdown.classList.toggle('dropdown-active');
      }
      e.stopImmediatePropagation();
    });
  });

  // Scroll to top button
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // AOS Animation
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    } else {
      console.warn("AOS not loaded");
    }
  }
  window.addEventListener('load', aosInit);

  // GLightbox
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  // Swiper init
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const configElement = swiperElement.querySelector(".swiper-config");
      if (!configElement) return;

      try {
        const config = JSON.parse(configElement.innerHTML.trim());
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      } catch (err) {
        console.error("Swiper config error:", err);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  // Pure Counter
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  // FAQ toggle
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(item => {
    item.addEventListener('click', () => {
      item.parentNode.classList.toggle('faq-active');
    });
  });

  // Adjust scroll position for hash links on load
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop || "0";
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 100);
    }
  });

  // Scrollspy for navmenu
  const navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    const position = window.scrollY + 200;
    navmenulinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Typing animation for rotating text

document.addEventListener("DOMContentLoaded", function () {
    const textArray = [
      "50–70% more affordable than local agencies.",
      "Communication and work hours according to you.",
      "Less than your monthly coffee habit.",
      "Launch your dream with the cost of a weekend getaway."
    ];

    const typeJsText = document.querySelector(".animatedText");

    if (!typeJsText) return;

    // Ensure no text is shown initially
    typeJsText.textContent = "";

    let stringIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function typeJs() {
      const currentString = textArray[stringIndex];

      if (isTyping) {
        if (charIndex < currentString.length) {
          typeJsText.textContent += currentString.charAt(charIndex);
          charIndex++;
          setTimeout(typeJs, 80);
        } else {
          isTyping = false;
          setTimeout(typeJs, 1500); // Pause before erasing
        }
      } else {
        if (charIndex > 0) {
          typeJsText.textContent = currentString.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeJs, 40);
        } else {
          isTyping = true;
          stringIndex = (stringIndex + 1) % textArray.length;
          setTimeout(typeJs, 300); // Small delay before next string starts
        }
      }
    }

    // Start typing
    typeJs();
  });