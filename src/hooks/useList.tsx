import { useState, useEffect, useCallback } from "react";

export const useList = <T extends { id: number | string }>(
  fetchItems: () => Promise<T[]>,
  deleteItem: (id: T["id"]) => Promise<void>
) => {
  const [items, setItems] = useState<T[]>([]);
  const [selectId, setSelectId] = useState<T["id"] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchList = useCallback(async () => {
    try {
      const data = await fetchItems();
      setItems(data);
      console.log("Success! List formed!");
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  }, [fetchItems]);

  const deleteSelectedItem = async () => {
    try {
      if (selectId != null) {
        await deleteItem(selectId);
        setItems((prev) => prev.filter((item) => item.id !== selectId));
        setShowModal(false);
        setSelectId(null);
      } else {
        console.error("Item ID is missing!");
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return {
    items,
    selectId,
    setSelectId,
    showModal,
    setShowModal,
    deleteSelectedItem,
  };
};
