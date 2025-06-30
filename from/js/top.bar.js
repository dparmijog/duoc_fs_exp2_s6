import 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.1/minidenticons.min.js'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js'
import { createIdentimon, showIdentimonDetails } from "./identimons.js";

const createLoggedBar = (user) => {
    const  options = [{
        name: "Inicio",
        href: "index.html",
        enabled: true
    }, {
        name: "Identimons",
        href: "gallery.html",
        enabled: user.role === "admin"
    }, {
        name: "Explorar Mundo",
        href: "explore.html",
        enabled: true
    }, {
        name: "Tienda",
        href: "store.html",
        enabled: user.role === "admin"
    }, {
        name: "IdentiMe",
        href: "me.html",
        enabled: true
    }, {
        name: "Cerrar sesión",
        href: "logout.html",
        enabled: true 
    }]
    
    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.classList.add("navbar-nav", "ms-auto"); // Alineación derecha del menú
    options.filter(option => option.enabled).forEach((option) => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
        const a = document.createElement("a");
        a.classList.add("nav-link");
        a.href = option.href;
        a.textContent = option.name;
        li.append(a);
        ul.append(li);
    });

    fragment.append(ul);

    return fragment;
};

const createOutsiderBar = () => {
    const  options = [{
        name: "Inicio",
        href: "index.html",
    }, {
        name: "Identimons",
        href: "gallery.html",
    }, {
        name: "Registrate",
        href: "register.html",
    }, {
        name: "Log In",
        href: "login.html",
    }]
    
    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.classList.add("navbar-nav", "ms-auto"); // Alineación derecha del menú
    options.forEach((option) => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
        const a = document.createElement("a");
        a.classList.add("nav-link");
        a.href = option.href;
        a.textContent = option.name;
        li.append(a);
        ul.append(li);
    });

    fragment.append(ul);

    return fragment;
};

const checkUser = () => {
    const userJSON = localStorage.getItem("session");
    const user = userJSON ? JSON.parse(userJSON) : null;
    if (user) {
        return user;
    } else {
        return null;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const fragment = document.createDocumentFragment();
    const bar = document.getElementById("top-bar-options");
    const user = checkUser()
    if (user) {
        const loggedBar = createLoggedBar(user);
        fragment.append(loggedBar);
       
    } else {
        const outsiderBar = createOutsiderBar();
        fragment.append(outsiderBar);
    }
    bar.append(fragment);
    const logo = document.getElementById("logo");
    const i = setInterval(() => {
        logo.innerHTML = ""; // Limpiar el logo antes de agregar nuevos Identimons
        const identimon = createIdentimon();
        logo.append(identimon.component)
        logo.style.width = "30px";
    }, 300)

})

