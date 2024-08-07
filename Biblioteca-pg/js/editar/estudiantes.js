document.addEventListener('DOMContentLoaded', function() {
    // Obtener los datos del localStorage
    var estudianteData = localStorage.getItem('datosEstudiante');
    var mensajeSinDatos = document.getElementById("mensajeSinDatosEstudiante");
    var tablaDatos = document.getElementById("formEditarEstudiantes");
    
    if (estudianteData) {
        mensajeSinDatos.style.display = "none";
        var estudiante = JSON.parse(estudianteData);
        
        // Asignar los valores a los campos del formulario
        document.getElementById('ci').value = estudiante.ci;
        document.getElementById('nombre_estudiante').value = estudiante.nombre;
        document.getElementById('apellido_estudiante').value = estudiante.apellido;
    }else{
        tablaDatos.style.display = "none";
        mensajeSinDatos.style.display = "flex";
    }
});

function destruirDatosEstudiante(){
    localStorage.removeItem('datosEstudiante');
    window.location.href = "liststudent.html";
}


function editarEstudiante(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    var estudianteData = localStorage.getItem('datosEstudiante');
    if (estudianteData) {
        var estudiante = JSON.parse(estudianteData);
        var id_estudiante = estudiante.id;
    } else {
        console.error('No se encontró información del estudiante en el localStorage');
        return;
    }

    // Obtener los datos del formulario
    var ci = document.getElementById('ci').value;
    var nombre_estudiante = document.getElementById('nombre_estudiante').value;
    var apellido_estudiante = document.getElementById('apellido_estudiante').value;

    // Validar que no se envíen números en el nombre del estudiante
    if (/[\d]/.test(nombre_estudiante)) {
        alert('El nombre no puede contener números.');
        return;
    }

    // Realizar la solicitud PUT
    fetch(`http://localhost:8000/api/estudiante/${id_estudiante}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            ci: ci,
            nombre_estudiante: nombre_estudiante,
            apellido_estudiante: apellido_estudiante,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.res) {
            destruirDatosEstudiante();
        } else {
            mensajeError("El Ci ya esta registrado en otro estudiante");
        }
    })
    .catch(error => {
        console.error('Error al editar el estudiante:', error);
        mensajeError('Hubo un error al editar el estudiante');
    });
}
