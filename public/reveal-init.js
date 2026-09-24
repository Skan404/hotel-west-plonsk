(() => {
  const root = document.documentElement;
  root.classList.add('js');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    root.classList.add('reveal-ready');
    window.setTimeout(() => {
      if (!root.classList.contains('reveal-observing')) root.classList.remove('reveal-ready');
    }, 5000);
  }
})();
