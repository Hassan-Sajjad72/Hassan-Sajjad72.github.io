(() => {
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener(
      "pointermove",
      (event) => {
        glow.style.setProperty("--x", `${event.clientX}px`);
        glow.style.setProperty("--y", `${event.clientY}px`);
      },
      { passive: true }
    );
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav a")];

  const navObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!activeEntry) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${activeEntry.target.id}`
        );
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.2, 0.4] }
  );

  sections.forEach((section) => navObserver.observe(section));

  const nodes = [...document.querySelectorAll(".arch-node")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (nodes.length && !reduceMotion) {
    let current = 0;

    setInterval(() => {
      nodes.forEach((node) => node.classList.remove("active"));
      nodes[current].classList.add("active");
      current = (current + 1) % nodes.length;
    }, 1100);
  }
})();
