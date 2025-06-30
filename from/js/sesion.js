// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos los datos de la sesión actual desde localStorage
  const sesion = JSON.parse(localStorage.getItem("sesion"));

  // Seleccionamos el elemento del menú de navegación
  const nav = document.querySelector(".navbar-nav");

  // Si no hay barra de navegación, salimos del script
  if (!nav) return;

  // Creamos los enlaces básicos comunes para todos los usuarios
  let linksBase = `
    <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
    <li class="nav-item"><a class="nav-link" href="identimons.html">Identimons</a></li>
    <li class="nav-item"><a class="nav-link" href="categoria-deportes.html">Batallas</a></li>
  `;

  // Si hay una sesión activa
  if (sesion?.logueado) {
    // Si el usuario es administrador, se agregan enlaces exclusivos
    if (sesion.tipo === "admin") {
      linksBase += `
        <li class="nav-item"><a class="nav-link" href="admin.html">Panel Admin</a></li>
        <li class="nav-item"><a class="nav-link" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
      `;
    } else {
      // Si es un usuario normal, mostramos enlaces propios
      linksBase += `
        <li class="nav-item"><a class="nav-link" href="perfil.html">Mi Perfil</a></li>
        <li class="nav-item"><a class="nav-link" href="carrito.html">Carrito</a></li>
        <li class="nav-item"><a class="nav-link" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
      `;
    }
  } else {
    // Si no hay sesión activa, mostramos opciones de registro e inicio
    linksBase += `
      <li class="nav-item"><a class="nav-link" href="registro.html">Registro</a></li>
      <li class="nav-item"><a class="nav-link" href="login.html">Iniciar sesión</a></li>
    `;
  }

  // Insertamos los enlaces generados en el navbar
  nav.innerHTML = linksBase;

  // Si el botón de cerrar sesión está presente, le asignamos funcionalidad
  const cerrarSesionBtn = document.getElementById("cerrar-sesion");
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Eliminamos la sesión del localStorage
      localStorage.removeItem("sesion");
      // Redirigimos al inicio
      window.location.href = "index.html";
    });
  }
});
