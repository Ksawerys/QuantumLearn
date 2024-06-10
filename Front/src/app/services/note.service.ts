import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note, NoteTag, Tag } from '../interfaces/interface-note';
import { Observable } from 'rxjs';
import { env } from '../../enviroments/enviroment';
import { InterfaceServerNote } from '../interfaces/interface-server';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private colors = ['#8bfff7', '#17776e', '#08b9e2', '#abff98', '#48b130', '#0281de', '#48d268', '#8bd0ff', '#37c19d', '#00365d',];

  constructor(private http: HttpClient) { }

  getUserNotes(userId: number): Observable<HttpResponse<Note[]>> {
    return this.http.get<Note[]>(`${env.URL}note/user/${userId}`, { observe: 'response' as 'response' });
  }

  createNote(userId: number, body: { container_note_id?: number, title: string, description: string, tags?: NoteTag[] }): Observable<HttpResponse<InterfaceServerNote>> {
    return this.http.post<InterfaceServerNote>(`${env.URL}note/${userId}`, body, { observe: 'response' as 'response' });
  }

  updateNote(noteId: number, body: { title: string, description: string }): Observable<HttpResponse<InterfaceServerNote>> {
    return this.http.put<InterfaceServerNote>(`${env.URL}note/${noteId}`, body, { observe: 'response' as 'response' });
  }

  deleteNote(noteId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${env.URL}note/${noteId}`, { observe: 'response' as 'response' });
  }

  getColors() {
    return this.colors;
  }

}
