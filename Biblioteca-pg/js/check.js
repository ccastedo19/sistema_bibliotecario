
function checkFormUsuario() {
  var CheckPass = document.getElementById("checkPass");
  var contenidoPass1 = document.getElementById("passwordC1");
  var contenidoPass2 = document.getElementById("passwordC2");
  var txtPass = document.getElementById("txtValidar");
  var inputPass1 = document.getElementById("password_old");
  var inputPass2 = document.getElementById("password_new");

  if (CheckPass.checked) {
      contenidoPass1.style.display = "block";
      contenidoPass2.style.display = "block";
      txtPass.style.display = "block";
      inputPass1.setAttribute("required", "required");
      inputPass2.setAttribute("required", "required");
  } else {
      contenidoPass1.style.display = "none";
      contenidoPass2.style.display = "none";
      txtPass.style.display = "none";
      inputPass1.removeAttribute("required");
      inputPass2.removeAttribute("required");
  }
}
