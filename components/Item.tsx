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
					className="border bg-white text-black rounded py-4 px-5 mt-5 flex justify-between items-center transition-all duration-150 hover:bg-slate-50 hover:shadow-md ease-in group"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div className="">
						<div className="text-[17px] leading-snug mb-2 min-h-14">{name}</div>

						<div className="flex gap-2">
							<div className="text-xs text-black bg-gray-100 py-1 px-2 rounded-sm flex items-center">{format(deadline, "dd MMM yyy")}</div>

							{currentResponsible && (
								<div className="flex gap-2 items-center rounded-sm bg-gray-100 py-1 px-2">
									<div className="rounded-full text-md font-bold bg-green-200 text-gray-700	 w-6 h-6 flex justify-center items-center">
										{currentResponsible.at(0)}
									</div>
									<div className="text-sm leading-tight">{currentResponsible}</div>
								</div>
							)}
						</div>
					</div>

					<div className="toolbar">{children}</div>
				</li>
			)}
		</Draggable>
	);
};

export default Item;
