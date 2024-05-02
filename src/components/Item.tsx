"use client";
import React, { PropsWithChildren } from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@stitches/react";

interface ItemProps {
  text: string;
  index: number;
}

const StyledItem = styled("div", {
  backgroundColor: "#eee",
  borderRadius: 4,
  padding: "16px 8px",
  transition: "background-color .8s ease-out",
  marginTop: 8,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  ":hover": {
    backgroundColor: "#fff",
    transition: "background-color .1s ease-in",
  },
});

const Item: React.FC<PropsWithChildren<ItemProps>> = ({ text, index, children }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <StyledItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="title">{text}</div>
          <div className="toolbar">{children}</div>
        </StyledItem>
      )}
    </Draggable>
  );
};

export default Item;
