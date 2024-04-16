class Observer {
  constructor() {
    this.config = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    this.instance = new IntersectionObserver((entries, observer) => {
      this.onUpdate(entries, observer);
    }, this.config);
  }

  add(element, toggleFn = (bool, entry) => {}) {
    this.instance.observe(element);
    element._toggleFn = toggleFn;
  }

  remove() {}

  kill() {}

  onUpdate(entries, observer) {
    entries.forEach((entry) => {
      let target = entry.target;
      target._toggleFn(entry.isIntersecting, entry);
      if (entry.isIntersecting) {
        target.classList.add("in-view");
      } else {
        target.classList.remove("in-view");
      }

      if (entry.isIntersecting) {
        target.classList.add("in-view-from-bottom");
      } else {
        if (entry.boundingClientRect.top > window.innerHeight * 0.5) {
          target.classList.remove("in-view-from-bottom");
        }
      }
    });
  }
}

export default Observer;
