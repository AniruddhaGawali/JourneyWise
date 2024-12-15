import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "JourneyWise",
  description: "A travelling Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-screen flex min-h-screen flex-col items-center">
        {children}
        <Footer />
      </body>
    </html>
  );
}
