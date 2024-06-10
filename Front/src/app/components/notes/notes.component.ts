import { Component, ElementRef, ViewChild, HostListener, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Note, NoteTag } from '../../interfaces/interface-note';
import { DialogNoteComponent } from '../dialogs/dialog-note/dialog-note.component';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../../services/note.service';
import { ToolsService } from '../../services/tool.service';
import { HttpResponse } from '@angular/common/http';
import { ParseJsonPipe } from '../../pipes/parse-json.pipe';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [DragDropModule,FormsModule,RouterLink, DialogNoteComponent, ParseJsonPipe, MatIcon, ParseJsonPipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit,AfterViewInit  {
  noteDialogVisible = false;
  active_search=false
  dropdownVisible1 = false;
  dropdownVisible2 = false;
  notes: Note[] = []; 
  categories: string[] = []; 
  notesByCategory: Note[] = [];
  selectedCategory: string | null = null;
  selectedNote?: Note;
  userId: number = 0;
  filterBy?: string;
  colors: string[] = []; 
  reverseOrder:boolean=false;
  @ViewChild('dropdown1') dropdown1!: ElementRef;
  @ViewChild('dropdown2') dropdown2!: ElementRef;
  @ViewChild('dialogNote') dialogNote!: DialogNoteComponent;

  constructor(private dialog: MatDialog, private noteService: NoteService, private toolsService: ToolsService, private renderer: Renderer2) { }  

  ngOnInit() {
    this.colors = this.noteService.getColors();
    const token = sessionStorage.getItem('token'); 
    if (token && !this.toolsService.isTokenExpired(token)) { 
      const userSession = this.toolsService.getUsuarioSession(token); 
      if (userSession) {
        this.userId = userSession.uid;
        console.log(this.userId);
        this.noteService.getUserNotes(this.userId).subscribe((response: any) => { 
          this.notes = response.body && response.body.data ? response.body.data : [];
          console.log(response);
          console.log(this.notes);
          if (Array.isArray(this.notes)) {
            this.categories = Array.from(new Set(([] as Array<string | undefined>).concat(...this.notes.map(note => 
              note.NoteTags ? note.NoteTags.map(tag => tag.Tag?.name) : [])).filter((tag): tag is string => tag !== undefined)));
              this.notesByCategory = this.notes;
            const filterBy = localStorage.getItem('Filterby');
            if (filterBy && filterBy !== '') {
                this.filterNotesByCategory(filterBy);
            }
            const orderBy = localStorage.getItem('OrderBy');
            if (orderBy && orderBy !== '') {
                if (orderBy === 'sortNotesByCreatedAt') {
                    this.sortNotesByCreatedAt();
                } else if (orderBy === 'sortNotesByUpdatedAt') {
                    this.sortNotesByUpdatedAt();
                } else if (orderBy === 'sortNotesByStartDate') {
                    this.sortNotesByStartDate();
                } else if (orderBy === 'sortNotesByEndDate') {
                    this.sortNotesByEndDate();
                } else if (orderBy === 'sortNotesByPriority') {
                    this.sortNotesByPriority();
                } else if (orderBy === 'sortNotesByGrade') {
                    this.sortNotesByGrade();
                }
            }
            const reverseOrder = localStorage.getItem('Reverse');
            if (reverseOrder && reverseOrder !== 'false') {
                this.reverseNotesOrder();
            }
          }
        });
      }
    }
  }
//revisar hasta que putno es necesario el event.stopPropagation() para que no se propague al elemento padre
deleteNote(event: Event, note: Note) {
  event.stopPropagation(); 
  this.noteService.deleteNote(note.id!).subscribe(
    response => {
      console.log(response);
      this.notes = this.notes.filter(n => n.id !== note.id);
      this.notesByCategory = this.notesByCategory.filter(n => n.id !== note.id);
    },
    error => {
      console.error(error);
    }
  );
}

getNoteTagStyle(note_tag: NoteTag) {
  return {
    'background-color': note_tag && note_tag.Tag && note_tag.Tag.id ? this.colors[note_tag.Tag.id % this.colors.length] : 'defaultColor'
  };
}

 // No queria hacer de categoria una interfaz ya que solo se utiliza aqui. Asique le deoy un "id" con esta funcion
  generateUniqueKey(value: string): string {
    return value.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), '');
  }

  addContent(newNote: Note) {
    const noteIndex = this.notesByCategory.findIndex(note => note.id === newNote.id);

    if (noteIndex !== -1) {
      console.log(newNote.id!)
      console.log("dddddddd"+noteIndex)
      this.notesByCategory[noteIndex] = newNote;
    } else {
      console.log("aaaaaaaaaaaaa")
      this.notesByCategory.unshift(newNote);
    }
  }
  filterNotes(searchText: string) {
    this.notesByCategory = this.notes.filter(note =>
        note.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        note.description?.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
  resetFiltersAndOrder() {
    this.sortNotesByUpdatedAt(); 
    this.filterNotesByCategory(null)
    if (this.reverseOrder == true) {
        this.reverseNotesOrder();
    }
  }

  filterNotesByCategory(category: string | null) {
    this.selectedCategory = category;
    console.log(category);
    if (category) {
      this.notesByCategory = this.notes.filter(note => note.NoteTags && note.NoteTags.some(tag => tag.Tag?.name === category));
      localStorage.setItem('Filterby', category);
      console.log("vvvvvv");  
    } else {
      this.notesByCategory = this.notes;
      localStorage.setItem('Filterby', '');  
      console.log("zdfvdfvzfvdfv");  
    }
  }

  sortNotesByCreatedAt() {
    this.notesByCategory.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });
    localStorage.setItem('OrderBy', "sortNotesByCreatedAt");
  }
  
  sortNotesByUpdatedAt() {
    this.notesByCategory.sort((a, b) => {
      if (a.updatedAt && b.updatedAt) {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }
      return 0;
    });
    localStorage.setItem('OrderBy', '');
  }

  sortNotesByStartDate() {
    this.notesByCategory.sort((a, b) => {
        const aStartDate = a.NoteTags?.find(tag => tag.Tag?.name === 'Start date')?.data;
        const bStartDate = b.NoteTags?.find(tag => tag.Tag?.name === 'Start date')?.data;

        if (aStartDate && bStartDate) {
            return new Date(JSON.parse(aStartDate).data).getTime() - new Date(JSON.parse(bStartDate).data).getTime();
        }
        return aStartDate ? -1 : 1;
    });
    localStorage.setItem('OrderBy', "sortNotesByStartDate");
  } 

  sortNotesByEndDate() {
      this.notesByCategory.sort((a, b) => {
          const aEndDate = a.NoteTags?.find(tag => tag.Tag?.name === 'End date')?.data;
          const bEndDate = b.NoteTags?.find(tag => tag.Tag?.name === 'End date')?.data;

          if (aEndDate && bEndDate) {
              return new Date(JSON.parse(aEndDate).data).getTime() - new Date(JSON.parse(bEndDate).data).getTime();
          }
          return aEndDate ? -1 : 1;
      });
      localStorage.setItem('OrderBy', "sortNotesByEndDate");
  }

  sortNotesByPriority() {
      this.notesByCategory.sort((a, b) => {
          const aPriority = a.NoteTags?.find(tag => tag.Tag?.name === 'Priority')?.data;
          const bPriority = b.NoteTags?.find(tag => tag.Tag?.name === 'Priority')?.data;

          if (aPriority && bPriority) {
              return Number(JSON.parse(bPriority).data) - Number(JSON.parse(aPriority).data);
          }
          return aPriority ? -1 : 1;
      });
      localStorage.setItem('OrderBy', "sortNotesByPriority");
  }

  sortNotesByGrade() {
      this.notesByCategory.sort((a, b) => {
          const aGrade = a.NoteTags?.find(tag => tag.Tag?.name === 'Grade')?.data;
          const bGrade = b.NoteTags?.find(tag => tag.Tag?.name === 'Grade')?.data;

          if (aGrade && bGrade) {
              return Number(JSON.parse(bGrade).data) - Number(JSON.parse(aGrade).data);
          }
          return aGrade ? -1 : 1;
      });
      localStorage.setItem('OrderBy', "sortNotesByGrade");
  }

  reverseNotesOrder() {
    this.reverseOrder= !this.reverseOrder
    this.notesByCategory.reverse();
    localStorage.setItem('Reverse', this.reverseOrder.toString());
  }

  ngAfterViewInit() {
    this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.dropdown1.nativeElement.contains(event.target)) {
        this.dropdownVisible1 = false;
      }
      if (!this.dropdown2.nativeElement.contains(event.target)) {
        this.dropdownVisible2 = false;
      }
    });
  }

  openDialogNote(note?:Note) { 
    console.log('dialogCreateNote');  
    this.selectedNote = {} as Note;
    console.log("dialogCreateNote", note?.NoteTags, note);
    this.dialogNote.getNote(this.userId,note);
    console.log("id"+note?.id);
  }
}
