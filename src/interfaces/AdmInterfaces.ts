export interface Classroom {
  room_id: number | null;
  bloco: string;
  identificacao: string;
  tamanho: string;
  tipo: string;
}

export interface Block {
  block_id: number | null;
  identificacao: string;
  planta: File | null;
}

export interface Subjects {
  subject_id: number | null;
  period: string;
  professor: string;
  time: string;
}