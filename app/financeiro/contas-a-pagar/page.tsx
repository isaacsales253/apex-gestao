"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import "@/styles/financeiro.css";

export default function ContasAPagar() {
  const [activeTab, setActiveTab] = useState('pendentes');

  return (
    <div className="flex">
      <Sidebar />
      <main className="main_content_financeiro">
        <header className="page-header">
          <div className="header-titles">
            <h1>Contas a Pagar</h1>
            <p>Gerencie seus compromissos financeiros e fornecedores.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">
              <Plus size={18} />
              Nova Conta
            </button>
          </div>
        </header>

        <div className="table_card">
          <div className="table_controls">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'pendentes' ? 'tab_active' : ''}`}
                onClick={() => setActiveTab('pendentes')}
              >
                Pendentes
              </button>
              <button 
                className={`tab ${activeTab === 'pagas' ? 'tab_active' : ''}`}
                onClick={() => setActiveTab('pagas')}
              >
                Pagas
              </button>
            </div>
            
            <div className="search_box">
              <Search size={18} className="search_icon" />
              <input type="text" placeholder="Buscar por descrição ou empresa..." />
            </div>
          </div>

          <table className="data_table">
            <thead>
              <tr>
                <th>Vencimento</th>
                <th>Descrição</th>
                <th>Fornecedor</th>
                <th>Valor</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TransactionRow 
                due="15 Mai, 2024" 
                desc="Compra de Insumos - Lote #102" 
                entity="Atacadista Sul" 
                amount="R$ 4.500,00" 
                status="pending" 
              />
              <TransactionRow 
                due="18 Mai, 2024" 
                desc="Aluguel Escritório" 
                entity="Imobiliária Apex" 
                amount="R$ 8.200,00" 
                status="pending" 
              />
              <TransactionRow 
                due="10 Mai, 2024" 
                desc="Energia Elétrica" 
                entity="Enel" 
                amount="R$ 1.250,50" 
                status="paid" 
              />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function TransactionRow({ due, desc, entity, amount, status }: any) {
  return (
    <tr className="table_row">
      <td style={{fontWeight: 500}}>{due}</td>
      <td>{desc}</td>
      <td>{entity}</td>
      <td style={{fontWeight: 700, color: 'var(--primary-blue)'}}>{amount}</td>
      <td>
        <span className={`status_badge ${status === 'paid' ? 'status_paid' : 'status_pending'}`}>
          {status === 'paid' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
          {status === 'paid' ? 'Pago' : 'Pendente'}
        </span>
      </td>
      <td>
        <button className="action_btn">
          <MoreVertical size={18} />
        </button>
      </td>
    </tr>
  );
}
