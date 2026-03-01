"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Calendar, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock,
  Droplets,
  Zap,
  Wifi,
  Home,
  ShieldCheck,
  MoreVertical
} from "lucide-react";
import "@/styles/despesas.css";

export default function DespesasFixas() {
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
          <h1>Contas a Pagar</h1>
          <p>Controle de obrigações financeiras e despesas fixas.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <Plus size={20} />
            Nova Despesa
          </button>
        </div>
      </header>

      <section className="expenses_grid">
        <ExpenseCard 
          icon={<Zap size={24} />}
          title="Energia Elétrica"
          category="Utilidades"
          amount="R$ 1.250,00"
          due="Dia 10"
          status="pendente"
        />
        <ExpenseCard 
          icon={<Droplets size={24} />}
          title="Água e Saneamento"
          category="Utilidades"
          amount="R$ 380,50"
          due="Dia 15"
          status="pago"
        />
        <ExpenseCard 
          icon={<Wifi size={24} />}
          title="Internet Fibra"
          category="Telecom"
          amount="R$ 299,90"
          due="Dia 05"
          status="pago"
        />
        <ExpenseCard 
          icon={<Home size={24} />}
          title="Aluguel Sede"
          category="Infraestrutura"
          amount="R$ 8.500,00"
          due="Dia 10"
          status="pendente"
        />
        <ExpenseCard 
          icon={<ShieldCheck size={24} />}
          title="Seguro Predial"
          category="Segurança"
          amount="R$ 420,00"
          due="Dia 20"
          status="pendente"
        />
      </section>
    </main>
  );
}

function ExpenseCard({ icon, title, category, amount, due, status }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`expense_card ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
      <div className="expense_header">
        <div className="expense_icon_bg">{icon}</div>
        <span className={`expense_status ${status === 'pago' ? 'status_pago' : 'status_pendente'}`}>
          {status}
        </span>
      </div>

      <div className="expense_main_info">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>

      <div className="expense_amount_box">
        <span className="amount_label">Valor Mensal</span>
        <span className="amount_value">{amount}</span>
      </div>

      <div className="expense_footer">
        <div className="expense_due_info">
          <span className="due_label">Vencimento</span>
          <span className="due_date">{due}</span>
        </div>
        <div className="action_buttons">
          <button className="icon_btn" title="Editar"><Edit3 size={18} /></button>
          <button className="icon_btn delete" title="Excluir"><Trash2 size={18} /></button>
          <button className="icon_btn" title="Mais"><MoreVertical size={18} /></button>
        </div>
      </div>

      {isExpanded && (
        <div className="expense_details_expanded">
          <p><strong>Frequência:</strong> Mensal</p>
          <p><strong>Forma de Pagamento:</strong> Débito Automático</p>
          <p style={{marginTop: '0.5rem'}}>Este é um custo de infraestrutura essencial para a operação.</p>
        </div>
      )}
    </div>
  );
}
