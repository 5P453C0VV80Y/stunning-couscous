import { PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function TooltipWrapper({ title, children, onClick }: PropsWithChildren<{ title: string; onClick: () => void }>) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger onClick={onClick}>{children}</TooltipTrigger>
				<TooltipContent>{title}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
