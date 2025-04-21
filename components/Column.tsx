"use client";
import { T_ColumnStatus, T_KanbanColumn } from "@/types";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";
import { cn } from "@/lib/utils";

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
				<div className="w-full px-4 py-6 flex flex-col" aria-label="Column">
					<ul
						className="border rounded-lg relative bg-white p-4 px-6 min-h-[648px] w-full min-w-full flex flex-col flex-grow text-black pb-14"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<li className="mb-2">
							<h2 className="my-2 font-light text-xl capitalize align-middle">
								{col.id === "todo" ? "To Do" : col.id}
								<span className="text-gray-300">{" | "}</span>
								<span className="text-lg">{col.list.length}</span>
							</h2>
							<span
								className={cn("h-1 w-full block opacity-75 rounded-sm", {
									"bg-todo": col.id === "todo",
									"bg-doing": col.id === "doing",
									"bg-done": col.id === "done"
								})}
							/>
						</li>
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
