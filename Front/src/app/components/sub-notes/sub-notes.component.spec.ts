import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNotesComponent } from './sub-notes.component';

describe('SubNotesComponent', () => {
  let component: SubNotesComponent;
  let fixture: ComponentFixture<SubNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
