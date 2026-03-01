"use client";

import Sidebar from "@/components/Sidebar";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp 
} from "lucide-react";
import "@/styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="main_content">
        <header className="page_header">
          <div className="header_titles">
            <h1>Dashboard</h1>
            <p>Bem-vindo de volta, Apex Gestão.</p>
          </div>
          <div className="header_actions">
            <button className="btn btn_primary">Nova Operação</button>
          </div>
        </header>

        <section className="stats_grid">
          <StatCard 
            title="Receita Mensal" 
            value="R$ 124.500,00" 
            trend="+12.5%" 
            trendUp={true}
            icon={<DollarSign />}
          />
          <StatCard 
            title="Contas a Pagar" 
            value="R$ 45.200,00" 
            trend="-2.4%" 
            trendUp={false}
            icon={<ArrowDownRight />}
          />
          <StatCard 
            title="Estoque Total" 
            value="R$ 89.400,00" 
            trend="+5.1%" 
            trendUp={true}
            icon={<Package />}
          />
          <StatCard 
            title="Novas Compras" 
            value="12 Pedidos" 
            trend="+3" 
            trendUp={true}
            icon={<ShoppingCart />}
          />
        </section>

        <section className="dashboard_grid">
          <div className="card large_card">
            <h3>Fluxo de Caixa (Últimos 30 dias)</h3>
            <div className="chart_placeholder">
              <p>Visualização do Fluxo de Caixa</p>
            </div>
          </div>
          <div className="card small_card">
            <h3>Alertas de Estoque</h3>
            <ul className="alert_list">
              <li>
                <span className="dot dot_warning"></span>
                Insumo A - Nível Baixo
              </li>
              <li>
                <span className="dot dot_danger"></span>
                Insumo B - Crítico
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon }: any) {
  return (
    <div className="stat_card">
      <div className="stat_icon">{icon}</div>
      <div className="stat_info">
        <span className="stat_title">{title}</span>
        <span className="stat_value">{value}</span>
        <div className={`stat_trend ${trendUp ? 'stat_trend_up' : 'stat_trend_down'}`}>
          {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
}
