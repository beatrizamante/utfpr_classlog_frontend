export interface Professor {
    id: number;
    nome: string;
}

export interface Subjects {
    id: number;
    identificaction: string;
    period: string;
    professor: string;
    time: string;
}

export interface Schedule {
    id: number;
    identification: string;
    period: string;
}

export interface Semester {
    id: number;
    identificacao: string;
    professor: string;
}

export interface Classroom {
    id: number;
    identification: string;
    block: string;
    occupied: boolean;
}

export interface Block {
    id: number; 
    identification: string;
}