let graficaMateriales = null;

function inicializarAnaliticaMateriales() {
    const canvas = document.getElementById('graficaMateriales');
    if (!canvas) return;

    // Si ya existe una gráfica, la destruimos para que se redibuje bien
    if (graficaMateriales) {
        graficaMateriales.destroy();
    }

    const ctx = canvas.getContext('2d');

    graficaMateriales = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['MAÍZ AMARILLO', 'SOYA PROCESADA', 'CONTENEDORES'],
            datasets: [{
                label: 'Porcentaje de carga',
                data: [85, 45, 30],
                backgroundColor: '#5C8F5F',
                borderRadius: 10,
                barThickness: 28
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000 },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: { display: false, min: 0, max: 100 },
                y: {
                    grid: { display: false },
                    ticks: { color: '#222', font: { size: 13, weight: '600' } }
                }
            }
        }
    });
}
