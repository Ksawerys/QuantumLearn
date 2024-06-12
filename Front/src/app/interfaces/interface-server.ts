import { Note, NoteTag, Tag } from "./interface-note";
import { Questionnaire } from "./interface-questionnaire";

export interface InterfaceServerNote {
    message: string;
    data: Note;
}

export interface InterfaceServerTags{
    message: string;
    data: Tag[];
}

export interface InterfaceServerNoteTags{
    message: string;
    data: NoteTag[];
}

interface NoteTagData {
    data: string;
  }
  
  interface NoteTagResponse {
    id: number;
    note_id: string;
    tag_id: string;
    data: NoteTagData;
    updatedAt: string;
    createdAt: string;
  }
  
 export  interface ServerResponse {
    message: string;
    data: NoteTagResponse;
  }

  
export interface QuestionnairesResponse {
  message: string;
  data: Questionnaire[];
}
export  interface InterfaceServerResponse {
  message: string;
  data: any;
}

export interface IAResponse {
  generated_text?: string;
  data?: any;
}

