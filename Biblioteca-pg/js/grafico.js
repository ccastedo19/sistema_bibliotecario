// Función para obtener los datos del gráfico circular
async function getReservaDevolucionData() {
    try {
        const reservaResponse = await fetch('http://localhost:8000/api/cantidad_reserva');
        const reservaData = await reservaResponse.json();

        const devolucionResponse = await fetch('http://localhost:8000/api/cantidad_devolucion');
        const devolucionData = await devolucionResponse.json();

        return {
            reservas: reservaData.total,
            devoluciones: devolucionData.total
        };
    } catch (error) {
        console.error('Error al obtener los datos del gráfico circular:', error);
        return {
            reservas: 0,
            devoluciones: 0
        };
    }
}

// Función para renderizar el gráfico circular
async function renderCircularChart() {
    const data = await getReservaDevolucionData();
    const ctx = document.getElementById('reservaDevolucionChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Libros Reservas', 'Libros Devueltos'],
            datasets: [{
                data: [data.reservas, data.devoluciones],
                backgroundColor: ['#B71C1C', '#33414e'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            animation: {
                animateRotate: false,
                animateScale: false
            }
        }
    });
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    renderCircularChart();
});
