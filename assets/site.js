// assets/site.js
//
// NOTE: All nav behavior (hamburger toggle, Research dropdown,
// active-link highlighting, close-on-link-click) lives in
// component-loader.js's initNavLogic(), because the nav is injected
// dynamically via fetch('nav.html'). This file previously duplicated
// the toggle logic, which risked double-binding click listeners on
// the same .nav-toggle element. That duplicate code has been removed.
//
// Add any non-nav, site-wide JS below.

document.addEventListener('DOMContentLoaded', function () {
  // (site-wide JS that isn't nav-related goes here)
});
