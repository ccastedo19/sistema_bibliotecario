document.addEventListener('DOMContentLoaded', function () {
    cargarSegundos();
    BotonPaginacion();

    // Maneja clic en el th para ordenar
    document.querySelectorAll('.dt-column-order').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const currentOrder = header.getAttribute('data-order') || 'asc'; // Por defecto asc si no hay valor
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            
            // Cambia el atributo data-order en el th
            header.setAttribute('data-order', newOrder);
            updateOrderIndicators(); // Actualiza las flechas
            sortUsers(column, newOrder); // Ordena la tabla
        });
    });

    document.getElementById('search-user').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 2) {
            filtrarUsuarios(searchTerm);
        } else {
            displayUsers();
        }
    });

    document.getElementById('entriesPerPage').addEventListener('change', function() {
        recordsPerPage = parseInt(this.value);
        currentPage = 1;
        displayUsers();
        BotonPaginacion();
    });
});

function filtrarUsuarios(searchTerm) {
    const filteredUsers = totalUsers.filter(user =>
        user.nombre_usuario.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
}

function sortUsers(column, order) {
    totalUsers.sort((a, b) => {
        let valA, valB;
        switch(column) {
            case 'numero':
                valA = a.id_usuario;
                valB = b.id_usuario;
                break;
            case 'nombre':
                valA = a.nombre_usuario.toLowerCase();
                valB = b.nombre_usuario.toLowerCase();
                break;
            case 'apellido':
                valA = a.apellido_usuario.toLowerCase();
                valB = b.apellido_usuario.toLowerCase();
                break;
            case 'email':
                valA = a.email.toLowerCase();
                valB = b.email.toLowerCase();
                break;
            case 'rol':
                valA = a.id_rolF === 1 ? 'Administrador' : 'Personal';
                valB = b.id_rolF === 1 ? 'Administrador' : 'Personal';
                break;
            case 'estado':
                valA = a.estado_usuario;
                valB = b.estado_usuario;
                break;
        }
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
    displayUsers();
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
let totalUsers = [];

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
    cargarUsuarios();
}

function cargarUsuarios() {
    fetch('http://localhost:8000/api/usuariosDesc')
    .then(response => response.json())
    .then(data => {
        totalUsers = data.map((user, index) => ({ ...user, originalIndex: index + 1 }));
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

    usersToShow.forEach((user, index) => {
        const userIndex = user.originalIndex;

        const isAdministrator = user.id_rolF === 1;
        const isCurrentUser = user.id_usuario.toString() === localStorage.getItem('token_sofystic');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="div-table-cell">${userIndex}</td>
            <td class="div-table-cell">${user.nombre_usuario}</td>
            <td class="div-table-cell">${user.apellido_usuario}</td>
            <td class="div-table-cell">${user.email}</td>
            <td class="div-table-cell">${isAdministrator ? 'Administrador' : 'Personal'}</td>
            <td class="div-table-cell">${user.estado_usuario === 1 ? '<span class="activo">Activo</span>' : '<span class="inactivo">Inactivo</span>'}</td>
            <td class="div-table-cell">
                ${!isAdministrator && !isCurrentUser ? `<button onclick="cambiarEstado(${user.id_usuario})" type="submit" class="btn btn-info tooltips-general"><i class="zmdi zmdi-swap"></i></button>` : ''}
            </td>
            <td class="div-table-cell">
                <button onclick="editarUsuario(${user.id_usuario}, '${user.nombre_usuario.replace(/'/g, "\\'")}', '${user.apellido_usuario.replace(/'/g, "\\'")}', '${user.email.replace(/'/g, "\\'")}')" class="btn btn-warning"><i class="zmdi zmdi-edit"></i></button>
            </td>
            <td class="div-table-cell">
                ${!isAdministrator && !isCurrentUser ? `<button onclick="eliminarUser(${user.id_usuario})" class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>` : ''}
            </td>
        `;
        userRows.appendChild(row);
    });
    updatePaginationInfo();
}

function changePage(direction) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    if ((direction === -1 && currentPage > 1) || (direction === 1 && currentPage < totalPages)) {
        currentPage += direction;
        displayUsers();
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

    fetch('http://localhost:8000/api/contarUsuarios')
    .then(response => {
        if (!response.ok) {
            throw new Error('Red no encontrada');
        }
        return response.json();
    })
    .then(data => {
        totalRecords = data.total_users;
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
        console.error('Error al cargar datos de usuarios:', error);
    });
}


//toastr
function mensajeError(mensaje){
    toastr.error(mensaje, 'Error');
}
function mensajeValido(mensaje){
    toastr.success(mensaje);
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

async function editarUsuario(id, nombre, apellido, email) {

    const datosUsuario = {
        id_usuario:id,
        nombre_usuario:nombre,
        apellido_usuario:apellido,
        email:email
    }

    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

    window.location.href = "editarusuario.html";

}





