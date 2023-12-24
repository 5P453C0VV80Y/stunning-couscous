"use client";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import Column from "@/components/Column";
import { v4 } from "uuid";

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

export default function Home() {
  const [columns, setColumns] = useState<ListState>({
    todo: {
      id: "todo",
      list: [
        { id: "djqowidjqw", name: "Break" },
        { id: "asdji", name: "Game" },
        { id: "lethalcompay", name: "Lethal Company" },
      ],
    },
    doing: {
      id: "doing",
      list: [{ id: "stoaidfyqwoduq", name: "This stupi app" }],
    },
    done: {
      id: "done",
      list: [],
    },
  });

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null;

    console.log("1	djqwidjo", source, destination);
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

      oldColumns["todo"].list = [
        ...prev["todo"].list,
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
      oldColumns[columnId].list = prev[columnId].list.filter((item) => item.id !== id);

      return { ...oldColumns };
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-3 w-full">
          {Object.values(columns).map((col) => (
            <Column col={col} key={col.id} onRemove={handleRemoveItem} onAdd={handleAddItem} />
          ))}
        </div>
      </main>
    </DragDropContext>
  );
}
