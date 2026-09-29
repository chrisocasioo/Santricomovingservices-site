/* ==========================================================
   Santrico Moving Services — site behavior
   ========================================================== */

// ---- Business details: edit these in one place ----
const SITE_CONFIG = {
  phoneDisplay: "(314) 228-1081",
  phoneE164: "+13142281081",
  email: "santricomovingservices@gmail.com",
  // Optional: a form backend URL (e.g. Formspree "https://formspree.io/f/xxxx").
  // If empty, the quote form opens the visitor's email app pre-filled instead.
  formEndpoint: "",
};

(function () {
  // Apply contact details
  document.querySelectorAll("[data-phone]").forEach((el) => (el.textContent = SITE_CONFIG.phoneDisplay));
  document.querySelectorAll("[data-phone-link]").forEach((el) => (el.href = "tel:" + SITE_CONFIG.phoneE164));
  document.querySelectorAll("[data-email]").forEach((el) => (el.textContent = SITE_CONFIG.email));
  document.querySelectorAll("[data-email-link]").forEach((el) => (el.href = "mailto:" + SITE_CONFIG.email));

  document.getElementById("year").textContent = new Date().getFullYear();

  // Header background on scroll
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const setNav = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setNav(false));

  // Reveal on scroll
  const targets = document.querySelectorAll(".card, .step, .highlight, .about-media, .about-copy, .faq details, .contact-info, .quote-form");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12 }
    );
    targets.forEach((t) => { t.classList.add("reveal"); io.observe(t); });
  }

  // Quote form
  const form = document.getElementById("quote-form");
  const serviceSelect = document.getElementById("service");
  const fromLabel = form.querySelector("[data-from-label]");
  const toField = form.querySelector("[data-to-field]");

  // Destination only applies to moves and deliveries
  const updateServiceFields = () => {
    const svc = serviceSelect.value;
    const noDestination = svc === "Junk Removal" || svc === "Furniture Assembly Only";
    toField.hidden = noDestination;
    if (noDestination) toField.querySelector("input").value = "";
    fromLabel.textContent = noDestination ? "Service Address (City / ZIP)" : "Pickup Location (City / ZIP)";
  };
  serviceSelect.addEventListener("change", updateServiceFields);

  // Service card links preselect the service in the form
  document.querySelectorAll("[data-service]").forEach((a) =>
    a.addEventListener("click", () => {
      serviceSelect.value = a.dataset.service;
      updateServiceFields();
    })
  );

  const status = form.querySelector(".form-status");
  const setStatus = (msg, cls) => { status.textContent = msg; status.className = "form-status " + (cls || ""); };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll("input, select, textarea").forEach((f) => {
      const bad = !f.checkValidity();
      f.classList.toggle("invalid", bad);
      if (bad && !firstInvalid) firstInvalid = f;
    });
    if (firstInvalid) {
      setStatus("Please fill in the highlighted fields.", "err");
      firstInvalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    if (SITE_CONFIG.formEndpoint) {
      setStatus("Sending…");
      try {
        const res = await fetch(SITE_CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        updateServiceFields();
        setStatus("Thank you! We'll be in touch shortly with your quote.", "ok");
      } catch {
        setStatus("Something went wrong. Please call or email us directly.", "err");
      }
      return;
    }

    const body = [
      `Service: ${data.service}`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Pickup / service address: ${data.from}`,
      `Destination: ${data.to || "N/A"}`,
      `Preferred date: ${data.date || "Flexible"}`,
      `Job size: ${data.size || "Not specified"}`,
      "",
      "Details:",
      data.details || "-",
    ].join("\n");
    window.location.href =
      `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(`Quote Request - ${data.service} - ${data.name}`)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email app to send the request…", "ok");
  });

  form.addEventListener("input", (e) => {
    if (e.target.classList.contains("invalid") && e.target.checkValidity()) e.target.classList.remove("invalid");
  });
})();
