/**
 * TESISPRO PERÚ — INTERACTIVE ENGINE (PLANTILLA 3)
 * Full interaction suite matching reference screenshots:
 * - Adaptive Route switcher (Ruta Metodológica)
 * - Multi-step academic diagnostic quiz
 * - Interactive appointment calendar & time-slot selector
 * - Animated FAQ accordions
 * - Resource download modal & notification toasts
 * - Quick contact/consultation modal
 * - Floating chat widget
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. RUTA METODOLÓGICA ADAPTATIVA (Interactive Tab Switcher)
  // ==========================================================================
  const routeData = {
    1: {
      stage: 'ETAPA 1 DE 4: DELIMITACIÓN Y PLAN DE TESIS',
      icon: 'fa-lightbulb',
      title: 'Elección de tema viable, problema de investigación y justificación',
      desc: 'Te ayudamos a definir variables de estudio con fuentes actualizadas Scopus y validar el proyecto de investigación ante el comité de tu universidad sin rechazos.',
      time: 'Tiempo estimado: 2 a 3 semanas',
      deliverable: 'Entregable: Matriz de consistencia y plan aprobado',
      actionTitle: 'Ruta recomendada',
      actionSub: 'Definición de línea de investigación y viabilidad institucional.',
      actionBtn: 'Ver mi siguiente paso'
    },
    2: {
      stage: 'ETAPA 2 DE 4: EJECUCIÓN Y TRABAJO DE CAMPO',
      icon: 'fa-chart-line',
      title: 'Estructuración del marco teórico, operacionalización y recojo de datos',
      desc: 'Te orientamos en la búsqueda de antecedentes en Scopus/WoS, la formulación de instrumentos de recolección válidos y el diseño de la muestra para que avances con total seguridad metodológica.',
      time: 'Tiempo estimado: 3 a 5 semanas',
      deliverable: 'Entregable: Capítulos I, II y III consolidados',
      actionTitle: 'Ruta recomendada',
      actionSub: 'Diagnóstico de congruencia entre variables y objetivos.',
      actionBtn: 'Ver mi siguiente paso'
    },
    3: {
      stage: 'ETAPA 3 DE 4: LEVANTAMIENTO DE OBSERVACIONES',
      icon: 'fa-file-circle-check',
      title: 'Subsanación metodológica y estadística de dictámenes de jurados',
      desc: 'Reestructuración de instrumentos, reinterpretación de hipótesis y respuesta formal y fundamentada a observaciones complejas para asegurar la aprobación unánime.',
      time: 'Tiempo estimado: 1 a 2 semanas',
      deliverable: 'Entregable: Informe de correcciones y matriz de observaciones',
      actionTitle: 'Ruta recomendada',
      actionSub: 'Auditoría forense de observaciones del dictamen académico.',
      actionBtn: 'Ver mi siguiente paso'
    },
    4: {
      stage: 'ETAPA 4 DE 4: DEFENSA Y SUSTENTACIÓN',
      icon: 'fa-graduation-cap',
      title: 'Simulacro con panel evaluador, balotario crítico y diapositivas de impacto',
      desc: 'Entrenamiento de oratoria académica y preparación rigurosa para responder con solvencia las preguntas desafiantes de los miembros del jurado examinador.',
      time: 'Tiempo estimado: 1 a 2 semanas',
      deliverable: 'Entregable: Diapositivas finales y balotario resuelto',
      actionTitle: 'Ruta recomendada',
      actionSub: 'Simulacro de sustentación 1 a 1 con panel de doctores.',
      actionBtn: 'Ver mi siguiente paso'
    }
  };

  const routeTabs = document.querySelectorAll('.route-tab');
  const routeStageEl = document.getElementById('route-stage-text');
  const routeTitleEl = document.getElementById('route-title-text');
  const routeDescEl = document.getElementById('route-desc-text');
  const routeTimeEl = document.getElementById('route-time-text');
  const routeDeliverableEl = document.getElementById('route-deliverable-text');
  const routeActionTitleEl = document.getElementById('route-action-title');
  const routeActionSubEl = document.getElementById('route-action-sub');

  routeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      routeTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const step = tab.getAttribute('data-step');
      const data = routeData[step];

      if (data) {
        if (routeStageEl) routeStageEl.innerHTML = `<i class="fa-solid ${data.icon}"></i> ${data.stage}`;
        if (routeTitleEl) routeTitleEl.textContent = data.title;
        if (routeDescEl) routeDescEl.textContent = data.desc;
        if (routeTimeEl) routeTimeEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${data.time}`;
        if (routeDeliverableEl) routeDeliverableEl.innerHTML = `<i class="fa-regular fa-file-lines"></i> ${data.deliverable}`;
        if (routeActionTitleEl) routeActionTitleEl.textContent = data.actionTitle;
        if (routeActionSubEl) routeActionSubEl.textContent = data.actionSub;
      }
    });
  });

  // ==========================================================================
  // 2. MULTI-STEP ACADEMIC DIAGNOSTIC QUIZ
  // ==========================================================================
  const quizSteps = document.querySelectorAll('.quiz-card__step-pane');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizPrevBtn = document.getElementById('quiz-prev-btn');
  const quizStepCount = document.getElementById('quiz-step-count');
  const quizPercent = document.getElementById('quiz-percent');
  const quizProgressFill = document.getElementById('quiz-progress-fill');

  let currentStep = 1;
  const totalSteps = quizSteps.length;

  function updateQuizUI() {
    quizSteps.forEach(pane => {
      pane.classList.remove('is-active');
      if (parseInt(pane.getAttribute('data-step')) === currentStep) {
        pane.classList.add('is-active');
      }
    });

    const percentVal = Math.round((currentStep / totalSteps) * 100);
    if (quizStepCount) quizStepCount.textContent = `Paso ${currentStep} de ${totalSteps}`;
    if (quizPercent) quizPercent.textContent = `${percentVal}% completado`;
    if (quizProgressFill) quizProgressFill.style.width = `${percentVal}%`;

    if (quizPrevBtn) {
      quizPrevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }

    if (quizNextBtn) {
      if (currentStep === totalSteps) {
        quizNextBtn.innerHTML = `<span>Finalizar diagnóstico</span> <i class="fa-solid fa-check"></i>`;
      } else {
        quizNextBtn.innerHTML = `<span>Siguiente pregunta</span> <i class="fa-solid fa-arrow-right"></i>`;
      }
    }
  }

  // Radio selection highlighting in options
  document.querySelectorAll('.quiz-option-label').forEach(label => {
    label.addEventListener('click', function() {
      const parent = this.closest('.quiz-options-grid');
      if (parent) {
        parent.querySelectorAll('.quiz-option-label').forEach(l => l.classList.remove('is-selected'));
      }
      this.classList.add('is-selected');
    });
  });

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateQuizUI();
      } else {
        // Complete quiz: show modal or booking scroll
        showToast('¡Diagnóstico completado! Redirigiendo a tu hoja de ruta personalizada...');
        const agendaSection = document.getElementById('agenda');
        if (agendaSection) {
          agendaSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  if (quizPrevBtn) {
    quizPrevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateQuizUI();
      }
    });
  }

  // ==========================================================================
  // 3. INTERACTIVE CALENDAR & TIME-SLOT BOOKING
  // ==========================================================================
  const calendarCells = document.querySelectorAll('.calendar-day-cell:not(.is-muted)');
  const bookingDayTitle = document.getElementById('booking-selected-day-title');
  const slotPills = document.querySelectorAll('.booking-slot-pill');
  const bookingForm = document.getElementById('booking-calendar-form');

  calendarCells.forEach(cell => {
    cell.addEventListener('click', function() {
      calendarCells.forEach(c => c.classList.remove('is-selected'));
      this.classList.add('is-selected');

      const dayNum = this.textContent.trim();
      if (bookingDayTitle) {
        bookingDayTitle.textContent = `Viernes ${dayNum} de Marzo, 2025`;
      }
    });
  });

  slotPills.forEach(pill => {
    pill.addEventListener('click', function() {
      slotPills.forEach(p => p.classList.remove('is-selected'));
      this.classList.add('is-selected');
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('booking-name');
      const emailInput = document.getElementById('booking-email');
      const name = nameInput ? nameInput.value : 'Estudiante';
      const email = emailInput ? emailInput.value : '';

      showToast(`¡Cita confirmada con éxito para ${name}! Hemos enviado el enlace de Google Meet a ${email}`);
    });
  }

  // ==========================================================================
  // 4. FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other accordions for clean UX
        faqItems.forEach(i => i.classList.remove('is-open'));

        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    }
  });

  // ==========================================================================
  // 5. NEWSLETTER QUICK UNLOCK FORM
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletter-email');
      const email = input ? input.value : '';
      if (email) {
        showToast(`¡Biblioteca desbloqueada! Hemos enviado el pack metodológico a ${email}`);
        if (input) input.value = '';
      }
    });
  }

  // ==========================================================================
  // 6. RESOURCE DOWNLOADS & CONSULTATION MODAL
  // ==========================================================================
  const modalOverlay = document.getElementById('consultation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const consultationForm = document.getElementById('modal-consultation-form');
  const modalTitle = document.getElementById('modal-title-text');
  const modalSub = document.getElementById('modal-sub-text');

  function openModal(title, subtitle) {
    if (modalTitle && title) modalTitle.textContent = title;
    if (modalSub && subtitle) modalSub.textContent = subtitle;
    if (modalOverlay) modalOverlay.classList.add('is-active');
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('is-active');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Trigger modal on action buttons
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-open-modal');
      if (type === 'evaluar') {
        openModal('Agenda tu Evaluación Gratuita', 'Completa tus datos y un metodólogo de TesisPro se comunicará contigo en menos de 2 horas.');
      } else if (type === 'recurso') {
        const resourceName = btn.getAttribute('data-resource-name') || 'el recurso académico';
        openModal(`Descargar ${resourceName}`, 'Indícanos dónde enviarte el archivo editable y las guías complementarias en formato APA 7.');
      } else {
        openModal('Solicitar Asesoría Personalizada', 'Déjanos tus datos para coordinar una reunión diagnóstica con un especialista de tu área.');
      }
    });
  });

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('¡Solicitud recibida! Un coordinador metodológico se contactará contigo vía WhatsApp / Correo.');
    });
  }

  // ==========================================================================
  // 7. TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #60a5fa;"></i> <span>${message}</span>`;
    toast.classList.add('is-visible');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 4500);
  }

  // ==========================================================================
  // 8. FLOATING CHAT BUTTON
  // ==========================================================================
  const floatingChatBtn = document.getElementById('floating-chat-btn');
  if (floatingChatBtn) {
    floatingChatBtn.addEventListener('click', () => {
      openModal('Chat en Vivo con un Asesor Metodológico', 'Escríbenos directamente para resolver dudas inmediatas sobre tu tesis o plan de asesoría.');
    });
  }

  // ==========================================================================
  // 9. MOBILE MENU TOGGLE
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('navbar-menu');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = mobileNav.style.display === 'flex';
      mobileNav.style.display = isVisible ? 'none' : 'flex';
      mobileNav.style.flexDirection = 'column';
      mobileNav.style.position = 'absolute';
      mobileNav.style.top = '76px';
      mobileNav.style.left = '0';
      mobileNav.style.width = '100%';
      mobileNav.style.backgroundColor = '#ffffff';
      mobileNav.style.padding = '24px';
      mobileNav.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      mobileNav.style.borderBottom = '1px solid #e2e8f0';
    });
  }

});
