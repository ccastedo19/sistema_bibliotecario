document.getElementById('generatePDF').addEventListener('click', function() {
    fetch('http://localhost:8000/api/usuariosDesc')
        .then(response => response.json())
        .then(data => {
            generatePDF(data);
        })
        .catch(error => console.error('Error fetching users:', error));
});

function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableColumn = ["N°", "Nombre Completo", "Email", "Rol"];
    const tableRows = [];

    data.forEach((usuario, index) => {
        const usuarioData = [
            index + 1,
            usuario.nombre_usuario,
            usuario.email,
            getRole(usuario.id_rolF),
        ];
        tableRows.push(usuarioData);
    });

    // Establecer título
    doc.setTextColor(44, 132, 188); // Color azul
    doc.setFontSize(16);
    doc.text("Listado de usuarios", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Añadir margen hacia abajo
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30, // Ajusta este valor si es necesario
    });

    doc.save('usuarios.pdf');
}

function getRole(id_rol) {
    const roles = {
        1: 'Administrador',
        2: 'Empleado',
        // Añadir más roles según sea necesario
    };
    return roles[id_rol] || 'Desconocido';
}