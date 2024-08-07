
function mensajeCerrarSesion(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Desea Cerrar Sesión?",
        text: "Pudes tomarte un descanso.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            logout();
        }
      });
}


function logout() {
    fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('nombreUsuario'); 
        localStorage.removeItem('token_sofystic')
        console.log("Cierre de sesión OK");
        window.location.href = 'index.html'; 
    })
    .catch(error => {
        console.error('Error durante el logout:', error);
    });
}


/*---------------------------- */ 
/*----Bton refresh---------- */
/*----------------------------*/ 

function AutoRefresh(){
  window.location.reload();
}