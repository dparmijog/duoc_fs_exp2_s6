import { ulid } from 'https://cdn.jsdelivr.net/npm/ulid@3.0.1/+esm'

document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const admin = users.some(user => user.email === "admin@local");
  const member0 = users.some(user => user.email === "r2d2@local");
  const member1 = users.some(user => user.email === "c3p0@local");

  if (!admin) {
    const admin = {
      name: "Administrador",
      username: "admin",
      email: "admin@local",
      password: "yamecansé",
      favoriteNumber: 69,
      role: "admin",
      gold: 9999999999,
    };

    users.push(admin);
  }
  if (!member0) {
    const member0 = {
      name: "Arturito",
      username: "r2d2",
      email: "r2d2@local",
      password: "yamecansé",
      favoriteNumber: 42,
      role: "member",
      gold: 0,
      
    };
    users.push(member0);
  }
  if (!member1) {

    const member1 = {
      name: "Citripio",
      username: "c3p0",
      email: "c3p0@local",
      password: "yamecansé",
      favoriteNumber: 13,
      role: "member",
      gold: 500,
      
    };
    users.push(member1);
  }
  localStorage.setItem("users", JSON.stringify(users));
});


const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("session", JSON.stringify({
      id: ulid(),
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      expiresAt: Date.now() + 3600000,
      energyDrinks:10,
      favoriteNumber: user.favoriteNumber || 0,
      identimons: user.identimons ? user.identimons : [],
      gold: user.gold || 0,
    }));


    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Si ambos están completos, intenta iniciar sesión
      if (email && password) {
        login(email, password);
      } else {
        // Si falta algún campo, muestra advertencia
        alert("Completa todos los campos!");
      }
    });
  }
});
