import 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.1/minidenticons.min.js'
import { ulid } from 'https://cdn.jsdelivr.net/npm/ulid@3.0.1/+esm'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js'



const convertToNumber = (value) => {
    const nums =  value.split("").map((c) => {
        const num = c.charCodeAt(0); // Convert 'a' to 0, 'b' to 1, etc.
        return num
    })
    return nums.reduce((acc, curr) => acc + curr, 0); // Convert to a base-26 number
}

const getType = (value) => {
   
    switch (true) {
        case value > 155:
            return "legendary";
        case value > 150:
            return "epic";
        case value > 145:
            return "rare" ;
        case value > 130:
            return "uncommon";
        default:
            return "common";
    }
}


const getRarityColor = (value) => {
   
    switch (true) {
        case value > 155:
            return "#F54180"; // Legendary color
        case value > 150:
            return "#F7B750"; // Epic color
        case value > 145:
            return "#09AACD"; // Rare color;
        case value > 130:
            return "#45D483"; // Uncommon color
        default:
            return "#cccccc"; // Common color
    }
}

const getAttributeColor = (key) => {
    switch (key) {
        case "life":
            return "#FF5733"; // Red
        case "defense":
            return "#33FF57"; // Green
        case "attack":
            return "#3357FF"; // Blue
        case "speed":
            return "#F1C40F"; // Yellow
        case "luck":
            return "#9B59B6"; // Purple
        case "magic":
            return "#1ABC9C"; // Teal
        case "power":
            return "#E67E22"; // Orange
        case "mana":
            return "#34495E"; // Dark Blue
        default:
            return "#cccccc"; // Default color for unknown attributes
    }
}

export const createIdentimon = (id) => {
    const fragment = document.createDocumentFragment();

    const seed = id || ulid();
    const identicon = document.createElement("minidenticon-svg")
    identicon.setAttribute("username", seed);
    fragment.append(identicon);
    const average = Math.floor((convertToNumber(seed.slice(10, 24))) / 7);
    const attributes = {
        life: convertToNumber(seed.slice(10, 12)), 
        defense: convertToNumber(seed.slice(12, 14)),
        attack: convertToNumber(seed.slice(14, 16)),
        speed: convertToNumber(seed.slice(16, 18)),
        luck: convertToNumber(seed.slice(18, 20)),
        magic: convertToNumber(seed.slice(20, 22)),
        power: convertToNumber(seed.slice(22, 24)),
        mana: convertToNumber(seed.slice(24, 26)),
        rarity: {
            value: average,
            type: getType(average),
            color: getRarityColor(average)
        },

    }

    return {
        id: seed,
        name: seed.slice(-10),
        component: fragment,
        birth: seed.slice(0, 10),
        random: seed.slice(10, 26),
        attributes
    }
}

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
                bar.style.backgroundColor = getAttributeColor(key);

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

export const showIdentimonDetails = (id) => {
    
    const modal = document.getElementById("identimon-details");
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

