import 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.1/minidenticons.min.js'
import { ulid } from 'https://cdn.jsdelivr.net/npm/ulid@3.0.1/+esm'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js'
import { createIdentimon, showIdentimonDetails } from "./identimons.js";

const Q = 12 * 12 * 12

document.addEventListener("DOMContentLoaded", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= Q; i++) {
        const div = document.createElement("div")
        div.classList.add("col-lg-1", "col-md-2", "col-sm-4", "col-xs-12", "mb-4");
        const card = document.createElement("div")
        card.classList.add("card", "h-100");
        const identicon = createIdentimon()
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
            showIdentimonDetails(identicon.id);
        })
    }
    document.getElementById("guide").append(fragment);
})