document.addEventListener("DOMContentLoaded", function() {
    PerfilLogueado()
    var elementos = document.querySelectorAll('.caja-loader');
    var preloaders = document.querySelectorAll('.loader');

    setTimeout(function() {
        preloaders.forEach(function(preloader) {
            preloader.style.display = 'none';
        });

        elementos.forEach(function(elemento) {
            elemento.style.display = 'block';
        });
    }, 1500);
});



function PerfilLogueado() {
    var nombre_logueado = document.getElementById('name-usuario');
    
    const token = localStorage.getItem('token');
    const nombreLocal = localStorage.getItem('nombreUsuario');
    
    if (!token) {
        //console.log("No token found, please log in.");
        return;
    }else{
        if (nombreLocal) {
            nombre_logueado.textContent = nombreLocal;
        }
    }
  
    fetch('http://localhost:8000/api/user-profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const nombreUsuario = data.userData.nombre_usuario;
        const id_usuario = data.userData.id_usuario;

        nombre_logueado.textContent = nombreUsuario;

        localStorage.setItem('nombreUsuario', nombreUsuario);
        localStorage.setItem('token_sofystic', id_usuario);

        //console.log('Perfil del Usuario:', nombreUsuario);
    })
    .catch(error => {
        //console.error('Error obteniendo el perfil del usuario:', error);
    });
}
