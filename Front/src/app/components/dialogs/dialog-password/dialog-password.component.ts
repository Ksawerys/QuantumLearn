import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../../notifications/snackbar/snackbar.component";

@Component({
  selector: 'app-dialog-password',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-password.component.html',
  styleUrl: './dialog-password.component.css'
})
export class DialogPasswordComponent {
  email = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')])
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent,{
      duration: this.durationInSeconds * 1000,
    });
  }
}
