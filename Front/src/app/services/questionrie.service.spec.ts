import { TestBed } from '@angular/core/testing';

import { QuestionrieService } from './questionrie.service';

describe('QuestionrieService', () => {
  let service: QuestionrieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionrieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
