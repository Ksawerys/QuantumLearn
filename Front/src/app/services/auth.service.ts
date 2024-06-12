import { Injectable } from '@angular/core';
import { User, UserAccess } from '../interfaces/interface-user';
import { env } from "../../../src/enviroments/enviroment";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(body: User): Observable<HttpResponse<UserAccess>> {
    return this.http.post<UserAccess>(`${env.URL}user/register`, body, { observe: 'response' as 'response' });
  }

  login(body: User): Observable<HttpResponse<UserAccess>> {
    return this.http.post<UserAccess>(`${env.URL}user/login`, body, { observe: 'response' as 'response' });
  }

  sendPassword(body: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(env.URL + 'usuario/user/password', body, { observe: 'response' as 'response' })
  }

  updateProfile(id: number, formData: FormData): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${env.URL}user/upload/${id}`, formData, { observe: 'response' as 'response',      params: { image: true, auth: 1 }
    });
}

  updateProfileImage(body: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(env.URL + 'user/update/image', body, { observe: 'response' as 'response' })
  }

  handleCredentialResponse(body: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(env.URL + 'user/google', body, { observe: 'response' as 'response' });
  }

  getUser(id: number): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${env.URL}user/${id}`, { observe: 'response' as 'response' });
  }

}
