export type T_ColumnStatus = "todo" | "doing" | "done";

export type T_Task = {
	responsible: string;
	created_at?: string;
	deadline: string;
	name: string;
	id: number | string;
};

export type T_KanbanColumn<T> = {
	id: T;
	list: T_Task[];
};

export type T_KanbanState = {
	todo: T_KanbanColumn<"todo">;
	doing: T_KanbanColumn<"doing">;
	done: T_KanbanColumn<"done">;
};

export type T_DbTasks = {
	status: T_ColumnStatus;
} & T_Task;

export type T_Responsible = {
	name: string;
	id: string;
};
