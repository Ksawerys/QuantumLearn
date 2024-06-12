import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { UserAccess, User, Role } from "../../../interfaces/interface-user";
import { HttpClient, HttpResponse, withInterceptorsFromDi } from "@angular/common/http";
import { DialogPasswordComponent } from '../../dialogs/dialog-password/dialog-password.component';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare let window: any;

@Component({ selector: 'app-login-componente',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss', 
    imports: [
      ReactiveFormsModule,
      RouterLink,
      DialogPasswordComponent,
    ], 
    providers: [],
    encapsulation: ViewEncapsulation.None
  })

export class LoginComponenteComponent implements OnInit {
  @ViewChild('dialogPasswordComponent') dialogPasswordComponent!: DialogPasswordComponent;
  hide = true
  showRegister = false;
  showRoles = false;
  selectedRoles: string[] = [];  
  titleError = 'Error'
  messageError = ''
  descriptionError = 'Revisa los campos introducidos, revisa la conexion y vuelve a intentarlo'

  loginFormulario = new FormGroup({
    email: new FormControl('', {
      updateOn: 'blur', validators: [
      Validators.required,
      Validators.maxLength(50),
      Validators.email
      ]
  }),
    password: new FormControl('', {
      updateOn: 'change', validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]*$')
      ]
    })
  })

  registerForm = new FormGroup({
    email: new FormControl('', {
      updateOn: 'change', validators: [
        Validators.required,
        Validators.email
      ]
    }),
    name: new FormControl('', {
      updateOn: 'change', validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    }),
    second_name: new FormControl('', {
      updateOn: 'change', validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    }),
    password: new FormControl('', {
      updateOn: 'change', validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]*$')
      ]
    }),
    roles: new FormControl([] as string[], Validators.required)
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
    this.registerForm.get('roles')?.setValue(this.selectedRoles);  
  }

  login() {
    this.authService.login(this.loginFormulario.value).subscribe(
      response => {
        console.log(response)
        if (response.body) {
          sessionStorage.setItem('token', response.body!.token!);
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.openSnackBar('Error de login', 'Cerrar');
      }
    );
  }

  register() {
    const registerValue = { ...this.registerForm.value };
  
    const roles: string[] = registerValue.roles!;
  
    this.authService.register({ ...registerValue, roles } as User).subscribe(
      response => {
        if (response.body) {
          sessionStorage.setItem('token', response.body!.token!);
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.openSnackBar('Error de registro', 'Cerrar');
      }
    );
  }

  openDialog() {
    this.dialogPasswordComponent.open();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      this.router.navigate(['/inicio'])
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private snackBar: MatSnackBar) {
  }

}