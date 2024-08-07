document.addEventListener('DOMContentLoaded', function () {
    cargarSegundos();
    BotonPaginacion();

    document.querySelectorAll('.dt-column-order').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const currentOrder = header.getAttribute('data-order') || 'asc';
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            header.setAttribute('data-order', newOrder);
            updateOrderIndicators();
            sortCategorys(column, newOrder);
        });
    });

    document.getElementById('search-category').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 2) {
            filtrarCategorias(searchTerm);
        } else {
            displayCategory();
        }
    });

    document.getElementById('entriesPerPage').addEventListener('change', function() {
        recordsPerPage = parseInt(this.value);
        currentPage = 1;
        displayCategory();
        BotonPaginacion();
    });
});

function filtrarCategorias(searchTerm) {
    const filtrados = totalCategorias.filter(category =>
        category.codigo_categoria.toString().includes(searchTerm) ||
        category.nombre_categoria.toLowerCase().includes(searchTerm)
    );
    displayCategory(filtrados);
}

function sortCategorys(column, order) {
    totalCategorias.sort((a, b) => {
        let valA, valB;
        switch(column) {
            case 'numero':
                valA = a.id_categoria;
                valB = b.id_categoria;
                break;
            case 'codigo_categoria':
                valA = a.codigo_categoria;
                valB = b.codigo_categoria;
                break;
            case 'nombre_categoria':
                valA = a.nombre_categoria.toLowerCase();
                valB = b.nombre_categoria.toLowerCase();
                break;
            case 'originalIndex':
                valA = a.originalIndex;
                valB = b.originalIndex;
                break;
            default:
                return 0;
        }
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
    displayCategory();
}

function updateOrderIndicators() {
    document.querySelectorAll('.dt-column-order').forEach(header => {
        const order = header.getAttribute('data-order');
        const ascIndicator = header.querySelector('.dt-column-order-indicator.asc');
        const descIndicator = header.querySelector('.dt-column-order-indicator.desc');

        if (order === 'asc') {
            ascIndicator.classList.add('active');
            descIndicator.classList.remove('active');
        } else if (order === 'desc') {
            ascIndicator.classList.remove('active');
            descIndicator.classList.add('active');
        }
    });
}

let currentPage = 1;
let recordsPerPage = 7;
let totalRecords = 0;
let totalCategorias = [];

function cargarSegundos() {
    var elementos = document.querySelectorAll('.caja-loader');
    var preloaders = document.querySelectorAll('.loader');

    setTimeout(function() {
        preloaders.forEach(function(preloader) {
            preloader.style.display = 'none';
        });

        elementos.forEach(function(elemento) {
            elemento.style.display = 'block';
        });
    }, 5000);
    cargarCategorias();
}

function cargarCategorias() {
    fetch('http://localhost:8000/api/categorias')
    .then(response => response.json())
    .then(data => {
        totalCategorias = data.map((category, index) => ({ ...category, originalIndex: index + 1 }));
        totalRecords = data.length;
        displayCategory();
    })
    .catch(error => console.error('Error fetching category:', error));
}

function displayCategory(categorysToShow = totalCategorias.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)) {
    const categoryRows = document.getElementById('categoriaRows');
    categoryRows.innerHTML = '';

    if (categorysToShow.length === 0) {
        categoryRows.innerHTML = '<tr><td colspan="5" class="text-center">No se encontraron categorías.</td></tr>';
        return;
    }

    categorysToShow.forEach((category) => {
        const categoryIndex = category.originalIndex;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="div-table-cell">${categoryIndex}</td>
            <td class="div-table-cell">${category.codigo_categoria}</td>
            <td class="div-table-cell">${category.nombre_categoria}</td>
            <td class="div-table-cell">
                <button type="submit" onclick="obtenerId(${category.id_categoria}, '${category.codigo_categoria}', '${category.nombre_categoria.replace(/'/g, "\\'")}')" class="btn btn-warning"><i class="zmdi zmdi-edit"></i></button>
            </td>
            <td class="div-table-cell">
                <button type="submit" onclick="eliminarCategoria(${category.id_categoria})" class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
            </td>
        `;
        categoryRows.appendChild(row);
    });
    updatePaginationInfo();
}

function changePage(direction) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    if ((direction === -1 && currentPage > 1) || (direction === 1 && currentPage < totalPages)) {
        currentPage += direction;
        displayCategory();
    }
}

function updatePaginationInfo() {
    const pageInfo = document.getElementById("pageInfo");
    const currentRecordsElement = document.getElementById("current-records");

    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startRecord = (currentPage - 1) * recordsPerPage + 1;
    const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    currentRecordsElement.textContent = `${startRecord} a ${endRecord}`;
}

function BotonPaginacion() {
    var btn_anterior = document.getElementById("btn-anterior");
    var btn_siguiente = document.getElementById("btn-siguiente");
    var pageInfo = document.getElementById("pageInfo");
    var totalRecordsElement = document.getElementById("total-records");

    fetch('http://localhost:8000/api/contarCategorias')
    .then(response => {
        if (!response.ok) {
            throw new Error('Red no encontrada');
        }
        return response.json();
    })
    .then(data => {
        totalRecords = data.total;
        totalRecordsElement.textContent = totalRecords;

        if (totalRecords <= recordsPerPage) {
            btn_anterior.style.display = "none";
            btn_siguiente.style.display = "none";
            
            pageInfo.style.display = "none";
        } else {
            btn_anterior.style.display = "inline-block";
            btn_siguiente.style.display = "inline-block";
            pageInfo.style.display = "inline-block";
        }

        updatePaginationInfo();
    })
    .catch(error => {
        console.error('Error al cargar datos de categorias:', error);
    });
}



/*---------------------------- */ 
/*----Editar categoria----- */
/*----------------------------*/ 

async function obtenerId(id_categoria, codigo_categoria, nombre_categoria, ){

    const datosCategoria = {
        id_categoria:id_categoria,
        codigo_categoria:codigo_categoria,
        nombre_categoria:nombre_categoria
    }

    localStorage.setItem('datosCategoria', JSON.stringify(datosCategoria));

    window.location.href = "editarcategoria.html";

}

/*---------------------------- */ 
/*----Eliminar categoria----- */
/*----------------------------*/ 

function eliminarCategoria(id_categoria){
    Swal.fire({
        title: "Desea eliminar la categoria?",
        text: "No se podrá eliminar si tiene registros",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
          eliminarCategoriaApi(id_categoria);
        }
    });
}


function eliminarCategoriaApi(id_categoria){
    fetch(`http://localhost:8000/api/eliminarCategoria/${id_categoria}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Eliminado",
            text: "La Categoría ha sido eliminado correctamente del sistema",
            icon: "success"
        });
        cargarCategorias();
    }).catch(error => {
        console.error('Error al eliminar:', error);
        Swal.fire({
            title: "Error",
            text: "La categoría ha sido registrada en uno o varios libros",
            icon: "error"
        });
    });
}

