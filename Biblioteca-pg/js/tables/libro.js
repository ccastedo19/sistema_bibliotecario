document.addEventListener('DOMContentLoaded', function () {
    initPagination();
    cargarLibros();
    initSearch();

    // Maneja clic en el th para ordenar
    document.querySelectorAll('.dt-column-order').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const currentOrder = header.getAttribute('data-order') || 'asc'; // Por defecto asc si no hay valor
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            // Cambia el atributo data-order en el th
            header.setAttribute('data-order', newOrder);
            updateOrderIndicators(); // Actualiza las flechas
            sortLibros(column, newOrder); // Ordena la tabla
        });
    });
});

let currentPage = 1;
const recordsPerPage = 7;
let totalRecords = 0;
let totalLibros = [];
const backendUrl = 'http://localhost:8000'; // Asegúrate de que esta URL es correcta

function initPagination() {
    var preloaders = document.querySelectorAll('.loader');
    var elementos = document.querySelectorAll('.caja-loader');

    setTimeout(function() {
        preloaders.forEach(function(preloader) {
            preloader.style.display = 'none';
        });

        elementos.forEach(function(elemento) {
            elemento.style.display = 'block';
        });
    }, 2000); // Ajusta el tiempo según sea necesario
}

function cargarLibros() {
    fetch(`${backendUrl}/api/libros`)
    .then(response => response.json())
    .then(data => {
        totalLibros = data.map((libro, index) => ({ ...libro, originalIndex: index + 1 }));
        totalRecords = data.length;
        displayLibros();
        updatePaginationVisibility();
    })
    .catch(error => console.error('Error fetching books:', error));
}

function displayLibros(librosToShow = totalLibros.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)) {
    const libroRows = document.getElementById('libroRows');
    libroRows.innerHTML = '';

    if (librosToShow.length === 0) {
        libroRows.innerHTML = '<tr><td colspan="12" class="text-center">No se encontraron libros.</td></tr>';
        document.getElementById("pagination-container").style.display = "none";
        return;
    }

    librosToShow.forEach((libro) => {
        const imagenUrl = `${backendUrl}/${libro.imagen}`;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="div-table-cell">${libro.originalIndex}</td>
            <td class="div-table-cell"><img src="${imagenUrl}" alt="${libro.titulo}" style="width:50px;height:70px;margin-top:5px;margin-bottom:5px"></td>
            <td class="div-table-cell">${libro.codigo_libro}</td>
            <td class="div-table-cell">${libro.titulo}</td>
            <td class="div-table-cell">${libro.autor}</td>
            <td class="div-table-cell">${libro.idioma}</td>
            <td class="div-table-cell">${libro.stock}</td>
            <td class="div-table-cell">${libro.categoria.nombre_categoria}</td>
            <td class="div-table-cell">${libro.estado_libro === 1 ? '<span class="activo">Activo</span>' : '<span class="inactivo">Inactivo</span>'}</td>
            <td class="div-table-cell"><button onclick="cambiarEstadoLibro(${libro.id_libro})" type="submit" class="btn btn-info tooltips-general"><i class="zmdi zmdi-swap"></i></button></td>
            <td class="div-table-cell"><button onclick="editarLibro(${libro.id_libro}, '${libro.codigo_libro}', '${libro.titulo.replace(/'/g, "\\'")}', '${libro.autor.replace(/'/g, "\\'")}', '${libro.idioma.replace(/'/g, "\\'")}', ${libro.categoria.id_categoria}, ${libro.stock}, '${libro.imagen}')" class="btn btn-warning"><i class="zmdi zmdi-edit"></i></button></td>
            <td class="div-table-cell"><button onclick="eliminarLibro(${libro.id_libro})" class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button></td>
        `;
        libroRows.appendChild(row);
    });

    updatePaginationInfo();
}

function updatePaginationInfo() {
    const pageInfo = document.getElementById('pageInfo');
    const currentRecordsElement = document.getElementById('current-records');
    const totalRecordsElement = document.getElementById('total-records');

    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startRecord = (currentPage - 1) * recordsPerPage + 1;
    const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

    pageInfo.innerHTML = `Página ${currentPage} de ${totalPages}`;
    currentRecordsElement.textContent = `${startRecord} a ${endRecord}`;
    totalRecordsElement.textContent = totalRecords;

    document.getElementById('btn-anterior').disabled = currentPage === 1;
    document.getElementById('btn-siguiente').disabled = currentPage === totalPages;
}

function updatePaginationVisibility() {
    const pagination = document.getElementById('pagination-controls');
    if (totalRecords <= recordsPerPage) {
        pagination.style.display = 'none';
    } else {
        pagination.style.display = 'flex';
    }
}

function changePage(delta) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    if ((delta === -1 && currentPage > 1) || (delta === 1 && currentPage < totalPages)) {
        currentPage += delta;
        displayLibros();
    }
}

function initSearch() {
    document.getElementById('search-libro').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 2) {
            filtrarLibros(searchTerm);
        } else {
            displayLibros();
            updatePaginationVisibility();
        }
    });
}

function filtrarLibros(searchTerm) {
    const filtrados = totalLibros.filter(libro => {
        const codigoMatch = libro.codigo_libro.toString().includes(searchTerm);
        const tituloMatch = libro.titulo.toLowerCase().includes(searchTerm);
        const autorMatch = libro.autor.toLowerCase().includes(searchTerm);
        const idiomaMatch = libro.idioma.toLowerCase().includes(searchTerm);
        const categoriaMatch = libro.categoria.nombre_categoria.toLowerCase().includes(searchTerm);
        return codigoMatch || tituloMatch || autorMatch || idiomaMatch || categoriaMatch;
    });
    displayLibros(filtrados);
    updatePaginationVisibility();
}

function sortLibros(column, order) {
    totalLibros.sort((a, b) => {
        let valA, valB;
        switch(column) {
            case 'numero':
                valA = a.id_libro;
                valB = b.id_libro;
                break;
            case 'imagen':
                valA = a.imagen;
                valB = b.imagen;
                break;
            case 'codigo':
                valA = a.codigo_libro;
                valB = b.codigo_libro;
                break;
            case 'titulo':
                valA = a.titulo.toLowerCase();
                valB = b.titulo.toLowerCase();
                break;
            case 'autor':
                valA = a.autor.toLowerCase();
                valB = b.autor.toLowerCase();
                break;
            case 'idioma':
                valA = a.idioma.toLowerCase();
                valB = b.idioma.toLowerCase();
                break;
            case 'stock':
                valA = a.stock;
                valB = b.stock;
                break;
            case 'categoria':
                valA = a.categoria.nombre_categoria.toLowerCase();
                valB = b.categoria.nombre_categoria.toLowerCase();
                break;
            case 'estado':
                valA = a.estado_libro;
                valB = b.estado_libro;
                break;
            default:
                return 0;
        }
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
    displayLibros();
}

function updateOrderIndicators() {
    document.querySelectorAll('.dt-column-order').forEach(header => {
        const order = header.getAttribute('data-order');
        const ascIndicator = header.querySelector('.dt-column-order-indicator.asc');
        const descIndicator = header.querySelector('.dt-column-order-indicator.desc');

        // Resalta la flecha correspondiente
        if (order === 'asc') {
            ascIndicator.classList.add('active');
            descIndicator.classList.remove('active');
        } else if (order === 'desc') {
            ascIndicator.classList.remove('active');
            descIndicator.classList.add('active');
        }
    });
}


/*------------------------ */ 
/*----Cambiar Estado---- */
/*-----------------------*/ 

function cambiarEstadoLibro(id_libro){
    Swal.fire({
        title: "Desea cambiar el estado del libro?",
        text: "Esta acción es reversible",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Actualizar"
    }).then((result) => {
        if (result.isConfirmed) {
            cambiarEstadoLibroApi(id_libro);
        }
    });
}

function cambiarEstadoLibroApi(id_libro){
    fetch(`http://localhost:8000/api/cambiarEstadoLibro/${id_libro}`, {
        method: 'PATCH'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Estado Cambiado",
            text: "Se ha actualizado el estado del libro",
            icon: "success"
        });
        cargarLibros();
        
    }).catch(error => {
        console.error('Error actualizar el libro:', error);
        Swal.fire({
            title: "Error",
            text: "El libro contiene registros de reservas.",
            icon: "error"
        });
    });
}


/*------------------------ */ 
/*----Eliminar Libro ---- */
/*-----------------------*/ 

function eliminarLibro(id_libro){
    Swal.fire({
        title: "Desea eliminar el libro?",
        text: "No se podrá eliminar si tiene registros",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
          eliminarLibroApi(id_libro);
        }
    });
}

function eliminarLibroApi(id_libro){
    fetch(`http://localhost:8000/api/eliminarLibro/${id_libro}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Eliminado",
            text: "El libro ha sido eliminado correctamente del sistema",
            icon: "success"
        });
        cargarLibros();
    }).catch(error => {
        console.error('Error al eliminar:', error);
        Swal.fire({
            title: "Error",
            text: "El libro contiene registros de reservas.",
            icon: "error"
        });
    });
}


/*------------------------ */ 
/*----Editar Libro ---- */
/*-----------------------*/ 

//datos traidos de la tabla
async function editarLibro(id_libro, codigo_libro, titulo, autor, idioma, id_categoria, stock, imagen) {
    const datosLibro = {
        id_libro: id_libro,
        codigo_libro: codigo_libro,
        titulo: titulo,
        autor: autor,
        idioma: idioma,
        id_categoria: id_categoria,
        stock: stock,
        imagen: imagen // URL de la imagen almacenada en la base de datos
    }

    localStorage.setItem('datosLibro', JSON.stringify(datosLibro));
    window.location.href = "editarlibro.html";
}

