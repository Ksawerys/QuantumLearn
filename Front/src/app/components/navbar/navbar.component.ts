import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Router } from 'express';
import { RouterLink } from "@angular/router";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor( private router: Router) {}

}
