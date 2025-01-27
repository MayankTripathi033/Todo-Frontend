"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"; // Import PrimeFlex styles

import { store } from "./store";
import { Provider } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <PrimeReactProvider>{children}</PrimeReactProvider>
        </Provider>
      </body>
    </html>
  );
}
