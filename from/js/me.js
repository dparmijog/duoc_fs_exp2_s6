import 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.1/minidenticons.min.js'
import { ulid } from 'https://cdn.jsdelivr.net/npm/ulid@3.0.1/+esm'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js'
import { createIdentimon, createProgressBar } from "./identimons.js";

const Q = 12 * 4; // Total number of Identimons to display
const getSessionEnergyDrinks = () => {
    const sessionJSON = localStorage.getItem("session");
    if (!sessionJSON) {
        alert("¡Debes iniciar sesión para explorar!");
        localStorage.removeItem("session");
        window.location.href = "index.html"; // Redirect to the main page
        return 0;
    }
    const session = JSON.parse(sessionJSON);
    console.log("Session:", session);
    return session.energyDrinks;
}
const updateSessionEnergyDrinks = (newEnergyDrinks) => {
    const sessionJSON = localStorage.getItem("session");
    if (!sessionJSON) {
        alert("¡Debes iniciar sesión para explorar!");
        localStorage.removeItem("session");
        window.location.href = "index.html"; // Redirect to the main page
        return;
    }
    const session = JSON.parse(sessionJSON);
    session.energyDrinks = Number(newEnergyDrinks);
    localStorage.setItem("session", JSON.stringify(session));
}


const showIdentimonAttributes = (id) => {
    
    const modal = document.getElementById("identimon-details");
    const bsModal = new bootstrap.Modal(modal);
    const modalTitle = modal.querySelector(".modal-title");
    const modalBody = modal.querySelector(".modal-body");

    const identicon = createIdentimon(id);

    const span = document.createElement("span");
    span.classList.add("badge", "m-2");
    span.style.backgroundColor = identicon.attributes.rarity.color;
    span.textContent = identicon.attributes.rarity.type;
    modalTitle.textContent = `Identimon: ${identicon.name}`;
    modalTitle.append(span);

    modalBody.innerHTML = ""; // Clear previous content

    modalBody.appendChild(identicon.component);
    modalBody.appendChild(createProgressBar(identicon.attributes));
    const div = document.createElement("div");
    div.classList.add("text-center", "mt-3");
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "btn-lg", "mt-3");
    button.textContent = "Secuestrar!";
    button.addEventListener("click", () => {
        updateSessionIdentimons(identicon.id);
        alert(`¡Identimon ${identicon.name} secuestrado!`);
        bsModal.hide();
    });
    div.appendChild(button);
    modalBody.appendChild(div);
    
    
    
    bsModal.show();
}

const createEnergyBar = () => {
    const energyDrinks = getSessionEnergyDrinks();
    const eneryBar = document.getElementById("energy-bar");
    eneryBar.innerHTML = ""; // Clear previous content
    const energy = document.createElement("div");
    energy.classList.add("progress", "mb-2");
    const bar = document.createElement("div");
    bar.classList.add("progress-bar");
    bar.setAttribute("role", "progressbar");
    bar.style.width = `${(energyDrinks / 10) * 100}%`;
    bar.setAttribute("aria-valuenow", energyDrinks);
    bar.setAttribute("aria-valuemin", 0);
    bar.setAttribute("aria-valuemax", 10);

    energy.appendChild(bar);
    eneryBar.appendChild(energy);
    //return energy;
}

const createIdentiFauna = () => {
    const guide = document.getElementById("guide");
    guide.innerHTML = ""; // Clear previous content
    guide.classList.add("row", "g-3", "justify-content-center", "text-center");
    const fragment = document.createDocumentFragment();
    const sessionJSON = localStorage.getItem("session");
    if (!sessionJSON) {
        alert("¡Debes iniciar sesión para explorar!");
        localStorage.removeItem("session");
        window.location.href = "index.html"; // Redirect to the main page
        return;
    }
    const session = JSON.parse(sessionJSON);

    for (const identimon of session.identimons) {
        const div = document.createElement("div")
        div.classList.add("col-lg-1", "col-md-2", "col-sm-4", "col-xs-12", "mb-0");
        const card = document.createElement("div")
        card.classList.add("card", "h-100");
        const identicon = createIdentimon(identimon)
        const small = document.createElement("strong");
        small.classList.add("text-muted", "text-bold");
        small.textContent =  identicon.name
        small.style.fontSize = "0.6rem";
        small.color = identicon.attributes.rarity.color;
        card.append(small);
        card.append(identicon.component);
        const tier = document.createElement("span");
        tier.classList.add("badge", "m-2");
        tier.style.backgroundColor = identicon.attributes.rarity.color;
        tier.textContent = identicon.attributes.rarity.type;
        div.append(card);
        fragment.append(div);
        card.append(tier);

        card.addEventListener("click", (e) => {
            console.log("Clicked on identicon", identicon.id );
            showIdentimonAttributes(identicon.id);
        })
    }
    guide.append(fragment);
}

document.addEventListener("DOMContentLoaded", () => {
    const sessionJSON = localStorage.getItem("session");
    if (!sessionJSON) {
        alert("¡Debes iniciar sesión para explorar!");
        localStorage.removeItem("session");
        window.location.href = "index.html"; // Redirect to the main page
        return;
    }
    const session = JSON.parse(sessionJSON);
    console.log("Session:", session);
    document.getElementById("id").textContent = session.id;
    document.getElementById("user-name").textContent = session.username;
    document.getElementById("display-name").textContent = session.name
    document.getElementById("role").textContent = session.role;
    document.getElementById("identimons-count").textContent = session.identimons.length;
    document.getElementById("energy-drinks").textContent = session.energyDrinks;
    document.getElementById("fav-num").textContent = session.favoriteNumber;
    if (!session.identimons) {
        session.identimons = [];
    }
    localStorage.setItem("session", JSON.stringify(session));
    createEnergyBar()
    createIdentiFauna()
    
    
})