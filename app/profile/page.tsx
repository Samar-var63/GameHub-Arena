"use	client";
import	React,	{	useEffect,	useState	}	from	"react";
import	PageShell	from	"@/components/PageShell";
import	GlassCard	from	"@/components/GlassCard";
interface	UserProfile	{
		username:	string;
		email:	string;
		role:	string;
}
export	default	function	ProfilePage()	{
		const	[user,	setUser]	=	useState<UserProfile	|	null>(null);
		const	[loading,	setLoading]	=	useState(true);
		const	[error,	setError]	=	useState("");
		useEffect(()	=>	{
				async	function	fetchProfile()	{
						try	{
								//	Test	user	ID	(Normally	extracted	from	authenticated	session	cookie/token)
								const	userId	=	"65f1a2b3c4d5e6f7a8b9c0d1";
								const	res	=	await	fetch(`/api/user/profile?id=${userId}`);
								const	data	=	await	res.json();
								if	(!res.ok)	throw	new	Error(data.error	||	"Failed	to	load	profile");
								setUser(data.user);
						}	catch	(err:	any)	{
								setError(err.message);
						}	finally	{
								setLoading(false);
						}
				}
				fetchProfile();
		},	[]);
		return	(
				<PageShell	className="py-10">
						<h1	className="text-3xl	font-bold	text-white	mb-6">Player	Profile</h1>
						{loading	&&	(
								<div	className="text-slate-400	animate-pulse">Loading	profile	data...</div>
						)}
						{error	&&	(
								<div	className="text-red-500	bg-red-500/10	border	border-red-500/20	p-4	rounded-lg">
										{error}
								</div>
						)}
						{user	&&	!loading	&&	(
								<GlassCard	className="p-8	max-w-xl">
										<div	className="flex	items-center	space-x-6	mb-6">
												<div	className="rounded-full	bg-gradient-to-r	from-indigo-500	to-purple-500	h-20	w-20	flex	items-center	justify
center	text-2xl	font-bold	text-white">
														{user.username.substring(0,	2).toUpperCase()}
												</div>
												<div>
														<h2	className="text-2xl	font-bold	text-white">{user.username}</h2>
														<p	className="text-indigo-400	font-medium	capitalize">{user.role}</p>
												</div>
										</div>
										<div	className="space-y-4	border-t	border-slate-700/50	pt-4	text-slate-300">
												<div>
														<span	className="text-xs	text-slate-500	block	uppercase	tracking-wider">Email	Address</span>
														<span	className="text-white	font-medium">{user.email}</span>
												</div>
										</div>
								</GlassCard>
						)}
				</PageShell>
		);
}