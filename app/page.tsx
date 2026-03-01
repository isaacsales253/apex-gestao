"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, LayoutDashboard } from "lucide-react";
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
        <div className="empty_icon">🚀</div>
        <h2>Seja bem-vindo, Administrador</h2>
        <p>O Apex Gestão foi otimizado. Selecione um módulo abaixo para começar.</p>
        
        <div style={{
          display: 'flex', 
          gap: '1.5rem', 
          marginTop: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button 
            className="btn btn-primary" 
            onClick={() => router.push('/financeiro/contas-a-pagar')}
            style={{padding: '1.5rem 2rem', fontSize: '1rem', borderRadius: '16px'}}
          >
            <DollarSign size={24} />
            Gerenciar Financeiro
          </button>
          
          <button 
            className="btn" 
            style={{
              padding: '1.5rem 2rem', 
              fontSize: '1rem', 
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'white',
              color: 'var(--primary-blue)'
            }}
          >
            <LayoutDashboard size={24} />
            Módulos em Breve
          </button>
        </div>

        <span className="status_badge" style={{marginTop: '2.5rem'}}>Sistema Otimizado (Vercel)</span>
      </div>
    </main>
  );
}
