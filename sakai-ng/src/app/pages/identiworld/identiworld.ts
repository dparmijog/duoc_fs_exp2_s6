import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Product, ProductService } from '../service/product.service';
import { CardModule } from 'primeng/card';
import { IdentiArtComponent } from '../../identimons/identi.art.component';
import { Identimon, IdentiWorldService } from '../service/identiworld.service';
import { IdentiStatsComponent } from '../../identimons/identi.stats.component';


@Component({
    selector: 'app-identiworld',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        CardModule,
        IdentiArtComponent, IdentiStatsComponent
    ],
    templateUrl: './identiworld.html',
    providers: [IdentiWorldService]
})
export class IdentiWorld implements OnInit {
    identimons = signal<Identimon[]>([]);

    selectedIdentimon: Identimon | undefined;

    displayDialog = false;

    constructor(
        private identiWorldService: IdentiWorldService,
    ) {}

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.identiWorldService.getFauna(Math.floor(Math.random() * 5) + 5).then((data) => {
            this.identimons.set(data);
        });
    }

    selectIdentimon(identimon: Identimon) {
        this.displayDialog = true
        this.selectedIdentimon = identimon;
    }

    closeDialog() {
        this.displayDialog = false;
        this.selectedIdentimon = undefined;
    }

    exploreMore() {
        this.loadDemoData();
        this.displayDialog = false;
        this.selectedIdentimon = undefined;
    }


}
