import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireMenuComponent } from './questionnaire-menu.component';

describe('QuestionnaireMenuComponent', () => {
  let component: QuestionnaireMenuComponent;
  let fixture: ComponentFixture<QuestionnaireMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionnaireMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
