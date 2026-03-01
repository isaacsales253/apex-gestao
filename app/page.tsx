"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  TrendingDown
} from "lucide-react";
import "@/styles/dashboard.css";

export default function Dashboard() {
  const [openCard, setOpenCard] = useState<string | null>("receita");

  return (
    <div className="flex">
      <Sidebar />
      <main className="main_content_dashboard">
        <header className="page-header">
          <div className="header-titles">
            <h1>Dashboard</h1>
            <p>Bem-vindo de volta, Apex Gestão.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">Nova Operação</button>
          </div>
        </header>

        <section className="stats_grid">
          <StatCard 
            id="receita"
            title="Receita Mensal" 
            value="R$ 124.500,00" 
            icon={<DollarSign size={20} />} 
            trend="+12.5%" 
            type="up"
            isOpen={openCard === "receita"}
            onToggle={() => setOpenCard(openCard === "receita" ? null : "receita")}
            details={[
              { label: "Vendas à vista", val: "R$ 82.300,00" },
              { label: "Vendas parceladas", val: "R$ 42.200,00" },
              { label: "Meta do mês", val: "75%" }
            ]}
          />
          <StatCard 
            id="pagar"
            title="Contas a Pagar" 
            value="R$ 45.200,00" 
            icon={<TrendingDown size={20} />} 
            trend="-2.4%" 
            type="down"
            isOpen={openCard === "pagar"}
            onToggle={() => setOpenCard(openCard === "pagar" ? null : "pagar")}
            details={[
              { label: "Vencendo hoje", val: "R$ 3.500,00" },
              { label: "Próximos 7 dias", val: "R$ 12.800,00" },
              { label: "Atrasados", val: "0" }
            ]}
          />
          <StatCard 
            id="estoque"
            title="Estoque Total" 
            value="R$ 89.400,00" 
            icon={<Package size={20} />} 
            trend="+5.1%" 
            type="up"
            isOpen={openCard === "estoque"}
            onToggle={() => setOpenCard(openCard === "estoque" ? null : "estoque")}
            details={[
              { label: "Itens Críticos", val: "3" },
              { label: "Giro de Estoque", val: "12 dias" }
            ]}
          />
        </section>

        <section className="dashboard_grid">
          <div className="chart_card">
            <h3>Fluxo de Caixa (Últimos 30 dias)</h3>
            <div className="chart_placeholder">
              <p>Visualização do Fluxo de Caixa</p>
            </div>
          </div>
          <div className="alerts_card">
            <h3>Alertas de Estoque</h3>
            <ul className="alerts_list">
              <li>
                <span className="dot dot_warning"></span>
                Insumo A - Nível Baixo
              </li>
              <li>
                <span className="dot dot_critical"></span>
                Insumo B - Crítico
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ id, title, value, icon, trend, type, isOpen, onToggle, details }: any) {
  return (
    <div className={`stat_card ${isOpen ? 'expanded' : ''}`}>
      <button className="stat_header_btn" onClick={onToggle}>
        <div className="stat_main_info">
          <div className="stat_icon">{icon}</div>
          <div className="stat_info_text">
            <span className="stat_title">{title}</span>
            <span className="stat_value">{value}</span>
          </div>
        </div>
        
        <div className="stat_expand_info">
          <span className={`stat_trend ${type === 'up' ? 'stat_trend_up' : 'stat_trend_down'}`}>
            {type === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </span>
          {isOpen ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
        </div>
      </button>

      {isOpen && (
        <div className="stat_details_pane">
          {details.map((detail: any, idx: number) => (
            <div key={idx} className="detail_row">
              <span className="detail_label">{detail.label}</span>
              <span className="detail_val">{detail.val}</span>
            </div>
          ))}
          <div style={{marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '0.5rem'}}>
             <button style={{fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 600}}>
               Ver Relatório Completo →
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
