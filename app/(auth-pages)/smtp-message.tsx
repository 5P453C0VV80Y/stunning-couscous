import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
	return (
		<div className="flex flex-col w-90 mx-auto gap-2">
			<InfoIcon size={16} />
			<div className="flex flex-col gap-1">
				<small className="text-sm text-secondary-foreground">
					<strong> Note:</strong> Emails are rate limited. Enable Custom SMTP to increase the rate limit.
				</small>
				<div>
					<Link
						href="https://supabase.com/docs/guides/auth/auth-smtp"
						target="_blank"
						className="text-primary/50 hover:text-primary flex items-center text-sm gap-1"
					>
						Learn more <ArrowUpRight size={14} />
					</Link>
				</div>
			</div>
		</div>
	);
}
