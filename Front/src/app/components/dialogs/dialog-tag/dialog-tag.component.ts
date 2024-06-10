import { Component, Input, OnInit } from '@angular/core';
import { NoteTag, Tag } from '../../../interfaces/interface-note';
import { NoteService } from '../../../services/note.service';
import { MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TagService } from '../../../services/tag.service';
import { ServerResponse } from '../../../interfaces/interface-server';
import { HttpResponse } from '@angular/common/http';
import { ParseJsonPipe } from '../../../pipes/parse-json.pipe';

//al ser tipos distintos de formularios e inputs y al ser un valor json lo que manejo he utilizado diferentes formas para recoger y enviar los datos buscando la que mejor funcionaba para cada uno.

@Component({
  selector: 'app-dialog-tag',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule, MatDatepicker, MatNativeDateModule, ReactiveFormsModule, MatIcon, MatSliderModule, MatCardModule,ParseJsonPipe],
  templateUrl: './dialog-tag.component.html',
  styleUrl: './dialog-tag.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogTagComponent implements OnInit {
  open = false
  colors: string[] = [];
  selectedNoteTag?: NoteTag;
  content?: string | Date | boolean | number;
  contentHasChanges = false;
  visibleAddTag = true;
  tags: Tag[] = [];
  selectedDate : Date = new Date();
  sliderValue = new FormControl(4);
  data:string=""
  @Input() note_tags: NoteTag[] = [];
  @Input() noteId: number | null = null;

  constructor(private noteService: NoteService, private formBuilder: FormBuilder, private tagService: TagService) {
  }

  validateInput(event: any) {
    const pattern = new RegExp(/^[1-9](\.\d{0,2})?$/g);
    let inputChar = event.target.value + String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onInputChange(value: string) {
    this.data = value;
    this.contentHasChanges = true;
  }
  ngOnInit() {
    this.colors = this.noteService.getColors();
    console.log(this.note_tags)
    this.getAvailableTags()
  }
  noteTagStringParseData() {
    console.log('sdrgasdfgas',this.selectedNoteTag,this.parseJson(this.selectedNoteTag?.data ? this.selectedNoteTag.data : '{"data":""}') )
    this.data=this.parseJson(this.selectedNoteTag?.data ? this.selectedNoteTag.data : '{"data":""}')
  }
  selectedDateValue() {
    this.selectedDate=this.parseJson(this.selectedNoteTag?.data ? this.selectedNoteTag.data : '{"data":""}')
  }

  sliderValueData() {
    this.data=this.parseJson(this.selectedNoteTag?.data ? this.selectedNoteTag.data : '{"data":""}')
  }

  gradeInputValue() {
    this.data=this.parseJson(this.selectedNoteTag?.data ? this.selectedNoteTag.data : '{"data":""}')
  }

  parseJson(data: string): any {
    console.log('sdrgdfgsdfgsdfg', this.selectedNoteTag)
    try {
        console.log('parseJson', data);
        const parsedData = JSON.parse(data);
        console.log('parseJson2', parsedData.data);
        return parsedData.data;
    } catch (error) {
        console.error('Invalid JSON:', data);
        return null;
    }
  }

  saveDateTag(content:Date){
    const formattedDate = content.toISOString().split('T')[0];
    this.saveTag(formattedDate);
  }

  saveTag(content: string | null | undefined) {
    let formattedContent = content ? JSON.stringify({data: content}) : null; 

    if (this.selectedNoteTag && content) {
      this.selectedNoteTag.data = content;
    }
    console.log("start savetag", this.selectedNoteTag, content)
    if (this.selectedNoteTag && this.selectedNoteTag?.data != null && this.noteId !== null && this.selectedNoteTag?.Tag?.id && formattedContent && this.selectedNoteTag) {
      if (this.selectedNoteTag.id) {
        console.log("modifyNoteTag savetag", this.selectedNoteTag.id);
        this.tagService.modifyNoteTag(this.selectedNoteTag.id, this.selectedNoteTag.data || '')
          .subscribe((response: HttpResponse<ServerResponse>) => {
            console.log("modifyNoteTag savetag", response);
            let noteTagToUpdate = this.note_tags.find(noteTag => noteTag.id === this.selectedNoteTag!.id);
            if (noteTagToUpdate) {
              noteTagToUpdate.data = formattedContent;
            }
          });
      } else {
        console.log("createNoteTag savetag", this.selectedNoteTag.id);
        this.tagService.createNoteTag(this.noteId, this.selectedNoteTag.Tag?.id, this.selectedNoteTag.data || '')
          .subscribe((response: HttpResponse<ServerResponse>) => {
            console.log("createNoteTag savetag", response);
            this.selectedNoteTag!.id = response.body!.data!.id;
            this.selectedNoteTag!.data = formattedContent;
            this.note_tags.push(this.selectedNoteTag!);
            console.log("createNoteTag savetag", this.selectedNoteTag);
            this.selectedNoteTag = undefined;
          });
      }

    }

    this.visibleAddTag = false;
  }

  getAvailableTags() {
    this.tagService.getTags().subscribe(response => {
      let allTags = response.body && response.body.data ? response.body.data : [];
      let noteTagIds = this.note_tags.map(noteTag => noteTag.Tag?.id);
      this.tags = allTags.filter(tag => !noteTagIds.includes(tag.id));
    });
    console.log('------',this.tags,this.open,this.visibleAddTag)
    this.visibleAddTag = true
  }

  formatLabel(value: number): string {
    let label = '';
    if (value == 1) {
      label = 'Low';
    } else if (value == 2) {
      label = 'Medium';
    } else if (value == 3) {
      label = 'High';
    } else if (value == 4) {
      label = 'Critical';
    } else if (value == 5) {
      label = 'Urgent';
    }
    return `${label}`;
  }

  onDateChange(event: MatDatepickerInputEvent<any>) {
    const value = event.value;
    this.content = value;
  }


  getNoteTagStyle(note_tag: NoteTag) {
    return {
      'background-color': note_tag && note_tag.Tag && note_tag.Tag.id ? this.colors[note_tag.Tag.id % this.colors.length] : 'defaultColor'
    };
  }

  getTagStyle(tag: Tag) {
      return {
        'background-color': tag && tag.id ? this.colors[tag.id % this.colors.length] : 'defaultColor'
      };
  }


  selectTag(note_tag: NoteTag) {
    this.selectedNoteTag = note_tag;
    switch (note_tag.Tag?.type) {
      case 'string':
        console.log('string',note_tag.Tag?.type)
        this.noteTagStringParseData();
        break;
      case 'date':
        console.log('date',note_tag.Tag?.type)
        this.selectedDateValue();
        break;
      case 'priority':
        console.log('priority',note_tag.Tag?.type)
        this.sliderValueData();
        break;
      case 'grade':
        console.log('grade',note_tag.Tag?.type)
        this.gradeInputValue();
        break;
    }
    this.visibleAddTag = false;
  }

  selectNewTag(tag: Tag) {
    this.visibleAddTag = false;
    this.selectedNoteTag = {
      Tag: tag,
    };
    if (this.selectedNoteTag != null) {
      console.log(this.selectedNoteTag)
    }
    console.log(this.selectedNoteTag)
  }
}

