import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BootstrapClient } from "@/components/BootstrapClient";
import Layout from "@/components/Layout/Layout";
import style from "./page.module.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rate My Software",
  description: "Get feedback on my projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " " + style["main-body"]}>
        <Layout>{children}</Layout>
        <BootstrapClient />
      </body>
    </html>
  );
}
