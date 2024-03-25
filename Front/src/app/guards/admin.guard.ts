// import {CanActivateFn, Router} from '@angular/router';
// import {ToolsService} from "../services/tools.service";
// import {inject} from "@angular/core";
// import {UserSessionStorage} from "../interfaces/interfaz-user";

// export const adminGuard: CanActivateFn = (route, state) => {
//   const router: Router = inject(Router);
//   let authGuard: boolean = false
//   let token = sessionStorage.getItem("token")
//   let user: UserSessionStorage | null
//   if (token) {
//     user = inject(ToolsService).getUsuarioSession(token)
//     if (user?.roles[0].roles.some(rol => rol.name === 'admin')) {
//       authGuard = true
//     }
//   }
//   return authGuard || router.navigate(['/inicio']);
// };
