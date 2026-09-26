const WHATSAPP_NUMBER = "51999999999";

function openContactModal(stage = "") {
  const modal = document.getElementById("contactModal");
  if (!modal) return;

  const stageSelect = document.getElementById("contactStage");
  if (stageSelect && stage) {
    stageSelect.value = stage;
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const firstInput = document.getElementById("contactName");
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initContactModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-contact]");
    if (trigger) {
      e.preventDefault();
      const stage = trigger.getAttribute("data-stage") || "";
      openContactModal(stage);
    }

    if (e.target.closest("[data-close-contact]")) {
      closeContactModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeContactModal();
    }
  });

  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("contactSubmitBtn");
  const successBox = document.getElementById("contactSuccess");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const name = document.getElementById("contactName").value.trim();
      const whatsapp = document.getElementById("contactWhatsapp").value.trim();
      const career = document.getElementById("contactCareer").value.trim();
      const stage = document.getElementById("contactStage").value;
      const situation = document.getElementById("contactSituation").value.trim();

      const stageLabels = {
        estoy_empezando: "Estoy empezando",
        tengo_proyecto: "Tengo proyecto",
        estoy_desarrollando: "Estoy desarrollando",
        tengo_observaciones: "Tengo observaciones",
        estoy_por_sustentar: "Estoy por sustentar",
      };

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i><span>Enviando...</span>';

      setTimeout(() => {
        submitBtn.innerHTML =
          '<i class="fa-solid fa-check"></i><span>¡Enviado con éxito!</span>';
        if (successBox) successBox.hidden = false;

        const message = `Hola PremiumNet, soy ${name}, de la carrera de ${career}. Mi etapa es: ${stageLabels[stage] || stage}. WhatsApp: +51${whatsapp}. Detalles: ${situation}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
          window.open(waUrl, "_blank");
          setTimeout(() => {
            closeContactModal();
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML =
              '<span>Solicitar orientación</span><i class="fa-solid fa-arrow-right btn__icon btn__icon--arrow"></i>';
            if (successBox) successBox.hidden = true;
          }, 800);
        }, 600);
      }, 800);
    });
  }
}

document.addEventListener("componentesCargados", initContactModal);

if (document.getElementById("contactModal")) {
  initContactModal();
}
