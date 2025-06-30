// Esperamos a que todo el DOM esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos el formulario de inscripción por su ID
    const formulario = document.getElementById("formulario-inscripcion");
  
    // Solo ejecutamos la lógica si el formulario existe en la página actual
    if (formulario) {
      // Escuchamos el evento submit del formulario
      formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenimos el envío tradicional del formulario
  
        // Validamos el formulario usando funciones definidas externamente
        if (validarFormulario()) {
          // Si todo es válido, obtenemos los valores del formulario
          const displayName = document.getElementById("display-name").value.trim();
          const username = document.getElementById("username").value.trim();
          const email = document.getElementById("email").value.trim();
          const password = document.getElementById("password").value;
  
          // Recuperamos el arreglo de usuarios del localStorage, o creamos uno nuevo si está vacío
          const users = JSON.parse(localStorage.getItem("users")) || [];
  
          // Verificamos si ya hay un usuario registrado con el mismo correo
  
          if (users.some(u => u.email === email)) {
            // Si ya existe un usuario con ese correo, alertamos y no registramos
            alert("Ya existe una cuenta con ese correo.");
            return;
          }
  
  
          users.push({
            displayName,
            username,
            email,
            password,
            role: "member" // Todos los usuarios registrados desde aquí son tipo normal
          });
  
          // Guardamos el array actualizado en el localStorage
          localStorage.setItem("users", JSON.stringify(users));
          // Avisamos al usuario y lo redirigimos al login
          alert("¡Usuario registrado con éxito!");
          formulario.reset(); // Limpiamos el formulario
          window.location.href = "login.html"; // Redirigimos al login
        }
      });
    }
  });
  