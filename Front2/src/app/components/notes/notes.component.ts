import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [DragDropModule,FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  active_search=false

  notes = [
    {content: 'Note 1'},
    {content: 'Note 2'},
    {content: 'Note 3'},
    {content: 'Note 4'},
    {content: 'Note 5'},
  ];
  categories = [
    {content: 'categorie 1'},
    {content: 'categorie 2'},
    {content: 'categorie 3'},
    // ...
  ];

  @ViewChild('searchBox') searchBox!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.searchBox.nativeElement === event.target || this.searchBox.nativeElement.contains(event.target)) {
        this.active_search = true;
    } else {
        this.active_search = false;
    }
  }


  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  // }


}
