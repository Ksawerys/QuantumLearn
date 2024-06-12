import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAResponse } from '../interfaces/interface-server';
import { env } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  
  getProgress(userId: number): Observable<HttpResponse<IAResponse>> {
    return this.http.get<IAResponse>(`${env.URL}statistic/acedemicResults/${userId}`, { observe: 'response' as 'response' });
  }

  getExamTags(userId: number): Observable<HttpResponse<IAResponse>> {
    return this.http.get<IAResponse>(`${env.URL}statistic/examTags/${userId}`, { observe: 'response' as 'response' });
  }
}
