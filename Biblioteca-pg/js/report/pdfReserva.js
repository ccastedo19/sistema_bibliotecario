document.getElementById('generatePDF').addEventListener('click', function() {
    fetch('http://localhost:8000/api/reserva')
        .then(response => response.json())
        .then(data => {
            generatePDF(data);
        })
        .catch(error => console.error('Error fetching reservations:', error));
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableColumn = ["N°", "Fecha Inicio", "Fecha Fin", "Estudiante", "Libro", "Cantidad", "Estado"];
    const tableRows = [];

    data.forEach((reserva, index) => {
        const fechaInicio = formatDate(reserva.fecha_inicio);
        const fechaFin = formatDate(reserva.fecha_fin);
        const estado = reserva.estado_reserva === 1 ? 'Prestado' : 'Devuelto';
        tableRows.push([
            index + 1,
            fechaInicio,
            fechaFin,
            `${reserva.estudiante.nombre_estudiante} ${reserva.estudiante.apellido_estudiante}`,
            reserva.libro.titulo,
            reserva.cantidad,
            estado
        ]);
    });

    // Establecer título 
    doc.setTextColor(44, 132, 188);
    doc.setFontSize(16);
    doc.text("Listado de Reservas", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Añadir tabla
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30 // Ajusta este valor si es necesario
    });

    doc.save('reservas.pdf');
}
