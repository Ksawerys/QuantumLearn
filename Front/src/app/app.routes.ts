import { Routes } from '@angular/router';
import { LoginComponenteComponent } from './components/auth-components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/auth-components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NotesComponent } from './components/notes/notes.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { QuestionnaireMenuComponent } from './components/questionnaire-menu/questionnaire-menu.component';
import { GraphComponent } from './components/graph/graph.component';
import { TokenExpirationGuard } from './guards/token-expiration.guard'; 


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponenteComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component:  ProfileComponent, canActivate: [TokenExpirationGuard] },
    { path: 'error', component:  ErrorComponent},
    { path: 'payments', component:  PaymentComponent, canActivate: [TokenExpirationGuard] },
    { path: 'notes', component:  NotesComponent, canActivate: [TokenExpirationGuard] },
    { path: 'questionrie_menu', component:  QuestionnaireMenuComponent, canActivate: [TokenExpirationGuard] },
    { path: 'questionrie', component:  QuestionnaireComponent, canActivate: [TokenExpirationGuard] },
    { path: 'graph', component:  GraphComponent, canActivate: [TokenExpirationGuard] },
];