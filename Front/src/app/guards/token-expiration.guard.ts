// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { ToolsService } from '../services/tool.service';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogConfirmacionComponent } from '../componentes/dialogos/dialog-confirmacion/dialog-confirmacion.component';
// import { Router } from '@angular/router';

// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private toolsService: ToolsService, private dialog: MatDialog, private router: Router) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.toolsService.getTokenFromSessionStorage();

//     if (token) {
//       if (this.toolsService.isTokenExpired(token)) {
//         const data = { mensaje: 'Su sesión a expirado. ¿Quieres volver a iniciar sesión?' }
//         const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
//           data
//         });

//         dialogRef.afterClosed().subscribe(result => {
//           if (result) {
//             sessionStorage.removeItem('token');
//             this.router.navigate(['/login']);
//           } else {
//             sessionStorage.removeItem('token');
//             this.router.navigate(['/inicio']);
//             location.reload();
//           }
//         });

//         return throwError('Token has expired');
//       } else if (this.toolsService.isTokenExpiringSoon(token)) {
//         // Renueva el token si está cerca de su tiempo de expiración
//         this.toolsService.renewToken().subscribe(newToken => {
//           sessionStorage.setItem('token', newToken);
//         });
//       }
//     }

//     return next.handle(request);
//   }
// }
// const jwt = require('jsonwebtoken');

// // Cuando creas el token
// function createToken(user, userAgent, ip) {
//   const payload = {
//     userId: user.id,
//     userAgent: userAgent,
//     ip: ip
//   };

//   return jwt.sign(payload, 'your-secret-key');
// }

// // Cuando verificas el token
// function verifyToken(token, userAgent, ip) {
//   const payload = jwt.verify(token, 'your-secret-key');

//   if (payload.userAgent !== userAgent || payload.ip !== ip) {
//     throw new Error('Token is not valid');
//   }

//   return payload;
// }