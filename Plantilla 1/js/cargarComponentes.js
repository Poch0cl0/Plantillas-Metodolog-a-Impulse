function getBasePath() {
  const path = window.location.pathname;
  return path.includes("/sections/") ? "../" : "";
}

async function cargarComponente(id, archivo) {
  const basePath = getBasePath();
  const respuesta = await fetch(`${basePath}${archivo}`);
  if (!respuesta.ok) {
    console.error(`No se pudo cargar ${basePath}${archivo}`);
    return;
  }
  const html = await respuesta.text();
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.innerHTML = html;
  }
}

function marcarLinkActivo() {
  const ruta = window.location.pathname;
  const links = document.querySelectorAll(".navbar__link[data-path]");

  links.forEach((link) => {
    const path = link.getAttribute("data-path");
    if (ruta.includes(path)) {
      link.classList.add("is-active");
    }
  });

  if (
    ruta.endsWith("main.html") ||
    ruta.endsWith("/") ||
    ruta.endsWith("Plantilla%201") ||
    ruta.endsWith("Plantilla 1")
  ) {
    const inicio = document.querySelector('.navbar__link[data-path="inicio"]');
    if (inicio) inicio.classList.add("is-active");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    cargarComponente("navbar-container", "components/navbar.html"),
    cargarComponente("footer-container", "components/footer.html"),
    cargarComponente("whatsapp-float-container", "components/whatsapp-float.html"),
    cargarComponente("contact-modal-container", "components/contact-modal.html"),
  ]);

  marcarLinkActivo();

  document.dispatchEvent(new CustomEvent("componentesCargados"));
});
