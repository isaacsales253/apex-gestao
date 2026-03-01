"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/dashboard.css";

export default function Dashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("apex_auth");
    if (!auth) {
      router.push("/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null;

  return (
    <main className="content_view_port">
      <header className="page-header" style={{ marginBottom: '2.5rem' }}>
        <div className="header-titles">
          <h1>Dashboard</h1>
          <p>Painel de Controle Principal do Apex Gestão.</p>
        </div>
      </header>

      <div className="empty_state_card">
        <div className="empty_icon">📊</div>
        <h2>Painel em Construção</h2>
        <p>Este espaço está sendo otimizado para oferecer a melhor visualização dos seus dados.</p>
        <span className="status_badge">Aguardando Módulos</span>
      </div>
    </main>
  );
}
