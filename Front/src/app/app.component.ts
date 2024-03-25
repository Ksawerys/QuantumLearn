import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MatMenuModule} from "@angular/material/menu";
import {ToastModule} from "primeng/toast";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatMenuModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  constructor(public router: Router) {}


  isLoginOrRegister(): boolean {
    const url = this.router.url;
    return url.includes('/login') ;
  }
  title = 'front';
}
