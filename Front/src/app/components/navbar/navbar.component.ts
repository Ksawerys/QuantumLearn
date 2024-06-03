import { Component } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor( private router: Router) {}

}
