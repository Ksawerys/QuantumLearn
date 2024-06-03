import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Note } from '../../interfaces/interface-note';
import { DialogNoteComponent } from '../dialogs/dialog-note/dialog-note.component';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../../services/note.service';
import { ToolsService } from '../../services/tool.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [DragDropModule,FormsModule,RouterLink],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  active_search=false
  dropdownVisible1 = false;
  dropdownVisible2 = false;
  notes: Note[] = []; 
  categories: string[] = []; 
  notesByCategory: { [key: string]: Note[] } = {};

  constructor(private dialog: MatDialog, private noteService: NoteService, private toolsService: ToolsService) { }  

  ngOnInit() {
    const token = sessionStorage.getItem('token'); 
    if (token && !this.toolsService.isTokenExpired(token)) { 
      const userSession = this.toolsService.getUsuarioSession(token); 
      if (userSession) {
        const userId = userSession.uid;
        console.log(userId);
        this.noteService.getUserNotes(userId).subscribe((response: any) => { 
          this.notes = response.body && response.body.data ? response.body.data : [];
          console.log(response);
          console.log(this.notes);
          if (Array.isArray(this.notes)) {
            this.categories = Array.from(new Set(([] as Array<string | undefined>).concat(...this.notes.map(note => note.Tags ? note.Tags.map(tag => tag.name) : [])).filter((tag): tag is string => tag !== undefined)));
          
            this.notesByCategory = this.categories.reduce((obj, category) => {
              obj[category] = this.notes.filter(note => note.Tags && note.Tags.some(tag => tag.name === category));
              return obj;
            }, {} as { [key: string]: Note[] });
          }
        });
      }
    }
  }

  @ViewChild('dropdown1') dropdown1!: ElementRef;
  @ViewChild('dropdown2') dropdown2!: ElementRef;


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.dropdown1.nativeElement.contains(event.target)) {
      this.dropdownVisible1 = false;
    }
    if (!this.dropdown2.nativeElement.contains(event.target)) {
      this.dropdownVisible2 = false;
    }
  }

  openDialog(note:Note) { 
    this.dialog.open(DialogNoteComponent, {
      data: note
    });
  }
}
