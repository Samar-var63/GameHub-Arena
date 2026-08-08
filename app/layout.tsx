import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#030712] text-white">
      <body className="bg-[#030712] text-white min-h-screen w-full antialiased">
        {children}
      </body>
    </html>
  );
}