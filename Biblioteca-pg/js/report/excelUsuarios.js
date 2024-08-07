document.getElementById('generateExcel').addEventListener('click', function() {
    fetch('http://localhost:8000/api/usuariosDesc')
        .then(response => response.json())
        .then(data => {
            generateExcel(data);
        })
        .catch(error => console.error('Error fetching users:', error));
});

function generateExcel(data) {
    const wb = XLSX.utils.book_new();
    const ws_data = [["N°", "Nombre Completo", "Email", "Rol"]]; // Encabezado

    data.forEach((usuario, index) => {
        const usuarioData = [
            index + 1,
            usuario.nombre_usuario,
            usuario.email,
            getRole(usuario.id_rolF),
        ];
        ws_data.push(usuarioData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");

    XLSX.writeFile(wb, 'usuarios.xlsx');
}

function getRole(id_rol) {
    const roles = {
        1: 'Administrador',
        2: 'Empleado',
        // Añadir más roles según sea necesario
    };
    return roles[id_rol] || 'Desconocido';
}
