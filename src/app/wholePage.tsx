"use client";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CreateModal } from "@/components/CreateModal";
import useLocalStorage from "use-local-storage";
import Column from "@/components/Column";
import { v4 } from "uuid";
import { useEffect } from "react";

export interface ListItem {
  id: string;
  name: string;
}

export interface ListState {
  [key: string]: {
    id: string;
    list: ListItem[];
  };
}

const DEFAULT_COLUMNS_STATE = {
  todo: {
    id: "todo",
    list: [{ id: `Example_${v4()}`, name: "Example" }],
  },
  doing: {
    id: "doing",
    list: [],
  },
  done: {
    id: "done",
    list: [],
  },
};

export default function Home() {
  const [columns, setColumns] = useLocalStorage<ListState>("columns", DEFAULT_COLUMNS_STATE);

  useEffect(() => {
    if (columns == null) {
      setColumns(DEFAULT_COLUMNS_STATE);
    }
  }, [columns, setColumns]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_: any, idx: number) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_: any, idx: number) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  const handleAddItem = (name: string) => {
    setColumns((prev) => {
      let oldColumns = prev;

      oldColumns!["todo"].list = [
        ...prev!["todo"].list,
        {
          id: v4(),
          name,
        },
      ];

      return { ...oldColumns };
    });
  };

  const handleRemoveItem = (columnId: string, id: string) => {
    setColumns((prev) => {
      let oldColumns = prev;
      oldColumns![columnId].list = prev![columnId].list.filter((item) => item.id !== id);

      return { ...oldColumns };
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CreateModal onAdd={handleAddItem} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-3 w-full">
          {columns != null && Object.values(columns).map((col) => <Column col={col} key={col.id} onRemove={handleRemoveItem} />)}
        </div>
      </main>
    </DragDropContext>
  );
}
