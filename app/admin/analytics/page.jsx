"use	client";
import	React	from	"react";
import	PageShell	from	"@/components/PageShell";
import	GlassCard	from	"@/components/GlassCard";
export	default	function	AdminAnalytics()	{
//	Mock	data	for	UI	layout
const	stats	=	[
{	label:	"Total	Tournaments",	value:	"12",	color:	"text-blue-400"	},
{	label:	"Active	Teams",	value:	"48",	color:	"text-emerald-400"	},
{	label:	"Matches	Played",	value:	"156",	color:	"text-indigo-400"	},
{	label:	"Pending	Disputes",	value:	"0",	color:	"text-red-400"	}
];
return	(
<PageShell	className="py-10">
<h1	className="text-3xl	font-bold	text-white	mb-2">Platform	Analytics</h1>
<p	className="text-slate-400	mb-8">Real-time	statistics	for	GameHub	Arena.</p>
<div	className="grid	grid-cols-1	md:grid-cols-2	lg:grid-cols-4	gap-6">
{stats.map((stat,	idx)	=>	(
<GlassCard	key={idx}	className="p-6	border	border-slate-800	bg-slate-900/50	flex	flex-col	items-center	justify
center	text-center	hover:bg-slate-800/50	transition-all">
<h3	className="text-sm	font-medium	text-slate-400	uppercase	tracking-wider	mb-2">{stat.label}</h3>
<p	className={`text-4xl	font-black	${stat.color}`}>{stat.value}</p>
</GlassCard>
))}
</div>
</PageShell>
);
}