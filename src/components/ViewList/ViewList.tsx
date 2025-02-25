import React from "react";
import Item from './Item/Item'

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
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  };
}

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
                dayOfWeek={scheduleData.dayOfWeek}
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
