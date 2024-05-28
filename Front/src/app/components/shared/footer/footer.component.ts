import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
termsActive=false
contactActive=false

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
    this.termsActive = false;
    this.contactActive = false;
}

onTermsButtonClick(event: MouseEvent) {
  event.stopPropagation();
  this.termsActive = !this.termsActive;
}
onContactButtonClick(event: MouseEvent) {
  event.stopPropagation();
  this.contactActive = !this.contactActive;
}
}
