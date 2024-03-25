import { Injectable } from '@angular/core';
import { UserSessionStorage } from "../../app/interfaces/interfaz-user";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  //JavierMorales y JavierVelasco
  constructor() { }
  toUpperCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  capitalizeFirstLetters(string: string): string {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  getUsuarioSession(token: string) : UserSessionStorage | null{
    return jwtDecode(token)
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    //Se comprueba que exista exp para posteriormente poder entrar en el atributo que contiene la fecha de expiracion
    if (decodedToken && 'exp' in decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
      return true;
    }
    return false;
  }
}
