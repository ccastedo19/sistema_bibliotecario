document.getElementById('generateExcel').addEventListener('click', function() {
    fetch('http://localhost:8000/api/reserva')
        .then(response => response.json())
        .then(data => {
            generateExcel(data);
        })
        .catch(error => console.error('Error fetching reservations:', error));
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function generateExcel(data) {
    const wb = XLSX.utils.book_new();
    const ws_data = [["N°", "Fecha Inicio", "Fecha Fin", "Estudiante", "Libro", "Cantidad", "Estado"]]; // Encabezado

    data.forEach((reserva, index) => {
        const fechaInicio = formatDate(reserva.fecha_inicio);
        const fechaFin = formatDate(reserva.fecha_fin);
        const estado = reserva.estado_reserva === 1 ? 'Prestado' : 'Devuelto';
        const reservaData = [
            index + 1,
            fechaInicio,
            fechaFin,
            `${reserva.estudiante.nombre_estudiante} ${reserva.estudiante.apellido_estudiante}`,
            reserva.libro.titulo,
            reserva.cantidad,
            estado
        ];
        ws_data.push(reservaData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Reservas");

    XLSX.writeFile(wb, 'reservas.xlsx');
}
