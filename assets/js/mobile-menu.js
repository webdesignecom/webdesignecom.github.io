document.addEventListener("DOMContentLoaded", function () {
    const fetchAndInsert = (url, elementId, callback) => {
      const el = document.getElementById(elementId);
      if (!el) {
        console.warn(`Element with ID '${elementId}' not found.`);
        return;
      }

      fetch(url)
        .then(res => res.text())
        .then(html => {
          el.innerHTML = html;
          if (typeof callback === 'function') callback(); // re-init
        })
        .catch(err => {
          console.error(`Error loading ${url}:`, err);
        });
    };

    // Load header and re-bind mobile menu after it's added
    fetchAndInsert('header.html', 'header-dynamic', initMobileMenu);
    fetchAndInsert('main-banner.html', 'main-banner-dynamic');
    fetchAndInsert('footer.html', 'footer-dynamic');
  });

  function initMobileMenu() {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }

    // Also rebind nav menu close on link click
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          if (mobileNavToggleBtn) {
            mobileNavToggleBtn.classList.add('bi-list');
            mobileNavToggleBtn.classList.remove('bi-x');
          }
        }
      });
    });

    // Rebind dropdown toggle
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
  }