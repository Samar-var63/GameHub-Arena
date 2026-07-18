import	{	NextResponse	}	from	"next/server";
import	connectDB	from	"@/lib/db";
import	Bracket	from	"@/models/Bracket";
export	async	function	POST(request)	{
try	{
await	connectDB();
const	{	matchId,	teamId,	claimedScore	}	=	await	request.json();
const	bracket	=	await	Bracket.findOne({	"matches.matchId":	matchId	});
if	(!bracket)	return	NextResponse.json({	error:	"Match	context	not	found"	},	{	status:	404	});
const	match	=	bracket.matches.find(m	=>	m.matchId	===	matchId);
//	Score	conflict	detection	logic
if	(match.status	===	"Pending")	{
if	(match.teamA.toString()	===	teamId)	match.scoreA	=	claimedScore;
if	(match.teamB.toString()	===	teamId)	match.scoreB	=	claimedScore;
match.status	=	"Reviewing";
}	else	if	(match.status	===	"Reviewing")	{
//	If	second	team	updates,	assess	consistency
if	(match.teamA.toString()	===	teamId)	match.scoreA	=	claimedScore;
if	(match.teamB.toString()	===	teamId)	match.scoreB	=	claimedScore;
//	Simple	verification	check:	status	changes	to	dispute	if	both	claims	don't	match	standard
if	(match.scoreA	===	match.scoreB	&&	match.scoreA	!==	0)	{
match.status	=	"Disputed";	//	Anti-cheat	flag	triggered
}	else	{
match.status	=	"Completed";
match.winner	=	match.scoreA	>	match.scoreB	?	match.teamA	:	match.teamB;
}
}
await	bracket.save();
return	NextResponse.json({	message:	`Score	processed.	Match	status	is	now:	${match.status}`,	match	},	{	status:	200	});
}	catch	(error)	{
return	NextResponse.json({	error:	error.message	},	{	status:	500	});
}
}