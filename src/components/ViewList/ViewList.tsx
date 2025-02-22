import React from "react";
import Item from "./Item/Item";

interface ListProps<T> {
  listOf: T[];
  getItemName: (item: T) => string;
  getItemId: (item: T) => number | null;
}

export default function ViewList<T>({
  listOf,
  getItemName,
  getItemId,
}: ListProps<T>) {
  return (
    <div className="flex justify-center pb-8 relative mx-8 py-4 -z-0 bg-transparent max-h-[30vh] overflow-y-auto overflow-x-hidden">
      <ul className="space-y-8">
        {listOf.map((item) => (
          <Item key={getItemId(item)} name={getItemName(item)} />
        ))}
      </ul>
    </div>
  );
}
