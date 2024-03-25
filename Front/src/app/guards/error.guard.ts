import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationStart } from '@angular/router';
import { Observable} from 'rxjs';
import { filter } from 'rxjs/operators';
//TODO: quitar clase
@Injectable({
  providedIn: 'root'
})
export class ErrorGuard {
  private lastNavigationOriginatedInternally = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.lastNavigationOriginatedInternally = event.navigationTrigger === 'imperative';
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    if (this.lastNavigationOriginatedInternally || state.url !== '/error') {
      return true;
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
