contadorUsers();
contadorEstudents();
contadorCategory();
contadorLibros();
contadorRerservas();
contadorDevoluciones();
contadorReservasAnuladas()

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
/*----Contador Estudiantes------ */
/*----------------------------*/ 

function contadorEstudents() {
    var textCount = document.getElementById("cantidad_estudiantes");
  
    fetch('http://localhost:8000/api/cantidad_estudiantes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Red no encontrada');
        }
        return response.json();
      })
      .then(data => {
          const total = data.total; 
         //console.log("total usuarios:", totalUsers);
          textCount.textContent = total; 
      })
      .catch(error => {
          //console.error('Error cargar datos usuarios:', error);
          return
      });
}

/*---------------------------- */ 
/*----Contador Categorias------ */
/*----------------------------*/ 

function contadorCategory() {
    var textCount = document.getElementById("cantidad_categorias");
  
    fetch('http://localhost:8000/api/contarCategorias')
      .then(response => {
        if (!response.ok) {
          throw new Error('Red no encontrada');
        }
        return response.json();
      })
      .then(data => {
          const total = data.total; 
          textCount.textContent = total; 
      })
      .catch(error => {
          //console.error('Error cargar datos usuarios:', error);
          return
      });
}

/*---------------------------- */ 
/*----Contador Libros------ */
/*----------------------------*/ 

function contadorLibros() {
    var textCount = document.getElementById("cantidad_libros");
  
    fetch('http://localhost:8000/api/cantidadLibros')
      .then(response => {
        if (!response.ok) {
          throw new Error('Red no encontrada');
        }
        return response.json();
      })
      .then(data => {
          const total = data.total; 
          textCount.textContent = total; 
      })
      .catch(error => {
          //console.error('Error cargar datos usuarios:', error);
          return
      });
}

/*---------------------------- */ 
/*----Contador Reservas------ */
/*----------------------------*/ 

function contadorRerservas() {
    var textCount = document.getElementById("cantidad_reservas");
  
    fetch('http://localhost:8000/api/cantidad_reserva')
      .then(response => {
        if (!response.ok) {
          throw new Error('Red no encontrada');
        }
        return response.json();
      })
      .then(data => {
          const total = data.total; 
          textCount.textContent = total; 
      })
      .catch(error => {
          //console.error('Error cargar datos usuarios:', error);
          return
      });
}

/*---------------------------- */ 
/*----Contador Libros devueltos------ */
/*----------------------------*/ 

function contadorDevoluciones() {
    var textCount = document.getElementById("cantidad_devueltos");
  
    fetch('http://localhost:8000/api/cantidad_devolucion')
      .then(response => {
        if (!response.ok) {
          throw new Error('Red no encontrada');
        }
        return response.json();
      })
      .then(data => {
          const total = data.total; 
          textCount.textContent = total; 
      })
      .catch(error => {
          //console.error('Error cargar datos usuarios:', error);
          return
      });
}


/*-------------------------------------- */ 
/*----Contador Reservas anuladas------ */
/*-------------------------------------*/ 

function contadorReservasAnuladas() {
  var textCount = document.getElementById("counter-anulado");

  fetch('http://localhost:8000/api/reservasAnuladas')
    .then(response => {
      if (!response.ok) {
        throw new Error('Red no encontrada');
      }
      return response.json();
    })
    .then(data => {
        const total = data.total; 
        textCount.textContent = total; 
    })
    .catch(error => {
        //console.error('Error cargar datos usuarios:', error);
        return
    });
}
