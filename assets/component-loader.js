// assets/component-loader.js
//
// Loads the shared nav.html and footer.html partials into their
// placeholder divs, then wires up all nav interactivity:
// hamburger toggle, Research dropdown (click/keyboard), active-link
// highlighting, and closing the mobile menu when a link is clicked.
//
// site.js intentionally contains none of this logic — see the
// comment at the top of that file.

document.addEventListener('DOMContentLoaded', function () {
  loadComponent('nav-placeholder', 'nav.html', initNavLogic);
  loadComponent('footer-placeholder', 'footer.html');
});

function loadComponent(placeholderId, url, callback) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Failed to load ' + url + ': ' + response.status);
      }
      return response.text();
    })
    .then(function (html) {
      placeholder.innerHTML = html;
      if (typeof callback === 'function') callback();
    })
    .catch(function (err) {
      console.error(err);
    });
}

function initNavLogic() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('navLinks');
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        if (dropdown) dropdown.classList.remove('open');
      });
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(function (link) {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
}
