import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToolsService } from '../../services/tool.service';
import { MatIcon } from '@angular/material/icon';
import { QuestionrieService } from '../../services/questionrie.service';
import { IAResponse, InterfaceServerResponse } from '../../interfaces/interface-server';
import { map } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
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
  // dataLoaded = false;


  constructor(private router:Router, private toolsService: ToolsService, private questionrieService: QuestionrieService) {}

  ngOnInit() {
    this.link = sessionStorage.getItem('token') ? '/profile' : '/login';
    const token = sessionStorage.getItem('token'); 
    if (token && !this.toolsService.isTokenExpired(token)) { 
      const userSession = this.toolsService.getUsuarioSession(token); 
      if (userSession) {
        this.userId = userSession.uid;
        // this.questionrieService.getProgress(this.userId).pipe(
        //   map(response => response.body as IAResponse)
        // ).subscribe((response: IAResponse) => {
        //   this.progress = response.generated_text;
        //   this.dataLoaded = true;
        // });
      }
    }
  }
}