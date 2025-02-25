import React from "react";

interface ScheduleCardProps {
  professorName: string;
  subjectName: string;
  classroomName: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  blockName: string;
  date: string | null;
  selectedDate: string | null;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  professorName,
  subjectName,
  classroomName,
  startTime,
  endTime,
  dayOfWeek,
  blockName,
  date,
  selectedDate,
  handleDateChange,
}) => {
  return (
    <div className="flex flex-col border border-utfpr_yellow p-6 rounded-md shadow-lg mb-6 bg-utfpr_black text-utfpr_gray text-left gap-4">
      <h2 className="text-xl font-semibold text-utfpr_yellow">{subjectName}</h2>
      
      <div className="flex justify-between">
        <span>Professor:</span>
        <span>{professorName}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Bloco:</span>
        <span>{blockName}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Sala de Aula:</span>
        <span>{classroomName}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Data:</span>
        <span>{date ? date : 'Padrão'}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Dia da Semana:</span>
        <span>{dayOfWeek}</span>
      </div>

      <div className="flex justify-between">
        <span>Horário:</span>
        <span>{startTime} - {endTime}</span>
      </div>

      <div className="flex flex-col items-center justify-end gap-2 mt-auto">
        <span>Alterar Data:</span>
        <input
          type="date"
          value={selectedDate ?? ""}
          onChange={handleDateChange}
          className="bg-utfpr_black text-utfpr_gray p-2 mt-2 rounded border border-utfpr_yellow"
        />
      </div>
    </div>
  );
};

export default ScheduleCard;
