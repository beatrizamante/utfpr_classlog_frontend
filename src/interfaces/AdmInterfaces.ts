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

export interface Schedules {
  id: number | null;
  start_time: string,
  end_time: string,
	day_of_week: string,
	default_day: string,
	user_subject_id: string,
	classroom_id: string,
	date: Date,
}