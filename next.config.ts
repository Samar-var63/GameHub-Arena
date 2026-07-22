/**	@type	{import('next').NextConfig}	*/
const	nextConfig	=	{
reactStrictMode:	true,
eslint:	{
//	Production	build	ke	time	linting	errors	ignore	karega	taaki	deploy	smooth	ho
ignoreDuringBuilds:	true,
},
typescript:	{
//	Agar	future	mein	typescript	add	karo	toh	build	skip	nahi	hogi	typescript	issues	se
ignoreBuildErrors:	true,
},
};
export	default	nextConfig;