import { CanActivateFn } from '@angular/router';

export const tokenExpirationGuard: CanActivateFn = (route, state) => {
  return true;
};
