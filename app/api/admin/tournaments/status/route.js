import	{	NextResponse	}	from	"next/server";
import	connectDB	from	"@/lib/db";
import	Tournament	from	"@/models/Tournament";
export	async	function	PUT(request)	{
try	{
await	connectDB();
const	{	tournamentId,	status	}	=	await	request.json();
if	(!tournamentId	||	!status)	{
return	NextResponse.json({	error:	"Missing	required	fields"	},	{	status:	400	});
}
const	updatedTournament	=	await	Tournament.findByIdAndUpdate(
tournamentId,
{	status	},
{	new:	true	}
);
return	NextResponse.json({	message:	"Status	updated	successfully",	tournament:	updatedTournament	},	{	status:	200	});
}	catch	(error)	{
return	NextResponse.json({	error:	error.message	},	{	status:	500	});
}
}