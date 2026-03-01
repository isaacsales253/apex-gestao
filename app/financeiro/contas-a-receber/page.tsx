"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Edit3, 
  CheckCircle2,
  Filter,
  ArrowUpRight
} from "lucide-react";
import "@/styles/table.css";

const initialData = [
  { id: "REC-2001", client: "Cliente Delta Ltda", category: "Serviços", amount: "R$ 15.400,00", due: "2024-05-12", status: "pendente" },
  { id: "REC-2002", client: "Posto Apex Sul", category: "Produtos", amount: "R$ 4.200,00", due: "2024-05-02", status: "pago" },
  { id: "REC-2003", client: "Supermercados Alfa", category: "Consultoria", amount: "R$ 8.900,00", due: "2024-04-25", status: "atrasado" },
  { id: "REC-2004", client: "Confeitaria Doce Mel", category: "Produtos", amount: "R$ 1.550,00", due: "2024-05-18", status: "pendente" },
  { id: "REC-2005", client: "Lojas Beta SA", category: "Suporte", amount: "R$ 3.300,00", due: "2024-05-05", status: "pago" },
];

export default function ContasAReceber() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  
  // Data State
  const [data] = useState(initialData);

  // Filter States
  const [filters, setFilters] = useState({
    id: "",
    client: "",
    category: "",
    amount: "",
    due: "",
    status: ""
  });

  useEffect(() => {
    const auth = localStorage.getItem("apex_auth");
    if (!auth) {
      router.push("/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleFilterChange = (column: string, value: string) => {
    setFilters(prev => ({ ...prev, [column]: value }));
  };

  const filteredData = data.filter(item => {
    return (
      item.id.toLowerCase().includes(filters.id.toLowerCase()) &&
      item.client.toLowerCase().includes(filters.client.toLowerCase()) &&
      item.category.toLowerCase().includes(filters.category.toLowerCase()) &&
      item.amount.toLowerCase().includes(filters.amount.toLowerCase()) &&
      item.due.toLowerCase().includes(filters.due.toLowerCase()) &&
      item.status.toLowerCase().includes(filters.status.toLowerCase())
    );
  });

  if (!isAuth) return null;

  return (
    <main className="content_view_port">
      <header className="page-header">
        <div className="header-titles">
          <h1>Contas a Receber</h1>
          <p>Obrigações dos clientes, comissão e entradas (formato planilha).</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" style={{backgroundColor: 'var(--success-green)'}}>
            <Plus size={20} />
            Novo Recebimento
          </button>
        </div>
      </header>

      <section className="table_container">
        <table className="data_table">
          <thead>
            <tr>
              <th>
                <div className="th_content">
                  <span className="th_label">NF / ID <Filter size={12} /></span>
                  <input 
                    type="text" 
                    className="column_filter" 
                    placeholder="Filtrar NF"
                    value={filters.id}
                    onChange={(e) => handleFilterChange('id', e.target.value)}
                  />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Cliente / Pagador <Filter size={12} /></span>
                  <input 
                    type="text" 
                    className="column_filter" 
                    placeholder="Buscar Cliente"
                    value={filters.client}
                    onChange={(e) => handleFilterChange('client', e.target.value)}
                  />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Categoria <Filter size={12} /></span>
                  <input 
                    type="text" 
                    className="column_filter" 
                    placeholder="Filtrar Categoria"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Previsão <Filter size={12} /></span>
                  <input 
                    type="date" 
                    className="column_filter" 
                    value={filters.due}
                    onChange={(e) => handleFilterChange('due', e.target.value)}
                  />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Valor Liquido (R$) <Filter size={12} /></span>
                  <input 
                    type="text" 
                    className="column_filter" 
                    placeholder="Filtrar Valor"
                    value={filters.amount}
                    onChange={(e) => handleFilterChange('amount', e.target.value)}
                  />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Status <Filter size={12} /></span>
                  <select 
                    className="column_filter"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="pago">Recebido (Pago)</option>
                    <option value="pendente">A Receber</option>
                    <option value="atrasado">Atrasado</option>
                  </select>
                </div>
              </th>
              <th style={{width: '120px', textAlign: 'center'}}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td style={{fontWeight: 600}}>{row.id}</td>
                <td>{row.client}</td>
                <td>{row.category}</td>
                <td>{new Date(row.due).toLocaleDateString('pt-BR')}</td>
                <td style={{fontWeight: 700, color: 'var(--success-green)'}}>{row.amount}</td>
                <td>
                  <span className={`status_badge ${row.status === 'pago' ? 'status_pago' : row.status === 'atrasado' ? 'status_atrasado' : 'status_pendente'}`}>
                    {row.status === 'pago' ? 'Recebido' : row.status === 'pendente' ? 'A Receber' : 'Atrasado'}
                  </span>
                </td>
                <td>
                  <div className="table_actions">
                    <button className="action_btn" title="Confirmar Recebimento" style={{color: 'var(--success-green)'}}>
                      <CheckCircle2 size={16} />
                    </button>
                    <button className="action_btn" title="Editar">
                      <Edit3 size={16} />
                    </button>
                    <button className="action_btn" title="Emitir Boleto">
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={7} style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>
                  Nenhum registro encontrado com estes filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
