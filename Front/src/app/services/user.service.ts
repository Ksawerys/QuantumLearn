import { Injectable } from '@angular/core';
import { User, UserAccess } from '../interfaces/interface-user';
import { env } from "../../../src/enviroments/enviroment";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }



}
