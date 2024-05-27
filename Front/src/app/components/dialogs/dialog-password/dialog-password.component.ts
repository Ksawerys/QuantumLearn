import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import { LoginComponenteComponent } from '../../auth-components/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingSpinnerComponent } from '../../notifications-components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dialog-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './dialog-password.component.html',
  styleUrl: './dialog-password.component.scss',
})
export class DialogPasswordComponent {
  visible = false;
  emailRecovery = true;
  sentCode = false;
  newPassword = false;
  dialog=false;

  email = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')])
  durationInSeconds = 5;

  constructor() {}

  open(): void {
    this.dialog = true;
    setTimeout(() => {
      this.visible = true;
    });    
  }
}
