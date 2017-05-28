import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthResolve } from './services/auth.resolve';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'land',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'archive',
        component: ArchiveComponent
    },
    {
        path: 'land',
        component: LandingComponent,
        resolve: {
            authData: AuthResolve
        }
    }
]