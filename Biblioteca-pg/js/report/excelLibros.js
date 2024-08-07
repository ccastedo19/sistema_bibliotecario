document.getElementById('generateExcel').addEventListener('click', function() {
    fetch('http://localhost:8000/api/libros')
        .then(response => response.json())
        .then(data => {
            generateExcel(data);
        })
        .catch(error => console.error('Error fetching books:', error));
});

function generateExcel(data) {
    const wb = XLSX.utils.book_new();
    const ws_data = [["N°", "Código", "Título", "Autor", "Idioma", "Stock", "Categoría", "Estado"]]; // Encabezado

    data.forEach((libro, index) => {
        const estado = libro.estado_libro === 1 ? 'Activo' : 'Inactivo';
        const libroData = [
            index + 1,
            libro.codigo_libro,
            libro.titulo,
            libro.autor,
            libro.idioma,
            libro.stock,
            libro.categoria.nombre_categoria,
            estado
        ];
        ws_data.push(libroData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Libros");

    XLSX.writeFile(wb, 'libros.xlsx');
}
