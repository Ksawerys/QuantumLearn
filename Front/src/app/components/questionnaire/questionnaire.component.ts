import { Component, OnInit } from '@angular/core';
import { QuestionrieService } from '../../services/questionrie.service';
import { Questionnaire, UserAnswers } from '../../interfaces/interface-questionnaire';
import { MatSliderModule } from '@angular/material/slider';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToolsService } from '../../services/tool.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  userId: number = 0;
  questionnaire: Questionnaire | null = {  
    title: '',
    description: '',
    image: '',
    createdAt: '',
    updatedAt: ''
  };
  userAnswers: UserAnswers ={
    userId: 0,
    responses: []
  }

  constructor(private questionrieService: QuestionrieService, private fb: FormBuilder, private toolsService: ToolsService, private router: Router,private snackBar: MatSnackBar) {
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
        this.userAnswers.userId = this.userId;
        console.log('User ID:', this.userId);
      }
    }
  
    this.questionrieService.currentQuestionnaire.subscribe(questionnaire => {
      this.questionnaire = questionnaire;
      console.log('ngOnInit', this.questionnaire);
    });
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }


  submit() {
    if (this.questionnaire && this.questionnaire.Questions && this.userAnswers.responses.length < this.questionnaire.Questions.length) {
      this.openSnackBar('Por favor, responde a todas las preguntas antes de enviar.', 'Cerrar');
      return;
    }
    this.questionrieService.postInsertResponse(this.userAnswers.userId, {responses: this.userAnswers.responses})
      .subscribe(
        response => {
          console.log('Response from server:', response);
          this.router.navigate(['/questionrie_menu']);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
  
  addResponse(questionId: number, response: string, choiceId?: number) {
    const index = this.userAnswers.responses.findIndex(answer => answer.questionId === questionId);
    if (index !== -1) {
      if (choiceId == null || choiceId == undefined) {
        this.userAnswers.responses[index] = {questionId, response};
        console.log({questionId, response}); 
      } else {
        this.userAnswers.responses[index] = {questionId, choiceId, response};
        console.log({questionId, choiceId, response}); 
      }
    } else {
      if (choiceId == null || choiceId == undefined) {
        this.userAnswers.responses.push({questionId, response});
        console.log({questionId, response});
      } else {
        this.userAnswers.responses.push({questionId, choiceId, response});
        console.log({questionId, choiceId, response}); 
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  formatLabel(value: number): string {
    let label = '';
    if (value == 1) {
      label = '1';
    } else if (value == 2) {
      label = '2';
    } else if (value == 3) {
      label = '3';
    } else if (value == 4) {
      label = '4';
    } else if (value == 5) {
      label = '5';
    }
    return `${label}`;
  }
}
