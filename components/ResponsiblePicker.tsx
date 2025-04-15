import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useResponsibleUsers } from "@/store/responsibileAtom";
import { FormField, FormItem, FormLabel } from "./ui/form";

export function ResponsiblePicker() {
	const { users } = useResponsibleUsers();

	if (users == null) {
		return null;
	}

	return (
		<FormField
			name="responsible"
			render={({ field: { onChange, value } }) => (
				<FormItem className="flex flex-col">
					<FormLabel>Assignee</FormLabel>

					<Select value={value} onValueChange={onChange}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Assignee" />
						</SelectTrigger>
						<SelectContent>
							{users.map((user) => (
								<SelectItem key={user.id} value={user.id}>
									{user.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormItem>
			)}
		/>
	);
}
