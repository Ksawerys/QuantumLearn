import { HttpInterceptorFn } from '@angular/common/http';
//TODO: hacer que salga una notificación de error
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
