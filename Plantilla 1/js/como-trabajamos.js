function initStepperScroll() {
  const nodes = document.querySelectorAll("[data-target-fase]");

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      const targetId = node.getAttribute("data-target-fase");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
}

document.addEventListener("componentesCargados", initStepperScroll);

if (document.querySelector(".ctw-stepper")) {
  initStepperScroll();
}
