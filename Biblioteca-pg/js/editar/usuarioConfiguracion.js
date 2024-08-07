CargarDatosUsuario();

function CargarDatosUsuario(){
    var id_usuario = localStorage.getItem('token_sofystic');

    fetch(`http://localhost:8000/api/usuario/${id_usuario}`)
        .then(response => response.json())
        .then(data => {
            if (data.res) {
                document.getElementById("nombre_usuario").value = data.usuario.nombre_usuario;
                document.getElementById("apellido_usuario").value = data.usuario.apellido_usuario;
                document.getElementById("email_usuario").value = data.usuario.email;

            } else {
                console.error('Usuario no encontrado.');
            }
        })
        .catch(error => console.error('Error fetching user:', error));
}


function obtenerDatos(event){

    event.preventDefault();
    var id_usuario = localStorage.getItem('token_sofystic');
    var regex = /[0-9]/;

    var nombre_usuario = document.getElementById("nombre_usuario").value;
    var apellido_usuario = document.getElementById("apellido_usuario").value;
    var email_usuario = document.getElementById("email_usuario").value;
    var password_new = document.getElementById("password_new").value;
    var password_old = document.getElementById("password_old").value;

    if (password_new === "" && password_old === "") {
        actualizarDatosUsuario(id_usuario, nombre_usuario, apellido_usuario, email_usuario);
    } else {
        if (password_old.length < 5 || !regex.test(password_new)) {
            mensajeError("La contraseña debe tener al menos 5 caracteres y contener al menos un número.");
            return;
        }

        actualizarPasswordUsuario(id_usuario, password_new, password_old, function(success) {
            if (success) {
                actualizarDatosUsuario(id_usuario, nombre_usuario, apellido_usuario, email_usuario);
            }
        });
    }
}

function actualizarDatosUsuario(id_usuario, nombre_usuario, apellido_usuario, email_usuario) {
    fetch(`http://localhost:8000/api/edit_usuario/${id_usuario}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            nombre_usuario: nombre_usuario,
            apellido_usuario: apellido_usuario,
            email: email_usuario
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            mensajeValido("Datos Actualizados correctamente");
            Refresh();
            
        } else {
            mensajeError("Error al actualizar datos del usuario");
        }
    })
    .catch(error => console.error('Error:', error));
}

function actualizarPasswordUsuario(id_usuario, password_new, password_old, callback) {
    fetch(`http://localhost:8000/api/edit_pass/${id_usuario}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            old_password: password_old,
            new_password: password_new,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            if (data.message === "Contraseña antigua incorrecta") {
                mensajeError('Contraseña antigua incorrecta');
                callback(false);
            } else {
                console.log("se actualizo la password correctamente");
                callback(true);
            }
        } else {
            mensajeError('Error al actualizar la contraseña');
            callback(false);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        callback(false);
    });
}


function mostrarPassConfigure() {
    var iconPass = document.getElementById("icon-pass");
    var TextPass_user = document.getElementById("password_old");
    
    if (TextPass_user.type === "password") {
        TextPass_user.type = "text"; 
        if (iconPass) iconPass.classList.replace('fa-eye-slash', 'fa-eye'); 
    } else {
        TextPass_user.type = "password"; 
        if (iconPass) iconPass.classList.replace('fa-eye', 'fa-eye-slash'); 
    }
}

function mostrarPassConfigure2() {
    var iconPass = document.getElementById("icon-pass2");
    var TextPass_user = document.getElementById("password_new");
    
    if (TextPass_user.type === "password") {
        TextPass_user.type = "text"; 
        if (iconPass) iconPass.classList.replace('fa-eye-slash', 'fa-eye'); 
    } else {
        TextPass_user.type = "password"; 
        if (iconPass) iconPass.classList.replace('fa-eye', 'fa-eye-slash'); 
    }
}

function Refresh() {
    setTimeout(function() {
        window.location.reload();
    }, 2000);
    console.log("artorefresh");
}

