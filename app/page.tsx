"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
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
    <div className="flex">
      <Sidebar />
      <main className="main_content_dashboard" style={{padding: '2rem', flex: 1, backgroundColor: 'var(--surface-light)', minHeight: '100vh'}}>
        <header className="page-header" style={{marginBottom: '2rem'}}>
          <div className="header-titles">
            <h1 style={{fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-blue)'}}>Dashboard</h1>
            <p style={{color: 'var(--text-muted)'}}>Bem-vindo ao Apex Gestão. Comece sua gestão aqui.</p>
          </div>
        </header>

        <div className="dashboard_empty_state" style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '60vh',
          border: '2px dashed var(--border-color)',
          borderRadius: '20px',
          color: 'var(--text-muted)'
        }}>
          <p>Seu dashboard está vazio por enquanto.</p>
          <p style={{fontSize: '0.875rem'}}>Novos módulos aparecerão aqui em breve.</p>
        </div>
      </main>
    </div>
  );
}
