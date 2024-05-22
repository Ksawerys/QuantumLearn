import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {UserAccess, User} from "../../../interfaces/interface-user";
import {UserService} from "../../../services/user.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {DialogPasswordComponent} from "../../dialogs/dialog-password/dialog-password.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
// import { NotificationComponent } from '../../notifications/notification/notification.component';
// import { NotificationsService } from '../../../services/notifications.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-componente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    RouterLink,
    MatButton,
    MatProgressSpinner,
    // NotificationComponent,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponenteComponent implements OnInit  {

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
  login() {
    this.userService.login(this.loginFormulario.value).subscribe(
      response => {
        console.log(response)
        if(response.body){
        sessionStorage.setItem('token', response.body!.token!);
        this.router.navigate(['/home']);
        }
      },
      error => {
        this.errorRegistro = true;
      }
    );
  }
  
  register() {
    this.userService.register(this.registerForm.value).subscribe(
      response => {
        if(response.body){
        sessionStorage.setItem('token', response.body!.token!);
        this.router.navigate(['/home']);
        }
      },
      error => {
        this.errorLogin = true;
      }
    );
  }


  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      this.router.navigate(['/inicio'])
    }
  }


  constructor(private userService: UserService, private router: Router, public dialog: MatDialog,private http: HttpClient) {
  }

}