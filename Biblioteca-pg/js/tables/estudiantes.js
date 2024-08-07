document.addEventListener('DOMContentLoaded', function () {
    cargarSegundos();
    BotonPaginacion();
    obtenerUsuarioActual();

    // Maneja clic en el th para ordenar
    document.querySelectorAll('.dt-column-order').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const currentOrder = header.getAttribute('data-order') || 'asc'; // Por defecto asc si no hay valor
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            
            // Cambia el atributo data-order en el th
            header.setAttribute('data-order', newOrder);
            updateOrderIndicators(); // Actualiza las flechas
            sortStudents(column, newOrder); // Ordena la tabla
        });
    });

    document.getElementById('search-student').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 2) {
            filtrarEstudiantes(searchTerm);
        } else {
            displayStudents();
        }
    });

    document.getElementById('entriesPerPage').addEventListener('change', function() {
        recordsPerPage = parseInt(this.value);
        currentPage = 1;
        displayStudents();
        BotonPaginacion();
    });
});



function filtrarEstudiantes(searchTerm) {
    const filtrados = totalStudents.filter(student =>
        student.ci.toString().includes(searchTerm) ||
        student.nombre_estudiante.toLowerCase().includes(searchTerm) ||
        student.apellido_estudiante.toLowerCase().includes(searchTerm)
    );
    displayStudents(filtrados);
}

function sortStudents(column, order) {
    totalStudents.sort((a, b) => {
        let valA, valB;
        switch(column) {
            case 'numero':
                valA = a.id_estudiante;
                valB = b.id_estudiante;
                break;
            case 'ci':
                valA = a.ci;
                valB = b.ci;
                break;
            case 'nombre_estudiante':
                valA = a.nombre_estudiante.toLowerCase();
                valB = b.nombre_estudiante.toLowerCase();
                break;
            case 'apellido_estudiante':
                valA = a.apellido_estudiante.toLowerCase();
                valB = b.apellido_estudiante.toLowerCase();
                break;
            case 'estado_estudiante':
                valA = a.estado_estudiante;
                valB = b.estado_estudiante;
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
    displayStudents();
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

let currentPage = 1;
let recordsPerPage = 7;
let totalRecords = 0;
let totalStudents = [];

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
    cargarEstudiantes();
}

function cargarEstudiantes() {
    fetch('http://localhost:8000/api/estudiantes')
    .then(response => response.json())
    .then(data => {
        totalStudents = data.map((student, index) => ({ ...student, originalIndex: index + 1 }));
        totalRecords = data.length;
        displayStudents();
    })
    .catch(error => console.error('Error fetching students:', error));
}

function displayStudents(studentsToShow = totalStudents.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)) {
    const studentRows = document.getElementById('studentRows');
    studentRows.innerHTML = '';

    if (studentsToShow.length === 0) {
        studentRows.innerHTML = '<tr><td colspan="8" class="text-center">No se encontraron estudiantes.</td></tr>';
        return;
    }

    studentsToShow.forEach((student) => {
        const studentIndex = student.originalIndex;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="div-table-cell">${studentIndex}</td>
            <td class="div-table-cell">${student.ci}</td>
            <td class="div-table-cell">${student.nombre_estudiante}</td>
            <td class="div-table-cell">${student.apellido_estudiante}</td>
            <td class="div-table-cell">${student.estado_estudiante === 1 ? '<span class="activo">Activo</span>' : '<span class="inactivo">Inactivo</span>'}</td>
            <td class="div-table-cell">
                <button onclick="cambiarEstado(${student.id_estudiante})" type="submit" class="btn btn-info tooltips-general"><i class="zmdi zmdi-swap"></i></button>
            </td>
            <td class="div-table-cell">
                <button type="submit" onclick="cargarEditar(${student.id_estudiante}, '${student.nombre_estudiante.replace(/'/g, "\\'")}', '${student.apellido_estudiante.replace(/'/g, "\\'")}', '${student.ci}')" class="btn btn-warning"><i class="zmdi zmdi-edit"></i></button>
            </td>
            <td class="div-table-cell">
                <button onclick="eliminarEstudiante(${student.id_estudiante})" type="submit" class="btn btn-danger tooltips-general"><i class="zmdi zmdi-delete"></i></button>
            </td>
            <td class="div-table-cell">
                <button type="submit" onclick="mostrarHistorialReservas(${student.id_estudiante}, '${student.ci}', '${student.nombre_estudiante} ${student.apellido_estudiante}')" class="btn btn-success"><i class="zmdi zmdi-file-text"></i></button>
            </td>
        `;
        studentRows.appendChild(row);
    });
    updatePaginationInfo();
}

function changePage(direction) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    if ((direction === -1 && currentPage > 1) || (direction === 1 && currentPage < totalPages)) {
        currentPage += direction;
        displayStudents();
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

    fetch('http://localhost:8000/api/cantidad_estudiantes')
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
        console.error('Error al cargar datos de estudiantes:', error);
    });
}




/*----------------------------- */ 
/*----Ficha estudiante-------- */
/*-----------------------------*/ 


function mostrarHistorialReservas(id_estudiante, ci, nombreCompleto) {
    // Actualizar la información del estudiante en el modal
    document.getElementById('studentCi').innerText = ci;
    document.getElementById('studentName').innerText = nombreCompleto;

    // Limpiar la tabla de reservas y ocultar el mensaje de "no reservas"
    const reservaTableBody = document.getElementById('reservaTableBody');
    reservaTableBody.innerHTML = '';
    const noReservationsMessage = document.getElementById('noReservationsMessage');
    noReservationsMessage.style.display = 'none';

    const iconReport = document.getElementById("reportHistorial");
    const reservaTable = document.getElementById("reservaTable");
  

    // Hacer la solicitud al endpoint
    fetch(`http://localhost:8000/api/reserva_estudiante/${id_estudiante}`)
    .then(response => response.json())
    .then(data => {
        // Revisar si la respuesta contiene un mensaje de "no se encontraron reservas"
        if (data.message && data.message === "No se encontraron reservas para el estudiante") {
            noReservationsMessage.style.display = 'block';
            reservaTable.style.display = 'none';
            iconReport.style.display = 'none';
            return;
        }

        // Llenar la tabla con las reservas si existen
        data.forEach(reserva => {
            reservaTable.style.display = 'inline-table';
            iconReport.style.display = 'flex';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="div-table-cell">${formatDate(reserva.fecha_inicio)}</td>
                <td class="div-table-cell">${formatDate(reserva.fecha_fin)}</td>
                <td class="div-table-cell">${reserva.libro.titulo}</td>
                <td class="div-table-cell">${reserva.cantidad}</td>
                <td class="div-table-cell">${reserva.estado_reserva === 1 ? 'Prestado' : 'Devuelto'}</td>
            `;
            reservaTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching reservations:', error));

    // Mostrar el modal
    $('#ModalHistorialReservas').modal('show');
}



function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}



/*-------------- */ 
/*----Toastr---- */
/*--------------*/ 

function mensajeError(mensaje){
    toastr.error(mensaje, 'Error');
}
function mensajeValido(mensaje){
    toastr.success(mensaje);
}

/*------------------------ */ 
/*----Cambiar Estado---- */
/*-----------------------*/ 

function cambiarEstado(id){
    console.log("id a cambiar estado",id)
    Swal.fire({
        title: "Desea cambiar el estado del estudiante?",
        text: "Esta acción es reversible",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Actualizar"
    }).then((result) => {
        if (result.isConfirmed) {
            cambiarEstadoApi(id);
        }
    });
}

function cambiarEstadoApi(id){

    fetch(`http://localhost:8000/api/estadoEstudiante/${id}`, {
        method: 'PATCH'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Estado Cambiado",
            text: "Se ha actualizado el estado del estudiante",
            icon: "success"
        });
        cargarEstudiantes()
        
    }).catch(error => {
        console.error('Error actualizar el estudiante:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al actualizar estado del estudiante",
            icon: "error"
        });
    });
}


/*-------------- */ 
/*----Editar ---- */
/*--------------*/ 

async function cargarEditar(id, nombre, apellido, ci) {

    const datosEstudiante = {
        id:id,
        nombre: nombre,
        apellido: apellido,
        ci: ci
    }

    localStorage.setItem('datosEstudiante', JSON.stringify(datosEstudiante));

    window.location.href = "editarestudiante.html";

}



/*-------------- */ 
/*---- Eliminar--- */
/*--------------*/ 

function eliminarEstudiante(id_estudiante){
    Swal.fire({
        title: "Desea Eliminar el estudiante?",
        text: "Se eliminarán los préstamos realizados, esta acción es irreversible",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarEstudianteApi(id_estudiante);
        }
    });
}

function eliminarEstudianteApi(id_estudiante){
    fetch(`http://localhost:8000/api/eliminarEstudiante/${id_estudiante}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.res) {
            Swal.fire({
                title: "Eliminado!",
                text: data.mensaje,
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                cargarSegundos();
                BotonPaginacion();
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: data.mensaje,
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    })
    .catch(error => {
        console.error('Error al eliminar el estudiante:', error);
        Swal.fire({
            title: "Error!",
            text: "Ocurrió un error al eliminar el estudiante.",
            icon: "error",
            confirmButtonText: "Ok"
        });
    });
}
