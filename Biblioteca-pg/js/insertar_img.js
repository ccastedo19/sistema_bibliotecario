document.getElementById('imageInput').addEventListener('change', function(event) {
    var fileNameSpan = document.getElementById('fileName');
    var container = document.getElementById('imagePreviewContainer');
  
    if (event.target.files.length > 0) {
      var file = event.target.files[0];
      fileNameSpan.textContent = file.name; // Actualiza el texto con el nombre del archivo
  
      var reader = new FileReader();
      reader.onload = function(e) {
        var imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.style.width = '150px'; // Puedes ajustar el tamaño como desees
        imgElement.style.height = 'auto';
  
        container.innerHTML = ''; // Limpia cualquier imagen existente
        container.appendChild(imgElement); // Añade la nueva imagen
      };
  
      reader.readAsDataURL(file); 
    } else {
      
      container.innerHTML = ''; 
      fileNameSpan.textContent = 'Ningún archivo seleccionado'; 
    }
});
