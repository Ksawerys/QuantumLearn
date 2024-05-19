import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,MatIcon,RouterLink],
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



// ngAfterViewInit() {
//   this.renderer.listen('window', 'mousemove', (e) => {
//     const x = e.clientX;
//     const width = window.innerWidth;
//     const percentage = Math.abs(x - width / 2) / (width / 2);

//     // Define tus colores en formato RGB
//     const rgbStart = [95, 150, 74];
//     const rgbEnd = [19, 114, 138];

//     // Interpola entre los colores
//     const rgbInterpolated = rgbStart.map((start, i) => Math.round(start + percentage * (rgbEnd[i] - start)));

//     // Convierte el color interpolado a formato CSS
//     const color = `rgb(${rgbInterpolated.join(',')})`;

//     // Aplica el color a los elementos span
//     const spanElements = this.el.nativeElement.querySelectorAll('.menu-item span');
//     spanElements.forEach((span: HTMLElement) => {
//       this.renderer.setStyle(span, 'backgroundColor', color);
//     });
//   });
// }