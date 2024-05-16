document.addEventListener('DOMContentLoaded', function () {
    BotonPaginacion();
    cargarSegundos();

    /*-------------- */ 
    /*----Buscador---- */
    /*--------------*/ 

    document.getElementById('search-student').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 2) {
            filtrarEstudiantes(searchTerm);
        } else {
            displayStudents(); 
        }
    });
});

function filtrarEstudiantes(searchTerm) {
    const filtrados = totalStudents.filter(student => {
        // Convertir CI a string y comparar
        const ciMatch = student.ci.toString().includes(searchTerm);
        const nombreMatch = student.nombre_estudiante.toLowerCase().includes(searchTerm);
        const apellidoMatch = student.apellido_estudiante.toLowerCase().includes(searchTerm);

        return ciMatch || nombreMatch || apellidoMatch;
    });
    displayStudents(filtrados);
}




let currentPage = 1;
const recordsPerPage = 7;
let totalRecords = 0;
let totalStudents = [];

function cargarSegundos(){
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
    cargarEstudiantes()

}


/*---------------------- */ 
/*----Cargar tabla----- */
/*---------------------*/ 


function cargarEstudiantes() {
    fetch('http://localhost:8000/api/estudiantes')
    .then(response => response.json())
    .then(data => {
        totalStudents = data;
        totalRecords = data.length;
        displayStudents();
    })

    .catch(error => console.error('Error fetching users:', error));
}



function displayStudents(studentsToShow = totalStudents.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)) {
    const studentRows = document.getElementById('studentRows');
    studentRows.innerHTML = '';

    if (studentsToShow.length === 0) {
        studentRows.innerHTML = '<tr><td colspan="8" class="text-center">No se encontraron estudiantes.</td></tr>';
        return;
    }

    const startIndex = (currentPage - 1) * recordsPerPage;

    studentsToShow.forEach((student, index) => {
        const studentIndex = startIndex + index + 1;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="div-table-cell">${studentIndex}</td>
            <td class="div-table-cell">${student.ci}</td>
            <td class="div-table-cell">${student.nombre_estudiante}</td>
            <td class="div-table-cell">${student.apellido_estudiante}</td>
            <td class="div-table-cell">${student.estado_estudiante === 1 ? 'Activo' : 'Inactivo'}</td>
            <td class="div-table-cell">
                <button onclick="cambiarEstado(${student.id_estudiante})" type="submit" class="btn btn-info tooltips-general"><i class="zmdi zmdi-swap"></i></button>
            </td>
            <td class="div-table-cell">
                <button type="submit" onclick="editarEstudiante(${student.id_estudiante}, '${student.nombre_estudiante.replace(/'/g, "\\'")}', '${student.apellido_estudiante.replace(/'/g, "\\'")}', '${student.ci}')" class="btn btn-warning"><i class="zmdi zmdi-edit"></i></button>
            </td>
            <td class="div-table-cell">
                <button type="submit" class="btn btn-success"><i class="zmdi zmdi-file-text"></i></button>
            </td>
        `;
        studentRows.appendChild(row);
    });
    updatePaginationInfo(); // Asegúrate de actualizar la información de paginación
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


/*-------------- */ 
/*----Paginacion---- */
/*--------------*/ 

function changePage(direction) {
    if (direction === -1 && currentPage > 1) {
        currentPage--;
    } else if (direction === 1 && (currentPage * recordsPerPage) < totalRecords) {
        currentPage++;
    }
    displayStudents();
}

function updatePaginationInfo() {
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(totalRecords / recordsPerPage)}`;
}

function BotonPaginacion(){
    var btn_anterior = document.getElementById("btn-anterior");
    var btn_siguiente = document.getElementById("btn-siguiente");
    var pageInfo = document.getElementById("pageInfo");

    fetch('http://localhost:8000/api/cantidad_estudiantes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Red no encontrada');
      }
      return response.json();
    })
    .then(data => {
        const totalEstudents = data.total_students; 
        //console.log("total estudiantes:",totalEstudents);
        if(totalEstudents < 8){
            btn_anterior.style.display = "none";
            btn_siguiente.style.display = "none";
            pageInfo.style.display = "none";
        }

    })
    .catch(error => {
        //console.error('Error cargar datos estudiantes:', error);
        return
    });

    
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
        console.error('Error eliminando el estudiante:', error);
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

async function editarEstudiante(id, nombre, apellido, ci) {
    console.log("id:",id)
    const { value: formValues } = await Swal.fire({
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        title: 'Editar Estudiante',
        html: `
            <input style="width:300px" value="${ci.toString()}" id="swal-input-ci-estudiante" class="swal2-input" placeholder="CI">
            <input style="width:300px" value="${nombre.replace(/"/g, '&quot;')}" id="swal-input-nombre-estudiante" class="swal2-input" placeholder="Nombre">
            <input style="width:300px" value="${apellido.replace(/"/g, '&quot;')}" id="swal-input-apellido-estudiante" class="swal2-input" placeholder="Apellido">
            
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input-ci-estudiante').value,
                document.getElementById('swal-input-nombre-estudiante').value,
                document.getElementById('swal-input-apellido-estudiante').value
            ];
        }
    });

    if (formValues) {
        const [ci, nombre_estudiante, apellido_estudiante] = formValues;
        if (!ci.trim() || !nombre_estudiante.trim() || !apellido_estudiante.trim() ) {
            Swal.fire('Error', 'Los campos deben ser llenados', 'error');
            return;
        }
        var ci_new = parseInt(ci);
        console.log("ci",ci_new);
        console.log("nombre",nombre_estudiante);
        console.log("apellido",apellido_estudiante);

        fetch(`http://localhost:8000/api/estudiante/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                ci: ci_new,
                nombre_estudiante: nombre_estudiante,
                apellido_estudiante: apellido_estudiante
               
            })
        })
        
        .then(response => {
            if (!response.ok) throw response;
            return response.json();
        })
        .then(data => {
            if (data.errors) {
                // Manejo de errores de validación
                const errors = Object.values(data.errors).map(e => e.join('\n')).join('\n');
                Swal.fire('Error en la validación', errors, 'error');
            } else {
                // Éxito al actualizar
                Swal.fire('Actualizado', 'Estudiante actualizado correctamente', 'success');
                cargarEstudiantes()
            }
        })
        .catch(errorResponse => {
            // Manejar respuesta de error de la API
            errorResponse.json().then(errorData => {
                const errorMessages = errorData.errors ? Object.values(errorData.errors).join(', ') : 'Hubo un problema al actualizar el estudiante';
                Swal.fire('Error al actualizar', errorMessages, 'error');
            }).catch(() => {
                Swal.fire('Error al actualizar', 'Hubo un problema al actualizar el estudiante', 'error');
            });
        });
    }
}


/*-------------- */ 
/*---- ---- */
/*--------------*/ 

