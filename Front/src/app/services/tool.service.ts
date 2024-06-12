import { Injectable } from '@angular/core';
import { UserSessionStorage } from "../interfaces/Interface-user";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
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
  getUsuarioSession(token: string): UserSessionStorage | null {
    return jwtDecode(token)
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;


    if (decodedToken && 'exp' in decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
      return true;
    }
    return false;
  }
  getTokenFromSessionStorage(): string | null {
    return sessionStorage.getItem('token');
  }

  getUserIdFromToken(token: string): number | null {
    let userSession = null;
    if (token && !this.isTokenExpired(token)) { 
      userSession = this.getUsuarioSession(token); 
    }
    return userSession ? userSession.uid : null;
  }
}
