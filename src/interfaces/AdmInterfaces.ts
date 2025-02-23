export interface Classroom {
  id: number | null;
  bloco: string;
  identificacao: string;
}

export interface Block {
  id: number | null;
  identificacao: string;
  planta: File | null;
}

export interface Subjects {
  id: number | null;
  identificaction: string;
  period: string;
  professor: string;
  time: string;
}