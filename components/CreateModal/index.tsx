import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { T_CreateModalItemProps } from "./types";
import { DatePicker } from "../DatePicker";
import { Input } from "../ui/input";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { ResponsiblePicker } from "../ResponsiblePicker";

export function CreateModal({
	state,
	setState,
	onAdd,
	methods
}: PropsWithChildren<{
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	onAdd: (props: T_CreateModalItemProps) => void;
	methods: UseFormReturn<T_CreateModalItemProps, any, any>;
}>) {
	const {
		formState: { isValid }
	} = methods;

	return (
		<FormProvider {...methods}>
			<AlertDialog open={state}>
				<AlertDialogContent>
					<form method="dialog" className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onAdd)}>
						<AlertDialogHeader>
							<AlertDialogTitle>Task name</AlertDialogTitle>
							<AlertDialogDescription>Add a new task with deadline</AlertDialogDescription>
						</AlertDialogHeader>

						<Input type="text" placeholder="Type a task name" {...methods.register("name")} />

						<DatePicker />

						<ResponsiblePicker />

						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setState(false)}>Cancel</AlertDialogCancel>
							<AlertDialogAction type="submit" disabled={!isValid} className="btn btn-active btn-primary">
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</AlertDialogContent>
			</AlertDialog>
		</FormProvider>
	);
}
