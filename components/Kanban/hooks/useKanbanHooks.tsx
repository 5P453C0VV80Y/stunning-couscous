import { T_CreateModalItemProps } from "@/components/CreateModal/types";
import { T_ColumnStatus, T_KanbanState, T_Task } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useKanbanQuery } from "./useKanbanQuery";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

export function useKanbanHooks() {
	const [createOpen, setCreateModalOpen] = useState(false);
	const { tasksQuery } = useKanbanQuery();
	const { isLoading, data } = tasksQuery;
	const queryClient = useQueryClient();
	const supabase = createClient();
	const { toast } = useToast();

	const form = useForm<T_KanbanState>({
		defaultValues: tasksQuery.data
	});

	useEffect(() => {
		if (!isLoading && data != null) {
			form.setValue("todo", data.todo);
			form.setValue("doing", data.doing);
			form.setValue("done", data.done);
		}
	}, [data]);

	const handleModalClose = () => {
		setCreateModalOpen(false);
	};

	const handleCreateModalSubmit = async (data: T_CreateModalItemProps) => {
		const { error } = await supabase.from("tasks").insert({
			...data,
			deadline: format(data.deadline, "yyyy-MM-dd"),
			status: "todo"
		});

		if (error) {
			toast({
				title: "Error",
				description: error.message
			});

			throw new Error(error.message);
		}

		form.reset();
		queryClient.invalidateQueries();
		handleModalClose();
	};

	const handleDraggedTask = async ({ destination: status, task }: { destination: T_ColumnStatus; task: T_Task }) => {
		console.warn(`Trying to move task to ${status}`, task);
		const { error } = await supabase
			.from("tasks")
			.update({ ...task, status })
			.eq("id", task.id);

		if (error) {
			toast({
				title: "Error",
				description: error.message
			});

			throw new Error(error.message);
		}

		queryClient.invalidateQueries();
	};

	const handleRemoveTask = async (id: string | number) => {
		const { error } = await supabase.from("tasks").delete().eq("id", id);

		if (error) {
			toast({
				title: "Error",
				description: error.message
			});

			throw new Error(error.message);
		}

		queryClient.invalidateQueries();
	};

	const handleRemoveAllTasksByStatus = async (status: T_ColumnStatus) => {
		const { error } = await supabase.from("tasks").delete().eq("status", status);

		if (error) {
			toast({
				title: "Error",
				description: error.message
			});

			throw new Error(error.message);
		}

		queryClient.invalidateQueries();
	};

	const handleRemoveAllReports = async () => {
		const { error } = await supabase.from("report").delete().neq("id", -1);

		if (error) {
			toast({
				title: "Error",
				description: error.message
			});

			throw new Error(error.message);
		}
	};

	return {
		tasksQuery,
		createOpen,
		handleRemoveTask,
		handleDraggedTask,
		setCreateModalOpen,
		handleRemoveAllReports,
		handleCreateModalSubmit,
		handleRemoveAllTasksByStatus,
		tasksForm: form
	};
}
