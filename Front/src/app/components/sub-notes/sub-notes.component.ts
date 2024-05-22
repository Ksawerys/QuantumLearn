import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-notes',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './sub-notes.component.html',
  styleUrl: './sub-notes.component.scss'
})
export class SubNotesComponent {
  active_search=false
  dropdownVisible1 = false;
  dropdownVisible2 = false;

  notes = [
    {content: 'Note 1'},
    {content: 'Note 2'},
    {content: 'Note 3'},
    {content: 'Note 4'},
    {content: 'Note 5'},
  ];
  categories = [
    {content: 'Dropdown 1'},
    {content: 'Dategorie 2'},
    {content: 'Categorie 3'},
    // ...
  ];

  @ViewChild('dropdown1') dropdown1!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.dropdown1.nativeElement.contains(event.target)) {
      this.dropdownVisible1 = false;
    }
  }
}
