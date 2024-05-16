contadorUsers()
/*-------------- */ 
/*----viePass---- */
/*--------------*/ 

function mostrarPass() {
  var iconPass = document.getElementById("icon-pass");
  var textPass = document.getElementById("value-pass");
  
  //login
  if (textPass.type === "password") {
      textPass.type = "text"; 
      if (iconPass) iconPass.classList.replace('fa-eye-slash', 'fa-eye'); 
  } else {
      textPass.type = "password"; 
      if (iconPass) iconPass.classList.replace('fa-eye', 'fa-eye-slash'); 
  }
  
}

function mostrarPassUser(){
  var iconPass = document.getElementById("icon-pass");
  var TextPass_user = document.getElementById("password_usuario");
  //register user
  if (TextPass_user.type === "password") {
    TextPass_user.type = "text"; 
    if (iconPass) iconPass.classList.replace('fa-eye-slash', 'fa-eye'); 
  } else {
      TextPass_user.type = "password"; 
      if (iconPass) iconPass.classList.replace('fa-eye', 'fa-eye-slash'); 
  }
}


function mostrarPassUser2(){
  var iconPass = document.getElementById("icon-pass2");
  var TextPass_user = document.getElementById("password_usuario_repeat");
  //register user
  if (TextPass_user.type === "password") {
    TextPass_user.type = "text"; 
    if (iconPass) iconPass.classList.replace('fa-eye-slash', 'fa-eye'); 
  } else {
      TextPass_user.type = "password"; 
      if (iconPass) iconPass.classList.replace('fa-eye', 'fa-eye-slash'); 
  }
}

/*-------------- */ 
/*----Login---- */
/*--------------*/ 

function validarLogin(event){
  event.preventDefault();
  var email = document.getElementById("value-email").value.trim();  
  var pass = document.getElementById("value-pass").value  
  var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if(email === "" || pass === ""){
    mensajeError("Campo vacío");
    return;  
  }

  if (!validEmail.test(email)) { 
    mensajeError('Por favor, introduce un email válido');
    return;  
  }

  loguear();
}


function mensajeError(mensaje){
  toastr.error(mensaje, 'Error');
}
function mensajeValido(mensaje){
  toastr.success(mensaje);
}

function loguear() {
  var email = document.getElementById("value-email").value;
  var password = document.getElementById("value-pass").value;

  fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
  })
  .then(response => {
      if (!response.ok) {
          
          return response.json().then(data => {
              throw new Error(data.message || 'Error desconocido');
          });
      }
      return response.json();
  })
  .then(data => {
      console.log('Success:', data);
      localStorage.setItem('token', data.token); // Guarda el token en localStorage
      window.location.href = 'home.html';
  })
  .catch(error => {
      console.error('Error:', error);
      mensajeError(error.message); // mensaje del servidor
  });
}





/*---------------------------- */ 
/*----Registrar Usuario------ */
/*----------------------------*/ 

function registrarUsuario(event) {
  event.preventDefault();

  var nombre_usuario = document.getElementById("nombre_usuario").value;
  var email_usuario = document.getElementById("email_usuario").value;
  var password_usuario = document.getElementById("password_usuario").value;
  var password_usuario_repeat = document.getElementById("password_usuario_repeat").value;
  var estado_usuario = 1;  
  var id_rol = 2;

  //validaciones
  if(nombre_usuario == "" || email_usuario == "" || password_usuario == "" || password_usuario_repeat == ""){
    return;
  }
  if(password_usuario != password_usuario_repeat){
    mensajeError("Las contraseñas tiene que ser iguales");
    return;
  }
  if(password_usuario.length <= 5){
    mensajeError("La contraseña debe tene mínmo de 5 caracteres");
    return;
  }

  fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          nombre_usuario: nombre_usuario,
          email: email_usuario,
          password: password_usuario,
          estado_usuario: estado_usuario,
          id_rolF: id_rol 
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message && data.message === "Los datos proporcionados no son válidos.") {
          if (data.errors.email && data.errors.email.includes("El valor del campo email ya está en uso.")) {
              mensajeError("Email ya registrado");
              
          } else {
              mensajeError("Error de validación: " + Object.values(data.errors).join(', '));
          }
      } else {
          mensajeValido("Usuario registrado con éxito!");
          limpiarInputUser()
      }
  })
  .catch(error => {
      console.error('Error:', error);
      mensajeError("No se pudo registrar: " + error.message);
  });
}

/*---------------------------- */ 
/*----Limpiar Inputs------ */
/*----------------------------*/ 


function limpiarInputUser(){
  var nombre_usuario = document.getElementById("nombre_usuario");
  var email_usuario = document.getElementById("email_usuario");
  var password_usuario = document.getElementById("password_usuario");
  var password_usuario_repeat = document.getElementById("password_usuario_repeat");

  nombre_usuario.value = "";
  email_usuario.value = "";
  password_usuario.value = "";
  password_usuario_repeat.value = "";
}

function limpiarInputEstudent(){
  var ci = document.getElementById("ci");
  var nombre_estudiante = document.getElementById("nombre_estudiante");
  var apellido_estudiante = document.getElementById("apellido_estudiante");

  ci.value = "";
  nombre_estudiante.value = "";
  apellido_estudiante.value = "";
 
}


/*---------------------------- */ 
/*----Contador Usuario------ */
/*----------------------------*/ 

function contadorUsers() {
  var textCount = document.getElementById("cantidad_usuarios");

  fetch('http://localhost:8000/api/contarUsuarios')
    .then(response => {
      if (!response.ok) {
        throw new Error('Red no encontrada');
      }
      return response.json();
    })
    .then(data => {
        const totalUsers = data.total_users; 
       //console.log("total usuarios:", totalUsers);
        textCount.textContent = totalUsers; 
    })
    .catch(error => {
        //console.error('Error cargar datos usuarios:', error);
        return
    });
}



/*---------------------------- */ 
/*----Registro de Estudiante------ */
/*----------------------------*/ 
function registrarEstudiante(event) {
  event.preventDefault();

  var ci = document.getElementById("ci").value;
  var nombre_estudiante = document.getElementById("nombre_estudiante").value;
  var apellido_estudiante = document.getElementById("apellido_estudiante").value;
  var estado_estudiante = 1;


  //validaciones  
  if(ci == "" || nombre_estudiante == "" || apellido_estudiante == ""){
    return;
  }
  if(ci.length <= 6 && ci.length >= 9 ){
    mensajeError("El CI No es válido");
    return
  }
  

  fetch('http://localhost:8000/api/registraEstudiante', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          ci: ci,
          nombre_estudiante: nombre_estudiante,
          apellido_estudiante: apellido_estudiante,
          estado_estudiante: estado_estudiante
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message && data.message === "Los datos proporcionados no son válidos.") {
          if (data.errors.email && data.errors.email.includes("El valor del campo ci ya está en uso.")) {
              mensajeError("CI ya está registrado");
              
          } else {
              mensajeError("Error de validación: " + Object.values(data.errors).join(', '));
          }
      } else {
          mensajeValido("Estudiante registrado con éxito!");
          limpiarInputEstudent()
      }
  })

}

