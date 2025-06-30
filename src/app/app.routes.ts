import { Routes } from '@angular/router';
import { Identimons } from './identimons/identimons';

export const routes: Routes = [
    { path: 'identimons', component: Identimons },
    { path: '**', redirectTo: '' },
];
