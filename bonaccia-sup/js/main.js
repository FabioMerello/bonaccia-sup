(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* Anno corrente nel footer                                            */
  /* ------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* Header: stato "scrolled"                                            */
  /* ------------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  const onHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  onHeaderScroll();
  window.addEventListener("scroll", onHeaderScroll, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Menu mobile                                                          */
  /* ------------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  const openMenu = () => {
    mobileMenu?.classList.add("open");
    navToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    mobileMenu?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  navToggle?.addEventListener("click", openMenu);
  mobileClose?.addEventListener("click", closeMenu);
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  /* ------------------------------------------------------------------ */
  /* Reveal on scroll                                                     */
  /* ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------------------------------------------ */
  /* Parallax "galleggiante" — livelli hero animati sullo scroll          */
  /* ------------------------------------------------------------------ */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  const hero = document.querySelector(".hero");

  let ticking = false;
  const updateParallax = () => {
    ticking = false;
    if (!hero) return;
    const heroHeight = hero.offsetHeight;
    const scrollY = window.scrollY;
    if (scrollY > heroHeight) return;

    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const offset = scrollY * speed * 40;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  };

  const requestParallax = () => {
    if (!ticking && !prefersReducedMotion) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestParallax, { passive: true });
  updateParallax();

  /* Micro-movimento "galleggiante" continuo sui livelli dell'onda vicina */
  if (!prefersReducedMotion) {
    const nearLayer = document.querySelector(".layer-near");
    const farLayer = document.querySelector(".layer-far");
    let t = 0;
    const floatLoop = () => {
      t += 0.008;
      if (nearLayer) nearLayer.style.marginLeft = `${Math.sin(t) * 6}px`;
      if (farLayer) farLayer.style.marginLeft = `${Math.cos(t * 0.8) * 8}px`;
      window.requestAnimationFrame(floatLoop);
    };
    window.requestAnimationFrame(floatLoop);
  }

  /* ------------------------------------------------------------------ */
  /* Smooth anchor scroll con offset header (per link interni)           */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 88;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });
})();
