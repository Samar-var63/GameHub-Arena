export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-white min-h-screen w-full margin-0 padding-0">
        <Navbar />
        <main className="w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}