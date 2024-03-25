import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {UserAccess, User} from "../../../interfaces/interfaz-user";
import {UserService} from "../../../services/user.service";
import {HttpResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {DialogPasswordComponent} from "../../dialogs/dialog-password/dialog-password.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponenteComponent implements OnInit {
  //JavierMorales
  //Declaraciones generales
  errorLogin!: Boolean
  hide = true
  mensajeError = ''
  // Declaración del formulario reactivo
  loginFormulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required])
  })

  // Evento que se ejecuta al pulsar sobre el boton de iniciar sesion
  botonLogin() {
    this.errorLogin = true
    this.mensajeError = ''
    let usuario: User = {
      email: this.loginFormulario.value.email ?? '',
      password: this.loginFormulario.value.password ?? ''
    }

    //Llamada al servicio para realizar el login
    this.userService.login(usuario).subscribe({
      next: (respuestaServidor: HttpResponse<UserAccess>) => {
        this.errorLogin = false
        switch (respuestaServidor.status) {
          case 200:
            this.loginExistoso(respuestaServidor.body)
            break;
          case 203:
            // Codigo de error en caso de que el usuario introducido sea incorrecto
            this.loginFormulario.reset({}, {emitEvent: false});
            this.mensajeError = 'Usuario incorrecto'
            break;
          default:
            // Este mensaje de error no deberia salir nunca, ya que las validaciones del formulario están correctas.
            this.loginFormulario.reset()
            this.mensajeError = 'Error en el servidor. Vuelva a intentarlo más tarde'
            break;
        }
      },
      error: (err) => {
        this.errorLogin = false
        this.mensajeError = 'Servicio no disponible'
      }
    })

  }

  // Guarda el usuario en el session storage en caso de que el login haya sido correcto
  loginExistoso(usuarioSessionStorage: UserAccess | null) {
    console.log('sgdfsdfg',usuarioSessionStorage)
    sessionStorage.setItem('token', <string>usuarioSessionStorage?.token)
    this.router.navigate(['/inicio'])
  }

  // Botón de recuperar contraseña. Abre un dialog para pedir el email.
  recuperarPassword() {
    const dialogRef = this.dialog.open(DialogPasswordComponent, {
      width: '500px',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // Si en el popup de pedir email, el usuario pulsa sobre aceptar,
      // devuelve el email introducido, en caso de que pulse sobre cancelar devolver false.
      if (result != false) {
        this.sendPassword(result.value)
      }
    });
  }

  // Manda el email al servidor
  sendPassword(email: string) {
    let body = {
      email: email
    }
    this.userService.sendPassword(body).subscribe({
      next: () => {
      }
    })
  }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      this.router.navigate(['/login'])
    }
  }

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
  }

}
