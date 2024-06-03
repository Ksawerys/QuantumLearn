import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note, Tag } from '../interfaces/interface-note';
import { Observable } from 'rxjs';
import { env } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getUserNotes(userId: number): Observable<HttpResponse<Note[]>> {
    return this.http.get<Note[]>(`${env.URL}note/user/${userId}`, { observe: 'response' as 'response' });
  }

  createNote(noteId: number, body: { container_note_id: string, title: string, description: string, tags: Tag[] }): Observable<HttpResponse<Note>> {
    return this.http.post<Note>(`${env.URL}note/${noteId}`, body, { observe: 'response' as 'response' });
  }

  updateNote(noteId: number, body: { title: string, description: string }): Observable<HttpResponse<Note>> {
    return this.http.put<Note>(`${env.URL}note/${noteId}`, body, { observe: 'response' as 'response' });
  }

  deleteNote(noteId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${env.URL}note/${noteId}`, { observe: 'response' as 'response' });
  }
}
