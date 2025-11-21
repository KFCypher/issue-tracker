
import "@radix-ui/themes/styles.css";
import './theme-config.css';
import "./globals.css";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/provider";
import QueryClientProvider from "./QueryClientProvider";

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
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet" grayColor="gray" appearance="light" radius='medium' scaling="100%" className="radix-themes"> 
              <NavBar />
              <main className="p-5">
                <Container>
                  {children}
                </Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
