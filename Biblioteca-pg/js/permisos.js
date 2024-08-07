permisosAdmin();


function permisosAdmin(){
    var id_usuario = localStorage.getItem('token_sofystic');
    //console.log("id_usuario", id_usuario);

    fetch(`http://localhost:8000/api/usuario/${id_usuario}`)
        .then(response => response.json())
        .then(data => {
            if (data.res) {
                var idUsuario = data.usuario.id_usuario;
                var rolUsuario = data.usuario.id_rolF;
                var contenido = document.getElementById("contenido");
                var permisos = document.getElementById("permisos");

                if (rolUsuario == 2){
                    contenido.style.display = "none";
                    permisos.style.display = "flex";
                    console.log("quitado");
                }else{
                    permisos.style.display = "none";
                }

            } else {
                console.error('Usuario no encontrado.');
            }
        })
        .catch(error => console.error('Error fetching user:', error));
}

