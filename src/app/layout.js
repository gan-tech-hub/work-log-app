import "./globals.css";
import { Geist } from "next/font/google";
import ClientProvider from "@/components/client-provider"; // ← 追加

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "作業報告アプリ",
  description: "副業用 Next.js + Supabase CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={geistSans.variable}>
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
