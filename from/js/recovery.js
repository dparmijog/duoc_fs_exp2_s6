// Esperamos a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos el formulario de recuperación de contraseña por su ID
  const form = document.getElementById("form-recuperar");

  // Añadimos un evento al formulario para cuando el usuario lo envíe
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenimos que el formulario se envíe de forma tradicional

    // Obtenemos y limpiamos los valores ingresados por el usuario
    const email = document.getElementById("email").value.trim();
    const nueva = document.getElementById("nuevaPassword").value.trim();
    const confirmar = document.getElementById("confirmarPassword").value.trim();

    // Validamos el formato del email y que las contraseñas sean válidas y coincidan
    // Estas funciones deben estar definidas en otro archivo JS (como `validaciones.js`)
    if (!validarEmail("email") || !validarPassword("nuevaPassword", "confirmarPassword")) {
      return; // Si alguna validación falla, se detiene el proceso
    }

    // Obtenemos el listado actual de usuarios desde localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscamos el índice del usuario que tiene el correo ingresado
    const index = usuarios.findIndex(u => u.email === email);

    // Si no se encuentra el usuario, mostramos una alerta y salimos
    if (index === -1) {
      alert("No se encontró un usuario con ese correo.");
      return;
    }

    // Si se encuentra el usuario, actualizamos su contraseña
    usuarios[index].password = nueva;

    // Guardamos nuevamente la lista de usuarios con la contraseña actualizada
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Informamos al usuario y redirigimos al login
    alert("Contraseña actualizada exitosamente ✅");
    window.location.href = "login.html";
  });
});
