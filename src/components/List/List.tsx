import React from "react";
import Item from "./Item/Item";

interface ListProps<T> {
  listOf: T[];
  onSelected: (id: number | null) => void;
  selectedId?: number | null;
  getItemLabel: (item: T) => string; 
  getItemId: (item: T) => number;   
}

export default function List<T>({
  listOf,
  onSelected,
  selectedId,
  getItemLabel,
  getItemId,
}: ListProps<T>) {
  return (
    <div className="flex justify-center pb-8 relative mx-8 py-4 -z-0 bg-transparent max-h-[500px] overflow-y-auto overflow-x-hidden">
      <ul className="space-y-8">
        {listOf.map((item) => (
          <Item
            key={getItemId(item)} // Use dynamic key
            label={getItemLabel(item)} // Get the label dynamically
            onClick={() => onSelected(getItemId(item))}
            isSelected={getItemId(item) === selectedId}
          />
        ))}
      </ul>
    </div>
  );
}
