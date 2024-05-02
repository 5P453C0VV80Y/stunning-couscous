"use client";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Droppable } from "react-beautiful-dnd";
import { ListItem } from "@/app/wholePage";
import { styled } from "@stitches/react";
import Item from "./Item";
import React from "react";

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

const handleCreateModal = () => {
  (document?.getElementById("createModal") as HTMLFormElement)?.showModal();
};

const Column: React.FC<{
  col: {
    id: string;
    list: ListItem[];
  };
  onRemove: (columnId: string, id: string) => void;
}> = ({ col, onRemove }) => {
  return (
    <Droppable droppableId={col.id}>
      {(provided) => (
        <StyledColumn>
          <h2>{col.id}</h2>
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {col.list.map(({ id, name }, index) => {
              return (
                <Item key={name} text={name} index={index}>
                  <button className="flex" onClick={() => onRemove(col.id, id)}>
                    <IconX color="red" />
                  </button>
                </Item>
              );
            })}
            {col.id === "todo" && (
              <button className="w-full p-3 my-4 flex justify-center" onClick={() => handleCreateModal()}>
                <IconPlus color="#1d4ed8" />
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
