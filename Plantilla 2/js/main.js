/**
 * TesisPro Perú - Interactive Application Logic
 * Landing Page Functional Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroDiagnosticWidget();
  initDiagnosticWizard();
  initModals();
  initResourceDownloads();
  initLeadMagnetForm();
  initAnimatedStats();
  initSmoothScroll();
  initBookingCalendar();
  initFaqAccordion();
  initBlogModals();
});

/* ==========================================================================
   1. Navbar & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');
  const navLinks = document.querySelectorAll('.navbar__link');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('navbar--scrolled');
    } else {
      navbar?.classList.remove('navbar--scrolled');
    }

    // Active state highlighting based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('is-active');
      }
    });
  });

  // Mobile menu toggle
  toggleBtn?.addEventListener('click', () => {
    menu?.classList.toggle('is-open');
    const icon = toggleBtn.querySelector('i');
    if (menu?.classList.contains('is-open')) {
      icon?.classList.remove('fa-bars');
      icon?.classList.add('fa-xmark');
    } else {
      icon?.classList.remove('fa-xmark');
      icon?.classList.add('fa-bars');
    }
  });

  // Close menu on item click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu?.classList.remove('is-open');
      const icon = toggleBtn?.querySelector('i');
      icon?.classList.remove('fa-xmark');
      icon?.classList.add('fa-bars');
    });
  });
}

/* ==========================================================================
   2. Hero Quick Diagnostic Widget (Dark Midnight Card)
   ========================================================================== */
function initHeroDiagnosticWidget() {
  let currentStep = 1;
  const totalSteps = 4;
  const selections = {
    grado: 'Título Profesional (Licenciatura / Ing.)',
    etapa: 'Plan / Proyecto de Tesis',
    plazo: '1 a 3 meses'
  };

  const stepCountText = document.getElementById('hero-widget-step-count');
  const percentageText = document.getElementById('hero-widget-percentage');
  const progressFill = document.getElementById('hero-widget-progress-fill');
  const nextBtn = document.getElementById('hero-widget-next-btn');

  // Radio card selections
  const optionCards = document.querySelectorAll('.hero-widget-option');
  optionCards.forEach((card) => {
    card.addEventListener('click', function () {
      const parentPane = this.closest('.widget-step-pane');
      if (!parentPane) return;

      parentPane.querySelectorAll('.hero-widget-option').forEach((c) => {
        c.classList.remove('is-selected');
        const icon = c.querySelector('.widget-option-radio i');
        if (icon) icon.className = '';
      });

      this.classList.add('is-selected');
      const icon = this.querySelector('.widget-option-radio i');
      if (icon) icon.className = 'fa-solid fa-check';

      const key = this.getAttribute('data-field');
      const val = this.getAttribute('data-value');
      if (key && val) {
        selections[key] = val;
      }
    });
  });

  // Next Step Action
  nextBtn?.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      currentStep++;
      updateWidgetView();
    } else {
      // Step 4 final action: connect directly or launch modal
      const phone = document.getElementById('hero-widget-phone')?.value || '';
      const message = `¡Hola TesisPro! Completé el diagnóstico rápido en la web:%0A- Grado: ${encodeURIComponent(selections.grado)}%0A- Etapa: ${encodeURIComponent(selections.etapa)}%0A- Plazo: ${encodeURIComponent(selections.plazo)}${phone ? `%0A- Contacto: ${encodeURIComponent(phone)}` : ''}%0ADeseo agendar mi evaluación gratuita.`;
      showToast('¡Diagnóstico completado! Redirigiendo a tu asesor asignado...');
      setTimeout(() => {
        window.open(`https://wa.me/51987654321?text=${message}`, '_blank');
      }, 1000);
    }
  });

  function updateWidgetView() {
    // Hide all panes
    document.querySelectorAll('.hero-widget-step-pane').forEach((pane) => {
      pane.classList.remove('is-active');
    });

    // Show active pane
    const activePane = document.getElementById(`hero-widget-step-${currentStep}`);
    if (activePane) activePane.classList.add('is-active');

    // Update progress numbers
    const pct = Math.round((currentStep / totalSteps) * 100);
    if (stepCountText) stepCountText.textContent = `Paso ${currentStep} de ${totalSteps}`;
    if (percentageText) percentageText.textContent = `${pct}% completado`;
    if (progressFill) progressFill.style.width = `${pct}%`;

    // Button label
    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.innerHTML = 'Iniciar por WhatsApp con mi diagnóstico <i class="fa-brands fa-whatsapp"></i>';
      } else {
        nextBtn.innerHTML = 'Continuar con mi diagnóstico <i class="fa-solid fa-arrow-right"></i>';
      }
    }
  }
}

/* ==========================================================================
   3. Full 4-Step Diagnostic Wizard (Section 13)
   ========================================================================== */
function initDiagnosticWizard() {
  let wizardStep = 1;
  const wizardData = {
    grado: 'Título Profesional (Licenciatura / Ing.)',
    etapa: 'Plan o Proyecto de Tesis (en elaboración)',
    plazo: '1 a 3 meses',
    nombre: '',
    telefono: '',
    universidad: ''
  };

  const stepNodes = document.querySelectorAll('.wizard-step-node');
  const stepLines = document.querySelectorAll('.wizard-stepper-line');
  const stepContents = document.querySelectorAll('.wizard-step-content');
  const backBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');

  // Option items selection
  const optionItems = document.querySelectorAll('.wizard-option-item');
  optionItems.forEach((item) => {
    item.addEventListener('click', function () {
      const parent = this.closest('.wizard-step-content');
      if (!parent) return;

      parent.querySelectorAll('.wizard-option-item').forEach((i) => i.classList.remove('is-selected'));
      this.classList.add('is-selected');

      const field = this.getAttribute('data-field');
      const value = this.getAttribute('data-value');
      if (field && value) {
        wizardData[field] = value;
      }

      // Auto advance to next step on choice for smooth UX
      if (wizardStep < 4) {
        setTimeout(() => {
          wizardStep++;
          updateWizard();
        }, 200);
      }
    });
  });

  // Direct node click
  stepNodes.forEach((node) => {
    node.addEventListener('click', function () {
      const targetStep = parseInt(this.getAttribute('data-step') || '1', 10);
      if (targetStep < wizardStep || targetStep === wizardStep) {
        wizardStep = targetStep;
        updateWizard();
      }
    });
  });

  // Prev & Next Buttons
  backBtn?.addEventListener('click', () => {
    if (wizardStep > 1) {
      wizardStep--;
      updateWizard();
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (wizardStep < 4) {
      wizardStep++;
      updateWizard();
    } else {
      // Submit wizard form
      const nombre = document.getElementById('wizard-input-nombre')?.value;
      const telefono = document.getElementById('wizard-input-telefono')?.value;
      const universidad = document.getElementById('wizard-input-universidad')?.value;

      if (!nombre || !telefono) {
        showToast('Por favor completa al menos tu nombre y WhatsApp para entregarte la ruta.');
        return;
      }

      wizardData.nombre = nombre;
      wizardData.telefono = telefono;
      wizardData.universidad = universidad || 'No especificada';

      showToast('¡Diagnóstico enviado con éxito! Un metodólogo especialista te contactará.');

      // WhatsApp redirection option
      setTimeout(() => {
        const msg = `Hola TesisPro, deseo mi informe de viabilidad:%0A- Nombre: ${encodeURIComponent(wizardData.nombre)}%0A- Universidad: ${encodeURIComponent(wizardData.universidad)}%0A- Grado: ${encodeURIComponent(wizardData.grado)}%0A- Etapa: ${encodeURIComponent(wizardData.etapa)}%0A- Plazo: ${encodeURIComponent(wizardData.plazo)}`;
        window.open(`https://wa.me/51987654321?text=${msg}`, '_blank');
      }, 1200);
    }
  });

  function updateWizard() {
    // Update step visibility
    stepContents.forEach((c) => c.classList.remove('is-active'));
    const activeContent = document.getElementById(`wizard-step-pane-${wizardStep}`);
    if (activeContent) activeContent.classList.add('is-active');

    // Update Stepper header
    stepNodes.forEach((node) => {
      const stepNum = parseInt(node.getAttribute('data-step') || '1', 10);
      node.classList.remove('is-active', 'is-completed');
      if (stepNum === wizardStep) {
        node.classList.add('is-active');
      } else if (stepNum < wizardStep) {
        node.classList.add('is-completed');
      }
    });

    stepLines.forEach((line, idx) => {
      if (idx + 1 < wizardStep) {
        line.classList.add('is-active');
      } else {
        line.classList.remove('is-active');
      }
    });

    // Toggle Back button visibility
    if (backBtn) {
      backBtn.style.visibility = wizardStep === 1 ? 'hidden' : 'visible';
    }

    // Button text update
    if (nextBtn) {
      if (wizardStep === 4) {
        nextBtn.innerHTML = 'Obtener mi plan de acción personalizado <i class="fa-solid fa-paper-plane"></i>';
        // Populate summary card in step 4
        const summaryGrado = document.getElementById('wizard-summary-grado');
        const summaryEtapa = document.getElementById('wizard-summary-etapa');
        const summaryPlazo = document.getElementById('wizard-summary-plazo');
        if (summaryGrado) summaryGrado.textContent = wizardData.grado;
        if (summaryEtapa) summaryEtapa.textContent = wizardData.etapa;
        if (summaryPlazo) summaryPlazo.textContent = wizardData.plazo;
      } else {
        nextBtn.innerHTML = 'Siguiente paso <i class="fa-solid fa-arrow-right"></i>';
      }
    }
  }
}

/* ==========================================================================
   4. Modals (Consultation, Video, Resource Unlock)
   ========================================================================== */
function initModals() {
  // Consultation Modal Triggers
  const openConsultationBtns = document.querySelectorAll(
    '.js-open-consultation, .btn-primary-agenda, .top-banner__cta, .btn-hero-primary, .btn-modality-primary, .btn-service-primary'
  );
  const consultationModal = document.getElementById('consultation-modal');

  openConsultationBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      consultationModal?.classList.add('is-open');
    });
  });

  // Video Testimonial Modal Triggers
  const videoBtns = document.querySelectorAll('.js-open-video');
  const videoModal = document.getElementById('video-modal');
  const videoAuthorEl = document.getElementById('video-modal-author');
  const videoRoleEl = document.getElementById('video-modal-role');

  videoBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const author = this.getAttribute('data-author') || 'Tesista Graduado';
      const role = this.getAttribute('data-role') || 'Magíster / Licenciado';
      if (videoAuthorEl) videoAuthorEl.textContent = author;
      if (videoRoleEl) videoRoleEl.textContent = role;
      videoModal?.classList.add('is-open');
    });
  });

  // Resource Unlock Modal Triggers
  const unlockBtns = document.querySelectorAll('.js-unlock-resource');
  const unlockModal = document.getElementById('unlock-modal');
  const unlockTitleEl = document.getElementById('unlock-modal-title');

  unlockBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const title = this.getAttribute('data-title') || 'Recurso Académico';
      if (unlockTitleEl) unlockTitleEl.textContent = title;
      unlockModal?.classList.add('is-open');
    });
  });

  // Close modals on click close button or backdrop
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.modal-close-btn')) {
        overlay.classList.remove('is-open');
      }
    });
  });

  // Consultation Form Submission
  const consultationForm = document.getElementById('consultation-form');
  consultationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    consultationModal?.classList.remove('is-open');
    showToast('¡Evaluación reservada con éxito! Nos comunicaremos vía WhatsApp hoy mismo.');
  });

  // Unlock Resource Form Submission
  const unlockForm = document.getElementById('unlock-form');
  unlockForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    unlockModal?.classList.remove('is-open');
    showToast('¡Recurso desbloqueado! Revisa tu bandeja de entrada con el enlace de descarga directa.');
  });
}

/* ==========================================================================
   5. Resource Direct Downloads
   ========================================================================== */
function initResourceDownloads() {
  const downloadBtns = document.querySelectorAll('.js-download-direct');
  downloadBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const title = this.getAttribute('data-title') || 'Documento';
      showToast(`Descargando: "${title}"... ¡Archivo generado con éxito!`);

      // Simulated instant file download
      const element = document.createElement('a');
      const fileContent = `TESISPRO PERÚ - RECURSO ACADÉMICO\nDocumento: ${title}\nAlineado a reglamentos SUNEDU y Ley Universitaria 30220.\nVisítanos en: https://tesispro.pe\n\nContenido de muestra para fines de verificación académica.`;
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
      element.setAttribute('download', `${title.replace(/\s+/g, '_')}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  });
}

/* ==========================================================================
   6. Lead Magnet Form (+30 Resources Suite)
   ========================================================================== */
function initLeadMagnetForm() {
  const form = document.getElementById('suite-lead-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value) {
      showToast('Por favor introduce tu correo electrónico.');
      return;
    }
    showToast('¡Acceso concedido! Te hemos enviado el compendio de +30 recursos a tu correo.');
    emailInput.value = '';
  });
}

/* ==========================================================================
   7. Animated Stats Counters
   ========================================================================== */
function initAnimatedStats() {
  const statNumbers = document.querySelectorAll('.js-counter');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((counter) => {
            const target = parseFloat(counter.getAttribute('data-target') || '0');
            const suffix = counter.getAttribute('data-suffix') || '';
            const prefix = counter.getAttribute('data-prefix') || '';
            const isFloat = target % 1 !== 0;
            let current = 0;
            const duration = 1500;
            const stepTime = 20;
            const increment = target / (duration / stepTime);

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = `${prefix}${isFloat ? current.toFixed(1) : Math.floor(current)}${suffix}`;
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   8. Smooth Scroll
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   9. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #34d399;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   10. Live Booking Calendar (Agenda en Vivo)
   ========================================================================== */
function initBookingCalendar() {
  let selectedDate = 'Miércoles 16 de Octubre';
  let selectedTime = '11:30 AM';

  const dayButtons = document.querySelectorAll('.calendar-day-btn:not(.is-muted)');
  const statusDateEl = document.getElementById('calendar-selected-date-text');
  const timeSlotButtons = document.querySelectorAll('.time-slot-btn');
  const bookingForm = document.getElementById('live-booking-form');

  // Day selection
  dayButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      dayButtons.forEach((b) => b.classList.remove('is-selected'));
      this.classList.add('is-selected');

      const dayNum = this.textContent.trim();
      const dayName = this.getAttribute('data-day') || 'Miércoles';
      selectedDate = `${dayName} ${dayNum} de Octubre`;

      if (statusDateEl) {
        statusDateEl.textContent = `Fecha seleccionada: ${selectedDate}`;
      }
    });
  });

  // Time slot selection
  timeSlotButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      timeSlotButtons.forEach((b) => b.classList.remove('is-selected'));
      this.classList.add('is-selected');
      selectedTime = this.getAttribute('data-time') || this.textContent.trim();
    });
  });

  // Form submission
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('booking-name')?.value;
    const celular = document.getElementById('booking-phone')?.value;
    const correo = document.getElementById('booking-email')?.value;
    const universidad = document.getElementById('booking-university')?.value;
    const descripcion = document.getElementById('booking-description')?.value || 'Evaluación inicial de tesis';

    if (!nombre || !celular || !correo) {
      showToast('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    showToast(`¡Sesión reservada con éxito para el ${selectedDate} a las ${selectedTime}!`);

    // WhatsApp redirection
    setTimeout(() => {
      const msg = `Hola TesisPro, agendé mi sesión gratuita de 30 minutos:%0A- Nombre: ${encodeURIComponent(nombre)}%0A- WhatsApp: ${encodeURIComponent(celular)}%0A- Universidad: ${encodeURIComponent(universidad || 'No indicada')}%0A- Fecha: ${encodeURIComponent(selectedDate)}%0A- Horario: ${encodeURIComponent(selectedTime)}%0A- Duda: ${encodeURIComponent(descripcion)}`;
      window.open(`https://wa.me/51987654321?text=${msg}`, '_blank');
    }, 1200);

    bookingForm.reset();
  });
}

/* ==========================================================================
   11. FAQ Accordion Logic
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPane = item.querySelector('.faq-answer-pane');

    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items for a clean accordion experience
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const otherPane = other.querySelector('.faq-answer-pane');
          if (otherPane) otherPane.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('is-open');
        if (answerPane) {
          answerPane.style.maxHeight = answerPane.scrollHeight + 'px';
        }
      } else {
        item.classList.remove('is-open');
        if (answerPane) {
          answerPane.style.maxHeight = null;
        }
      }
    });
  });

  // Open first FAQ by default
  if (faqItems[0]) {
    faqItems[0].classList.add('is-open');
    const firstPane = faqItems[0].querySelector('.faq-answer-pane');
    if (firstPane) {
      firstPane.style.maxHeight = firstPane.scrollHeight + 'px';
    }
  }
}

/* ==========================================================================
   12. Blog Preview Modals
   ========================================================================== */
function initBlogModals() {
  const blogModal = document.getElementById('blog-modal');
  const blogTitleEl = document.getElementById('blog-modal-title');
  const blogCategoryEl = document.getElementById('blog-modal-category');
  const blogMetaEl = document.getElementById('blog-modal-meta');
  const blogBodyEl = document.getElementById('blog-modal-body');
  const readLinks = document.querySelectorAll('.js-open-article');

  const articleDetails = {
    '1': {
      title: 'Las 5 claves para formular una pregunta de investigación sin inconsistencias',
      category: 'Metodología',
      meta: '5 min de lectura · Normas SUNEDU',
      body: '<p>Al delimitar el problema de investigación, una de las principales observaciones del jurado es formular preguntas bicéfalas o cerradas (de respuesta sí/no).</p><p><strong>1. Unidireccionalidad:</strong> La pregunta debe contener una sola variable dependiente y una independiente claramente identificables.</p><p><strong>2. Viabilidad temporal y de acceso:</strong> Asegura que los datos requeridos estén a tu alcance sin depender de autorizaciones imposibles.</p><p><strong>3. Taxonomía de verbos:</strong> Debe alinearse con el nivel de investigación (descriptivo, correlacional o explicativo) según la taxonomía de Bloom o Marzano.</p><p><strong>4. Contexto espacial y temporal:</strong> Delimita de forma explícita la institución, muestra y año de ejecución.</p><p><strong>5. Consistencia lógica:</strong> La pregunta debe trasladarse de forma idéntica al objetivo general sustituyendo el interrogativo por un verbo en infinitivo.</p>'
    },
    '2': {
      title: 'Cómo estructurar el marco teórico según APA 7 sin elevar el porcentaje de plagio',
      category: 'Normas APA 7',
      meta: '7 min de lectura · Citas & Turnitin',
      body: '<p>El software antiplagio Turnitin detecta similitudes literales. Para mantener tu índice por debajo del 12% reglamentario:</p><p><strong>1. Parafraseo con síntesis crítica:</strong> No te limites a cambiar sinónimos; sintetiza la idea central del autor original en tus propias palabras contrastándola con otros autores.</p><p><strong>2. Matriz de operacionalización teórica:</strong> Agrupa los antecedentes por dimensiones y variables, no por orden cronológico aislado.</p><p><strong>3. Citas de más de 40 palabras en bloque:</strong> Aplica sangría de 1.27 cm sin comillas, reservándolas exclusivamente para definiciones canónicas.</p><p><strong>4. Uso de Scopus y Web of Science:</strong> Prioriza artículos de los últimos 5 años de revistas indexadas sobre libros de texto generales.</p>'
    },
    '3': {
      title: 'Estrategias de oratoria para responder las preguntas difíciles del jurado',
      category: 'Sustentación',
      meta: '6 min de lectura · Oratoria y Jurado',
      body: '<p>La sustentación no consiste en leer 120 páginas, sino en defender el rigor del método:</p><p><strong>1. Regla de los 3 segundos:</strong> Haz una pausa deliberada antes de responder para estructurar tu argumento con calma.</p><p><strong>2. Reconocimiento de limitaciones:</strong> Ninguna tesis es perfecta. Si el jurado observa una limitación de la muestra, indícala como parte de las limitaciones declaradas en el capítulo metodológico.</p><p><strong>3. Diapositivas sin saturación de texto:</strong> Aplica un máximo de 6 líneas por lámina, apoyándote en diagramas de flujo y tablas sintéticas.</p><p><strong>4. Dominio del análisis estadístico:</strong> Conoce con precisión por qué elegiste pruebas paramétricas (ej. t-Student) o no paramétricas (ej. Wilcoxon/Mann-Whitney) según la prueba de normalidad.</p>'
    }
  };

  readLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('data-id') || '1';
      const data = articleDetails[id] || articleDetails['1'];

      if (blogTitleEl) blogTitleEl.textContent = data.title;
      if (blogCategoryEl) blogCategoryEl.textContent = data.category;
      if (blogMetaEl) blogMetaEl.textContent = data.meta;
      if (blogBodyEl) blogBodyEl.innerHTML = data.body;

      blogModal?.classList.add('is-open');
    });
  });
}

