"use	client";
import	React,	{	useState,	useEffect	}	from	"react";
import	PageShell	from	"@/components/PageShell";
import	GlassCard	from	"@/components/GlassCard";
import	PrimaryButton	from	"@/components/PrimaryButton";
export	default	function	DisputePanel()	{
		const	[disputes,	setDisputes]	=	useState([]);
		const	[loading,	setLoading]	=	useState(true);
		useEffect(()	=>	{
				async	function	fetchDisputes()	{
						try	{
								const	res	=	await	fetch("/api/admin/disputes");
								const	data	=	await	res.json();
								if	(res.ok)	setDisputes(data.disputes	||	[]);
						}	catch	(err)	{
								console.error("Dispute	fetch	failed",	err);
						}	finally	{
								setLoading(false);
						}
				}
				fetchDisputes();
		},	[]);
		const	resolveDispute	=	async	(matchId,	winnerTeamId)	=>	{
				try	{
						const	res	=	await	fetch("/api/admin/disputes/resolve",	{
								method:	"POST",
								headers:	{	"Content-Type":	"application/json"	},
								body:	JSON.stringify({	matchId,	winnerId:	winnerTeamId	}),
						});
						if	(res.ok)	{
								setDisputes(disputes.filter((d)	=>	d.matchId	!==	matchId));
								alert("Dispute	resolved	successfully!");
						}
				}	catch	(err)	{
						alert("Resolution	crashed");
				}
		};
		if	(loading)	return	<div	className="text-white	p-10	text-center">Loading	Disputes...</div>;
		return	(
				<PageShell	className="py-10">
						<h1	className="text-3xl	font-bold	text-white	mb-2">Dispute	Settlement	Desk</h1>
						<p	className="text-slate-400	mb-8">Resolve	conflicting	score	claims	submitted	by	team	captains.</p>
						<div	className="space-y-4">
								{disputes.length	===	0	?	(
										<p	className="text-slate-500	font-mono	text-sm">No	active	disputes	reported.</p>
								)	:	(
										disputes.map((match)	=>	(
												<GlassCard	key={match.matchId}	className="border	border-red-900/40	bg-red-950/10	p-6	flex	flex-col	md:flex-row	
justify-between	items-start	md:items-center	gap-4">
														<div>
																<span	className="text-xs	font-mono	px-2	py-1	bg-red-900/40	text-red-400	rounded-md">ID:	{match.matchId}</span>
																<div	className="text-white	mt-3	font-semibold	text-lg">
																		{match.teamAName}	({match.scoreA})	vs	{match.teamBName}	({match.scoreB})
																</div>
														</div>
														<div	className="flex	gap-2	w-full	md:w-auto">
																<button	onClick={()	=>	resolveDispute(match.matchId,	match.teamAId)}	className="bg-indigo-600	text-white	px-4	
py-2	rounded	text-xs	font-bold	hover:bg-indigo-700">Declare	Team	A	Winner</button>
																<button	onClick={()	=>	resolveDispute(match.matchId,	match.teamBId)}	className="bg-emerald-600	text-white	px-4	
py-2	rounded	text-xs	font-bold	hover:bg-emerald-700">Declare	Team	B	Winner</button>
														</div>
												</GlassCard>
										))
								)}
						</div>
				</PageShell>
		);
}