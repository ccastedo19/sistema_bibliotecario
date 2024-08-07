document.addEventListener('DOMContentLoaded', function () {
    cargarDatosLibro();
});

function cargarDatosLibro() {
    backendUrl = 'http://localhost:8000';
    const datosLibro = localStorage.getItem('datosLibro');
    if (!datosLibro) {
        console.log("No se encontraron datos del libro en el localStorage");
        return;
    }

    const libro = JSON.parse(datosLibro);
    document.getElementById('codigoLibro').value = libro.codigo_libro;
    document.getElementById('tituloLibro').value = libro.titulo;
    document.getElementById('autorLibro').value = libro.autor;
    document.getElementById('stockLibro').value = libro.stock;
    document.getElementById('idiomaLibro').value = libro.idioma;

    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    imagePreviewContainer.innerHTML = `<img src="${backendUrl}/${libro.imagen}" alt="Imagen del Libro" style="width: 100px; height: 150px; float: left;">`;

    fetch('http://localhost:8000/api/categorias')
        .then(response => response.json())
        .then(categorias => {
            const categoriaSelect = document.getElementById('categoriaSelect');

            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id_categoria;
                option.textContent = categoria.nombre_categoria;
                categoriaSelect.appendChild(option);
            });

            categoriaSelect.value = libro.id_categoria;
        })
        .catch(error => {
            console.error('Error al cargar las categorías:', error);
        });
}



function actualizarLibro(event) {
    event.preventDefault();

    const datosLibro = localStorage.getItem('datosLibro');
    if (!datosLibro) {
        console.error('No se encontró información del libro en el localStorage');
        return;
    }

    const libro = JSON.parse(datosLibro);
    const id_libro = libro.id_libro;

    const codigo_libro = document.getElementById('codigoLibro').value;
    const titulo = document.getElementById('tituloLibro').value;
    const autor = document.getElementById('autorLibro').value;
    const idioma = document.getElementById('idiomaLibro').value;
    const stock = document.getElementById('stockLibro').value;
    const id_categoriaF = document.getElementById('categoriaSelect').value;
    const imagen = document.getElementById('imageInput').files[0];
    
    if (!codigo_libro.trim() || !titulo.trim() || !autor.trim() || !idioma.trim() || !stock || !id_categoriaF) {
        mensajeError('Todos los campos deben ser llenados');
        return;
    }

    if (imagen && !imagen.type.startsWith('image/')) {
        mensajeError("El archivo seleccionado no es una imagen.");
        return;
      }

    const data = {
        titulo: titulo,
        codigo_libro: codigo_libro,
        autor: autor,
        idioma: idioma,
        stock: stock,
        id_categoriaF: id_categoriaF
    };

    $.ajax({
        url: `http://localhost:8000/api/libro/${id_libro}`,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            console.log("entro update libro");

            console.log(response.message);
            if (response.message) {
                if (imagen) {
                    actualizarImagenLibro(id_libro, imagen);
                } else {
                    window.location.href = "catalog.html";
                }
            } else {
                mensajeError("Error, el código correlativo ya existe.");
            }
        },
        error: function (error) {
            console.error('Error:', error);
            mensajeError('Error código correlativo existente en otro libro');
        }
    });
}

async function actualizarImagenLibro(id_libro, imagen) {
    const formData = new FormData();
    formData.append('file', imagen);

    // console.log("imagen:", imagen);
    // try {
    //     const response = await fetch(`http://localhost:8000/api/imagen/${id_libro}`, {
    //         method: 'POST',
    //         body: formData,
    //     });

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     console.log('Success:', data);
    // } catch (error) {
    //     console.error('Error:', error);
    // }

    $.ajax({
        url: `http://localhost:8000/api/imagen/${id_libro}`,
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            if (response.success) {
                window.location.href = "catalog.html";
                console.log(response.message);
            } else {
                mensajeError("Error al actualizar la imagen.");
            }
        },
        error: function (error) {
            console.error('Error:', error);
            mensajeError('Error al conectar con el servidor');
        }
    });
}


