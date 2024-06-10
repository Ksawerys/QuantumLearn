import { Component, OnInit } from '@angular/core';
import { QuestionrieService } from '../../services/questionrie.service';
import { Questionnaire } from '../../interfaces/interface-questionnaire';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToolsService } from '../../services/tool.service';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [MatSliderModule, RouterLink, ReactiveFormsModule],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent implements OnInit {
  sliderValue = new FormControl(0);
  form: FormGroup;
  questionnaire: Questionnaire | null = null;
  userId: number = 0;
  constructor(private questionrieService: QuestionrieService, private fb: FormBuilder, private toolsService: ToolsService) { 
    this.form = this.fb.group({
      questions: this.fb.array([])
    });
  } 

  ngOnInit() {
    const token = sessionStorage.getItem('token'); 
    console.log('Token from session storage:', token);
    if (token && !this.toolsService.isTokenExpired(token)) { 
      console.log('Token is valid and not expired');
      const userSession = this.toolsService.getUsuarioSession(token); 
      console.log('User session:', userSession);
      if (userSession) {
        this.userId = userSession.uid;
        console.log('User ID:', this.userId);
      }
    }
  
    this.questionrieService.currentQuestionnaire.subscribe(questionnaire => {
      console.log('Received questionnaire:', questionnaire);
      if (questionnaire) { 
        this.questionnaire = questionnaire;
  
        if (this.questionnaire && this.questionnaire.Questions) {
          console.log('Questionnaire has questions:', this.questionnaire.Questions);
          this.form = this.fb.group({
            questions: this.fb.array(this.questionnaire.Questions.map((question: any) => {
              console.log('Creating form control for question:', question);
              return this.createQuestion(question);
            }))
          });
        }
      }
    });
  }
  get questions() {
    return this.form.get('questions') as FormArray;
  }

  createQuestion(question: any) {
    console.log('Creating question with id:', question.id);
    if (question.questionType.name === 'multiple_choice') {
      console.log('Question is of type: multiple_choice');
      return this.fb.group({
        questionId: question.id,
        questionChoices: this.fb.array(question.questionChoices.map((questionChoice: any) => {
          console.log('Adding choice with id:', questionChoice.choice.id);
          return this.fb.group({
            choiceId: questionChoice.choice.id,
          });
        })),
      });
    } else if (question.questionType.name === 'rating') {
      console.log('Question is of type: rating');
      return this.fb.group({
        questionId: question.id,
        rating: new FormControl(0)
      });
    } else if (question.questionType.name === 'open') {
      console.log('Question is of type: open');
      return this.fb.group({
        questionId: question.id,
        response: ''
      });
    } else {
      console.log('Question is of unknown type');
      return this.fb.group({
        questionId: question.id,
      });
    }
  }

submit() {
  const responses = this.form.get('questions')?.value.map((question: any, index: number) => {
    let response = question.response;
    if (this.questionnaire && this.questionnaire?.Questions && this.questionnaire?.Questions[index]) {
      response = response || this.questionnaire?.Questions[index]?.question;      
    }
    // Check if questionChoices exist
    if (question.questionChoices) {
      return question.questionChoices.map((questionChoice: any) => ({
        questionId: question.questionId,
        choiceId: questionChoice.choice.id, // Accessing id of choice
        response: response
      }));
    } else {
      // Handle the case when there are no questionChoices
      return {
        questionId: question.questionId,
        response: response
      };
    }
  }).flat();
  
  this.questionrieService.postInsertResponse(this.userId, {responses }).subscribe(response => {
    console.log(response);
  });
}
  formatLabel(value: number): string {
    let label = '';
    if (value == 1) {
      label = 'Low';
    } else if (value == 2) {
      label = 'Medium';
    } else if (value == 3) {
      label = 'High';
    } else if (value == 4) {
      label = 'Critical';
    } else if (value == 5) {
      label = 'Urgent';
    }
    return `${label}`;
  }
}
