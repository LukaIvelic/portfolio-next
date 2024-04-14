import { Inter } from "next/font/google";
import './style/basic.css'

import Header from "./reusables/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luka Ivelić",
  description: "A portfolio website.",
};

export const nextConfig = {
  reactStrictMode: false
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
