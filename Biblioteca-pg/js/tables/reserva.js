document.addEventListener('DOMContentLoaded', function () {
    initPagination();
    cargarReservas();
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
            sortReservas(column, newOrder); // Ordena la tabla
        });
    });
});

let currentPage = 1;
const recordsPerPage = 7;
let totalRecords = 0;
let totalReservas = [];
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

function cargarReservas() {
    fetch(`${backendUrl}/api/reserva`)
    .then(response => response.json())
    .then(data => {
        totalReservas = data.map((reserva, index) => ({ ...reserva, originalIndex: index + 1 }));
        totalRecords = data.length;
        displayReservas();
        updatePaginationVisibility();
    })
    .catch(error => console.error('Error fetching reservations:', error));
}

function displayReservas(reservasToShow = totalReservas.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)) {
    const reservaRows = document.getElementById('reservaRows');
    reservaRows.innerHTML = '';

    if (reservasToShow.length === 0) {
        reservaRows.innerHTML = '<tr><td colspan="8" class="text-center">No se encontraron reservaciones.</td></tr>';
        document.getElementById("pagination-container").style.display = "none";
        return;
    }

    reservasToShow.forEach((reserva) => {
        const fechaInicio = formatDate(reserva.fecha_inicio);
        const fechaFin = formatDate(reserva.fecha_fin);
    
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="div-table-cell">${reserva.originalIndex}</td>
            <td class="div-table-cell">${fechaInicio}</td>
            <td class="div-table-cell">${fechaFin}</td>
            <td class="div-table-cell">${reserva.estudiante.nombre_estudiante} ${reserva.estudiante.apellido_estudiante}</td>
            <td class="div-table-cell">${reserva.libro.titulo}</td>
            <td class="div-table-cell">${reserva.cantidad}</td>
            <td class="div-table-cell">
                ${reserva.estado_reserva === 0 
                    ? '<span class="activo">Devuelto</span>' 
                    : reserva.estado_reserva === 1 
                        ? '<span class="inactivo">Prestado</span>' 
                        : '<span class="anulado">Anulado</span>'}
            </td>
            

            ${reserva.estado_reserva === 0 ? '<td class="div-table-cell"></td>' : reserva.estado_reserva === 1 ? `
                <td class="div-table-cell">
                    <button style="margin-bottom:3px" onclick="cambiarEstadoReserva(${reserva.id_reserva})" type="submit" class="btn btn-info tooltips-general">
                        <i class="zmdi zmdi-swap"></i>
                    </button>
                    
                    <button style="margin-bottom:3px" onclick="anularEstadoReserva(${reserva.id_reserva})" type="submit" class="btn btn-warning tooltips-general">
                        <i class="zmdi zmdi-close"></i>
                    </button>
                </td>
            ` : reserva.estado_reserva === 2 ? `
                <td class="div-table-cell">
                    <button style="margin-bottom:3px" onclick="eliminarReserva(${reserva.id_reserva})" type="submit" class="btn btn-danger tooltips-general">
                        <i class="zmdi zmdi-delete"></i>
                    </button>
                </td>
            ` : ''
            }
        `;
        reservaRows.appendChild(row);
    });
    
    updatePaginationInfo();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
        displayReservas();
    }
}

function initSearch() {
    document.getElementById('search-reserva').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 2) {
            filtrarReservas(searchTerm);
        } else {
            displayReservas();
            updatePaginationVisibility();
        }
    });
}

function filtrarReservas(searchTerm) {
    const filtrados = totalReservas.filter(reserva => {
        const estudianteMatch = (reserva.estudiante.nombre_estudiante + ' ' + reserva.estudiante.apellido_estudiante).toLowerCase().includes(searchTerm);
        const libroMatch = reserva.libro.titulo.toLowerCase().includes(searchTerm);
        const cantidadMatch = reserva.cantidad.toString().includes(searchTerm);
        const fechaInicioMatch = reserva.fecha_inicio.toLowerCase().includes(searchTerm);
        const fechaFinMatch = reserva.fecha_fin.toLowerCase().includes(searchTerm);
        return estudianteMatch || libroMatch || cantidadMatch || fechaInicioMatch || fechaFinMatch;
    });
    displayReservas(filtrados);
    updatePaginationVisibility();
}

function sortReservas(column, order) {
    totalReservas.sort((a, b) => {
        let valA, valB;
        switch(column) {
            case 'numero':
                valA = a.id_reserva;
                valB = b.id_reserva;
                break;
            case 'fecha_inicio':
                valA = new Date(a.fecha_inicio);
                valB = new Date(b.fecha_inicio);
                break;
            case 'fecha_fin':
                valA = new Date(a.fecha_fin);
                valB = new Date(b.fecha_fin);
                break;
            case 'estudiante':
                valA = (a.estudiante.nombre_estudiante + ' ' + a.estudiante.apellido_estudiante).toLowerCase();
                valB = (b.estudiante.nombre_estudiante + ' ' + b.estudiante.apellido_estudiante).toLowerCase();
                break;
            case 'libro':
                valA = a.libro.titulo.toLowerCase();
                valB = b.libro.titulo.toLowerCase();
                break;
            case 'cantidad':
                valA = a.cantidad;
                valB = b.cantidad;
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
    displayReservas();
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
/*----Cambiar estado ---- */
/*-----------------------*/ 

function cambiarEstadoReserva(id_reserva){
    Swal.fire({
        title: "El libro ha sido devuelto?",
        text: "Confirma si el estudiante ha devuelto el libro",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Actualizar"
    }).then((result) => {
        if (result.isConfirmed) {
            cambiarEstadoReservaApi(id_reserva);
        }
    });
}

function cambiarEstadoReservaApi(id_reserva){
    fetch(`http://localhost:8000/api/actualizarEstadoReserva/${id_reserva}`, {
        method: 'PUT'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Libro Devuelto",
            text: "El Estado ha sido actualizado",
            icon: "success"
        });
        cargarReservas();
        
    }).catch(error => {
        console.error('Error actualizar la reserva:', error);
        Swal.fire({
            title: "Error",
            text: "Error al confirmar devolución",
            icon: "error"
        });  
    });
}

/*------------------------ */ 
/*----Anular reserva ---- */
/*-----------------------*/ 


function anularEstadoReserva(id_reserva){
    Swal.fire({
        title: "Desea anular la reserva",
        text: "Esta acción no es reversible",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Anular"
    }).then((result) => {
        if (result.isConfirmed) {
            anularEstadoReservaApi(id_reserva);
        }
    });
}

function anularEstadoReservaApi(id_reserva){
    fetch(`http://localhost:8000/api/anularReserva/${id_reserva}`, {
        method: 'PUT'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Reserva Anulada",
            text: "El Estado ha sido actualizado",
            icon: "success"
        });
        cargarReservas();
        
    }).catch(error => {
        console.error('Error actualizar la reserva:', error);
        Swal.fire({
            title: "Error",
            text: "Error al anula la reserva",
            icon: "error"
        });  
    });
}


/*------------------------ */ 
/*----Eliminar reserva ---- */
/*-----------------------*/ 


function eliminarReserva(id_reserva){
    Swal.fire({
        title: "Desea eliminar la reserva?",
        text: "Esta acción es irreversible",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarReservaApi(id_reserva);
        }
    });
}

function eliminarReservaApi(id_reserva){
    fetch(`http://localhost:8000/api/eliminarReserva/${id_reserva}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Eliminado",
            text: "La Reserva ha sido eliminado correctamente del sistema",
            icon: "success"
        });
        cargarReservas();
    }).catch(error => {
        console.error('Error al eliminar:', error);
        Swal.fire({
            title: "Error",
            text: "La reserva no pudo ser eliminada",
            icon: "error"
        });
    });
}