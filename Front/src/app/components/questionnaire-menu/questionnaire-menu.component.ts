import { Component, OnInit } from '@angular/core';
import { QuestionrieService } from '../../services/questionrie.service';
import { Questionnaire } from '../../interfaces/interface-questionnaire';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-questionnaire-menu',
  standalone: true,
  imports: [RouterLink,MatIcon],
  templateUrl: './questionnaire-menu.component.html',
  styleUrl: './questionnaire-menu.component.scss'
})
export class QuestionnaireMenuComponent  implements OnInit  {

  questionnaires: Questionnaire[]=[];
  imageIndex = 1;
  link=''


  constructor(private questionrieService: QuestionrieService) { }

  ngOnInit(): void {
    this.link = sessionStorage.getItem('token') ? '/profile' : '/login';
    this.questionrieService.getQuestionnaires().subscribe(response => {
      this.questionnaires = response.body?.data || [];
      this.questionnaires.forEach(questionnaire => {
        questionnaire.image = this.getNextImage(); // Asigna una imagen a cada cuestionario
      });
    });
  }
  
  getNextImage() {
    const image = `../../../assets/image/questionaire-image/questionaire-image${this.imageIndex}.jpg`; 
    this.imageIndex++; 
    return image;
  }

  saveQuestionnaire(questionnaire: Questionnaire) {
    console.log('saveQuestionnaire',questionnaire)
    this.questionrieService.changeQuestionnaire(questionnaire);
  }
}
