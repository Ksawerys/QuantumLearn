import { CanActivateFn } from '@angular/router';

export const accesGuard: CanActivateFn = (route, state) => {
  return true;
};
