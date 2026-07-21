"use	client";
import	React	from	"react";
import	PageShell	from	"@/components/PageShell";
import	GlassCard	from	"@/components/GlassCard";
export	default	function	HallOfFame()	{
		const	champions	=	[
				{	id:	1,	tournament:	"Summer	Showdown	2026",	team:	"Soul	Trigger",	date:	"July	2026",	xp:	"+2500"	},
				{	id:	2,	tournament:	"Cyber	Clash	Alpha",	team:	"Neon	Ninjas",	date:	"June	2026",	xp:	"+2000"	}
		];
		return	(
				<PageShell	className="py-10">
						<div	className="text-center	mb-12">
								<h1	className="text-4xl	md:text-5xl	font-black	text-transparent	bg-clip-text	bg-gradient-to-r	from-yellow-400	to
amber-600	mb-4">
										Hall	of	Fame
								</h1>
								<p	className="text-slate-400	max-w-xl	mx-auto">Honoring	the	absolute	legends	and	ultimate	grand	champions	of	GameHub	
Arena.</p>
						</div>
						<div	className="max-w-4xl	mx-auto	space-y-6">
								{champions.map((champ)	=>	(
										<GlassCard	key={champ.id}	className="p-1	flex	flex-col	md:flex-row	items-center	bg-gradient-to-r	from-amber-500/10	
to-slate-900	border	border-amber-500/20">
												<div	className="p-6	md:p-8	flex-1	w-full	flex	flex-col	md:flex-row	justify-between	items-center	gap-6">
														<div	className="text-center	md:text-left">
																<p	className="text-xs	font-bold	text-amber-500	uppercase	tracking-widest	mb-1">{champ.tournament}</p>
																<h2	className="text-2xl	font-bold	text-white	flex	items-center	justify-center	md:justify-start	gap-2">
																		<span> </span>	{champ.team}
																</h2>
																<p	className="text-slate-500	text-sm	mt-1">Crowned	in	{champ.date}</p>
														</div>
														<div	className="bg-amber-500/10	border	border-amber-500/30	px-4	py-2	rounded-lg">
																<span	className="text-amber-400	font-black">{champ.xp}	XP	Gained</span>
														</div>
												</div>
										</GlassCard>
								))}
						</div>
				</PageShell>
		);
}