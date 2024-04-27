import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MatMenuModule} from "@angular/material/menu";
import {ToastModule} from "primeng/toast";
import { RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { LoginComponenteComponent } from './components/auth-components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
// import { NotificationComponent } from '../../notifications/notification/notification.component';
// import { NotificationsService } from '../../../services/notifications.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatMenuModule, ToastModule, RouterLink,LoginComponenteComponent,HttpClientModule,MatError,MatFormField,MatIcon,MatIconButton,MatInput,MatLabel,MatSuffix,MatButton,MatProgressSpinner,HttpClientModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {

  hide = true
  showRegister = false; 
  showRoles = false;
  selectedRoles: string[] = [];

  errorLogin!: Boolean
  errorRegistro!: Boolean
  titleError = 'Error'
  messageError = ''
  descriptionError = 'Revisa los campos introducidos, revisa la conexion y vuelve a intentarlo'

  loginFormulario = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),   
      Validators.email
    ]),
    password: new FormControl('',{ updateOn: 'blur', validators: [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(30), 
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]*$')
    ]})
  })

  registerForm = new FormGroup({
    email: new FormControl('', { updateOn: 'blur', validators: [
      Validators.required, 
      Validators.maxLength(50),   
      Validators.email
    ]}),
    name: new FormControl('', { updateOn: 'blur', validators:  [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(30), 
      Validators.pattern('^[a-zA-Z ]*$')
    ]}),
    second_name: new FormControl('', { updateOn: 'blur', validators:  [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(30), 
      Validators.pattern('^[a-zA-Z ]*$')
    ]}),
    password: new FormControl('', { updateOn: 'blur', validators:  [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(30), 
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]*$')
    ]}),

    roles: new FormControl([], Validators.required)
  });

  rolesSelection(event: Event) {
    let target: HTMLElement | null = event.target as HTMLElement;
  
    while (target && !target.classList.contains('role-option')) {
      target = target.parentElement;
    }
  
    if (!target) return;
  
    const roleId = target.id.replace('role-', '');
  
    if (target.classList.contains('selected')) {
      this.selectedRoles = this.selectedRoles.filter(role => role !== roleId);
    } else {
      this.selectedRoles.push(roleId);
    }
  
    target.classList.toggle('selected');
  }

  


  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      this.router.navigate(['/inicio'])
    }
  }


  constructor( private router: Router, public dialog: MatDialog,private http: HttpClient) {
  }

}