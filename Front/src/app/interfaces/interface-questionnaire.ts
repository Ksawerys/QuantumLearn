export interface Questionnaire {
    id?: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    image?:string;
    Questions?: Question[];
  }
  
  export interface QuestionChoice {
    id: number;
    answer_count: number;
    choice: Choice;
  }
  
  export interface Question {
    id: number;
    question: string;
    created_at: string;
    updated_at: string;
    questionType: QuestionType;
    questionChoices: QuestionChoice[];
  }


  export interface Choice {
    id: number;
    description: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface QuestionType {
    id: number;
    name: string;
  }

  export interface UserAnswers {
    userId: number;
    responses: Answer[];
  }

  export interface Answer {
    questionId: number;
    choiceId?: number;
    response: string;
  }
