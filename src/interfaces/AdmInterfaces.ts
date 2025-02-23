export interface Classroom {
  id: number | null;
  bloco: string;
  identificacao: string;
}

export interface Block {
  id: number | null;
  name: string;
  photo: File | null;
}

export interface Subjects {
  id: number | null;
  semester: string;
  name: string;
}

export interface Schedules {
    id: number | null;
    start_time: string;
    end_time: string;
    day_of_week: string; // Valores entre "1" e "5" (Segunda a Sexta)
    default_day: boolean;
    user_subject_id: number; // Professor, agora com um número
    classroom_id: number; // Sala de Aula, também um número
    date: string; // Data no formato "YYYY-MM-DD"
}