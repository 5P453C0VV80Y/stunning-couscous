import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Geist } from "next/font/google";
import "../../../app/globals.css";

export const metadata = {
	title: "Kanban"
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"]
});

export default async function TasksLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	return children;
}
