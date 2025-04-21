"use client";

import { ColumnToolbar, ColumnToolbarTool } from "../ColumnToolbar";
import { useCreateModalForm } from "@/hooks/useCreateModalForm";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useKanbanHooks } from "./hooks/useKanbanHooks";
import { T_ColumnStatus, T_KanbanState } from "@/types";
import { CreateModal } from "@/components/CreateModal";
import { TooltipWrapper } from "../TooltipWrapper";
import { Column } from "@/components/Column";

export default function Kanban() {
	const { createModalForm } = useCreateModalForm();
	const {
		tasksForm: { getValues, setValue, watch },
		tasksQuery: { isLoading },
		createOpen,
		handleRemoveTask,
		handleDraggedTask,
		setCreateModalOpen,
		handleRemoveAllTasksByStatus,
		handleCreateModalSubmit
	} = useKanbanHooks();
	const columns = watch();

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (!destination || source.droppableId === destination.droppableId) return;

		const start = getValues(source.droppableId as keyof T_KanbanState);
		const end = getValues(destination.droppableId as keyof T_KanbanState);

		const updatedList = start.list;
		const [draggedTask] = updatedList.splice(source.index, 1);

		if (start === end) {
			updatedList.splice(destination.index, 0, draggedTask);

			setValue(source.droppableId as keyof T_KanbanState, {
				...start,
				list: updatedList
			});
		} else {
			const endList = Array.from(end.list);
			endList.splice(destination.index, 0, draggedTask);

			//* SOURCE
			setValue(source.droppableId as keyof T_KanbanState, {
				...start,
				list: updatedList
			});

			//* DESTINATION
			setValue(destination.droppableId as keyof T_KanbanState, {
				...end,
				list: endList
			});
		}

		handleDraggedTask({ task: draggedTask, destination: destination.droppableId as T_ColumnStatus });
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<CreateModal state={createOpen} setState={setCreateModalOpen} onAdd={handleCreateModalSubmit} methods={createModalForm} />

			<main className="flex flex-col items-center">
				<ColumnToolbar>
					<ColumnToolbarTool>
						<TooltipWrapper title="Create new task" onClick={() => setCreateModalOpen(true)}>
							<IconPlus color="#4d4d4d" />
						</TooltipWrapper>
					</ColumnToolbarTool>

					<ColumnToolbarTool>
						<TooltipWrapper title="Delete all tasks marked done" onClick={() => handleRemoveAllTasksByStatus("done")}>
							<IconTrash />
						</TooltipWrapper>
					</ColumnToolbarTool>
				</ColumnToolbar>

				<div className="grid grid-cols-3 w-full">
					{!isLoading && Object.values(columns).map((col) => <Column col={col} key={col.id} onRemove={handleRemoveTask} />)}
				</div>
			</main>
		</DragDropContext>
	);
}
