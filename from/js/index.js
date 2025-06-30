import { createIdentimon } from "./identimons.js";
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js'



document.addEventListener("DOMContentLoaded", () => {
    const identiwelcome = document.getElementById("identiwelcome");
    identiwelcome.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos Identimons
    const fragment = document.createDocumentFragment();
    let count = 0;
    const interval = setInterval(() => {
        const div = document.createElement("div")
        div.classList.add("col-lg-1", "col-md-2", "col-sm-4", "col-xs-12", "mb-4");
        const card = document.createElement("div")
        card.classList.add("card", "h-100");
        const identicon = createIdentimon()
        card.append(identicon.component);
        const tier = document.createElement("span");
        tier.classList.add("badge", "m-2");
        tier.style.backgroundColor = identicon.attributes.rarity.color;
        tier.textContent = identicon.attributes.rarity.type;
        div.append(card);
        fragment.append(div);
        card.append(tier);
        identiwelcome.append(fragment)
        count++;
        if (count >= 60) {
            count = 0;
            clearInterval(interval); 
             
        }
    }, 25);

    document.getElementById("explore-button").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.getItem("session");
        if (!localStorage.getItem("session")) {
            alert("¡Debes iniciar sesión para explorar!");
            window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
            return;
        }
        window.location.href = "explore.html";
    })
})