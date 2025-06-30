import 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.1/minidenticons.min.js'
import "https://cdn.jsdelivr.net/npm/jdenticon@3.3.0/dist/jdenticon.min.js"
import { ulid } from 'https://cdn.jsdelivr.net/npm/ulid@3.0.1/+esm'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js'
import { createIdentimon, showIdentimonDetails } from "./identimons.js";

const Q = 12 * 12 * 12

const convertToNumber = (value) => {
    const nums =  value.split("").map((c) => {
        const num = c.charCodeAt(0); // Convert 'a' to 0, 'b' to 1, etc.
        return num
    })
    return Math.round(nums.reduce((acc, curr) => acc % 7 == 0 ? acc * (curr/10) : acc + curr, 1)); // Convert to a base-26 number
}

export const createJdentimon = (id) => {
    const fragment = document.createDocumentFragment();

    const seed = id || ulid();
    const identicon = document.createElement("minidenticon-svg")
    identicon.setAttribute("username", seed);
    fragment.append(identicon);
    const average = Math.floor((convertToNumber(seed.slice(10, 24))) / 7);
    const price = convertToNumber(seed.slice(10, 16))
    return {
        id: seed,
        name: seed.slice(-10),
        component: fragment,
        random: seed.slice(10, 26),
        price,
    }
}

//emoji money = "💰"
export const createProgressBar = (attributes) => {
    const fragment = document.createDocumentFragment();
    for (const key in attributes) {
            const max = 180// Rarity has a different max value
            const value = attributes[key]
            if(Number.isInteger(value) && value >= 0 && value <= max) {
                const progress = document.createElement("div");
                progress.classList.add("progress", "mb-2");
                
                const bar = document.createElement("div");
                bar.classList.add("progress-bar");
                bar.setAttribute("role", "progressbar");
                //bar.style.backgroundColor = getAttributeColor(key);

                bar.setAttribute("aria-valuenow", value);
                bar.setAttribute("aria-valuemin", 0);
                bar.setAttribute("aria-valuemax", max);
                
                bar.style.width = `${(value / max) * 100}%`;
                progress.append(bar);
                const span = document.createElement("span");
                span.textContent = `${key}: ${value}`;
                fragment.append(span, progress);
            }
            
    }

    return fragment;
}

export const showJDenticonDetails = (id) => {
    
    const modal = document.getElementById("jdentimon-details");
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
    
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}


document.addEventListener("DOMContentLoaded", () => {
    
    
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= Q; i++) {
        const id = ulid();
        const div = document.createElement("div")
        div.classList.add("col-lg-1", "col-md-2", "col-sm-4", "col-xs-12", "mb-4");
        const card = document.createElement("div")
        card.classList.add("card", "h-100");
        const identicon = createJdentimon()
        const small = document.createElement("strong");
        small.classList.add("text-muted", "text-bold");
        card.append(small);
        card.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-center");
        const tier = document.createElement("div");
        tier.style.width = "auto";
        tier.style.height = "100%";
        tier.innerHTML = jdenticon.toSvg(id, 75, {
            saturation: {
                color: 1
            }
        });
        const price = document.createElement("span");
        price.classList.add("badge", "m-2");
        price.style.backgroundColor = "#FFD700"; // Gold color
        price.textContent = `${identicon.price} 💵`;
        div.append(card);
        fragment.append(div);
        card.append(tier);
        card.append(price);

        card.addEventListener("click", (e) => {
            console.log("Clicked on identicon", identicon.id );
            showJDenticonDetails(identicon.id);
        })
    }
    document.getElementById("guide").append(fragment);
})