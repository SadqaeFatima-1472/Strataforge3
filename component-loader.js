document.addEventListener('DOMContentLoaded', function () {

  // 1. Load Navigation Header
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    fetch('nav.html')
      .then(res => res.text())
      .then(html => {
        navPlaceholder.innerHTML = html;
        initNavLogic(navPlaceholder);
      })
      .catch(err => console.error('Error loading nav:', err));
  }

  // 2. Load Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('footer.html')
      .then(res => res.text())
      .then(html => { footerPlaceholder.innerHTML = html; })
      .catch(err => console.error('Error loading footer:', err));
  }

  // Nav highlighting, dropdown, and mobile toggle logic
  function initNavLogic(container) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Active-link highlighting (top-level + dropdown items)
    const links = container.querySelectorAll('.nav-links a, .nav-dropdown-menu a');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
        const parentDropdown = link.closest('.nav-dropdown');
        if (parentDropdown) {
          const btn = parentDropdown.querySelector('.nav-dropdown-toggle');
          if (btn) btn.classList.add('active');
        }
      }
    });

    // Research dropdown
    const dropdownBtn = container.querySelector('.nav-dropdown-toggle');
    const dropdown = container.querySelector('.nav-dropdown');
    if (dropdownBtn && dropdown) {
      dropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        dropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Close dropdown on outside click or Escape
    document.addEventListener('click', function () {
      if (dropdown) {
        dropdown.classList.remove('open');
        if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdown) {
        dropdown.classList.remove('open');
        if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Mobile hamburger toggle
    const navToggle = container.querySelector('.nav-toggle');
    const navLinks = container.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close mobile menu after clicking a nav link (not the dropdown toggle itself)
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }
});
