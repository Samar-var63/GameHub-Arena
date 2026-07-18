"use	client";
import	React,	{	useState,	useEffect	}	from	"react";
import	PageShell	from	"@/components/PageShell";
import	GlassCard	from	"@/components/GlassCard";
export	default	function	AdminDashboard()	{
		const	[tournaments,	setTournaments]	=	useState([]);
		const	[loading,	setLoading]	=	useState(true);
		useEffect(()	=>	{
				async	function	fetchAdminData()	{
						try	{
								const	res	=	await	fetch("/api/tournaments");
								const	data	=	await	res.json();
								if	(res.ok)	setTournaments(data.tournaments);
						}	catch	(err)	{
								console.error("Failed	to	load	admin	data",	err);
						}	finally	{
								setLoading(false);
						}
				}
				fetchAdminData();
		},	[]);
		const	handleStatusChange	=	async	(id,	newStatus)	=>	{
				try	{
						const	res	=	await	fetch("/api/admin/tournaments/status",	{
								method:	"PUT",
								headers:	{	"Content-Type":	"application/json"	},
								body:	JSON.stringify({	tournamentId:	id,	status:	newStatus	}),
						});
						if	(res.ok)	{
								setTournaments(tournaments.map(t	=>	t._id	===	id	?	{	...t,	status:	newStatus	}	:	t));
						}
				}	catch	(err)	{
						alert("Status	update	failed");
				}
		};
		if	(loading)	return	<div	className="text-white	p-10	text-center">Loading	Admin	Panel...</div>;
		return	(
				<PageShell	className="py-10">
						<h1	className="text-3xl	font-bold	text-white	mb-8">Admin	Control	Center</h1>
						<div	className="space-y-6">
								{tournaments.map((t)	=>	(
										<GlassCard	key={t._id}	className="flex	justify-between	items-center">
												<div>
														<h3	className="text-xl	font-bold	text-white">{t.title}</h3>
														<p	className="text-slate-400">Current	Status:	<span	className="text-indigo-400	font-semibold">{t.status}</span>
</p>
												</div>
												<div	className="space-x-2">
														<button	onClick={()	=>	handleStatusChange(t._id,	"Ongoing")}	className="bg-blue-600	hover:bg-blue-700	text-white	
px-4	py-2	rounded-lg	text-sm">Start</button>
														<button	onClick={()	=>	handleStatusChange(t._id,	"Completed")}	className="bg-green-600	hover:bg-green-700	text
white	px-4	py-2	rounded-lg	text-sm">End</button>
												</div>
										</GlassCard>
								))}
						</div>
				</PageShell>
		);
}