import "@/app/globals.css"; 
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "GameHub Arena",
  description: "Dynamic Tournament Bracket Tracker",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}