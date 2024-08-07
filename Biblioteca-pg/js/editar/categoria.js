document.addEventListener('DOMContentLoaded', function() {
    // Obtener los datos del localStorage
    var datosCategoria = localStorage.getItem('datosCategoria');
    var mensajeSinDatos = document.getElementById("mensajeSinDatosEstudiante");
    var tablaDatos = document.getElementById("formEditarCategoria");
    
    if (datosCategoria) {
        mensajeSinDatos.style.display = "none";
        var categoria = JSON.parse(datosCategoria);
        
        // Asignar los valores a los campos del formulario
        document.getElementById('input-codigo').value = categoria.codigo_categoria;
        document.getElementById('input-nombre-categoria').value = categoria.nombre_categoria;
    }else{
        tablaDatos.style.display = "none";
        mensajeSinDatos.style.display = "flex";
    }
});

function destruirDatosCategoria(){
    localStorage.removeItem('datosCategoria');
    window.location.href = "listcategory.html";
}

function editarCategoria(event){
    event.preventDefault();

    var datosCategoria = localStorage.getItem('datosCategoria');
    if (datosCategoria) {
        var categoria = JSON.parse(datosCategoria);
        var id_categoria = categoria.id_categoria;
    } else {
        console.error('No se encontró información de la categoría en el localStorage');
        return;
    }

    var codigo_categoria = document.getElementById('input-codigo').value;
    var nombre_categoria = document.getElementById('input-nombre-categoria').value;

    fetch(`http://localhost:8000/api/editarCategoria/${id_categoria}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            codigo_categoria: codigo_categoria,
            nombre_categoria: nombre_categoria,
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Error al editar la categoría');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.res) {
            destruirDatosCategoria();
            window.location.href = "listcategory.html"; 
        } else {
            mensajeError('Hubo un error al editar la categoría');
        }
    })
    .catch(error => {
        console.error('Error al editar la categoría:', error);
        mensajeError('El código de la categoría ya esta siendo usada.');
    });
}

