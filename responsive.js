/* ==========================================
   JAVASCRIPT PARA MENÚ RESPONSIVE - TRANSERAL
   ========================================== */

// Agregar botón hamburguesa y overlay al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón hamburguesa
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.appendChild(menuToggle);

    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Referencias
    const sidebar = document.querySelector('.sidebar');

    // Función para abrir el menú
    function openMenu() {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        menuToggle.innerHTML = '<i class="fa-solid fa-times"></i>';
        menuToggle.setAttribute('aria-label', 'Cerrar menú');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    // Función para cerrar el menú
    function closeMenu() {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }

    // Toggle del menú al hacer click en el botón
    menuToggle.addEventListener('click', function() {
        if (sidebar.classList.contains('mobile-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar menú al hacer click en el overlay
    overlay.addEventListener('click', closeMenu);

    // Cerrar menú al hacer click en cualquier opción del menú
    const menuButtons = document.querySelectorAll('.menu-vertical button');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Solo cerrar en móvil
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Cerrar menú al hacer click en cerrar sesión
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    }

    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Manejar tecla ESC para cerrar el menú
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
            closeMenu();
        }
    });
});

/* ==========================================
   AJUSTES ADICIONALES PARA RESPONSIVIDAD
   ========================================== */

// Ajustar altura de gráficas en resize
window.addEventListener('resize', function() {
    // Redimensionar Chart.js si existe
    if (typeof Chart !== 'undefined') {
        Chart.instances.forEach(function(chart) {
            chart.resize();
        });
    }
});

// Función para hacer scroll horizontal en tabs si es necesario
document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
        const activeTab = tabsContainer.querySelector('.tab-btn.active');
        if (activeTab && window.innerWidth <= 768) {
            // Scroll al tab activo en móvil
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
});

// Función para mejorar la experiencia de tablas en móvil
document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        // Si la tabla no tiene wrapper, crear uno
        if (!table.parentElement.classList.contains('tabla-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'tabla-wrapper';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
});

// Agregar indicador de scroll en tablas móviles
document.addEventListener('DOMContentLoaded', function() {
    const tableWrappers = document.querySelectorAll('.tabla-wrapper');
    
    tableWrappers.forEach(wrapper => {
        // Solo en móvil
        if (window.innerWidth <= 768) {
            // Verificar si hay scroll horizontal
            if (wrapper.scrollWidth > wrapper.clientWidth) {
                // Agregar sombra para indicar que hay más contenido
                wrapper.style.position = 'relative';
                
                const scrollIndicator = document.createElement('div');
                scrollIndicator.className = 'scroll-indicator';
                scrollIndicator.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
                scrollIndicator.style.cssText = `
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    background: linear-gradient(to left, rgba(255,255,255,0.9), transparent);
                    padding: 10px 20px;
                    pointer-events: none;
                    transition: opacity 0.3s;
                `;
                wrapper.appendChild(scrollIndicator);

                // Ocultar indicador cuando se hace scroll
                wrapper.addEventListener('scroll', function() {
                    if (this.scrollLeft > 10) {
                        scrollIndicator.style.opacity = '0';
                    } else {
                        scrollIndicator.style.opacity = '1';
                    }
                });
            }
        }
    });
});

// Optimizar rendimiento de animaciones en móvil
if (window.innerWidth <= 768) {
    // Reducir animaciones en dispositivos móviles para mejor rendimiento
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition-duration: 0.2s !important;
            animation-duration: 0.5s !important;
        }
    `;
    document.head.appendChild(style);
}

console.log('Transeral Dashboard - Sistema Responsive Cargado ✓');