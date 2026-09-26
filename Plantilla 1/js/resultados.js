function initResultadosCarousel() {
  const carousel = document.querySelector(".rs-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".rs-carousel__slides");
  const slides = carousel.querySelectorAll(".rs-carousel__slide");
  const prevBtn = carousel.querySelector(".rs-carousel__btn--prev");
  const nextBtn = carousel.querySelector(".rs-carousel__btn--next");
  const dotsContainer = carousel.querySelector(".rs-carousel__dots");

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 5000;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    dotsContainer.querySelectorAll(".rs-carousel__dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `rs-carousel__dot${i === 0 ? " is-active" : ""}`;
    dot.setAttribute("aria-label", `Ir al testimonio ${i + 1}`);
    dot.addEventListener("click", () => {
      goTo(i);
      startAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    startAutoplay();
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  startAutoplay();
}

document.addEventListener("DOMContentLoaded", initResultadosCarousel);
