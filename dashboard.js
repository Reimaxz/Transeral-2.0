document.addEventListener("DOMContentLoaded", function() {

    // --- VALIDACIÓN DE SESIÓN (VERSIÓN EMPRESARIAL VISUAL) ---
    const tiempoMaximo = 30 * 60 * 1000; // 30 minutos
    const loginTime = sessionStorage.getItem('loginTime');
    const sesionActiva = sessionStorage.getItem('sesionActiva');

    if (!sesionActiva || !loginTime) {
        window.location.href = "login.html";
        return;
    }

    // Expiración de sesión
    if (Date.now() - loginTime > tiempoMaximo) {
        sessionStorage.clear();
        window.location.href = "login.html";
        return;
    }

    // Renovar sesión con interacción
    document.addEventListener("click", () => {
        sessionStorage.setItem('loginTime', Date.now());
    });


    // Esta función debe ejecutarse cuando el usuario loguea con éxito en login.html
    function iniciarSesion() {
        sessionStorage.setItem('sesionActiva', 'true');
        sessionStorage.setItem('loginTime', Date.now());
        window.location.href = "dashboard.html";
    }

    const ctx = document.getElementById('graficaViajes').getContext('2d');

    // Configuración de los datos (Igual a la imagen)
    const datosViajes = {
        labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        datasets: [{
            label: 'Rendimiento',
            data: [12, 19, 15, 22, 28, 18, 9],
            backgroundColor: '#ffb800',
            borderRadius: 5,
            barThickness: 25,
        }]
    };

    // Opciones para que se vea minimalista
    const opciones = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false,
                    color: '#f0f0f0'
                },
                ticks: {
                    stepSize: 7,
                    color: '#888'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#888'
                }
            }
        }
    };

    // Crear la gráfica
    new Chart(ctx, {
        type: 'bar',
        data: datosViajes,
        options: opciones
    });
});

function logout() {
    sessionStorage.clear(); // 🔥 importante
    window.location.href = "login.html";
}

function cambiarSeccion(idSeccion) {
    
    const secciones = document.querySelectorAll('.pantalla-seccion');
    secciones.forEach(s => s.classList.remove('activa'));

    const seleccionada = document.getElementById(idSeccion);
    if (seleccionada) {
        seleccionada.classList.add('activa');
    }

    // para VIAJES
    if (idSeccion === 'viajes') {
        if (typeof verTab === 'function') {
            verTab('despacho');
        }
        if (typeof inicializarMapa === 'function') {
            setTimeout(inicializarMapa, 300);
        }
    }

    // --- MATERIALES (Gráfica) ---
    if (idSeccion === 'materiales') {
        if (typeof inicializarAnaliticaMateriales === 'function') {
            setTimeout(inicializarAnaliticaMateriales, 350);
        }
    }

    if (idSeccion === 'choferes') {
        window.scrollTo(0, 0);
    }

    if (idSeccion === 'vehiculos') {
        window.scrollTo(0, 0);
        console.log("Sección de Vehículos cargada con éxito");
    }

    if (idSeccion === 'inventario') {
        window.scrollTo(0, 0);
    }

    if (idSeccion === 'accidentes') {
        window.scrollTo(0, 0);
    }

    if (idSeccion === 'mantenimiento') {
        window.scrollTo(0, 0);
    }

    if (idSeccion === 'reportes') {
        window.scrollTo(0, 0);
    }

    const botones = document.querySelectorAll('.menu-vertical button');
    botones.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.currentTarget && event.currentTarget.tagName === "BUTTON") {
        event.currentTarget.classList.add('active');
    }
}