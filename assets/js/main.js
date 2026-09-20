/* TreatTec - small progressive enhancements. No dependencies. */
(function () {
  "use strict";

  /* ---------------------------------------------------- mobile nav --- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  var mobile = window.matchMedia("(max-width: 820px)");

  function setNav(open) {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", String(open));
    links.hidden = !open;
  }

  function syncNav() {
    // The menu is only collapsible on small screens.
    setNav(!mobile.matches);
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobile.matches) setNav(false);
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && mobile.matches) setNav(false);
    });

    mobile.addEventListener("change", syncNav);
    syncNav();
  }

  /* ---------------------------------------------- current nav item --- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  /* --------------------------------------------------------- year --- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------ scroll reveal --- */
  var reveals = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reveals.length) {
    /* nothing to do */
  } else if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------- contact form --- */
  /* No backend yet: validate, then hand off to a mail client.
     Swap this out for a real endpoint (Formspree, Netlify Forms, your API). */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector(".form__status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var lines = [
        "Name: " + (data.get("name") || ""),
        "Company: " + (data.get("company") || ""),
        "Email: " + (data.get("email") || ""),
        "Interest: " + (data.get("interest") || ""),
        "",
        String(data.get("message") || "")
      ];

      var to = form.getAttribute("data-mailto") || "hello@example.com";
      var subject = "Website enquiry from " + (data.get("name") || "a visitor");

      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      if (status) status.textContent = "Opening your email app so you can send the message.";
    });
  }
})();
