/* Treattec — collapsible navigation on small screens.
   Progressive enhancement: without this file the links render as a plain
   stacked list, so navigation still works. */
(function () {
  "use strict";

  var btn = document.querySelector(".navtoggle");
  var links = document.getElementById("navlinks");
  if (!btn || !links) return;

  var small = window.matchMedia("(max-width: 719px)");

  function setOpen(open) {
    btn.setAttribute("aria-expanded", String(open));
    links.hidden = !open;
  }

  function sync() {
    // Collapsed on phones, always visible from tablet width up.
    if (small.matches) {
      setOpen(false);
    } else {
      links.hidden = false;
      btn.setAttribute("aria-expanded", "false");
    }
  }

  btn.addEventListener("click", function () {
    setOpen(btn.getAttribute("aria-expanded") !== "true");
  });

  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && small.matches) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && small.matches && btn.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      btn.focus();
    }
  });

  if (small.addEventListener) small.addEventListener("change", sync);
  else small.addListener(sync);

  sync();
})();
