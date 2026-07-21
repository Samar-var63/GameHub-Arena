"use	client";
import	React,	{	useState	}	from	"react";
import	GlassCard	from	"./GlassCard";
export	default	function	MatchFilters({	onFilterChange	})	{
		const	[search,	setSearch]	=	useState("");
		const	[status,	setStatus]	=	useState("All");
		const	handleSearchChange	=	(e)	=>	{
				const	val	=	e.target.value;
				setSearch(val);
				if	(onFilterChange)	onFilterChange({	search:	val,	status	});
		};
		const	handleStatusClick	=	(currStatus)	=>	{
				setStatus(currStatus);
				if	(onFilterChange)	onFilterChange({	search,	status:	currStatus	});
		};
		const	tabs	=	["All",	"Live",	"Completed",	"Disputed"];
		return	(
				<GlassCard	className="p-4	border	border-slate-800	bg-slate-900/40	backdrop-blur-md	mb-6	w-full	flex	flex-col	md:flex-row	
gap-4	justify-between	items-center">
						<div	className="w-full	md:w-72	relative">
								<input
										type="text"
										placeholder="Search	by	team	name	or	match	ID..."
										value={search}
										onChange={handleSearchChange}
										className="w-full	bg-slate-950/80	border	border-slate-800	rounded-lg	px-4	py-2	text-sm	text-white	placeholder-slate
500	focus:outline-none	focus:border-indigo-500	transition-colors"
								/>
						</div>
						<div	className="flex	gap-2	w-full	md:w-auto	overflow-x-auto">
								{tabs.map((tab)	=>	(
										<button
												key={tab}
												onClick={()	=>	handleStatusClick(tab)}
												className={`px-4	py-1.5	rounded-md	text-xs	font-semibold	tracking-wide	transition-all	${
														status	===	tab
																?	"bg-indigo-600	text-white	shadow-lg	shadow-indigo-600/20"
																:	"bg-slate-950	text-slate-400	hover:text-white	border	border-slate-800"
												}`}
										>
												{tab}
										</button>
								))}
						</div>
				</GlassCard>
		);
}