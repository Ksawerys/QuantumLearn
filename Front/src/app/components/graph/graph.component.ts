import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToolsService } from '../../services/tool.service';
import { MatIcon } from '@angular/material/icon';
import { QuestionrieService } from '../../services/questionrie.service';
import { IAResponse, InterfaceServerResponse } from '../../interfaces/interface-server';
import { map } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
import { StatisticService } from '../../services/statistic.service';
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [RouterLink,MatIcon],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent  implements OnInit {
  link=''
  userId=0
  progress=''
  dataLoaded = false;
  grades:number[] = [];
  barHeight: string[] = [];  
  constructor(private router:Router, private toolsService: ToolsService, private questionrieService: QuestionrieService, private statisticService: StatisticService) {}

  ngOnInit() {
    let maxGrade = Math.max(...this.grades); 
    this.barHeight = this.grades.map(grade => (grade / maxGrade * 100) + '%'); 
    this.link = sessionStorage.getItem('token') ? '/profile' : '/login';
    const token = sessionStorage.getItem('token'); 
    if (token && !this.toolsService.isTokenExpired(token)) { 
      const userSession = this.toolsService.getUsuarioSession(token); 
      if (userSession) {
        this.userId = userSession.uid;
        this.statisticService.getExamTags(this.userId).pipe(
          map(response => response.body as IAResponse[])
        ).subscribe((response: IAResponse[]) => {
          this.grades = response.map(item => parseFloat(item.data));
          let maxGrade = Math.max(...this.grades); 
          this.barHeight = this.grades.map(grade => (grade / maxGrade * 100) + '%'); 
        });
        this.statisticService.getProgress(this.userId).pipe(
          map(response => response.body as IAResponse)
        ).subscribe((response: IAResponse) => {
          this.progress = response.generated_text || 'No progress text available';
          this.dataLoaded = true;
        });
      }
    }
  }
}