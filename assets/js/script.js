// ====== BOOKING API (GLOBAL) ======
const BOOKING_API_URL = "https://script.google.com/macros/s/AKfycbw4JITeY1enXFBkMLXYGYI2rDWhG550yGqMZAaOAazQj2-wpvOSyZT4iYnpgkR01XUQtQ/exec";

// --- Función para ocultar el loader ---
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
    console.log("Loader ocultado"); 
  }
}

// Intentar ocultar el loader cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded disparado");
  hideLoader();
});

// Intentar ocultar el loader cuando toda la ventana haya cargado
window.addEventListener('load', function() {
  console.log("Window load disparado");
  hideLoader();
});

// Fallback por si acaso: ocultar el loader después de 5 segundos como máximo
setTimeout(function() {
  console.log("Fallback: Ocultando loader después de 5 segundos");
  hideLoader();
}, 5000);

// --- Menú hamburguesa para mobile ---
const hamburger = document.getElementById('hamburger');
const slidingMenu = document.getElementById('slidingMenu'); 

if (hamburger && slidingMenu) { 
  hamburger.addEventListener('click', function() {
    slidingMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// --- Funcionalidad de scroll para la navbar de escritorio ---
let lastScrollTop = 0;
const navbar = document.getElementById('desktopNavbar'); 

if(navbar) { 
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
}

// --- Funcionalidad para el logo del footer ---
const footerLogo = document.getElementById('footerLogo');
if (footerLogo) { 
  footerLogo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// --- Funcionalidad para abrir el modal de tecnología  ---
const imageItems = document.querySelectorAll('.image-item');
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const closeModal = document.querySelector('.close');

if (imageItems.length > 0 && modal && modalTitle && modalText && closeModal) { 
  imageItems.forEach(item => {
    item.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-description');

      modalTitle.textContent = title;
      modalText.textContent = description;
      modal.style.display = 'block';
    });
  });

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// --- Tab functionality for Gilberto page and Gera page  ---
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');


  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');


        if (tabId) {
          const targetPane = document.getElementById(tabId);

          if (targetPane) {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            this.classList.add('active');
            targetPane.classList.add('active');
          } else {
            console.warn(`No se encontró un panel con id='${tabId}' asociado al botón.`);
          }
        } else {
          console.warn('El botón de tab no tiene un atributo data-tab válido.');
        }
      });
    });
  } else {
    console.info('No se encontraron elementos de pestañas (.tab-button o .tab-pane) en esta página.');
  }

  // Funcionalidad para abrir el modal de servicios y áreas de trabajo
  // Seleccionar todos los elementos de servicio y área
  const serviceItems = document.querySelectorAll('.service-item');
  const areaItems = document.querySelectorAll('.area-item');
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalTitle = document.getElementById('modalTitle');
  const serviceModalText = document.getElementById('modalText');
  const closeServiceModal = document.querySelector('.close');

  // Definir descripciones para cada servicio y área
  const serviceDescriptions = {
    'Electroterapia': 'Uso de corrientes eléctricas de baja frecuencia para estimular los músculos, reducir el dolor, acelerar la cicatrización y mejorar la circulación sanguínea.',
    'Baños de hielo': 'Aplicación de frío intenso para reducir la inflamación, aliviar el dolor agudo y acelerar la recuperación muscular tras lesiones o entrenamientos intensos.',
    'Traumatología y ortopedia a todas las edades': 'Prevención, diagnóstico y tratamiento de lesiones y patologías del sistema músculo-esquelético en pacientes de todas las edades.',
    'Rehabilitación oncológica': 'Apoyo fisioterapéutico integral para pacientes oncológicos, enfocado en la gestión del dolor, la fatiga, el linfedema y la mejora de la calidad de vida durante y después del tratamiento.',
    'Ejercicio terapéutico': 'El ejercicio terapéutico se define como la ejecución planificada y sistemática de movimientos corporales, posturas o actividades físicas, prescrita con el objetivo de corregir deficiencias, prevenir lesiones, mejorar la función física y optimizar la salud.',
    'Fisioterapia linfática': 'Drenaje manual para estimular el sistema linfático, reducir edemas y mejorar la salud de los tejidos.',
    'Rehabilitación articulación ATM': 'Tratamiento específico para problemas de la articulación temporomandibular, como dolor, bloqueo o ruidos.',
    'Descarga muscular': 'Técnica para liberar la tensión acumulada en los músculos, mejorar la oxigenación y acelerar la recuperación.',
    'Punción seca': 'Método invasivo que utiliza agujas finas para tratar puntos gatillo musculares, liberando tensión y aliviando el dolor crónico.',
    'Presoterapia': 'Terapia por presión controlada que mejora la circulación sanguínea y linfática, reduciendo la retención de líquidos y la sensación de piernas cansadas.',
    'Electropunción': 'Técnica que combina la inserción de agujas (similar a la acupuntura) con la aplicación de una corriente eléctrica suave para potenciar el efecto terapéutico.',
    'Rehabilitación vascular periférica': 'Tratamiento para enfermedades de la circulación periférica, como insuficiencia venosa, edemas y úlceras, utilizando técnicas de drenaje y ejercicios específicos.'
  };

  const areaDescriptions = {
    'Oncología': 'Apoyo fisioterapéutico integral para pacientes oncológicos, enfocado en la gestión del dolor, la fatiga, el linfedema y la mejora de la calidad de vida durante y después del tratamiento.',
    'Osteopatía': 'Tratamiento manual que busca restablecer el equilibrio del cuerpo mediante técnicas suaves y precisas, enfocadas en la movilidad de las articulaciones, tejidos blandos y órganos internos.',
    'Ortopédica': 'Prevención, diagnóstico y tratamiento de lesiones y patologías del sistema músculo-esquelético.',
    'Deportiva': 'Prevención, tratamiento y rehabilitación de lesiones deportivas, optimizando el rendimiento y acortando los tiempos de recuperación para atletas de todos los niveles.',
    'Geriátrica': 'Enfoque especializado en adultos mayores para prevenir caídas, mejorar la movilidad, fortalecer músculos y mantener la independencia funcional.',
    'Traumatología': 'Tratamiento de lesiones agudas y crónicas producidas por traumatismos, como esguinces, fracturas y contusiones.',
    'Vascular periférica': 'Tratamiento para enfermedades de la circulación periférica, como insuficiencia venosa, edemas y úlceras, utilizando técnicas de drenaje y ejercicios específicos.',
    'Linfedema y Lipedema': 'Manejo especializado de estos trastornos del sistema linfático y adiposo, con terapia manual, vendajes y ejercicios para controlar el volumen y mejorar la funcionalidad.'
  };

  // Función para abrir el modal con la información correspondiente
  function openServiceModal(title, description) {
    serviceModalTitle.textContent = title;
    serviceModalText.textContent = description;
    serviceModal.style.display = 'block';
  }

  // Agregar evento click a los elementos de servicio
  serviceItems.forEach(item => {
    item.addEventListener('click', function() {
      const serviceName = this.getAttribute('data-service');
      const description = serviceDescriptions[serviceName] || 'Descripción no disponible.';
      openServiceModal(serviceName, description);
    });
  });

  // Agregar evento click a los elementos de área
  areaItems.forEach(item => {
    item.addEventListener('click', function() {
      const areaName = this.getAttribute('data-area');
      const description = areaDescriptions[areaName] || 'Descripción no disponible.';
      openServiceModal(areaName, description);
    });
  });

  // Cerrar el modal de servicios al hacer clic en la X
  if (closeServiceModal) {
    closeServiceModal.addEventListener('click', function() {
      serviceModal.style.display = 'none';
    });
  }

  // Cerrar el modal de servicios al hacer clic fuera de él
  window.addEventListener('click', function(event) {
    if (event.target === serviceModal) {
      serviceModal.style.display = 'none';
    }
  });

  // Aplicar colores aleatorios y dinámicos a los recuadros de servicios y áreas
  // Seleccionar todos los recuadros
  const allBoxes = [...serviceItems, ...areaItems];

  // Array de colores de la paleta de Kinesoul
  const kinesoulColors = [
    'var(--azul-marino)',
    'var(--violeta)',
    'var(--fucsia)',
    'var(--azul-gradiente)',
    'var(--violeta-gradiente)',
    'var(--turquesa-gradiente)',
    'var(--rosa-gradiente)'
  ];

  // Asignar un color aleatorio a cada recuadro y agregar una animación única
  allBoxes.forEach((box, index) => {
    const delay = Math.random() * 4; 
    box.style.animationDelay = `${delay}s`;
  });
});

// --- Funcionalidad específica para la página de Citas ---
// Se ejecuta solo si estamos en la página de citas
if (window.location.pathname.includes('citas.html') || window.location.href.includes('citas.html')) {

  // Esperar a que el DOM esté completamente cargado para la página de citas
  document.addEventListener('DOMContentLoaded', function() {

    // --- Función para obtener parámetros de la URL ---
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // --- Llenar campos con datos de la URL al cargar ---
    function fillFieldsFromUrl() {
        const urlNombre = getUrlParameter('nombre');
        const urlApellido = getUrlParameter('apellido');
        const urlEmail = getUrlParameter('email');
        const urlTelefono = getUrlParameter('telefono');

        // Llenar campos en el formulario de clientes nuevos
        if (urlNombre) {
            const nombreInput = document.getElementById('nombre');
            if (nombreInput) {
                nombreInput.value = urlNombre; 
                nombreInput.setAttribute('readonly', ''); 
            }
        }
        if (urlApellido) {
            const apellidoInput = document.getElementById('apellido');
            if (apellidoInput) {
                apellidoInput.value = urlApellido;
                apellidoInput.setAttribute('readonly', '');
            }
        }
        if (urlEmail) {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.value = urlEmail;
                emailInput.setAttribute('readonly', '');
            }
        }
        if (urlTelefono) {
            const telefonoInput = document.getElementById('telefono');
            if (telefonoInput) {
                telefonoInput.value = urlTelefono;
                telefonoInput.setAttribute('readonly', '');
            }
        }

        if (urlNombre) {
            const nombreExistenteInput = document.getElementById('nombreExistente');
            if (nombreExistenteInput) nombreExistenteInput.value = urlNombre;
        }
        if (urlApellido) {
            const apellidoExistenteInput = document.getElementById('apellidoExistente');
            if (apellidoExistenteInput) apellidoExistenteInput.value = urlApellido;
        }
        if (urlEmail) {
            const emailExistenteInput = document.getElementById('emailExistente');
            if (emailExistenteInput) emailExistenteInput.value = urlEmail;
        }
        if (urlTelefono) {
            const telefonoExistenteInput = document.getElementById('telefonoExistente');
            if (telefonoExistenteInput) telefonoExistenteInput.value = urlTelefono;
        }
    }

    // Llamar a la función para llenar los campos
    fillFieldsFromUrl();
    // -----------------------------
    // Google Calendar Booking (JSONP)
    // -----------------------------

    function jsonp(url) {
      return new Promise((resolve, reject) => {
        const cb = "cb_" + Math.random().toString(36).slice(2);
        const s = document.createElement("script");
        const sep = url.includes("?") ? "&" : "?";
        s.src = `${url}${sep}callback=${cb}`;

        window[cb] = (data) => {
          resolve(data);
          delete window[cb];
          s.remove();
        };

        s.onerror = () => {
          reject(new Error("No se pudo cargar JSONP"));
          delete window[cb];
          s.remove();
        };

        document.body.appendChild(s);
      });
    }

    function toYYYYMMDD(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    function formatTime(iso) {
      const d = new Date(iso);
      return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
    }

    function buildCalendarUI(container) {
      container.innerHTML = `
        <div class="booking-calendar">
          <div class="booking-cal-header">
            <button type="button" class="cal-nav" id="calPrev">‹</button>
            <div class="cal-title" id="calTitle"></div>
            <button type="button" class="cal-nav" id="calNext">›</button>
          </div>

          <div class="cal-weekdays">
            <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
          </div>

          <div class="cal-grid" id="calGrid"></div>

          <div class="slots">
            <h4>Horarios disponibles</h4>
            <div id="slotsList" class="slots-list">Selecciona un día…</div>

            <div class="availability-legend">
              <div class="legend-item">
                <span class="legend-color legend-red"></span>
                Roja = Poca o nula disponibilidad
              </div>
              <div class="legend-item">
                <span class="legend-color legend-yellow"></span>
                Amarilla = Disponibilidad media
              </div>
              <div class="legend-item">
                <span class="legend-color legend-green"></span>
                Verde = Alta disponibilidad
              </div>
            </div>    
                     
            <input type="hidden" id="selectedDate">
            <input type="hidden" id="selectedStart">
            <input type="hidden" id="selectedEnd">
          </div>
        </div>
      `;
    }

        async function loadAvailability(dateStr) {
          const sep = BOOKING_API_URL.includes("?") ? "&" : "?";
          const url = `${BOOKING_API_URL}${sep}action=availability&date=${encodeURIComponent(dateStr)}`;

          const res = await fetch(url, { method: "GET" });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          return await res.json();
        }

        function sendBookingGET(payload) {
          const params = new URLSearchParams();
          params.set("action", "book");

          Object.entries(payload).forEach(([k, v]) => {
            if (v !== undefined && v !== null) params.set(k, String(v));
          });

          const url = `${BOOKING_API_URL}?${params.toString()}`;

          console.log("BOOKING URL:", url);

          return jsonp(url);
        }

        console.log("DEBUG: sendBookingGET =", typeof sendBookingGET);



        async function prefetchMonthColors(calRoot, year, month) {
          const cells = Array.from(calRoot.querySelectorAll(".cal-cell"))
            .filter(c => c.dataset.date && !c.disabled);

          // Filtrar solo las que NO estén en cache todavía
          const targets = cells.filter(c => availabilityCache[c.dataset.date] === undefined);

          // Pool de concurrencia para no saturar Apps Script
          const CONCURRENCY = 4;
          let idx = 0;

          async function worker() {
            while (idx < targets.length) {
              const cell = targets[idx++];
              const dateStr = cell.dataset.date;

              try {
                const data = await loadAvailability(dateStr);
                const count = (data && data.ok !== false && Array.isArray(data.slots)) ? data.slots.length : 0;

                availabilityCache[dateStr] = count;

                cell.classList.remove("is-green", "is-yellow", "is-red");

                if (count >= 5) cell.classList.add("is-green");
                else if (count >= 1) cell.classList.add("is-yellow");
                else {
                  cell.classList.add("is-red");
                  cell.classList.add("is-disabled");
                  cell.disabled = true;
                }
              } catch (e) {
                // Si falla la precarga, no bloqueamos el calendario; solo no pintamos ese día
                console.warn("Prefetch falló para", dateStr, e);
              }
            }
          }

          await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
        }

    const availabilityCache = {}; 
    function renderMonth(calRoot, year, month) {
      const title = calRoot.querySelector("#calTitle");
      const grid = calRoot.querySelector("#calGrid");
      const slotsList = calRoot.querySelector("#slotsList");

      const monthName = new Date(year, month, 1).toLocaleDateString("es-MX", { month: "long", year: "numeric" });
      title.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

      grid.innerHTML = "";
      slotsList.textContent = "Selecciona un día…";

      calRoot.querySelector("#selectedDate").value = "";
      calRoot.querySelector("#selectedStart").value = "";
      calRoot.querySelector("#selectedEnd").value = "";

      const first = new Date(year, month, 1);
      const firstDow = (first.getDay() + 6) % 7; // lunes=0
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const totalCells = 42;
      const today = new Date();
      const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "cal-cell";

        const dayNum = i - firstDow + 1;

        if (dayNum < 1 || dayNum > daysInMonth) {
          cell.classList.add("is-empty");
          cell.disabled = true;
          grid.appendChild(cell);
          continue;
        }

        cell.textContent = String(dayNum);

        const date = new Date(year, month, dayNum, 0, 0, 0);
        const dateStr = toYYYYMMDD(date);
        cell.dataset.date = dateStr;
        if (availabilityCache[dateStr] !== undefined) {
          const count = availabilityCache[dateStr];

          cell.classList.remove("is-green", "is-yellow", "is-red");

          if (count >= 5) cell.classList.add("is-green");
          else if (count >= 1) cell.classList.add("is-yellow");
          else {
            cell.classList.add("is-red");
            cell.classList.add("is-disabled");
            cell.disabled = true;
          }
        }        

        if (date < todayMid) {
          cell.classList.add("is-disabled");
          cell.disabled = true;
          grid.appendChild(cell);
          continue;
        }

          // Bloquear domingos (0 = domingo)
          if (date.getDay() === 0) {
            cell.classList.add("is-disabled");
            cell.disabled = true;
            grid.appendChild(cell);
            continue;
          }        

        cell.addEventListener("click", async () => {
          calRoot.querySelectorAll(".cal-cell.is-selected").forEach(x => x.classList.remove("is-selected"));
          cell.classList.add("is-selected");

          slotsList.textContent = "Cargando horarios…";

        try {
          const data = await loadAvailability(dateStr);

          if (data?.ok === false) {
            slotsList.textContent = data?.error || "Error al obtener disponibilidad";
            return;
          }

          const count = Array.isArray(data?.slots) ? data.slots.length : 0;
          availabilityCache[dateStr] = count;

          cell.classList.remove("is-green", "is-yellow", "is-red");

          if (count >= 5) cell.classList.add("is-green");
          else if (count >= 1) cell.classList.add("is-yellow");
          else {
            cell.classList.add("is-red");
            cell.classList.add("is-disabled");
            cell.disabled = true;
          }          

          if (count === 0) {
            slotsList.textContent = "No hay horarios disponibles ese día.";
            return;
          }

          slotsList.innerHTML = "";
          data.slots.forEach(slot => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "slot-btn";
            btn.textContent = formatTime(slot.start);

            btn.addEventListener("click", () => {
              calRoot.querySelectorAll(".slot-btn.is-selected").forEach(x => x.classList.remove("is-selected"));
              btn.classList.add("is-selected");

              calRoot.querySelector("#selectedDate").value = dateStr;
              calRoot.querySelector("#selectedStart").value = slot.start;
              calRoot.querySelector("#selectedEnd").value = slot.end;
            });

            slotsList.appendChild(btn);
          });

        } catch (err) {
          console.error(err);
          slotsList.textContent = "No se pudo conectar con el calendario (revisa URL y Deploy).";
        }          
        });

        grid.appendChild(cell);
      }
      // Precargar colores del mes (pinta sin necesidad de click)
      prefetchMonthColors(calRoot, year, month);
    }

    function initBookingCalendar() {
      const calHost = document.getElementById("bookingCalendar");
      if (!calHost) return;

      buildCalendarUI(calHost);

      let view = new Date();
      renderMonth(calHost, view.getFullYear(), view.getMonth());

      calHost.querySelector("#calPrev").addEventListener("click", () => {
        view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
        renderMonth(calHost, view.getFullYear(), view.getMonth());
      });

      calHost.querySelector("#calNext").addEventListener("click", () => {
        view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
        renderMonth(calHost, view.getFullYear(), view.getMonth());
      });
    }

    // Función para mostrar el pop-up
    function showPopup() {
      const popupOverlay = document.getElementById('popupOverlay');
      if (popupOverlay) {
        popupOverlay.style.display = 'flex';

        // Eventos para los botones del pop-up
        const newClientBtn = document.getElementById('newClientBtn');
        const existingClientBtn = document.getElementById('existingClientBtn');

        if (newClientBtn) {
          newClientBtn.addEventListener('click', function() {
            popupOverlay.style.display = 'none';
            showNewClientForm();
          });
        }

        if (existingClientBtn) {
          existingClientBtn.addEventListener('click', function() {
            popupOverlay.style.display = 'none';
            showExistingClientForm();
          });
        }
      }
      
    }

    // Función para mostrar el formulario para clientes nuevos 
    function showNewClientForm() {
      const formContainer = document.getElementById('formContainer');
      if (formContainer) {
        formContainer.innerHTML = `
          <div class="form-card">
            <h3>Información del Paciente</h3>
            <div class="form-group">
              <label for="nombre">Nombre(s) *</label>
              <input type="text" id="nombre" required>
              <span class="error-message" id="nombre-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
            <div class="form-group">
              <label for="apellido">Apellido(s) *</label>
              <input type="text" id="apellido" required>
              <span class="error-message" id="apellido-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
            <div class="form-group">
              <label for="email">Correo electrónico *</label>
              <input type="email" id="email" required>
              <span class="error-message" id="email-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono *</label>
              <input type="text" id="telefono" placeholder="+52..." required>
              <span class="error-message" id="telefono-error" style="color: red; font-size: 0.8rem;"></span>
            </div>

            <!-- Fecha de nacimiento y Edad en la misma fila -->
            <div class="form-row">
              <div class="form-group">
                <label for="fechaNacimiento">Fecha de nacimiento *</label>
                <input type="date" id="fechaNacimiento" required>
                <span class="error-message" id="fechaNacimiento-error" style="color: red; font-size: 0.8rem;"></span>
              </div>
              <div class="form-group">
                <label for="edad">Edad *</label>
                <input type="number" id="edad" min="1" max="120" required>
                <span class="error-message" id="edad-error" style="color: red; font-size: 0.8rem;"></span>
              </div>
            </div>

            <div class="form-group">
              <label for="genero">Género *</label>
              <select id="genero" required>
                <option value="">Seleccione</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
              <span class="error-message" id="genero-error" style="color: red; font-size: 0.8rem;"></span>
            </div>

            <div class="form-group">
              <label for="motivoConsulta">Motivo de la consulta *</label>
              <textarea id="motivoConsulta" rows="3" required placeholder="Describa el motivo de su visita"></textarea>
              <span class="error-message" id="motivoConsulta-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
          </div>

          <div class="form-card">
            <h3>Seleccionar Fisioterapeuta *</h3>
            <select id="fisioterapeuta" required>
              <option value="">Seleccione un fisioterapeuta</option>
              <option value="gilberto">Lic. Gilberto Escuadra Jasso</option>
              <option value="gera">Lic. Geraldine Zaragoza Linares</option>
            </select>
            <span class="error-message" id="fisioterapeuta-error" style="color: red; font-size: 0.8rem;"></span>
          </div>

          <div class="form-card">
            <h3>Seleccionar Fecha *</h3>
            <p>Primero seleccione un fisioterapeuta para ver la disponibilidad</p>
            <div id="bookingCalendar"></div>
          </div>

          <div class="form-card">
            <div class="checkbox-group">
              <input type="checkbox" id="terminos" required>
              <label for="terminos">Acepto los términos y condiciones del servicio y autorizo el tratamiento de mis datos personales conforme a la Ley de Protección de Datos Personales</label>
              <span class="error-message" id="terminos-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
            <button class="btn-primary" id="confirmarCitaBtn">Confirmar Cita</button>
            <p class="confirmation-text">Recibirá un correo de confirmación con los detalles de su cita</p>
          </div>
        `;

        initBookingCalendar();

        // Bloquear calendario hasta elegir fisioterapeuta
        const calHost = document.getElementById("bookingCalendar");
        const fisioSelect = document.getElementById("fisioterapeuta");
        if (calHost && fisioSelect) {
          // Estado inicial: deshabilitado
          calHost.style.pointerEvents = "none";
          calHost.style.opacity = "0.5";

          fisioSelect.addEventListener("change", () => {
            if (fisioSelect.value) {
              calHost.style.pointerEvents = "auto";
              calHost.style.opacity = "1";
            } else {
              calHost.style.pointerEvents = "none";
              calHost.style.opacity = "0.5";
            }
          });
        }        

        // --- Agregar evento al botón de confirmar cita con validación ---
        const confirmarBtn = document.getElementById('confirmarCitaBtn');
        if (confirmarBtn) {
          confirmarBtn.addEventListener('click', async function(e) {
            e.preventDefault(); 
            


            // Limpiar mensajes de error previos
            clearErrors();

            let isValid = true;

            // Obtener valores
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const edad = document.getElementById('edad').value.trim();
            const genero = document.getElementById('genero').value;
            const motivoConsulta = document.getElementById('motivoConsulta').value.trim();
            const fisioterapeuta = document.getElementById('fisioterapeuta').value;
            const terminos = document.getElementById('terminos').checked;
            const selectedStart = document.getElementById('selectedStart')?.value;

            // Validaciones
            if (!nombre) {
              showError('nombre-error', 'El nombre es obligatorio.');
              isValid = false;
            }

            if (!apellido) {
              showError('apellido-error', 'El apellido es obligatorio.');
              isValid = false;
            }

            if (!email) {
              showError('email-error', 'El correo electrónico es obligatorio.');
              isValid = false;
            } else if (!isValidEmail(email)) {
              showError('email-error', 'Por favor, ingrese un correo electrónico válido.');
              isValid = false;
            }

            if (!telefono) {
              showError('telefono-error', 'El teléfono es obligatorio.');
              isValid = false;
            } else if (!isValidPhone(telefono)) {
              showError('telefono-error', 'El teléfono solo puede contener números y un signo + al inicio.');
              isValid = false;
            }

            if (!fechaNacimiento) {
              showError('fechaNacimiento-error', 'La fecha de nacimiento es obligatoria.');
              isValid = false;
            }

            if (!edad) {
              showError('edad-error', 'La edad es obligatoria.');
              isValid = false;
            } else if (isNaN(edad) || Number(edad) <= 0 || Number(edad) > 120) {
             showError('edad-error', 'Por favor, ingrese una edad válida (1-120).');
             isValid = false;
            }


            if (!genero) {
              showError('genero-error', 'Por favor, seleccione un género.');
              isValid = false;
            }

            if (!motivoConsulta) {
              showError('motivoConsulta-error', 'El motivo de la consulta es obligatorio.');
              isValid = false;
            }

            if (!fisioterapeuta) {
              showError('fisioterapeuta-error', 'Por favor, seleccione un fisioterapeuta.');
              isValid = false;
            }

            if (!selectedStart) {
              alert("Selecciona un día y una hora disponible.");
              isValid = false;
            }

            if (!terminos) {
              showError('terminos-error', 'Debe aceptar los términos y condiciones.');
              isValid = false;
            }

            if (isValid) {
              try {
                const payload = {
                  nombre,
                  apellido,
                  email,
                  telefono,
                  fechaNacimiento,
                  edad,
                  genero,
                  motivoConsulta,
                  fisioterapeuta,
                  startISO: document.getElementById("selectedStart")?.value,
                  endISO: document.getElementById("selectedEnd")?.value
                };
                console.log("BOOKING payload:", payload);
                console.log("BOOKING url:", BOOKING_API_URL);
                const result = await sendBookingGET(payload);

                if (result?.ok) {
                  window.location.href = "thx.html";
                } else {
                  alert(result?.error || "No se pudo agendar la cita.");
                }

              } catch (err) {
                console.error("BOOKING ERROR:", err);
                alert("Error al conectar con el servidor: " + (err?.message || err));
              }

            }

          });
        }
      }
    }

    // Función para mostrar el formulario para clientes existentes
    function showExistingClientForm() {
      const formContainer = document.getElementById('formContainer');
      if (formContainer) {
        formContainer.innerHTML = `
          <div class="form-card">
            <h3>Información del Paciente</h3>
            <div class="form-group">
              <label for="nombreExistente">Nombre(s) *</label>
              <input type="text" id="nombreExistente" required>
              <span class="error-message" id="nombreExistente-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
            <div class="form-group">
              <label for="apellidoExistente">Apellido(s) *</label>
              <input type="text" id="apellidoExistente" required>
              <span class="error-message" id="apellidoExistente-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
            <div class="form-group">
              <label for="emailExistente">Correo electrónico *</label>
              <input type="email" id="emailExistente" required>
              <span class="error-message" id="emailExistente-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
          </div>

          <div class="form-card">
            <h3>Seleccionar Fisioterapeuta *</h3>
            <select id="fisioterapeutaExistente" required>
              <option value="">Seleccione un fisioterapeuta</option>
              <option value="gilberto">Lic. Gilberto Escuadra Jasso</option>
              <option value="gera">Lic. Geraldine Zaragoza Linares</option>
            </select>
            <span class="error-message" id="fisioterapeutaExistente-error" style="color: red; font-size: 0.8rem;"></span>
          </div>

          <div class="form-card">
            <h3>Seleccionar Fecha *</h3>
            <p>Primero seleccione un fisioterapeuta para ver la disponibilidad</p>
            <div id="bookingCalendar"></div>
          </div>

          <div class="form-card">
            <div class="checkbox-group">
              <input type="checkbox" id="terminosExistente" required>
              <label for="terminosExistente">Acepto los términos y condiciones del servicio y autorizo el tratamiento de mis datos personales conforme a la Ley de Protección de Datos Personales</label>
              <span class="error-message" id="terminosExistente-error" style="color: red; font-size: 0.8rem;"></span>
            </div>
            <button class="btn-primary" id="confirmarCitaExistenteBtn">Confirmar Cita</button>
            <p class="confirmation-text">Recibirá un correo de confirmación con los detalles de su cita</p>
          </div>
        `;

        initBookingCalendar();

        // Bloquear calendario hasta elegir fisioterapeuta
        const calHost = document.getElementById("bookingCalendar");
        const fisioSelect = document.getElementById("fisioterapeutaExistente");
        if (calHost && fisioSelect) {
          calHost.style.pointerEvents = "none";
          calHost.style.opacity = "0.5";

          fisioSelect.addEventListener("change", () => {
            if (fisioSelect.value) {
              calHost.style.pointerEvents = "auto";
              calHost.style.opacity = "1";
            } else {
              calHost.style.pointerEvents = "none";
              calHost.style.opacity = "0.5";
            }
          });
        }        

        // --- Agregar evento al botón de confirmar cita existente con validación ---
        const confirmarBtnExistente = document.getElementById('confirmarCitaExistenteBtn');
        if (confirmarBtnExistente) {
          if (confirmarBtnExistente.dataset.bound === "1") return;
          confirmarBtnExistente.dataset.bound = "1";
          confirmarBtnExistente.addEventListener('click', async function(e) {
            e.preventDefault(); 
            console.log("CLICK existente: ok");

            // Limpiar mensajes de error previos
            clearErrors();

            let isValid = true;

            // Obtener valores
            const nombreExistente = document.getElementById('nombreExistente').value.trim();
            const apellidoExistente = document.getElementById('apellidoExistente').value.trim();
            const emailExistente = document.getElementById('emailExistente').value.trim();
            const fisioterapeutaExistente = document.getElementById('fisioterapeutaExistente').value;
            const terminosExistente = document.getElementById('terminosExistente').checked;
            const selectedStart = document.getElementById('selectedStart')?.value;
            const selectedEnd = document.getElementById('selectedEnd')?.value;

            // Validaciones
            if (!nombreExistente) {
              showError('nombreExistente-error', 'El nombre es obligatorio.');
              isValid = false;
            }

            if (!apellidoExistente) {
              showError('apellidoExistente-error', 'El apellido es obligatorio.');
              isValid = false;
            }

            if (!emailExistente) {
              showError('emailExistente-error', 'El correo electrónico es obligatorio.');
              isValid = false;
            } else if (!isValidEmail(emailExistente)) {
              showError('emailExistente-error', 'Por favor, ingrese un correo electrónico válido.');
              isValid = false;
            }

            if (!fisioterapeutaExistente) {
              showError('fisioterapeutaExistente-error', 'Por favor, seleccione un fisioterapeuta.');
              isValid = false;
            }

            if (!selectedStart) {
              alert("Selecciona un día y una hora disponible.");
              isValid = false;
            }            

            if (!terminosExistente) {
              showError('terminosExistente-error', 'Debe aceptar los términos y condiciones.');
              isValid = false;
            }

            if (isValid) {
              try {
                const payload = {
                  nombre: nombreExistente,
                  apellido: apellidoExistente,
                  email: emailExistente,

                  // Como en "existente" no tienes estos campos, mandamos valores seguros:
                  telefono: "No proporcionado (paciente existente)",
                  motivoConsulta: "Paciente existente (motivo no capturado en formulario)",

                  fisioterapeuta: fisioterapeutaExistente,
                  startISO: selectedStart,
                  endISO: selectedEnd
                };
                console.log("PAYLOAD existente:", payload);
                const result = await sendBookingGET(payload);
                console.log("RESULT existente:", result);

                if (result?.ok) {
                  window.location.href = "thx.html";
                } else {
                  alert(result?.error || "No se pudo agendar la cita.");
                }

              } catch (err) {
                console.error(err);
                alert("Error al conectar con el servidor.");
              }
            }

          });
        }
      }
    }

    // --- Funciones auxiliares para validación ---
    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
    }

    function isValidEmail(email) {
        // Expresión regular básica para validar correo
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        // Permite un + al inicio seguido solo de dígitos
        const re = /^\+?[0-9]+$/;
        return re.test(phone);
    }

    // Mostrar el pop-up inicial al cargar la página de citas
    showPopup();

  }); 

} 