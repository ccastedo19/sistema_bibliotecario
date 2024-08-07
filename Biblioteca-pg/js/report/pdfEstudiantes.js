document.getElementById('generatePDF').addEventListener('click', function() {
    fetch('http://localhost:8000/api/estudiantes')
        .then(response => response.json())
        .then(data => {
            generatePDF(data);
        })
        .catch(error => console.error('Error fetching users:', error));
});

function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableColumn = ["N°", "Ci", "Nombres", "Apellidos", "Estado"];
    const tableRows = [];

    data.forEach((estudiante, index) => {
        const estudianteData = [
            index + 1,
            estudiante.ci,
            estudiante.nombre_estudiante,
            estudiante.apellido_estudiante,
            getEstado(estudiante.estado_estudiante),
        ];
        tableRows.push(estudianteData);
    });

    // Establecer título
    doc.setTextColor(44, 132, 188); // Color azul
    doc.setFontSize(16);
    doc.text("Listado de estudiantes", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Añadir margen hacia abajo
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30, // Ajusta este valor si es necesario
    });

    doc.save('estudiantes.pdf');
}

function getEstado(estado_estudiante) {
    const estados = {
        0: 'Inactivo',
        1: 'Activo',
    };
    return estados[estado_estudiante] || 'Desconocido';
}