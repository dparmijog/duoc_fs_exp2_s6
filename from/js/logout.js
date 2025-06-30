

const logOut = () => {
    const sessionJSON = localStorage.getItem("session");
    if (!sessionJSON) {
        console.error("No hay sesión activa");
        return;
    }
    const newSession = JSON.parse(sessionJSON);
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : "[]"; // Si no hay usuarios, inicializar como array vacío
    const user = users.find(u => u.email === newSession.email);
    if (!user) {
        console.error("Usuario no encontrado");
        return;
    }
    user.name = newSession.name;
    user.username = newSession.username;
    user.favoriteNumber = newSession.favoriteNumber;
    user.identimons = newSession.identimons;

    users[users.indexOf(user)] = user; // Actualizar el usuario en el array
    localStorage.setItem("users", JSON.stringify(users)); // Guardar los usuarios actualizados
    console.log("Usuario actualizado:", user);
    alert("¡Sesión cerrada correctamente!");
    localStorage.removeItem("session");
    window.location.href = "index.html"; // Redirigir a la página principal
}

    

document.addEventListener("DOMContentLoaded", () => {
    const dotdotdot = document.getElementById("dotdotdot");
    const fragment = document.createDocumentFragment();
    let count = 0;
    let dots = ""
    const interval = setInterval(() => {
        dotdotdot.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos Identimons
        for(let i = 0; i < count; i++) {
            dots += ".";
        }
        dotdotdot.append(dots);
        
        dots = "";
        if (count % 3 == 0) {
            count = 0;
        }
        count++;
    }, 300);

    setTimeout(() => {
        clearInterval(interval); // Detener el intervalo después de 3 segundos
        logOut();
    }, 1500); 
    
})