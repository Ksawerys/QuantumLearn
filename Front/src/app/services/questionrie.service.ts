import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAResponse, InterfaceServerResponse, QuestionnairesResponse } from '../interfaces/interface-server';
import { Questionnaire } from '../interfaces/interface-questionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionrieService {
  private questionnaireSource = new BehaviorSubject<Questionnaire | null>(null);
  currentQuestionnaire = this.questionnaireSource.asObservable();

  constructor(private http: HttpClient) { }

  getQuestionnaires(): Observable<HttpResponse<QuestionnairesResponse>> {
    return this.http.get<QuestionnairesResponse>('http://localhost:9090/questionnaire/', { observe: 'response' as 'response' });
  }

  changeQuestionnaire(questionnaire: Questionnaire) {
    console.log('changeQuestionnaire',questionnaire)
    this.questionnaireSource.next(questionnaire);
  }

  postInsertResponse(userId: number, body: {responses: { questionId: number, choiceId?: number, response: string }[] }): Observable<HttpResponse<any>> {
    return this.http.post<any>(`http://localhost:9090/user/${userId}/response`, body, { observe: 'response' as 'response' });
  }

}

