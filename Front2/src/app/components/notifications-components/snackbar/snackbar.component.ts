import {Component, inject} from '@angular/core';
import {MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    MatSnackBarAction,
    MatButton,
    MatSnackBarActions,
    MatSnackBarLabel
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
