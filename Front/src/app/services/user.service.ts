import { Injectable } from '@angular/core';
import {User, UserAccess} from '../interfaces/interfaz-user';
import {env} from "../../../src/enviroments/enviroment";
import {Observable } from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  register(body: User): Observable<HttpResponse<UserAccess>> {
    return this.http.post<UserAccess>(`${env.URL}api/register`, body, {observe:'response' as 'response'});
  }

  login(body: User): Observable<HttpResponse<UserAccess>> {
    return this.http.post<UserAccess>(`${env.URL}api/login`, body, {observe:'response' as 'response'});
  }

  sendPassword(body: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(env.URL + 'usuario/send/password', body, { observe: 'response' as 'response' })
  }

}
