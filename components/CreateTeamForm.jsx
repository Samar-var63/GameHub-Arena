"use	client";
import	React,	{	useState	}	from	"react";
import	GlassCard	from	"@/components/GlassCard";
import	PrimaryButton	from	"@/components/PrimaryButton";
export	default	function	CreateTeamForm()	{
		const	[teamName,	setTeamName]	=	useState("");
		const	[loading,	setLoading]	=	useState(false);
		const	[message,	setMessage]	=	useState("");
		const	[error,	setError]	=	useState("");
		const	handleSubmit	=	async	(e:	React.FormEvent)	=>	{
				e.preventDefault();
				setLoading(true);
				setMessage("");
				setError("");
				try	{
						const	res	=	await	fetch("/api/teams/create",	{
								method:	"POST",
								headers:	{	"Content-Type":	"application/json"	},
								body:	JSON.stringify({
										name:	teamName,
										captainId:	"65f1a2b3c4d5e6f7a8b9c0d1"	//	Mock	Captain	ID	for	testing
								})
						});
						const	data	=	await	res.json();
						if	(!res.ok)	throw	new	Error(data.error	||	"Failed	to	create	team");
						setMessage("Team	successfully	registered	in	the	database!");
						setTeamName("");
				}	catch	(err:	any)	{
						setError(err.message);
				}	finally	{
						setLoading(false);
				}
		};
		return	(
				<GlassCard	className="p-8	max-w-lg">
						<h2	className="text-xl	font-bold	text-white	mb-4">Register	New	Team</h2>
						<form	onSubmit={handleSubmit}	className="space-y-4">
								<div>
										<label	className="block	text-sm	text-slate-400	mb-2">Team	Name</label>
										<input
												type="text"
												required
												value={teamName}
												onChange={(e)	=>	setTeamName(e.target.value)}
												placeholder="e.g.	Soul	Trigger"
												className="w-full	bg-slate-900/60	border	border-slate-700	rounded-lg	px-4	py-2	text-white	focus:outline-none	
focus:border-indigo-500	transition-all"
										/>
								</div>
								{error	&&	<p	className="text-red-500	text-sm">{error}</p>}
								{message	&&	<p	className="text-green-500	text-sm">{message}</p>}
								<PrimaryButton	type="submit"	disabled={loading}	className="w-full">
										{loading	?	"Creating..."	:	"Create	Team"}
								</PrimaryButton>
						</form>
				</GlassCard>
		);
}