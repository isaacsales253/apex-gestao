import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "APEX GESTÃO | ERP Inteligente",
  description: "Sistema de Gestão Empresarial Completo - Compras, Estoque, Financeiro e RH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <div id="root_view_port">
          {children}
        </div>
      </body>
    </html>
  );
}
