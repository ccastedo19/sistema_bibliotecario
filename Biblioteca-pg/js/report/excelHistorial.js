document.getElementById('downloadExcel').addEventListener('click', function() {
    // Obtener los datos de la tabla
    const table = document.getElementById('reservaTable');
    const rows = table.querySelectorAll('tr');
    let data = [];

    // Recorrer las filas y columnas para obtener los datos
    rows.forEach(row => {
        let rowData = [];
        const cells = row.querySelectorAll('th, td');
        cells.forEach(cell => {
            rowData.push(cell.innerText);
        });
        data.push(rowData);
    });

    // Crear un libro de trabajo y una hoja de trabajo
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Añadir la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Reservas');

    // Guardar el libro de trabajo como un archivo Excel
    XLSX.writeFile(wb, 'HistorialReservas.xlsx');
});
