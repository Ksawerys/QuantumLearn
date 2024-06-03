export interface Note {
    id?: number;
    title?: string;
    description?: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    Tags?: Tag[];
}

export interface Tag {
    id?: number;
    name?: string;
    note_tags?: NoteTag;
    type?: string;
}

export interface NoteTag {
    createdAt?: string;
    updatedAt?: string;
    note_id?: number;
    tag_id?: number;
}