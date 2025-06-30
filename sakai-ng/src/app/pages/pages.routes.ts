import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { IdentiWorld } from './identiworld/identiworld';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';
import { Quit } from './auth/quit';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'identiworld', component: IdentiWorld },
    { path: 'profile', component: ProfileComponent },
    { path: 'team', component: TeamComponent },
    { path: 'empty', component: Empty },
    //{ path: '**', redirectTo: '/notfound' }
] as Routes;
