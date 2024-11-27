import localFont from "next/font/local";
import "./globals.css";
import { monserrat } from "./fonts/fonts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Grupo 13",
  description: "Trabajo Integrador Diseño de Sistemas Grupo 13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
