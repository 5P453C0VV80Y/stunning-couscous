import { useFormContext } from "react-hook-form";
import { T_CreateModalItemProps } from "./CreateModal/types";
import { FormControl, FormItem, FormLabel, FormField } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";

export function DatePicker() {
	const { getValues } = useFormContext<T_CreateModalItemProps>();
	const date = getValues("deadline");

	return (
		<FormField
			name="deadline"
			render={({ field, field: { onChange } }) => (
				<FormItem className="flex flex-col">
					<FormLabel>Deadline</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button variant={"outline"} className={cn("pl-3 text-left w-full font-normal", !field.value && "text-muted-foreground")}>
									{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>

						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								hideWeekdays
								selected={date == null ? undefined : typeof date === "string" ? parse(date, "YYYY-MM-DD", new Date()) : date}
								onSelect={(selected) => onChange(selected)}
								className="rounded-md border"
							/>
						</PopoverContent>
					</Popover>
				</FormItem>
			)}
		/>
	);
}
