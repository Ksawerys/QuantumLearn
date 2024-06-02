import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { UserAccess, User } from "../../../interfaces/interface-user";
import { UserService } from "../../../services/user.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
// import { NotificationComponent } from '../../notifications/notification/notification.component';
// import { NotificationsService } from '../../../services/notifications.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogPasswordComponent } from '../../dialogs/dialog-password/dialog-password.component';
import { AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
declare let window: any;

@Component({
  selector: 'app-login-componente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // NotificationComponent,
    HttpClientModule,
    DialogPasswordComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponenteComponent implements OnInit {
  @ViewChild('dialogPasswordComponent') dialogPasswordComponent!: DialogPasswordComponent;
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
    password: new FormControl('', {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]*$')
      ]
    })
  })

  registerForm = new FormGroup({
    email: new FormControl('', {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]
    }),
    name: new FormControl('', {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    }),
    second_name: new FormControl('', {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    }),
    password: new FormControl('', {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]*$')
      ]
    }),

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
        if (response.body) {
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
        if (response.body) {
          sessionStorage.setItem('token', response.body!.token!);
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.errorLogin = true;
      }
    );
  }



  openDialog() {
    this.dialogPasswordComponent.open();
  }

  ngAfterViewInit(): void {
    if (window['google']) {
      window['google'].accounts.id.initialize({
        client_id: '...',
        callback: (response: any) => {
          const body = {
            id_token: response.credential
          };
          this.authService.handleCredentialResponse(body).subscribe(
            res => {
              console.log(res);
              const userNameElement = document.getElementById('user_name');
              if (userNameElement) {
                userNameElement.innerText = res.body.correo;
              }
              localStorage.setItem('email', res.body.correo);
            },
            err => console.error(err)
          );
        }
      });
    }
  }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      this.router.navigate(['/inicio'])
    }
    this.loadScript();
    if (window['google']) {
    }
  }

  loadScript() {
    const node = document.createElement('script');
    node.src = 'https://accounts.google.com/gsi/client';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  signOut(): void {
    if (window['google'] && window['google'].accounts && window['google'].accounts.id) {
      window['google'].accounts.id.disableAutoSelect();
      window['google'].accounts.id.revoke(localStorage.getItem('email'), () => {
        console.log('consent revoked');
        localStorage.clear();
        location.reload();
      });
    }
  }

  constructor(private userService: UserService, private router: Router, private http: HttpClient, private authService: AuthService) {
  }

}