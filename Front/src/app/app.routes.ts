import { Routes } from '@angular/router';
import { LoginComponenteComponent } from "./components/auth-components/login/login.component";

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponenteComponent },

];
