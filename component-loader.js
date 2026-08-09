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
      .then(html => {
        footerPlaceholder.innerHTML = html;
      })
      .catch(err => console.error('Error loading footer:', err));
  }

  // Nav highlighting and toggle logic
  function initNavLogic(container) {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';

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

    const dropdownBtn = container.querySelector('.nav-dropdown-toggle');
    const dropdown = container.querySelector('.nav-dropdown');

    if (dropdownBtn && dropdown) {
      dropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });

      document.addEventListener('click', function () {
        dropdown.classList.remove('open');
      });
    }
  }
});
