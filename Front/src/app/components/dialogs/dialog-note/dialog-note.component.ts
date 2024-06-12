import { Component, Input, Output, EventEmitter, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Note, NoteTag, Tag } from '../../../interfaces/interface-note';
import { NoteService } from '../../../services/note.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolsService } from '../../../services/tool.service';
import { InterfaceServerNote } from '../../../interfaces/interface-server';
import { HttpResponse } from '@angular/common/http';
import anime from 'animejs/lib/anime.es.js';
import { DialogTagComponent } from '../dialog-tag/dialog-tag.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { ParseJsonPipe } from '../../../pipes/parse-json.pipe';

@Component({
  selector: 'app-dialog-note',
  standalone: true,
  imports: [ReactiveFormsModule, DialogTagComponent, MatIcon,ParseJsonPipe],
  templateUrl: './dialog-note.component.html',
  styleUrl: './dialog-note.component.scss'
})
export class DialogNoteComponent implements OnInit {
  @Output() noteCreated = new EventEmitter<Note>();
  note: Note = {} as Note;
  visibility = false;
  visibilityTagDialog = false;
  token = sessionStorage.getItem('token');
  userId : number | null = null;
  noteForm!: FormGroup;
  titleControl!: FormControl;
  descriptionControl!: FormControl;
  colors: string[] = [];
  emptyNote = true
  @ViewChild('dialogTag') dialogTag!: DialogTagComponent;
  @ViewChild('noteDescription', { static: false }) noteElement!: ElementRef;

  constructor(private noteService: NoteService, private toolsService: ToolsService, private el: ElementRef, private renderer: Renderer2) { 
    this.noteForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
    this.titleControl = this.noteForm.get('title') as FormControl;
    this.descriptionControl = this.noteForm.get('description') as FormControl;
  }
  
  ngOnInit(): void {
    this.colors = this.noteService.getColors();
    const token = sessionStorage.getItem('token'); 
    if (token && !this.toolsService.isTokenExpired(token)) { 
      const userSession = this.toolsService.getUsuarioSession(token); 
      if (userSession) {
        this.userId = userSession.uid
      }
    }
    setTimeout(() => this.setupAutoExpand());
  
    combineLatest([
      this.titleControl.valueChanges,
      this.descriptionControl.valueChanges
    ])
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(([title, description]) => {
        console.log('wrqwerqwerqwer',this.note);
        if (!title && !description) {
          console.log('Cannot create or update note with empty title and description');
          return of(null);
        }
        if (this.note.id != null && this.note.id != undefined) {
          console.log('updateNote');
          return this.noteService.updateNote(this.note.id, { title, description });
        } else if (this.note.id == null || this.note.id == undefined) {
          console.log('create note' + this.note.id);
          return this.noteService.createNote(this.userId!, { title, description, tags: [] });
        }
        return of(null);
      })
    )
    .subscribe((response: HttpResponse<InterfaceServerNote> | null) => {
      if (response) {
        this.note={}
        if (response.body && response.body.data) {
          const note: Note = response.body.data;
          this.note = note
          this.emptyNote=false
          console.log('note1', note);
          console.log('note2', response.body);
          console.log('note3', response.body.data);
          console.log('note4',this.note);
        }
      }
    });
  }

  getNoteTagStyle(note_tag: NoteTag) {
    return {
      'background-color': note_tag && note_tag.Tag && note_tag.Tag.id ? this.colors[note_tag.Tag.id % this.colors.length] : 'defaultColor'
    };
  }

  setupAutoExpand() {
    let textarea = this.el.nativeElement.querySelector('textarea.note-description');
    this.renderer.listen(textarea, 'input', (event) => {
      let scrollHeight = event.target.scrollHeight;
      anime({
        targets: event.target,
        height: [anime.get(event.target, 'height'), scrollHeight + 'px'],
        duration: 200,
        easing: 'linear'
      });
    });
  }

  adjustSize(element: any) {
    const text = this.noteForm.get('description')?.value || '';
    const numberOfCharacters = text.length;
    const charactersPerLine = 50; // This is an estimate, adjust as needed
    const lineHeight = 20; // This is an estimate, adjust as needed
    const numberOfLines = Math.ceil(numberOfCharacters / charactersPerLine);
    const newHeight = numberOfLines * lineHeight;
    element.style.height = newHeight + 'px';
  }

  getNote(userId: number, note?: Note) {
    this.userId = userId;
    if (note) {
      this.note = note;
      console.log('noentoen',userId,  this.note.NoteTags);
      this.noteForm.patchValue({
        title: note.title || '',
        description: note.description || ''
      });
      setTimeout(() => {
        this.adjustSize(this.noteElement.nativeElement);
        this.visibility = true
      });
    }else{
      this.emptyNote=true
    }
  }

  //cambiar para que no tener que hacer esta memez
  getNoteId(note: Note, userId: number) {
    return note.id ? note.id : userId;
  }

  getRequestBody(noteForm: any, note: Note) {
    if (Object.values(this.noteForm.controls).every(control => control.value === '')) {
      this.visibility = false
      return null;
    }

    const body: { id?: number, container_note_id?: number, title: string, description: string, tags: NoteTag[] } = {
      title: noteForm.value.title,
      description: noteForm.value.description,
      tags: []
    };

    if (note.id) {
      body.id = note.id;
    }

    if (note.container_note_id) {
      body.container_note_id = note.container_note_id;
    }

    if (note.NoteTags) {
      body.tags = note.NoteTags;
    }


    return body;
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  dataDialogTag() {
    console.log('----dataDialogTag',this.note.NoteTags);

    if (this.dialogTag && this.note) {
      this.dialogTag.note_tags = this.note.NoteTags || [];
      this.dialogTag.noteId = this.note.id || null;
    }
    console.log('dataDialogTag',this.note);
    console.log('dataDialogTag',this.note.NoteTags);
    console.log('dataDialogTag',this.note.id);
    this.dialogTag.getAvailableTags();
  }

  saveNote() {
    if (this.userId) {
      const userId = this.userId;
      const noteId = this.getNoteId(this.note, userId);
      const body = this.getRequestBody(this.noteForm, this.note);
      console.log("body" + body);

      this.dialogTag.open = false; 
      this.visibility = false
      this.visibilityTagDialog= false
      if (body?.description == null && body?.title == null && (body?.tags == null || body?.tags.length === 0)) {
        return;
      }


      if (this.note.id) {
        this.noteForm.reset();
        this.noteService.updateNote(noteId, body).subscribe((response: HttpResponse<InterfaceServerNote>) => {
          this.note = {}
          if (response && response.body && response.body.data) {
            const note: Note = response.body.data;
            this.noteCreated.emit(note);
          }
        });
      } else {
        this.noteForm.reset();
        this.noteService.createNote(noteId, body).subscribe((response: HttpResponse<InterfaceServerNote>) => {
          this.note = {}
          if (response && response.body && response.body.data) {
            const note: Note = response.body.data;
            this.noteCreated.emit(note);
          }
        });
      }
    }
  }
}