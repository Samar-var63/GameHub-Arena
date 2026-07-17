import	React	from	"react";
import	PageShell	from	"@/components/PageShell";
import	GlassCard	from	"@/components/GlassCard";
export	default	function	ProfilePage()	{
		return	(
				<PageShell	className="py-10">
						<h1	className="text-3xl	font-bold	text-white	mb-6">Player	Profile</h1>
						<GlassCard	className="p-8">
								<div	className="animate-pulse	flex	space-x-4">
										<div	className="rounded-full	bg-slate-700	h-20	w-20"></div>
										<div	className="flex-1	space-y-6	py-1">
												<div	className="h-2	bg-slate-700	rounded	w-1/4"></div>
												<div	className="space-y-3">
														<div	className="grid	grid-cols-3	gap-4">
																<div	className="h-2	bg-slate-700	rounded	col-span-2"></div>
																<div	className="h-2	bg-slate-700	rounded	col-span-1"></div>
														</div>
														<div	className="h-2	bg-slate-700	rounded	w-1/2"></div>
												</div>
										</div>
								</div>
						</GlassCard>
				</PageShell>
		);
}