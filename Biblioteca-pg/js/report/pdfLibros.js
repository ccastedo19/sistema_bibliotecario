document.getElementById('generatePDF').addEventListener('click', function() {
    fetch('http://localhost:8000/api/libros')
        .then(response => response.json())
        .then(data => {
            generatePDF(data);
        })
        .catch(error => console.error('Error fetching books:', error));
});

function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableColumn = ["N°", "Código", "Título", "Autor", "Idioma", "Stock", "Categoría", "Estado"];
    const tableRows = [];

    data.forEach((libro, index) => {
        const estado = libro.estado_libro === 1 ? 'Activo' : 'Inactivo';
        tableRows.push([index + 1, libro.codigo_libro, libro.titulo, libro.autor, libro.idioma, libro.stock, libro.categoria.nombre_categoria, estado]);
    });

    // Establecer título 
    doc.setTextColor(44, 132, 188);
    doc.setFontSize(16);
    doc.text("Listado de Libros", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Añadir tabla
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30 // Ajusta este valor si es necesario
    });

    doc.save('libros.pdf');
}