var map;
let polyline;
let marker;
let animacion;

function inicializarMapa() {
    if (map) return;

    map = L.map('map', { zoomControl: false }).setView([9.0, -68.0], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
}

function cargarRutaPredeterminada() {

    const seleccion = document.getElementById('selectRuta').value;

    // limpiar ruta anterior
    if (polyline) map.removeLayer(polyline);

    // limpiar marcador anterior
    if (marker) map.removeLayer(marker);

    // detener animación previa
    if (animacion) cancelAnimationFrame(animacion);

    const rutas = {
        'valencia_caracas': [
            [10.174, -67.999],
            [10.488, -66.879]
        ],
        'barinas_valle': [
            [8.633, -70.216],
            [9.213, -66.010]
        ]
    };

    if (seleccion !== 'none') {

        const coords = rutas[seleccion];

        // dibujar ruta
        polyline = L.polyline(coords, {
            color: '#ff6600',
            weight: 4,
            dashArray: '10, 10',
            opacity: 0.8
        }).addTo(map);

        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

        // iniciar animación del camión
        moverCamion(coords);
    }
}
// 🚚 FUNCIÓN DE MOVIMIENTO SUAVE
function moverCamion(coords) {

    let start = coords[0];
    let end = coords[1];

    let progress = 0; //
    let velocidad = 0.000499; //

    // icono camión
    const truckIcon = L.divIcon({
        html: `<i class="fa-solid fa-truck" style="color:#ff6600;font-size:24px;"></i>`,
        iconSize: [30,30],
        iconAnchor: [15,15]
    });

    marker = L.marker(start, { icon: truckIcon }).addTo(map);

    function animar() {

        progress += velocidad;

        if (progress > 1) progress = 1;

        // interpolación (movimiento suave)
        let lat = start[0] + (end[0] - start[0]) * progress;
        let lng = start[1] + (end[1] - start[1]) * progress;

        marker.setLatLng([lat, lng]);

        if (progress < 1) {
            animacion = requestAnimationFrame(animar);
        }
    }
    animar();
}

function verTab(id) {
    
    const contenidos = document.querySelectorAll('.viajes-tab-content');
    contenidos.forEach(c => {
        c.classList.remove('activa');
    });

    const seleccionada = document.getElementById('vista-' + id);
    if (seleccionada) {
        seleccionada.classList.add('activa');
    }

    // 3. Gestionar el color AMARILLO de los botones
    const botones = document.querySelectorAll('.tab-btn');
    botones.forEach(b => b.classList.remove('active'));

    const botonAImprimir = document.getElementById('btn-' + id);
    if (botonAImprimir) {
        botonAImprimir.classList.add('active');
    }

    // 4. Refrescar el mapa si es despacho
   if (id === 'despacho' && map) {
    setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(polyline ? polyline.getBounds() : [[9, -68]]);
    }, 300);
}
}

function irAMapa(ciudad) {
    verTab('despacho');
    const coordenadas = {
        'caracas': [10.488, -66.879],
        'valencia': [10.174, -67.999],
        'barinas': [8.633, -70.216],
        'puerto cabello': [10.473, -68.012]
    };
    const destino = coordenadas[ciudad.toLowerCase()];

    if (destino && map) {
        setTimeout(() => {
            map.flyTo(destino, 13, {
                animate: true,
                duration: 2.0
            });
            L.popup()
                .setLatLng(destino)
                .setContent(`<b>Destino Seleccionado:</b><br>${ciudad.toUpperCase()}`)
                .openOn(map);
        }, 400);
    }
}


// Ajustar mapa cuando cambia el tamaño de pantalla
window.addEventListener('resize', function () {
    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    }
});