import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { FooterComponent } from '../shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    MatIcon,
    RouterLink,
    FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  link = '';

  
  constructor(private el: ElementRef, private renderer: Renderer2, private router:Router) {}

ngAfterViewInit() {
  this.link = sessionStorage.getItem('token') ? '/profile' : '/login';
  const body = this.el.nativeElement.ownerDocument.body;
  const input = this.el.nativeElement.querySelector('.day-night input');

  if (input) {
    input.addEventListener('change', () => {
      if (body.classList.contains('light')) {
        this.renderer.removeClass(body, 'light');
      } else {
        this.renderer.addClass(body, 'light');
      }
    });
  }
}

}
