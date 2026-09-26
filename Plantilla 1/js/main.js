function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initWhatsAppPill() {
  const pill = document.getElementById("wa-pill");
  const closeBtn = document.getElementById("wa-pill-close");

  if (closeBtn && pill) {
    closeBtn.addEventListener("click", () => {
      pill.classList.add("is-hidden");
    });
  }
}

function initStageCards() {
  const cards = document.querySelectorAll(".stage-card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".stage-card__link")) return;

      cards.forEach((c) => c.classList.remove("is-selected"));
      card.classList.add("is-selected");
    });
  });
}

function init() {
  initNavbarScroll();
  initWhatsAppPill();
  initStageCards();
}

document.addEventListener("componentesCargados", init);

if (document.querySelector(".navbar")) {
  init();
}
