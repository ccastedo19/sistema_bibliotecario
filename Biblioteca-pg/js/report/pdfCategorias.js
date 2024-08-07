document.getElementById('generatePDF').addEventListener('click', function() {
    fetch('http://localhost:8000/api/categorias')
        .then(response => response.json())
        .then(data => {
            generatePDF(data);
        })
        .catch(error => console.error('Error fetching users:', error));
});

function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableColumn = ["N°", "Código", "Categoría"];
    const tableRows = [];

    data.forEach((categoria, index) => {
        const categoriaData = [
            index + 1,
            categoria.codigo_categoria,
            categoria.nombre_categoria,

        ];
        tableRows.push(categoriaData);
    });

    // Establecer título
    doc.setTextColor(44, 132, 188); // Color azul
    doc.setFontSize(16);
    doc.text("Listado de categorías", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Añadir margen hacia abajo
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30, // Ajusta este valor si es necesario
    });

    doc.save('categorias.pdf');
}

