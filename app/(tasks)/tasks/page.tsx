"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingCircle } from "@/components/LoadingCircle";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

const Kanban = dynamic(() => import("@/components/Kanban/Kanban"), {
	ssr: false,
	loading: () => (
		<div className="flex justify-center items-center w-full py-10">
			<LoadingCircle />
		</div>
	)
});

export default function Tasks() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<Kanban />
		</QueryClientProvider>
	);
}
