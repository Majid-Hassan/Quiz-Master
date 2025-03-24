import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import LeaderboardModal from "@/components/ui/LeaderboardModal";
import HeaderActions from "@/components/ui/HeaderActions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quizo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="fixed top-4 right-4 z-50 flex items-center gap-3">
            <HeaderActions />
          </header>
          <LeaderboardModal />
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
