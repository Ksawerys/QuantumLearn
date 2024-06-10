import { Routes } from '@angular/router';
import { LoginComponenteComponent } from './components/auth-components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/auth-components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NotesComponent } from './components/notes/notes.component';
import { SubNotesComponent } from './components/sub-notes/sub-notes.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { QuestionnaireMenuComponent } from './components/questionnaire-menu/questionnaire-menu.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponenteComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component:  ProfileComponent},
    { path: 'error', component:  ErrorComponent},
    { path: 'payments', component:  PaymentComponent},
    { path: 'notes', component:  NotesComponent},
    { path: 'sub-notes', component:  SubNotesComponent},
    { path: 'questionrie_menu', component:  QuestionnaireMenuComponent},
    { path: 'questionrie', component:  QuestionnaireComponent},
];
