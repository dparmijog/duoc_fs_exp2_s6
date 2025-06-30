import { Component, Input, OnInit } from '@angular/core';
import { minidenticon } from 'minidenticons'
import { ProgressBarModule } from 'primeng/progressbar';
import { createIdentimon, Identimon, Stats } from '../pages/service/identiworld.service';


// export const createProgressBar = (attributes) => {
//     const fragment = document.createDocumentFragment();
//     for (const key in attributes) {
//             const max = 180// Rarity has a different max value
//             const value = attributes[key]
//             if(Number.isInteger(value) && value >= 0 && value <= max) {
//                 const progress = document.createElement("div");
//                 progress.classList.add("progress", "mb-2");

//                 const bar = document.createElement("div");
//                 bar.classList.add("progress-bar");
//                 bar.setAttribute("role", "progressbar");
//                 bar.style.backgroundColor = getAttributeColor(key);

//                 bar.setAttribute("aria-valuenow", value);
//                 bar.setAttribute("aria-valuemin", 0);
//                 bar.setAttribute("aria-valuemax", max);

//                 bar.style.width = `${(value / max) * 100}%`;
//                 progress.append(bar);
//                 const span = document.createElement("span");
//                 span.textContent = `${key}: ${value}`;
//                 fragment.append(span, progress);
//             }

//     }

//     return fragment;
// }
const max = 180
@Component({
    selector: 'app-identi-stats',
    standalone: true,
    imports: [ProgressBarModule],
    templateUrl: './identi.stats.component.html',
    styleUrl: './identi.art.component.scss'
})
export class IdentiStatsComponent implements OnInit {
    @Input() id = '';
    identimon: Identimon = createIdentimon(this.id);
    life: number = 0;
    mana: number = 0;
    defense: number = 0;
    attack: number = 0;
    speed: number = 0;
    luck: number = 0;
    magic: number = 0;
    power: number = 0;
    


    // constructor() {
    //     this.identimon = createIdentimon(this.id);
    //     console.log("id",this.id, "mon", this.identimon)
    // }

    ngOnInit(): void {
        this.identimon = createIdentimon(this.id);
        this.life = Number(((this.identimon.stats.life / 180) * 100).toFixed(2))    //console.log("id",this.id, "mon", this.identimon)
        this.mana = Number(((this.identimon.stats.mana / 180) * 100).toFixed(2));
        this.defense = Number(((this.identimon.stats.defense / 180) * 100).toFixed(2));
        this.attack = Number(((this.identimon.stats.attack / 180) * 100).toFixed(2));
        this.speed = Number(((this.identimon.stats.speed / 180) * 100).toFixed(2));
        this.luck = Number(((this.identimon.stats.luck / 180) * 100).toFixed(2));
        this.magic = Number(((this.identimon.stats.magic / 180) * 100).toFixed(2));
        this.power = Number(((this.identimon.stats.power / 180) * 100).toFixed(2));
    }




}
