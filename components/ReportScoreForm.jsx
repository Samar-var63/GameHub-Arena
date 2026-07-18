"use	client";
import	React,	{	useState	}	from	"react";
import	GlassCard	from	"./GlassCard";
import	PrimaryButton	from	"./PrimaryButton";
export	default	function	ReportScoreForm({	matchId,	userTeamId	})	{
		const	[score,	setScore]	=	useState(0);
		const	[loading,	setLoading]	=	useState(false);
		const	[msg,	setMsg]	=	useState("");
		const	handleSubmit	=	async	(e)	=>	{
				e.preventDefault();
				setLoading(true);
				setMsg("");
				try	{
						const	res	=	await	fetch("/api/matches/report",	{
								method:	"POST",
								headers:	{	"Content-Type":	"application/json"	},
								body:	JSON.stringify({	matchId,	teamId:	userTeamId,	claimedScore:	score	})
						});
						const	data	=	await	res.json();
						setMsg(data.message	||	data.error);
				}	catch	(err)	{
						setMsg("Submission	crash");
				}	finally	{
						setLoading(false);
				}
		};
		return	(
				<GlassCard	className="p-6	max-w-sm">
						<h3	className="text-lg	font-bold	text-white	mb-3">Report	Match	Score</h3>
						<form	onSubmit={handleSubmit}	className="space-y-4">
								<div>
										<label	className="text-xs	text-slate-400	block	mb-1">Your	Team	Score</label>
										<input
												type="number"
												value={score}
												onChange={(e)	=>	setScore(Number(e.target.value))}
												className="w-full	bg-slate-900	border	border-slate-700	rounded	p-2	text-white"
												required
										/>
								</div>
								{msg	&&	<p	className="text-xs	text-indigo-400	font-mono">{msg}</p>}
								<PrimaryButton	type="submit"	disabled={loading}	className="w-full	text-sm">
										{loading	?	"Submitting..."	:	"Submit	Score"}
								</PrimaryButton>
						</form>
				</GlassCard>
		);
}