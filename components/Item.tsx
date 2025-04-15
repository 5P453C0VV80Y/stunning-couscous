"use client";
import { useResponsibleUsers } from "@/store/responsibileAtom";
import React, { PropsWithChildren } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { format } from "date-fns";
import { T_Task } from "@/types";

type T_ItemProps = PropsWithChildren<{ index: number } & T_Task>;

const Item = ({ deadline, id, name, index, children, responsible }: T_ItemProps) => {
	const { users } = useResponsibleUsers();
	const currentResponsible = users?.find((u) => u.id === responsible)?.name;

	return (
		<Draggable draggableId={id.toString()} index={index}>
			{(provided) => (
				<li
					className="border text-white rounded p-4 mt-2 flex justify-between items-center transition-colors duration-150 hover:bg-slate-900 ease-in group"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div className="">
						<div className="font-bold text-xl mb-2">{name}</div>
						<div className="text-sm text-black bg-slate-300 py-1 px-2 rounded-sm">{format(deadline, "dd MMM yyy")}</div>
						{currentResponsible && <div className="">{currentResponsible}</div>}
					</div>

					<div className="toolbar">{children}</div>
				</li>
			)}
		</Draggable>
	);
};

export default Item;
