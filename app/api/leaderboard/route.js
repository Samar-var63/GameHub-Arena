import	{	NextResponse	}	from	"next/server";
import	connectDB	from	"@/lib/db";
import	Team	from	"@/models/Team";
export	async	function	POST(request)	{
try	{
await	connectDB();
const	{	teamId,	matchOutcome	}	=	await	request.json();	//	matchOutcome	can	be	'Win'	or	'Loss'
if	(!teamId	||	!matchOutcome)	{
return	NextResponse.json({	error:	"Missing	teamId	or	matchOutcome"	},	{	status:	400	});
}
//	Dynamic	multiplier	calculations:	500	XP	points	for	win,	100	XP	points	contribution	for	loss
const	pointsIncrement	=	matchOutcome	===	"Win"	?	500	:	100;
const	updatedTeam	=	await	Team.findByIdAndUpdate(
teamId,
{	$inc:	{	circuitPoints:	pointsIncrement	}	},
{	new:	true	}
);
if	(!updatedTeam)	{
return	NextResponse.json({	error:	"Team	record	does	not	exist"	},	{	status:	404	});
}
return	NextResponse.json({
message:	`Global	standing	points	adjusted	successfully	(+${pointsIncrement}	XP)`,
team:	updatedTeam.name,
currentPoints:	updatedTeam.circuitPoints
},	{	status:	200	});
}	catch	(error)	{
return	NextResponse.json({	error:	error.message	},	{	status:	500	});
}
}