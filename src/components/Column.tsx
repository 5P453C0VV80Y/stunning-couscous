import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "@stitches/react";
import { ListItem } from "@/app/page";
import { v4 } from "uuid";

const StyledColumn = styled("div", {
  minHeight: "180px",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  marginTop: 8,

  h2: {
    margin: 0,
    padding: "0 16px",
  },
});

const StyledList = styled("div", {
  backgroundColor: "#ddd",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  color: "black",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
});

const Column: React.FC<{
  col: {
    id: string;
    list: ListItem[];
  };
  onAdd: (name: string) => void;
  onRemove: (columnId: string, id: string) => void;
}> = ({ col, onRemove, onAdd }) => {
  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <StyledColumn>
          <h2>{col.id}</h2>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {col.list.map(({ id, name }, index) => {
              console.log("item:", name, id, index);
              return (
                <Item key={name} text={name} index={index}>
                  <button className="flex" onClick={() => onRemove(col.id, id)}>
                    remove
                  </button>
                </Item>
              );
            })}
            {col.id === "todo" && (
              <button className="w-full p-4" onClick={() => onAdd(v4())}>
                +
              </button>
            )}
            {provided.placeholder}
          </StyledList>
        </StyledColumn>
      )}
    </Droppable>
  );
};

export default Column;
