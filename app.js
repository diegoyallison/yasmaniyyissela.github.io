/**
 * MOTOR DE LA INVITACIÓN DIGITAL
 * Arquitectura idéntica a /example — 100% Estático (Sin Node.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.EVENT_DATA || {};

  const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // ======================================================
  // 1. SCROLL FADE-IN ANIMATIONS (Intersection Observer)
  // ======================================================
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  // ======================================================
  // 2. TOAST NOTIFICATION HELPER
  // ======================================================
  const toast = document.getElementById('toast-notice');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ======================================================
  // 3. RENDER CONTENT FROM datos.js
  // ======================================================
  function renderAll() {
    // Portada
    const elPretitle = document.getElementById('hero-pretitle');
    const elTitleScript = document.getElementById('hero-title-script');
    const elCoupleNames = document.getElementById('hero-couple-names');
    const elBadgeDay = document.getElementById('badge-day');
    const elBadgeMonth = document.getElementById('badge-month');
    const elBadgeYear = document.getElementById('badge-year');

    if (elPretitle && data.pre_titulo) elPretitle.textContent = data.pre_titulo;
    if (elTitleScript && data.titulo_script) elTitleScript.textContent = data.titulo_script;
    
    if (elCoupleNames && data.anfitriones) {
      if (data.anfitriones.esposo && data.anfitriones.esposa) {
        elCoupleNames.innerHTML = `${data.anfitriones.esposo} <span class="amp">&amp;</span> ${data.anfitriones.esposa}`;
      } else if (data.anfitriones.festejado) {
        elCoupleNames.textContent = data.anfitriones.festejado;
      }
    }

    // Fecha en badge y eventos
    if (data.fecha) {
      const [y, m, d] = data.fecha.split('-').map(Number);
      if (elBadgeDay) elBadgeDay.textContent = String(d);
      if (elBadgeMonth) elBadgeMonth.textContent = MONTHS[m - 1];
      if (elBadgeYear) elBadgeYear.textContent = String(y);

      const elEventDate = document.getElementById('event-date-text');
      const dateObj = new Date(y, m - 1, d);
      if (elEventDate) {
        elEventDate.textContent = `${DAYS[dateObj.getDay()]}, ${d} de ${MONTHS[m - 1]} de ${y}`;
      }

      const elFooterDate = document.getElementById('footer-date');
      if (elFooterDate) {
        elFooterDate.textContent = `${String(d).padStart(2, '0')} · ${String(m).padStart(2, '0')} · ${y}`;
      }
    }

    // Horas
    if (data.hora) {
      const [h, min] = data.hora.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      const elTime = document.getElementById('event-time-text');
      if (elTime) elTime.textContent = `${h12}:${String(min).padStart(2, '0')} ${period}`;
    }

    // Texto Bíblico (Formato /example)
    const elBiblicalWrap = document.getElementById('biblical-wrap');
    const elBiblical = document.getElementById('couple-biblical');
    if (data.texto_biblico && data.texto_biblico.mostrar !== false) {
      if (elBiblicalWrap) elBiblicalWrap.style.display = 'block';
      if (elBiblical) {
        elBiblical.innerHTML = `"${data.texto_biblico.cita}"<small id="couple-biblical-ref">— ${data.texto_biblico.referencia}</small>`;
      }
    } else if (elBiblicalWrap) {
      elBiblicalWrap.style.display = 'none';
    }

    // Cita / Frase en la foto
    const elQuote = document.getElementById('couple-quote');
    if (elQuote && data.frase_foto) {
      elQuote.textContent = `"${data.frase_foto}"`;
    }

    // Mensaje de Bendición / Bienvenida
    if (data.mensaje_bienvenida) {
      const elBTitle = document.getElementById('blessing-title');
      const elBText = document.getElementById('blessing-text');
      if (elBTitle && data.mensaje_bienvenida.titulo) {
        elBTitle.textContent = data.mensaje_bienvenida.titulo;
      }
      if (elBText && Array.isArray(data.mensaje_bienvenida.parrafos)) {
        elBText.innerHTML = data.mensaje_bienvenida.parrafos
          .map(p => `<p>${p}</p>`)
          .join('') + `<p class="signature">— ${data.mensaje_bienvenida.firma || 'Yasmani & Yissela'}</p>`;
      }
    }

    // Lugar
    if (data.lugar) {
      const elPlaceName = document.getElementById('event-place-name');
      const elPlaceAddr = document.getElementById('event-place-address');
      const btnMaps = document.getElementById('btn-open-maps');

      if (elPlaceName && data.lugar.nombre) elPlaceName.textContent = data.lugar.nombre;
      if (elPlaceAddr) {
        elPlaceAddr.innerHTML = `${data.lugar.direccion || ''}<br>${data.lugar.ciudad || ''}`;
      }
      if (btnMaps && data.lugar.maps_url) {
        btnMaps.href = data.lugar.maps_url;
      }
    }

    // Itinerario
    if (Array.isArray(data.itinerario) && data.itinerario.length > 0) {
      const elTimeline = document.getElementById('timeline-list');
      if (elTimeline) {
        elTimeline.innerHTML = data.itinerario.map(item => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-time">${item.hora}</div>
            <div class="timeline-event">${item.titulo}</div>
            ${item.descripcion ? `<div class="timeline-desc">${item.descripcion}</div>` : ''}
          </div>
        `).join('');
      }
    }

    // Vestimenta
    if (data.vestimenta) {
      const elBadge = document.getElementById('dresscode-badge');
      const elCab = document.getElementById('dresscode-caballeros');
      const elDam = document.getElementById('dresscode-damas');
      const elRules = document.getElementById('dresscode-rules-list');

      if (elBadge && data.vestimenta.codigo) elBadge.textContent = data.vestimenta.codigo;
      if (elCab && data.vestimenta.caballeros) elCab.textContent = data.vestimenta.caballeros;
      if (elDam && data.vestimenta.damas) elDam.textContent = data.vestimenta.damas;

      if (elRules) {
        let rulesHtml = '';
        if (Array.isArray(data.vestimenta.reglas_no)) {
          rulesHtml += data.vestimenta.reglas_no
            .map(r => `<li><span class="rule-no">✕</span> ${r}</li>`)
            .join('');
        }
        if (Array.isArray(data.vestimenta.reglas_si)) {
          rulesHtml += data.vestimenta.reglas_si
            .map(r => `<li><span class="rule-yes">✓</span> ${r}</li>`)
            .join('');
        }
        if (rulesHtml) elRules.innerHTML = rulesHtml;
      }
    }

    // Regalos y Encargados
    const secGifts = document.getElementById('gifts');
    if (data.regalos && data.regalos.mostrar !== false) {
      if (secGifts) secGifts.style.display = 'block';
      const elMsg = document.getElementById('gift-message');
      const elBankCard = document.getElementById('bank-card');
      const btnCopyBank = document.getElementById('btn-copy-bank');

      if (elMsg && data.regalos.mensaje) elMsg.textContent = data.regalos.mensaje;

      if (data.regalos.cuenta) {
        if (elBankCard) elBankCard.style.display = 'block';
        if (btnCopyBank) btnCopyBank.style.display = 'inline-flex';
        const elBankName = document.getElementById('bank-name');
        const elBankAcc = document.getElementById('bank-account');
        const elBankCci = document.getElementById('bank-cci');
        const elBankTit = document.getElementById('bank-titular');

        if (elBankName) elBankName.textContent = data.regalos.banco || 'Banco';
        if (elBankAcc) elBankAcc.textContent = data.regalos.cuenta;
        if (elBankCci) elBankCci.textContent = data.regalos.cci || 'N/A';
        if (elBankTit) elBankTit.textContent = data.regalos.titular || '';
        if (btnCopyBank) btnCopyBank.setAttribute('data-copy', data.regalos.cuenta);
      } else {
        if (elBankCard) elBankCard.style.display = 'none';
        if (btnCopyBank) btnCopyBank.style.display = 'none';
      }

      // Renderizar Encargados de Regalos
      const coordWrap = document.getElementById('gift-coordinators-wrap');
      const coordList = document.getElementById('coordinator-list');
      if (Array.isArray(data.regalos.encargados) && data.regalos.encargados.length > 0) {
        if (coordWrap) coordWrap.style.display = 'block';
        if (coordList) {
          coordList.innerHTML = data.regalos.encargados.map(c => {
            const phoneClean = (c.telefono || '').replace(/\D/g, '');
            const msgCoord = encodeURIComponent(`¡Hola! Me comunico para coordinar un presente con motivo del ${data.titulo} de ${data.anfitriones?.esposo || ''} y ${data.anfitriones?.esposa || ''}.`);
            return `
              <div class="coordinator-card">
                <div class="coordinator-info">
                  <p class="coordinator-name">${c.nombre}</p>
                  <p class="coordinator-role">${c.rol || 'Encargado(a)'}</p>
                </div>
                ${phoneClean ? `
                  <a href="https://wa.me/${phoneClean}?text=${msgCoord}" target="_blank" rel="noopener noreferrer" class="btn-contact-coord">
                    <span class="material-icons-outlined" style="font-size: 1rem;">chat</span> Contactar
                  </a>
                ` : ''}
              </div>
            `;
          }).join('');
        }
      } else if (coordWrap) {
        coordWrap.style.display = 'none';
      }
    } else if (secGifts) {
      secGifts.style.display = 'none';
    }

    // RSVP Deadline
    if (data.rsvp?.fecha_limite) {
      const elDeadline = document.getElementById('rsvp-deadline');
      try {
        const [y, m, d] = data.rsvp.fecha_limite.split('-').map(Number);
        if (elDeadline) elDeadline.textContent = `Favor confirmar antes del ${d} de ${MONTHS[m - 1]}`;
      } catch (e) {
        if (elDeadline) elDeadline.textContent = `Favor confirmar antes del ${data.rsvp.fecha_limite}`;
      }
    }

    // Footer Monogram
    const elFooterNames = document.getElementById('footer-names');
    if (elFooterNames && data.anfitriones?.monograma) {
      elFooterNames.innerHTML = data.anfitriones.monograma;
    }
  }

  // ======================================================
  // 4. COUNTDOWN TIMER
  // ======================================================
  function initCountdown() {
    if (!data.fecha || !data.hora) return;

    const [year, month, day] = data.fecha.split('-').map(Number);
    const [hours, minutes] = data.hora.split(':').map(Number);
    const target = new Date(year, month - 1, day, hours, minutes, 0).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      if (daysEl) daysEl.textContent = pad(Math.floor(diff / 864e5));
      if (hoursEl) hoursEl.textContent = pad(Math.floor((diff % 864e5) / 36e5));
      if (minsEl) minsEl.textContent = pad(Math.floor((diff % 36e5) / 6e4));
      if (secsEl) secsEl.textContent = pad(Math.floor((diff % 6e4) / 1e3));
    }

    tick();
    setInterval(tick, 1000);
  }

  // ======================================================
  // 5. AUDIO SYSTEM (Idéntico a /example)
  // FAB Flotante + Reproductor Inline en Hero
  // ======================================================
  function initAudio() {
    const audio = document.getElementById('bg-audio');
    const fab = document.getElementById('audio-fab');
    const fabIcon = document.getElementById('audio-fab-icon');
    const heroBtn = document.getElementById('hero-play-btn');
    const heroIcon = document.getElementById('hero-play-icon');
    const heroTitle = document.getElementById('hero-audio-title');
    const heroSub = document.getElementById('hero-audio-sub');

    if (data.musica) {
      if (audio && data.musica.audio_url) audio.src = data.musica.audio_url;
      if (heroTitle && data.musica.titulo) heroTitle.textContent = data.musica.titulo;
      if (heroSub && data.musica.subtitulo) heroSub.textContent = data.musica.subtitulo;
    }

    if (!audio) return;

    let isPlaying = false;

    function syncAudioUI(playing) {
      isPlaying = playing;
      const icon = playing ? 'pause' : 'play_arrow';

      if (fabIcon) fabIcon.textContent = icon;
      if (fab) fab.classList.toggle('playing', playing);

      if (heroIcon) heroIcon.textContent = icon;
      if (heroBtn) heroBtn.classList.toggle('playing', playing);
    }

    function toggleAudio() {
      if (isPlaying) {
        audio.pause();
        syncAudioUI(false);
      } else {
        audio.play().then(() => {
          syncAudioUI(true);
        }).catch(() => {
          // Autoplay prevenido por política del navegador
        });
      }
    }

    if (fab) fab.addEventListener('click', toggleAudio);
    if (heroBtn) heroBtn.addEventListener('click', toggleAudio);

    audio.addEventListener('ended', () => syncAudioUI(false));

    // Autoplay sutil tras la primera interacción del usuario en la pantalla
    const enableAudioOnFirstTap = () => {
      if (!isPlaying) {
        audio.play().then(() => {
          syncAudioUI(true);
        }).catch(() => {});
      }
      document.removeEventListener('click', enableAudioOnFirstTap);
      document.removeEventListener('touchstart', enableAudioOnFirstTap);
    };

    document.addEventListener('click', enableAudioOnFirstTap, { once: true });
    document.addEventListener('touchstart', enableAudioOnFirstTap, { once: true });
  }

  // ======================================================
  // 6. GOOGLE CALENDAR
  // ======================================================
  function initCalendar() {
    const btn = document.getElementById('btn-add-calendar');
    if (!btn || !data.fecha || !data.hora) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        const [year, month, day] = data.fecha.split('-').map(Number);
        const [hours, minutes] = data.hora.split(':').map(Number);

        const startDate = new Date(year, month - 1, day, hours, minutes);
        let endDate = new Date(startDate.getTime() + 7 * 3600 * 1000);

        if (data.hora_fin) {
          const [endH, endM] = data.hora_fin.split(':').map(Number);
          if (endH < hours) {
            endDate = new Date(year, month - 1, day + 1, endH, endM);
          } else {
            endDate = new Date(year, month - 1, day, endH, endM);
          }
        }

        const formatIsoUtc = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const datesParam = `${formatIsoUtc(startDate)}/${formatIsoUtc(endDate)}`;
        const titleParam = encodeURIComponent(data.titulo || '5° Aniversario de Bodas');
        const detailsParam = encodeURIComponent(
          `${data.pre_titulo || ''}\nLugar: ${data.lugar?.nombre || ''}\n${data.lugar?.direccion || ''}`
        );
        const locationParam = encodeURIComponent(
          `${data.lugar?.nombre || ''}, ${data.lugar?.direccion || ''}, ${data.lugar?.ciudad || ''}`
        );

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleParam}&dates=${datesParam}&details=${detailsParam}&location=${locationParam}`;
        window.open(url, '_blank');
      } catch (err) {
        console.error('Error calendar:', err);
      }
    });
  }

  // ======================================================
  // 7. COPIAR DIRECCIÓN Y CUENTA BANCARIA
  // ======================================================
  function initCopyButtons() {
    const btnCopyAddr = document.getElementById('btn-copy-address');
    if (btnCopyAddr) {
      btnCopyAddr.addEventListener('click', () => {
        const fullAddr = data.lugar?.direccion 
          ? `${data.lugar.nombre ? data.lugar.nombre + ' - ' : ''}${data.lugar.direccion}, ${data.lugar.ciudad || ''}`
          : '';
        if (fullAddr) {
          navigator.clipboard.writeText(fullAddr).then(() => {
            showToast('¡Dirección copiada al portapapeles!');
          });
        }
      });
    }

    const btnCopyBank = document.getElementById('btn-copy-bank');
    if (btnCopyBank) {
      btnCopyBank.addEventListener('click', () => {
        const acc = btnCopyBank.getAttribute('data-copy');
        if (acc) {
          navigator.clipboard.writeText(acc).then(() => {
            showToast('¡Número de cuenta copiado!');
          });
        }
      });
    }
  }

  // ======================================================
  // 8. WHATSAPP RSVP
  // ======================================================
  function initWhatsapp() {
    const btn = document.getElementById('btn-rsvp-whatsapp');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = (data.rsvp?.telefono || '').replace(/\D/g, '');
      const msg = data.rsvp?.mensaje_personalizado || `¡Hola! Confirmo mi asistencia al ${data.titulo}.`;

      if (!phone) {
        alert('Número de WhatsApp no configurado en datos.js');
        return;
      }

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });
  }

  // Inicializar todo
  renderAll();
  initCountdown();
  initAudio();
  initCalendar();
  initCopyButtons();
  initWhatsapp();
});
