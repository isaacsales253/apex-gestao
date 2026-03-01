"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  TrendingUp,
  Search,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import "@/styles/despesas.css"; // Reusing the card styles for now

export default function ContasAReceber() {
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
      <header className="page-header">
        <div className="header-titles">
          <h1>Contas a Receber</h1>
          <p>Gerenciamento de entradas e faturamento.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <Plus size={20} />
            Novo Faturamento
          </button>
        </div>
      </header>

      <section className="expenses_grid">
        <RevenueCard 
          client="Cliente Delta Ltda"
          category="Serviços"
          amount="R$ 15.400,00"
          due="Vence em 2 dias"
          status="pendente"
        />
        <RevenueCard 
          client="Posto Apex Sul"
          category="Produtos"
          amount="R$ 4.200,00"
          due="Recebido hoje"
          status="pago"
        />
      </section>
    </main>
  );
}

function RevenueCard({ client, category, amount, due, status }: any) {
  return (
    <div className="expense_card">
      <div className="expense_header">
        <div className="expense_icon_bg" style={{color: 'var(--success-green)'}}><TrendingUp size={24} /></div>
        <span className={`expense_status ${status === 'pago' ? 'status_pago' : 'status_pendente'}`}>
          {status}
        </span>
      </div>

      <div className="expense_main_info">
        <h3>{client}</h3>
        <p>{category}</p>
      </div>

      <div className="expense_amount_box">
        <span className="amount_label">Valor a Receber</span>
        <span className="amount_value" style={{color: 'var(--success-green)'}}>{amount}</span>
      </div>

      <div className="expense_footer">
        <div className="expense_due_info">
          <span className="due_label">Previsão</span>
          <span className="due_date">{due}</span>
        </div>
        <div className="action_buttons">
           <button className="icon_btn"><ArrowUpRight size={18} /></button>
           <button className="icon_btn"><MoreVertical size={18} /></button>
        </div>
      </div>
    </div>
  );
}
