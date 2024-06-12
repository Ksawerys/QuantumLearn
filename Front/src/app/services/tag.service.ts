import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../interfaces/interface-note';
import { Observable } from 'rxjs';
import { env } from '../../enviroments/enviroment';
import { InterfaceServerTags, ServerResponse } from '../interfaces/interface-server';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  
  getTags(): Observable<HttpResponse<InterfaceServerTags>> {
    return this.http.get<InterfaceServerTags>(`${env.URL}tag/`, { observe: 'response' as 'response' });
  }

  createNoteTag(idNote: number, idTag: number, data: string): Observable<HttpResponse<ServerResponse>> {
    const body = { data };
    return this.http.post<ServerResponse>(`${env.URL}tag/note/${idNote}/${idTag}`, body, { observe: 'response' as 'response' });
  }

  modifyNoteTag(noteTagId: number, data: string): Observable<HttpResponse<ServerResponse>> {
    const body = { data };
    return this.http.put<ServerResponse>(`${env.URL}tag/noteTag/${noteTagId}`, body, { observe: 'response' as 'response' });
  }

  deleteNoteTag(noteTagId: number): Observable<HttpResponse<ServerResponse>> {
    return this.http.delete<ServerResponse>(`${env.URL}tag/noteTag/${noteTagId}`, { observe: 'response' as 'response' });
  }
}
