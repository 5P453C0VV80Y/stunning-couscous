import { useResponsibleUsers } from "@/store/responsibileAtom";
import { createClient } from "@/utils/supabase/client";
import { T_DbTasks, T_KanbanState } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useKanbanQuery() {
	const { setBatchUsers } = useResponsibleUsers();
	const supabase = createClient();
	const { toast } = useToast();

	const responsibleQuery = useQuery({
		queryKey: ["responsible"],
		queryFn: async () => {
			const { data, error } = await supabase.from("users").select();

			if (error != null) {
				toast({
					title: "Error",
					description: "Couldn't load users"
				});

				throw new Error("Error loading users");
			}

			setBatchUsers(data);

			return data;
		}
	});

	const tasksQuery = useQuery({
		queryKey: [`tasks`],
		queryFn: async () => {
			const { data, error } = await supabase.from("tasks").select("*").returns<T_DbTasks[]>();

			if (error != null) {
				toast({
					title: "Error",
					description: "Couldn't load tasks"
				});

				throw new Error("Error loading tasks");
			}

			const formattedData = data.reduce<T_KanbanState>(
				(acc, { status, ...task }) => {
					if (acc == null) {
						return { todo: { id: "todo", list: [] }, doing: { id: "doing", list: [] }, done: { id: "done", list: [] } };
					}

					switch (status) {
						case "todo":
							acc.todo.list.push(task);
							break;

						case "doing":
							acc.doing.list.push(task);
							break;

						case "done":
							acc.done.list.push(task);
							break;

						default:
							throw new Error("Item without a status");
							break;
					}

					return acc;
				},
				{
					todo: { id: "todo", list: [] },
					doing: { id: "doing", list: [] },
					done: { id: "done", list: [] }
				}
			);

			return formattedData;
		}
	});

	return {
		responsibleQuery,
		tasksQuery
	};
}
