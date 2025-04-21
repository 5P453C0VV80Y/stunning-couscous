import { PropsWithChildren } from "react";

export function ColumnToolbar({ children }: PropsWithChildren) {
	return <ul className="px-4 py-2 bg-white border rounded-sm w-[calc(100%-2rem)] h-18 flex gap-2 items-center shadow-sm">{children}</ul>;
}

export function ColumnToolbarTool({ children }: PropsWithChildren) {
	return <li className="flex items-center cursor-pointer border leading-none rounded-md bg-white p-2 fill-white transition-all hover:shadow-md">{children}</li>;
}
