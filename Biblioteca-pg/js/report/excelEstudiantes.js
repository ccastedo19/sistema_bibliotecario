document.getElementById('generateExcel').addEventListener('click', function() {
    fetch('http://localhost:8000/api/estudiantes')
        .then(response => response.json())
        .then(data => {
            generateExcel(data);
        })
        .catch(error => console.error('Error fetching students:', error));
});

function generateExcel(data) {
    const wb = XLSX.utils.book_new();
    const ws_data = [["N°", "Ci", "Nombres", "Apellidos", "Estado"]]; // Encabezado

    data.forEach((estudiante, index) => {
        const estudianteData = [
            index + 1,
            estudiante.ci,
            estudiante.nombre_estudiante,
            estudiante.apellido_estudiante,
            getEstado(estudiante.estado_estudiante),
        ];
        ws_data.push(estudianteData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Estudiantes");

    XLSX.writeFile(wb, 'estudiantes.xlsx');
}

function getEstado(estado_estudiante) {
    const estados = {
        0: 'Inactivo',
        1: 'Activo',
    };
    return estados[estado_estudiante] || 'Desconocido';
}
