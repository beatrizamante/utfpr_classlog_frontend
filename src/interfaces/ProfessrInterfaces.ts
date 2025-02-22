export interface Professor {
    id: number;
    nome: string;
}

export interface Course {
    id: number;
    nome: string;
    professor: string;
}

export interface Semester {
    id: number;
    identificacao: string;
    professor: string;
}

export interface Subjects {
    id: number;
    identificaction: string;
    period: string;
    professor: string;
    time: string;
  }