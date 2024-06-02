import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  visible = false;
  dialog=false;

  constructor() {}

  open(): void {
    this.dialog = true;
    setTimeout(() => {
      this.visible = true;
    });    
  }
}
