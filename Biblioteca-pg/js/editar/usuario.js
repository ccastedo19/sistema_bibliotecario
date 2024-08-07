document.addEventListener('DOMContentLoaded', function() {
    // Obtener los datos del localStorage
    var datosUsuario = localStorage.getItem('datosUsuario');
    var mensajeSinDatos = document.getElementById("mensajeSinDatosEstudiante");
    var tablaDatos = document.getElementById("formEditarUsuario");
    
    if (datosUsuario) {
        mensajeSinDatos.style.display = "none";
        var usuario = JSON.parse(datosUsuario);
        
        // Asignar los valores a los campos del formulario
        document.getElementById('nombre_usuario').value = usuario.nombre_usuario
        document.getElementById('apellido_usuario').value = usuario.apellido_usuario
        document.getElementById('email_usuario').value = usuario.email;
    }else{
        tablaDatos.style.display = "none";
        mensajeSinDatos.style.display = "flex";
    }
});

function destruirDatosUsuario(){
    localStorage.removeItem('datosUsuario');
    window.location.href = "listadmin.html";
}


function obtenerDatos(event){
    event.preventDefault();
    var datosUsuario = localStorage.getItem('datosUsuario');
    var regex = /[0-9]/;

    if (datosUsuario) {
        var usuario = JSON.parse(datosUsuario);
        var id_usuario = usuario.id_usuario
    } else {
        tablaDatos.style.display = "none";
        mensajeSinDatos.style.display = "flex";
    }

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
            destruirDatosUsuario();
            window.location.href = "listadmin.html";
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


/* mostrar password */

function mostrarPass(){
    var iconPass = document.getElementById("icon-pass");
    var TextPass_user = document.getElementById("password_old");
    //register user
    if (TextPass_user.type === "password") {
      TextPass_user.type = "text"; 
      if (iconPass) iconPass.classList.replace('fa-eye-slash', 'fa-eye'); 
    } else {
        TextPass_user.type = "password"; 
        if (iconPass) iconPass.classList.replace('fa-eye', 'fa-eye-slash'); 
    }
  }
  
  
  function mostrarPass2(){
    var iconPass = document.getElementById("icon-pass2");
    var TextPass_user = document.getElementById("password_new");
    //register user
    if (TextPass_user.type === "password") {
      TextPass_user.type = "text"; 
      if (iconPass) iconPass.classList.replace('fa-eye-slash', 'fa-eye'); 
    } else {
        TextPass_user.type = "password"; 
        if (iconPass) iconPass.classList.replace('fa-eye', 'fa-eye-slash'); 
    }
  }