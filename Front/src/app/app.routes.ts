import { Routes } from '@angular/router';
import { LoginComponenteComponent } from "./components/auth-components/login/login.component";
import { HomeComponent } from "./components/home/home.component";

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponenteComponent },
    { path: 'home', component: HomeComponent },

];
