const WHATSAPP_NUMBER = "51999999999";

const faqData = [
  {
    id: 1,
    q: "¿Trabajan con tesis de pregrado?",
    keywords: ["pregrado", "bachiller", "licenciatura", "carrera", "universidad"],
    tags: ["pregrado"],
    a: "Sí. Acompañamos investigaciones de bachillerato y licenciatura en todas las universidades del Perú, adaptándonos estrictamente a los formatos, líneas de investigación y rúbricas de tu facultad.",
    related: [2, 3, 6],
  },
  {
    id: 2,
    q: "¿También trabajan con maestrías?",
    keywords: ["maestria", "maestría", "doctorado", "posgrado", "master"],
    tags: ["maestria"],
    a: "Sí, contamos con metodólogos con amplia experiencia en posgrado (maestrías y doctorados), garantizando la profundidad teórica, solidez metodológica y exigencia académica requerida.",
    related: [1, 3, 9],
  },
  {
    id: 3,
    q: "¿Pueden ayudarme si mi tesis ya está avanzada?",
    keywords: ["avanzada", "avance", "empezada", "iniciada", "borrador"],
    tags: ["pregrado", "maestria"],
    a: "Por supuesto. Realizamos un diagnóstico inicial para revisar el avance de tu documento, identificar observaciones preliminares y definir un plan de trabajo focalizado desde el punto exacto en que te encuentras.",
    related: [4, 10, 8],
  },
  {
    id: 4,
    q: "¿Pueden ayudarme a levantar observaciones?",
    keywords: ["observaciones", "observacion", "dictamen", "jurado", "revisor", "levantar"],
    tags: ["observaciones"],
    a: "Es una de nuestras especialidades principales. Analizamos el dictamen emitido por tus jurados o dictaminadores y elaboramos una matriz de consistencia y absolución detallada punto por punto para asegurar la aprobación.",
    related: [3, 5, 10],
  },
  {
    id: 5,
    q: "¿Realizan análisis estadístico?",
    keywords: ["estadistica", "estadístico", "spss", "r", "python", "stata", "amos", "hipotesis", "datos"],
    tags: ["estadistica"],
    a: "Sí. Realizamos procesamiento descriptivo e inferencial, pruebas de hipótesis paramétricas y no paramétricas, y modelamiento en SPSS, R, Python, STATA o AMOS, incluyendo tablas normalizadas en formato APA 7 y su respectiva interpretación científica.",
    related: [6, 9, 4],
  },
  {
    id: 6,
    q: "¿Atienden diferentes áreas profesionales?",
    keywords: ["areas", "carreras", "profesionales", "salud", "ingenieria", "derecho", "empresas"],
    tags: ["pregrado", "maestria"],
    a: "Sí. Nuestro equipo multidisciplinario abarca Ciencias de la Salud, Ingenierías, Ciencias Empresariales, Derecho, Humanidades y Ciencias Sociales.",
    related: [1, 2, 7],
  },
  {
    id: 7,
    q: "¿La asesoría puede ser virtual?",
    keywords: ["virtual", "presencial", "online", "distancia", "zoom", "meet", "trujillo"],
    tags: [],
    a: "Sí, brindamos asesoría virtual a través de sesiones en vivo y seguimiento colaborativo para tesistas en todo el Perú y el extranjero, así como atención presencial en nuestra sede en Trujillo.",
    related: [8, 1, 6],
  },
  {
    id: 8,
    q: "¿Cómo funciona el primer contacto?",
    keywords: ["contacto", "proceso", "primer", "pasos", "procedimiento", "whatsapp"],
    tags: [],
    a: "Nos escribes vía WhatsApp o completas el formulario enviando tu tema, avance o dictamen. Un asesor especialista evalúa la viabilidad de tu caso y te presentamos una propuesta y cronograma de trabajo.",
    related: [10, 7, 3],
  },
  {
    id: 9,
    q: "¿Puedo contratar solamente una etapa?",
    keywords: ["etapa", "modular", "partes", "solo capitulo", "solo estadistica", "solo diseno"],
    tags: ["estadistica"],
    a: "Sí. Puedes solicitar asesoría modular por etapas específicas (solo diseño metodológico, solo tratamiento de datos estadísticos, corrección de estilo y normas APA, o preparación para sustentación).",
    related: [5, 3, 2],
  },
  {
    id: 10,
    q: "¿Cómo solicito una evaluación?",
    keywords: ["solicitar", "evaluacion", "evaluación", "diagnostico", "cotizar", "precio"],
    tags: ["observaciones"],
    a: "Solo necesitas hacer clic en «Solicitar diagnóstico» o contactarnos directamente por WhatsApp compartiendo el estado actual de tu documento o las observaciones recibidas.",
    related: [8, 4, 3],
  },
];

function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[tag] || tag
  );
}

function findBestMatch(query) {
  const normalized = normalizeText(query.trim());
  if (!normalized) return null;

  for (const item of faqData) {
    if (normalizeText(item.q).includes(normalized) || normalized.includes(normalizeText(item.q))) {
      return item;
    }
    for (const kw of item.keywords) {
      if (normalized.includes(normalizeText(kw))) {
        return item;
      }
    }
  }

  return null;
}

function renderAccordion() {
  const container = document.getElementById("faqAccordion");
  if (!container) return;

  container.innerHTML = faqData
    .map(
      (item) => `
    <article class="fq-item" data-faq-id="${item.id}" data-keywords="${escapeHTML(item.keywords.join(" "))} ${escapeHTML(item.tags.join(" "))}">
      <button type="button" class="fq-item__btn" aria-expanded="false">
        <span class="fq-item__left">
          <span class="fq-item__num">${String(item.id).padStart(2, "0")}</span>
          <span class="fq-item__title">${escapeHTML(item.q)}</span>
        </span>
        <i class="fa-solid fa-chevron-down fq-item__chevron"></i>
      </button>
      <div class="fq-item__content">
        <div class="fq-item__answer">${escapeHTML(item.a)}</div>
      </div>
    </article>
  `
    )
    .join("");

  container.querySelectorAll(".fq-item__btn").forEach((btn) => {
    btn.addEventListener("click", () => toggleAccordionItem(btn.closest(".fq-item")));
  });
}

function toggleAccordionItem(item, forceOpen = false) {
  if (!item) return;

  const isOpen = item.classList.contains("is-open");
  document.querySelectorAll(".fq-item.is-open").forEach((openItem) => {
    openItem.classList.remove("is-open");
    openItem.querySelector(".fq-item__btn")?.setAttribute("aria-expanded", "false");
  });

  if (!isOpen || forceOpen) {
    item.classList.add("is-open");
    item.querySelector(".fq-item__btn")?.setAttribute("aria-expanded", "true");
  }
}

function updateResultCount(visible) {
  const countEl = document.getElementById("faqResultCount");
  const emptyEl = document.getElementById("faqEmpty");
  if (countEl) {
    countEl.textContent = `${visible} pregunta${visible === 1 ? "" : "s"} disponible${visible === 1 ? "" : "s"}`;
  }
  if (emptyEl) {
    emptyEl.hidden = visible > 0;
  }
}

function filterFaqs(query) {
  const q = normalizeText(query);
  const items = document.querySelectorAll(".fq-item");
  let visible = 0;

  items.forEach((item) => {
    const id = Number(item.getAttribute("data-faq-id"));
    const data = faqData.find((f) => f.id === id);
    const haystack = normalizeText(
      `${data?.q || ""} ${item.getAttribute("data-keywords") || ""} ${data?.a || ""}`
    );

    const match = !q || haystack.includes(q);
    item.hidden = !match;
    if (match) visible += 1;
  });

  updateResultCount(visible);
}

function applyFilterTag(tag) {
  const input = document.getElementById("faqSearchInput");
  if (input) {
    input.value = tag;
    filterFaqs(tag);
  }
}

function appendUserMessage(text) {
  const area = document.getElementById("faqChatMessages");
  if (!area) return;

  const bubble = document.createElement("div");
  bubble.className = "fq-chat__bubble fq-chat__bubble--user chat-bubble-enter";
  bubble.textContent = text;
  area.appendChild(bubble);
  area.scrollTop = area.scrollHeight;
}

function showTypingIndicator() {
  const area = document.getElementById("faqChatMessages");
  if (!area) return null;

  const typing = document.createElement("div");
  typing.className = "fq-chat__bubble fq-chat__bubble--bot chat-bubble-enter";
  typing.id = "faqTypingIndicator";
  typing.innerHTML =
    '<span style="opacity:0.7"><i class="fa-solid fa-ellipsis fa-fade"></i> Escribiendo...</span>';
  area.appendChild(typing);
  area.scrollTop = area.scrollHeight;
  return typing;
}

function removeTypingIndicator() {
  document.getElementById("faqTypingIndicator")?.remove();
}

function renderSuggestionChips(relatedIds) {
  const wrap = document.createElement("div");
  wrap.className = "fq-chat__chips";

  relatedIds.forEach((id) => {
    const item = faqData.find((f) => f.id === id);
    if (!item) return;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "fq-chat__chip";
    chip.textContent = item.q;
    chip.addEventListener("click", () => handleUserQuestion(item.q));
    wrap.appendChild(chip);
  });

  return wrap;
}

function appendBotMessage(html, relatedIds = []) {
  const area = document.getElementById("faqChatMessages");
  if (!area) return;

  const bubble = document.createElement("div");
  bubble.className = "fq-chat__bubble fq-chat__bubble--bot chat-bubble-enter";
  bubble.innerHTML = html;
  area.appendChild(bubble);

  if (relatedIds.length) {
    area.appendChild(renderSuggestionChips(relatedIds));
  }

  area.scrollTop = area.scrollHeight;
}

function handleUserQuestion(text) {
  appendUserMessage(text);

  const typing = showTypingIndicator();
  const match = findBestMatch(text);

  setTimeout(() => {
    removeTypingIndicator();

    if (match) {
      appendBotMessage(
        `<strong>${escapeHTML(match.q)}</strong><br><br>${escapeHTML(match.a)}`,
        match.related || []
      );
      const accordionItem = document.querySelector(`[data-faq-id="${match.id}"]`);
      if (accordionItem) {
        accordionItem.hidden = false;
        toggleAccordionItem(accordionItem, true);
        accordionItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } else {
      appendBotMessage(
        `Gracias por tu consulta. Para darte una respuesta precisa respecto a tu universidad, un asesor metodológico puede ayudarte directamente.<br><br>
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, tengo la siguiente consulta: ${text}`)}" target="_blank" rel="noopener noreferrer" style="color:var(--color-professional-blue);font-weight:600;">Contactar por WhatsApp</a>
        <br><br>
        <button type="button" class="fq-chat__chip" data-open-contact style="margin-top:0.5rem">Solicitar diagnóstico gratuito</button>`
      );
    }
  }, 700);
}

function initFaqWelcomeChips() {
  const container = document.getElementById("faqWelcomeChips");
  if (!container) return;

  const suggestions = [
    faqData[0].q,
    faqData[4].q,
    faqData[3].q,
  ];

  suggestions.forEach((q) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "fq-chat__chip";
    chip.textContent = q;
    chip.addEventListener("click", () => handleUserQuestion(q));
    container.appendChild(chip);
  });
}

function initFaqPage() {
  if (!document.querySelector(".fq-workspace")) return;

  renderAccordion();
  initFaqWelcomeChips();
  updateResultCount(faqData.length);

  const searchInput = document.getElementById("faqSearchInput");
  const clearBtn = document.getElementById("faqClearSearch");

  searchInput?.addEventListener("input", (e) => {
    filterFaqs(e.target.value);
    if (clearBtn) clearBtn.hidden = !e.target.value;
  });

  clearBtn?.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
      filterFaqs("");
      clearBtn.hidden = true;
    }
  });

  document.querySelectorAll(".fq-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".fq-filter").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const tag = btn.getAttribute("data-filter") || "";
      if (tag) {
        applyFilterTag(tag);
      } else {
        if (searchInput) searchInput.value = "";
        filterFaqs("");
        if (clearBtn) clearBtn.hidden = true;
      }
    });
  });

  const chatForm = document.getElementById("faqChatForm");
  const chatInput = document.getElementById("faqChatInput");

  chatForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = chatInput?.value.trim();
    if (!value) return;
    if (chatInput) chatInput.value = "";
    handleUserQuestion(value);
  });
}

document.addEventListener("DOMContentLoaded", initFaqPage);
