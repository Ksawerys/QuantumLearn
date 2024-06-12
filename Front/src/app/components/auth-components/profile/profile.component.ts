import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { UserAccess, User } from "../../../interfaces/Interface-user";
import { UserService } from "../../../services/user.service";
import { HttpClient, HttpResponse, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { DialogPasswordComponent } from "../../dialogs/dialog-password/dialog-password.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Router, RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { ToolsService } from '../../../services/tool.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss', imports: [
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
    MatProgressSpinner],
  providers: []
})
export class ProfileComponent implements OnInit {
  profileUrl="./../../../assets/image/WithoutProfile.jpg"
  baseURL = ''
  hide = true
  showRegister = true;
  showRoles = false;
  selectedRoles: string[] = [];
  user?: User;
  profilePicture = new FormControl(null); 
  profileImageForm: FormGroup; 
  errorLogin!: Boolean
  errorRegistro!: Boolean
  titleError = 'Error'
  messageError = ''
  descriptionError = 'Revisa los campos introducidos, revisa la conexion y vuelve a intentarlo'
  userId=0;

  profileForm = new FormGroup({
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

  profilePictureUrl: SafeUrl = '';

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        this.profileImageForm.get('profilePicture')?.setValue(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            if (reader.result) {
                this.profilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
                this.profileImageForm.get('profilePicture')?.setValue(file);
            }
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('file', file, file.name);
        if (this.user?.id !== undefined) {
            this.authService.updateProfile(this.user?.id!, formData)
            .subscribe({
                next: (response: HttpResponse<string>) => {
                    this.openSnackBar('Imagen modificada', 'Cerrar');
                    window.location.reload();
                },
                error: (err) => {
                    this.openSnackBar('Ha ocurrido un error al modificar la imagen', 'Cerrar');
                }
            });
        }
    }
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      this.router.navigate(['/inicio'])
    }
    const token = sessionStorage.getItem('token'); 
    if (token && !this.toolsService.isTokenExpired(token)) { 
      const userSession = this.toolsService.getUsuarioSession(token); 
      if (userSession) {
        this.userId = userSession.uid;
      }
    }
    this.authService.getUser(this.userId).subscribe({
      next: (response: HttpResponse<User>) => {
        if (response.body) {
          this.user = response.body;
          this.profileForm.get('email')?.setValue(this.user.email!);
          this.profileForm.get('name')?.setValue(this.user.name!);
          this.profileForm.get('second_name')?.setValue(this.user.second_name!);
          this.profileForm.get('password')?.setValue(this.user.password!);
          this.profileForm.get('roles')?.setValue(this.user.roles!);
          this.profilePictureUrl = this.user.extension ? this.sanitizer.bypassSecurityTrustUrl(this.user.extension) : '';
        }
      },
      error: (err) => {
        this.openSnackBar('Ha ocurrido un error al cargar los datos del usuario', 'Cerrar');
      }
    });
  }

  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private sanitizer: DomSanitizer, private snackBar: MatSnackBar, private authService: AuthService,private formBuilder: FormBuilder, private toolsService: ToolsService) {
    this.profileImageForm = this.formBuilder.group({
      profilePicture: [null, Validators.required]
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  collectAndSendData(id: number, form: any): void {
    let formData = new FormData();

    for (let key in form) {
        formData.append(key, form[key]);
    }

    this.authService.updateProfile(id, formData).subscribe(response => {
    }, error => {
        console.error(error);
    });
}
}