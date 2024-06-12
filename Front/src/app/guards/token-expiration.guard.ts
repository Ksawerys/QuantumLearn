import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToolsService } from '../services/tool.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationGuard implements CanActivate {
  constructor(private toolsService: ToolsService, private dialog: MatDialog, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.toolsService.getTokenFromSessionStorage();

    if (token && this.toolsService.isTokenExpired(token)) {
      sessionStorage.removeItem('token');
      this.router.navigate(['/home']);
      console.log('Token has expired');
      return false;
    }

    return true;
  }
}