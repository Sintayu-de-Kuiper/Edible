import { Inter } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen px-32`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
