import React from 'react';

interface ScheduleCardProps {
  subjectName: string;
  professorName: string;
  blockName: string;
  classroomName: string;
  date: string | null;
  isCanceled: boolean;
  exceptionalDay: boolean;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  subjectName,
  professorName,
  blockName,
  classroomName,
  date,
  isCanceled,
  exceptionalDay,
  dayOfWeek,
  startTime,
  endTime,
}) => {
  const backgroundColor = isCanceled
    ? 'bg-utfpr_red'
    : exceptionalDay
    ? 'bg-utfpr_blue'
    : 'bg-utfpr_black';

  return (
    <div
      className={`flex flex-col border border-utfpr_yellow p-4 rounded-md shadow-lg mb-4 ${backgroundColor} text-utfpr_gray text-left gap-2`}
    >
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
        <span>Cancelada:</span>
        <span>{isCanceled ? 'Sim' : 'Não'}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Excepcional:</span>
        <span>{exceptionalDay ? 'Sim' : 'Não'}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Dia da Semana:</span>
        <span>{dayOfWeek}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Horário:</span>
        <span>{startTime} - {endTime}</span>
      </div>
    </div>
  );
};

export default ScheduleCard;
