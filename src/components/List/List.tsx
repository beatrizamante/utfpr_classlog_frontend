import React from "react";
import Item from "./Item/ItemClassroom";
import { Classroom } from "../../interfaces/AdmInterfaces";

interface ListProps {
  listOfClassrooms: Classroom[];
  onSelectedRoom: (id: number | null) => void;
  selectedRoomId?: number | null;
}

export default function List({
  listOfClassrooms,
  onSelectedRoom,
  selectedRoomId,
}: ListProps) {
  return (
    <div className="flex justify-center pb-8 relative mx-8 py-4 -z-0 bg-transparent max-h-[500px] overflow-y-auto overflow-x-hidden">
      <ul>
        {listOfClassrooms.map((room) => (
          <Item 
            key={room.room_id}
            bloco={room.bloco}
            identificacao={room.identificacao}
            tamanho={room.tamanho}
            tipo={room.tipo}
            onClick={() => onSelectedRoom(room.room_id)}
            isSelected={room.room_id === selectedRoomId}
          />
        ))}
      </ul>
    </div>
  );
}
