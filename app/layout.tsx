import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#030712] text-white">
      <body className="bg-[#030712] text-white min-h-screen w-full antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}