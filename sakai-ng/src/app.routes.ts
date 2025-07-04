import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/auth/login';
import { Quit } from './app/pages/auth/quit';
import { SignIn } from './app/pages/auth/signin';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    {
        path: 'auth',
        component: Login
    },
    {
        path: 'register',
        component: SignIn
    },
    {
        path: 'quit',
        component: Quit
    }
    //{ path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    //{ path: '**', redirectTo: '/notfound' }
];
