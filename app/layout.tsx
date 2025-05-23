import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "@/components/header-auth";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

export const metadata = {
	title: "Kanban"
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"]
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={geistSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<main className="min-h-screen flex flex-col items-center w-full">
						<div className="flex-1 w-full flex flex-col gap-20 items-center">
							<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
								<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
									<div className="flex gap-5 items-center font-semibold">
										<Link href={"/tasks"}>Kanban</Link>
									</div>
									{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
								</div>
							</nav>
							<div className="flex flex-col max-w-7xl w-full">{children}</div>
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
