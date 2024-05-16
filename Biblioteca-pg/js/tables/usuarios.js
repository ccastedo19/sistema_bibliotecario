document.addEventListener('DOMContentLoaded', function () {
    cargarSegundos();
    BotonPaginacion();

    document.getElementById('search-user').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 2) {
            filtrarUsuarios(searchTerm);
        } else {
            displayUsers(); 
        }
    });
});

function filtrarUsuarios(searchTerm) {
    const filteredUsers = totalUsers.filter(user =>
        user.nombre_usuario.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
}

function BotonPaginacion(){
    var btn_anterior = document.getElementById("btn-anterior");
    var btn_siguiente = document.getElementById("btn-siguiente");
    var pageInfo = document.getElementById("pageInfo");

    fetch('http://localhost:8000/api/contarUsuarios')
    .then(response => {
      if (!response.ok) {
        throw new Error('Red no encontrada');
      }
      return response.json();
    })
    .then(data => {
        const totalUsers = data.total_users; 
        console.log("total :",totalUsers);
        if(totalUsers < 8){
            btn_anterior.style.display = "none";
            btn_siguiente.style.display = "none";
            pageInfo.style.display = "none";
        }

    })
    .catch(error => {
        //console.error('Error cargar datos users:', error);
        return
    });

   
}

let currentPage = 1;
const recordsPerPage = 7;
let totalRecords = 0;
let totalUsers = [];

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
    cargarUsuarios()

}


function cargarUsuarios() {
    fetch('http://localhost:8000/api/usuarios')
    .then(response => response.json())
    .then(data => {
        totalUsers = data;
        totalRecords = data.length;
        displayUsers();
    })
    .catch(error => console.error('Error fetching users:', error));
}


function displayUsers(usersToShow = totalUsers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)) {
    const userRows = document.getElementById('userRows');
    userRows.innerHTML = '';

    if (usersToShow.length === 0) {
        userRows.innerHTML = '<tr><td colspan="8" class="text-center">No se encontraron usuarios.</td></tr>';
        return;
    }


    const startIndex = (currentPage - 1) * recordsPerPage;

    usersToShow.forEach((user, index) => {
        const userIndex = startIndex + index + 1;
        const isAdministrator = user.id_rolF === 1;
        const isCurrentUser = user.id_usuario.toString() === localStorage.getItem('token_sofystic');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="div-table-cell">${userIndex}</td>
            <td class="div-table-cell">${user.nombre_usuario}</td>
            <td class="div-table-cell">${user.email}</td>
            <td class="div-table-cell">${isAdministrator ? 'Administrador' : 'Personal'}</td>
            <td class="div-table-cell">${user.estado_usuario === 1 ? 'Activo' : 'Inactivo'}</td>
            <td class="div-table-cell">
                ${!isAdministrator && !isCurrentUser ? `<button onclick="cambiarEstado(${user.id_usuario})" type="submit" class="btn btn-info tooltips-general"><i class="zmdi zmdi-swap"></i></button>` : ''}
            </td>
            <td class="div-table-cell">
                ${!isAdministrator && !isCurrentUser ? `<button onclick="editarUsuario(${user.id_usuario}, '${user.nombre_usuario.replace(/'/g, "\\'")}', '${user.email.replace(/'/g, "\\'")}')" class="btn btn-warning"><i class="zmdi zmdi-edit"></i></button>` : ''}
            </td>
            <td class="div-table-cell">
                ${!isAdministrator && !isCurrentUser ? `<button onclick="eliminarUser(${user.id_usuario})" class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>` : ''}
            </td>
        `;
        userRows.appendChild(row);
    });
    updatePaginationInfo(); 
}

//toastr
function mensajeError(mensaje){
    toastr.error(mensaje, 'Error');
}
function mensajeValido(mensaje){
    toastr.success(mensaje);
}


//paginacion
function changePage(direction) {
    if (direction === -1 && currentPage > 1) {
        currentPage--;
    } else if (direction === 1 && (currentPage * recordsPerPage) < totalRecords) {
        currentPage++;
    }
    displayUsers();
}

function updatePaginationInfo() {
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(totalRecords / recordsPerPage)}`;
}


//crud eliminar

function eliminarUser(id){
    //console.log("id a eliminar:",id);
    Swal.fire({
        title: "Desea eliminar el usuario?",
        text: "No se podrá revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
          eliminarUserApi(id);
        }
    });
}

function eliminarUserApi(id){
    fetch(`http://localhost:8000/api/usuarios/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Eliminado",
            text: "El usuario ha sido eliminado correctamente del sistema",
            icon: "success"
        });
        cargarUsuarios()
        BotonPaginacion();
    }).catch(error => {
        console.error('Error eliminando el usuario:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el usuario",
            icon: "error"
        });
    });
}

//cambiar estado

function cambiarEstado(id){
    console.log("id a cambiar estado",id)
    Swal.fire({
        title: "Desea cambiar el estado del usuario?",
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

    fetch(`http://localhost:8000/api/estado_usuario/${id}`, {
        method: 'PUT'
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            title: "Estado Cambiado",
            text: "Se ha actualizado el estado del usuario",
            icon: "success"
        });
        cargarUsuarios()
    }).catch(error => {
        console.error('Error eliminando el usuario:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al actualizar estado del usuario",
            icon: "error"
        });
    });
}

//editar el usuario

async function editarUsuario(id, nombre, email) {
    const { value: formValues } = await Swal.fire({
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        title: 'Editar Usuario',
        html: `
            <input style="width:300px" value="${nombre.replace(/"/g, '&quot;')}" id="swal-input1-nombre-usuario" class="swal2-input" placeholder="Nombre de usuario">
            <input style="width:300px" value="${email.replace(/"/g, '&quot;')}" id="swal-input2-email-usuario" class="swal2-input" placeholder="Email">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1-nombre-usuario').value,
                document.getElementById('swal-input2-email-usuario').value
            ];
        }
    });

    if (formValues) {
        const [nombre_usuario, email_usuario] = formValues;
        if (!nombre_usuario.trim() || !email_usuario.trim()) {
            Swal.fire('Error', 'Ambos campos deben ser llenados', 'error');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email_usuario)) {
            Swal.fire('Error', 'Por favor introduce un email valido', 'error');
            return;
        }

        fetch(`http://localhost:8000/api/edit_usuario/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario: nombre_usuario,
                email: email_usuario,
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
                Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
                cargarUsuarios()
            }
        })
        .catch(errorResponse => {
            // Manejar respuesta de error de la API
            errorResponse.json().then(errorData => {
                const errorMessages = errorData.errors ? Object.values(errorData.errors).join(', ') : 'Hubo un problema al actualizar el usuario';
                Swal.fire('Error al actualizar', errorMessages, 'error');
            }).catch(() => {
                Swal.fire('Error al actualizar', 'Hubo un problema al actualizar el usuario', 'error');
            });
        });
    }
}





