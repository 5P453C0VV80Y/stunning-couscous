"use client";
import { T_ColumnStatus, T_KanbanColumn } from "@/types";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";

export const Column = ({
	col,
	onRemove,
	onCreateModalOpen
}: {
	col: T_KanbanColumn<T_ColumnStatus>;
	onRemove: (id: string | number) => void;
	onCreateModalOpen: () => void;
}) => {
	return (
		<Droppable droppableId={col.id}>
			{(provided) => (
				<div className="w-full px-4 py-6 flex flex-col mt-2" aria-label="Column">
					<h2 className="m-0 py-0 px-4">{col.id}</h2>

					<ul
						className="border rounded-lg relative p-4 min-h-96 w-full min-w-full flex flex-col flex-grow mt-2 text-black pb-14"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{col.list.map((item, index) => {
							return (
								<Item key={item.id} index={index} {...item}>
									<button className="flex opacity-0 transition-opacity group-hover:opacity-100" onClick={() => onRemove(item.id)}>
										<IconX color="red" />
									</button>
								</Item>
							);
						})}
						{col.id === "todo" && (
							<button className="w-full flex justify-center absolute bottom-4 left-0 right-0" onClick={onCreateModalOpen}>
								<IconPlus color="#1d4ed8" />
							</button>
						)}
					</ul>
				</div>
			)}
		</Droppable>
	);
};
