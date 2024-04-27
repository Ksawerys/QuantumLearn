import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { MatIcon } from "@angular/material/icon";
;
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
