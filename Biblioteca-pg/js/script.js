
cargarCategorias()
cargarLibros()
cargarEstudiantes()
/*-------------- */ 
/*----viePass---- */
/*--------------*/ 

function mostrarPassU() {
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

function mostrarPassUserRepeat2(){
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

function mostrarPassUser2(){
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
  var apellido_usuario = document.getElementById("apellido_usuario").value;
  var email_usuario = document.getElementById("email_usuario").value;
  var id_rol = document.getElementById("idRol").value;
  var password_usuario = document.getElementById("password_usuario").value;
  var password_usuario_repeat = document.getElementById("password_usuario_repeat").value;
  var estado_usuario = 1;  

  var regex = /[0-9]/;
  var regex2 = /^(?=.*\d)[A-Za-z\d]{5,}$/;

  //validaciones
  if(nombre_usuario == "" || apellido_usuario == "" || email_usuario == "" || id_rol == "" || password_usuario == "" || password_usuario_repeat == ""){
    return;
  }
  if (regex.test(nombre_usuario)) {
      mensajeError("El nombre no debe contener números");
      return false; 
  }
  if (regex.test(apellido_usuario)) {
    mensajeError("El apellido no debe contener números");
    return false; 
}
  if (!regex.test(password_usuario)) {
      mensajeError("La contraseña debe tener al menos 5 caracteres y contener al menos un número.");
      return false; // Evita el envío del formulario
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
          apellido_usuario: apellido_usuario,
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
          limpiarInputUser();
          window.location.href = "listadmin.html";
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
  var apellido_usuario = document.getElementById("apellido_usuario");
  var email_usuario = document.getElementById("email_usuario");
  var password_usuario = document.getElementById("password_usuario");
  var password_usuario_repeat = document.getElementById("password_usuario_repeat");

  nombre_usuario.value = "";
  apellido_usuario.value = "";
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

function limpiarInputCategoria(){
  var codigo_categoria = document.getElementById("input-codigo");
  var nombre_categoria = document.getElementById("input-nombre-categoria");

  codigo_categoria.value = "";
  nombre_categoria.value = "";
}

function limpiarInputLibro(){
    document.getElementById('categoriaSelect').selectedIndex = 0;
    document.getElementById('codigoLibro').value = '';
    document.getElementById('stockLibro').value = '';
    document.getElementById('tituloLibro').value = '';
    document.getElementById('autorLibro').value = '';
    document.getElementById('idiomaLibro').selectedIndex = 0;

    document.getElementById('imageInput').value = '';
    document.getElementById('fileName').textContent = 'Ningún archivo seleccionado';
    document.getElementById('imagePreviewContainer').innerHTML = '';
}

function limpiarFormularioReserva() {
  document.getElementById('fecha_inicio').value = '';
  document.getElementById('fecha_fin').value = '';

  var libroSelect = document.getElementById('libroSelect');
  libroSelect.value = '';
  $('#libroSelect').val(null).trigger('change'); // Resetear Select2

  var estudianteSelect = document.getElementById('estudianteSelect');
  estudianteSelect.value = '';
  $('#estudianteSelect').val(null).trigger('change'); // Resetear Select2

  document.getElementById('cantidadLibro').value = '';

  document.getElementById('cantidadGroup').style.display = 'none';
  document.getElementById('libroMsg').style.display = 'block';

  document.getElementById('stockInfo').textContent = '';
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

  var regex = /[0-9]/;

  //validaciones  
  if(ci == "" || nombre_estudiante == "" || apellido_estudiante == ""){
    return;
  }
  if (regex.test(nombre_estudiante)) {
      mensajeError("El nombre no debe contener números");
      return false;
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
          limpiarInputEstudent();
          window.location.href = "liststudent.html";
      }
  })

}

/*---------------------------- */ 
/*----Agregar categoria----- */
/*----------------------------*/ 
function agregarCategoria(event){
  event.preventDefault();

  var codigo_categoria = document.getElementById("input-codigo").value;
  var nombre_categoria = document.getElementById("input-nombre-categoria").value;

  var regex = /[0-9]/;
  // console.log("codigo:",codigo_categoria, "\n categoria:",nombre_categoria);

  if (regex.test(nombre_categoria)) {
      mensajeError("La categoría no debe contener números");
      return ; 
  }

  fetch('http://localhost:8000/api/registraCategoria', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        codigo_categoria:codigo_categoria,
        nombre_categoria:nombre_categoria
    })
})
.then(response => response.json())
.then(data => {
    if (data.message && data.message === "Los datos proporcionados no son válidos.") {
        if (data.errors.codigo_categoria && data.errors.codigo_categoria.includes("El valor del campo codigo categoria ya está en uso.")) {
            mensajeError("Código de Categoría ya está registrado.");
            
        } else {
            mensajeError("Error de validación: " + Object.values(data.errors).join(', '));
        }
    } else {
        limpiarInputCategoria();
        window.location.href = "listcategory.html";
    }
})
.catch(error => {
    console.error('Error:', error);
    mensajeError("No se pudo registrar: " + error.message);
});  
}


/*---------------------------- */ 
/*----Agregar libro---------- */
/*----------------------------*/ 


function cargarCategorias(){
    $.ajax({
      url: 'http://localhost:8000/api/categorias',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          var select = $('#categoriaSelect');
          select.empty();
          select.append('<option value="" disabled selected>Selecciona una categoría</option>');
          data.forEach(function(categoria) {
              select.append('<option value="' + categoria.id_categoria + '">' + categoria.nombre_categoria + '</option>');
          });
      },
      error: function(error) {
          console.error('Error al cargar las categorías:', error);
      }
  });
}

function agregarLibro(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  // Obtener los valores del formulario
  var id_categoriaF = $('#categoriaSelect').val();
  var codigo_libro = $('#codigoLibro').val();
  var titulo = $('#tituloLibro').val();
  var autor = $('#autorLibro').val();
  var idioma = $('#idiomaLibro').val();
  var stock = $('#stockLibro').val();
  var estado_libro = 1; 
  var id_usuarioF = localStorage.getItem('token_sofystic');



  // Obtener el archivo de imagen
  var imagenInput = $('#imageInput')[0].files[0];

  // Validar que el archivo sea una imagen
  if (imagenInput && !imagenInput.type.startsWith('image/')) {
    mensajeError("El archivo seleccionado no es una imagen.");
    return;
  }

  // Crear objeto FormData
  var formData = new FormData();
  formData.append('id_categoriaF', id_categoriaF);
  formData.append('codigo_libro', codigo_libro);
  formData.append('titulo', titulo);
  formData.append('autor', autor);
  formData.append('idioma', idioma);
  formData.append('stock', stock);
  formData.append('estado_libro', estado_libro);
  formData.append('imagen', imagenInput);
  formData.append('id_usuarioF', id_usuarioF);

  $.ajax({
    url: 'http://localhost:8000/api/registrarLibro',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function(data) {
      if (data.id_libro) {
        limpiarInputLibro();
        window.location.href = "catalog.html";
      } else {
        mensajeError("Error, el código correlativo ya existe.");
      }
    },
    error: function(error) {
      console.error('Error:', error);
      mensajeError('Error al conectar con el servidor');
    }
  });
}




/*---------------------------- */ 
/*----Agregar Reserva---------- */
/*----------------------------*/ 

function cargarEstudiantes() {
  $.ajax({
      url: 'http://localhost:8000/api/estudiantesActivos',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          var select = $('#estudianteSelect');
          select.empty();
          select.append('<option value="" disabled selected>Selecciona un estudiante</option>');
          data.forEach(function(estudiante) {
              select.append('<option value="' + estudiante.id_estudiante + '">' + estudiante.nombre_estudiante + ' ' + estudiante.apellido_estudiante + '</option>');
          });

          // Inicializar Select2
          $('#estudianteSelect').select2({
              placeholder: 'Selecciona un estudiante',
              allowClear: true
          });
      },
      error: function(error) {
          console.error('Error al cargar los estudiantes:', error);
      }
  });
}



var stockDisponible = 0; // Variable global para almacenar el stock disponible

function cargarLibros() {
  var mensajeSinLibro = document.getElementById("mensajeSinLibros");
  var formReserva = document.getElementById("formReserva");

  $.ajax({
    url: 'http://localhost:8000/api/verlibroActivo',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var select = $('#libroSelect');
      select.empty();
      
      if (data.length === 0) {
        mensajeSinLibro.style.display = "flex";
        formReserva.style.display = "none";
      } else {
        mensajeSinLibro.style.display = "none";

        select.append('<option value="" disabled selected>Selecciona un libro</option>');
        data.forEach(function(libro) {
          select.append('<option value="' + libro.id_libro + '" data-stock="' + libro.stock + '">' + libro.titulo + '</option>');
        });

        // Inicializar Select2
        $('#libroSelect').select2({
          placeholder: 'Selecciona un libro',
          allowClear: true
        });

        // Evento para cuando se selecciona un libro
        $('#libroSelect').on('select2:select', function(e) {
          var selectedOption = $(this).find(':selected');
          stockDisponible = selectedOption.data('stock'); // Actualizar stockDisponible
          actualizarStockInfo(stockDisponible); // Actualizar mensaje de stock
        });

        // Evento para cuando se deselecciona un libro
        $('#libroSelect').on('select2:unselect', function(e) {
          stockDisponible = 0; // Reiniciar stockDisponible
          $('#stockInfo').text('');
          $('#cantidadLibro').val('');
          $('#cantidadGroup').hide();
          $('#libroMsg').show();
        });

        // Mostrar mensaje por defecto
        $('#libroMsg').show();
        $('#cantidadGroup').hide();
      }
    },
    error: function(error) {
      console.error('Error al cargar los libros:', error);
    }
  });
}


var stockDisponible = 0; // Variable global para almacenar el stock disponible

function cargarStockLibro() {
  var libroSelect = document.getElementById('libroSelect');
  var selectedLibroId = parseInt(libroSelect.value);

  if (!selectedLibroId) {
    // No se ha seleccionado ningún libro
    document.getElementById('cantidadGroup').style.display = 'none';
    document.getElementById('libroMsg').style.display = 'block';
    return;
  }

  // Realizar llamada AJAX para obtener el stock del libro seleccionado
  $.ajax({
    url: 'http://localhost:8000/api/verlibro/' + selectedLibroId,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var libro = data[0];
      stockDisponible = libro.stock;
      actualizarStockInfo(stockDisponible);
    },
    error: function(error) {
      console.error('Error al obtener el stock del libro:', error);
      mensajeError('Error al obtener el stock del libro. Por favor, intenta nuevamente.');
    }
  });
}

function actualizarStockInfo(stockDisponible) {
  // Mostrar el campo de cantidad y actualizar el mensaje de stock
  document.getElementById('stockInfo').textContent = '(' + stockDisponible + ')';
  document.getElementById('cantidadGroup').style.display = 'block';
  document.getElementById('libroMsg').style.display = 'none';
}


function registrarReserva(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Obtener los valores del formulario
  var fechaInicio = document.getElementById('fecha_inicio').value;
  var fechaFin = document.getElementById('fecha_fin').value;
  var libroSelect = parseInt(document.getElementById('libroSelect').value); // Convertir a entero
  var estudianteSelect = parseInt(document.getElementById('estudianteSelect').value); // Convertir a entero
  var cantidadLibro = parseInt(document.getElementById('cantidadLibro').value); // Convertir a entero
  var estado_reserva = 1;
  var id_usuarioF = localStorage.getItem('token_sofystic');

  // Validar que la fecha fin sea mayor que la fecha inicio
  if(fechaInicio == '' || fechaFin == '' || libroSelect == '' || estudianteSelect == '' || cantidadLibro == ''){
    mensajeError("Completar campos vacios.");
    return;
  }

  if (fechaInicio >= fechaFin) {
    mensajeError("La fecha de fin debe ser mayor que la fecha de inicio.");
    return;
  }

  // Validar que se haya seleccionado un libro
  if (!libroSelect) {
    mensajeError("Por favor, selecciona un libro.");
    return;
  }

  // Validar que la cantidad no exceda el stock disponible
  if (cantidadLibro > stockDisponible) {
    mensajeError("La cantidad de libros seleccionada excede el stock disponible.");
    return;
  }

  // Crear objeto con los datos del formulario
  var reserva = {
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    id_libroF: libroSelect,
    cantidad: cantidadLibro,
    estado_reserva: estado_reserva,
    id_estudianteF: estudianteSelect,
    id_usuarioF: parseInt(id_usuarioF)
  };

   $.ajax({
       url: 'http://localhost:8000/api/guardarReserva',
       type: 'POST',
       dataType: 'json',
       contentType: 'application/json',
       data: JSON.stringify(reserva),
       success: function(response) {
          limpiarFormularioReserva();
          window.location.href = "loanreservation.html";
       },
       error: function(error) {
           console.error('Error al guardar la reserva:', error);
           mensajeError('Hubo un error al guardar la reserva. Por favor, intenta nuevamente.');
       }
   });
}

