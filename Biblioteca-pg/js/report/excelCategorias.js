document.getElementById('generateExcel').addEventListener('click', function() {
    fetch('http://localhost:8000/api/categorias')
        .then(response => response.json())
        .then(data => {
            generateExcel(data);
        })
        .catch(error => console.error('Error fetching categories:', error));
});

function generateExcel(data) {
    const wb = XLSX.utils.book_new();
    const ws_data = [["N°", "Código", "Categoría"]]; // Encabezado

    data.forEach((categoria, index) => {
        const categoriaData = [
            index + 1,
            categoria.codigo_categoria,
            categoria.nombre_categoria,
        ];
        ws_data.push(categoriaData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Categorías");

    XLSX.writeFile(wb, 'categorias.xlsx');
}
