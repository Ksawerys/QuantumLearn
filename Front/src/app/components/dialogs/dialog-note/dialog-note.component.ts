import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../../interfaces/interface-note'; 

@Component({
  selector: 'app-dialog-note',
  standalone: true,
  imports: [],
  templateUrl: './dialog-note.component.html',
  styleUrl: './dialog-note.component.scss'
})
export class DialogNoteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note
  ) { }
}
