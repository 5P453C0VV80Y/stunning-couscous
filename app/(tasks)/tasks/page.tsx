"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const Kanban = dynamic(() => import("@/components/Kanban/Kanban"), { ssr: false, loading: () => <p>loading...</p> });

export default function Tasks() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<Kanban />
		</QueryClientProvider>
	);
}
