import React from "react";
import Item from './Item/Item';

interface ListProps<T> {
  listOf: T[];
  getItemId: (item: T) => number | null;
  getScheduleData: (item: T) => {
    subjectName: string;
    professorName: string;
    blockName: string;
    classroomName: string;
    date: string | null;
    isCanceled: boolean;
    exceptionalDay: boolean;
    dayOfWeek: string | number;
    startTime: string;
    endTime: string;
  };
}

const daysOfWeekMap: { [key: number]: string } = {
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
  7: "Domingo"
};

export default function ViewList<T>({
                                      listOf,
                                      getItemId,
                                      getScheduleData,
                                    }: ListProps<T>) {
  return (
      <div className="flex justify-center pb-8 relative mx-8 py-4 -z-0 bg-transparent max-h-[30vh] overflow-y-auto overflow-x-hidden">
        <ul className="space-y-8 px-4">
          {listOf.map((item) => {
            const scheduleData = getScheduleData(item);

            const formattedDayOfWeek =
                typeof scheduleData.dayOfWeek === "number"
                    ? daysOfWeekMap[scheduleData.dayOfWeek] || "Desconhecido"
                    : scheduleData.dayOfWeek;

            return (
                <li key={getItemId(item)}>
                  <Item
                      subjectName={scheduleData.subjectName}
                      professorName={scheduleData.professorName}
                      blockName={scheduleData.blockName}
                      classroomName={scheduleData.classroomName}
                      date={scheduleData.date}
                      isCanceled={scheduleData.isCanceled}
                      exceptionalDay={scheduleData.exceptionalDay}
                      dayOfWeek={formattedDayOfWeek} // Usa o nome do dia
                      startTime={scheduleData.startTime}
                      endTime={scheduleData.endTime}
                  />
                </li>
            );
          })}
        </ul>
      </div>
  );
}
