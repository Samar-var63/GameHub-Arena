import	React	from	"react";
import	PageShell	from	"@/components/PageShell";
import	TournamentCard	from	"@/components/TournamentCard";
export	const	metadata	=	{
		title:	"Dashboard	|	GameHub	Arena",
};
export	default	function	DashboardPage()	{
		//	Day	2	Static	Data	Mapping	(Will	connect	to	API	on	Day	3)
		const	tournaments	=	[
				{	_id:	"1",	title:	"Valorant	Championship",	gameName:	"Valorant",	status:	"Upcoming",	maxTeams:	32	},
				{	_id:	"2",	title:	"CS:GO	Masters",	gameName:	"CS:GO",	status:	"Ongoing",	maxTeams:	16	},
		];
		return	(
				<PageShell	className="py-10">
						<h1	className="text-3xl	font-bold	text-white	mb-8">Live	Tournaments</h1>
						<div	className="grid	grid-cols-1	md:grid-cols-2	lg:grid-cols-3	gap-6">
								{tournaments.map((t)	=>	(
										<TournamentCard
												key={t._id}
												title={t.title}
												gameName={t.gameName}
												status={t.status}
												maxTeams={t.maxTeams}
										/>
								))}
						</div>
				</PageShell>
		);
}