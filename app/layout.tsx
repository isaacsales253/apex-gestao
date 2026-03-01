import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <div className="layout-container">
          {children}
        </div>
      </body>
    </html>
  );
}
