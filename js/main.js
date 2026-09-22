/* Muhammed Khan — portfolio behaviour.
   Three small things: theme, scroll reveals, figure lightbox. */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- theme ------------------------------------------------------------ */

  var btn = document.getElementById("theme");
  var label = document.getElementById("theme-label");

  function read() {
    try { return localStorage.getItem("mk-theme"); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem("mk-theme", v); } catch (e) { /* private mode */ }
  }

  // What the page is showing right now, accounting for the OS default.
  function current() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "blueprint" : "paper";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (label) label.textContent = theme === "blueprint" ? "Paper" : "Blueprint";
    if (btn) btn.setAttribute("aria-label",
      "Switch to " + (theme === "blueprint" ? "paper" : "blueprint") + " theme");
  }

  var saved = read();
  if (saved === "paper" || saved === "blueprint") {
    apply(saved);
  } else if (label) {
    // No stored preference: follow the OS, but label the button correctly.
    label.textContent = current() === "blueprint" ? "Paper" : "Blueprint";
  }

  if (btn) {
    btn.addEventListener("click", function () {
      var next = current() === "blueprint" ? "paper" : "blueprint";
      apply(next);
      write(next);
    });
  }

  /* --- scroll reveals --------------------------------------------------- */

  var targets = document.querySelectorAll("[data-reveal]");

  if (reduced || !("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add("in");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- nav: mark the section in view ------------------------------------ */

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute("aria-current",
            a.getAttribute("href") === "#" + entry.target.id ? "true" : "false");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- figure lightbox -------------------------------------------------- */

  var box = document.getElementById("lightbox");
  var boxImg = document.getElementById("lb-img");
  var boxCap = document.getElementById("lb-cap");
  var closeBtn = document.getElementById("lb-close");
  var opener = null;

  function open(button) {
    var img = button.querySelector("img");
    if (!img) return;
    opener = button;
    boxImg.src = button.getAttribute("data-full") || img.currentSrc || img.src;
    boxImg.alt = img.alt || "";
    boxCap.textContent = button.getAttribute("data-cap") || img.alt || "";
    box.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    box.removeAttribute("open");
    boxImg.src = "";
    document.body.style.overflow = "";
    if (opener) { opener.focus(); opener = null; }
  }

  document.addEventListener("click", function (e) {
    var fig = e.target.closest ? e.target.closest(".fig") : null;
    if (fig) { open(fig); return; }
    // Click anywhere on the backdrop (but not the image itself) to dismiss.
    if (box.hasAttribute("open") && !e.target.closest("figure")) close();
  });

  if (closeBtn) closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box.hasAttribute("open")) close();
  });
}());
