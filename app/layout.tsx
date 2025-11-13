
import "@radix-ui/themes/styles.css";
import './theme-config.css';
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
  display: "swap",
	variable: "--font-inter",
});

export default function RootLayout({ 
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme accentColor="violet" grayColor="gray" appearance="light" radius='medium' scaling="100%" className="radix-themes"> 
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  )
}
