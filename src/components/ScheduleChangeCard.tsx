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
  selectedRoom: string | number;
  handleRoomChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rooms: { id: number; name: string }[];
}

const ScheduleCardChange: React.FC<ScheduleCardProps> = ({
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
  selectedRoom,
  handleRoomChange,
  handleStartTimeChange,
  handleEndTimeChange,
  rooms
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

      <div className="flex justify-between align-middle">
        <span className="pr-4">Sala de Aula:</span>
        <select
          value={selectedRoom ?? ""}
          onChange={handleRoomChange}
          className="bg-utfpr_black text-utfpr_gray p-2 mt-2 rounded border border-utfpr_yellow"
        >
          <option value="">Selecione uma sala</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <span>Data:</span>
        <input
          type="date"
          value={selectedDate ?? ""}
          onChange={handleDateChange}
          className="bg-utfpr_black text-utfpr_gray p-2 mt-2 rounded border border-utfpr_yellow"
        />
      </div>

      <div className="flex justify-between">
        <span>Dia da Semana:</span>
        <span>{dayOfWeek}</span>
      </div>

      <div className="flex flex-col items-center justify-end gap-2 mt-auto">
        <span>Horário:</span>
        <input
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          className="bg-utfpr_black text-utfpr_gray p-2 mt-2 rounded border border-utfpr_yellow"
        />
        <input
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
          className="bg-utfpr_black text-utfpr_gray p-2 mt-2 rounded border border-utfpr_yellow"
        />
      </div>
    </div>
  );
};

export default ScheduleCardChange;
