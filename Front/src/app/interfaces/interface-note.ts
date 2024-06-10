export interface Note {
    id?: number;
    container_note_id?: number;
    title?: string;
    description?: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    NoteTags?: NoteTag[];
}

export interface Tag {
    id?: number;
    name?: string;
    description?: string;
    note_tags?: NoteTag;
    type: string;
}

export interface NoteTag {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    data?: string;
    note_id?: number;
    Tag?: Tag;
}


export interface Category {
    id: string | number;
    name: string;
}