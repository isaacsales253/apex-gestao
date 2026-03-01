"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  Filter,
  MoreVertical
} from "lucide-react";
import "@/styles/table.css";

const initialData = [
  { id: "AP-1001", description: "Energia Elétrica", category: "Utilidades", amount: "R$ 1.250,00", due: "2024-05-10", status: "pendente" },
  { id: "AP-1002", description: "Água e Saneamento", category: "Utilidades", amount: "R$ 380,50", due: "2024-05-15", status: "pago" },
  { id: "AP-1003", description: "Internet Fibra", category: "Telecom", amount: "R$ 299,90", due: "2024-05-05", status: "pago" },
  { id: "AP-1004", description: "Aluguel Sede", category: "Infraestrutura", amount: "R$ 8.500,00", due: "2024-05-10", status: "pendente" },
  { id: "AP-1005", description: "Seguro Predial", category: "Segurança", amount: "R$ 420,00", due: "2024-05-20", status: "pendente" },
  { id: "AP-1006", description: "Fornecedor TI - Licenças", category: "TI", amount: "R$ 1.800,00", due: "2024-04-30", status: "atrasado" },
];

export default function ContasAPagar() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  
  // Data State
  const [data, setData] = useState(initialData);

  // Filter States
  const [filters, setFilters] = useState({
    id: "",
    description: "",
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
      item.description.toLowerCase().includes(filters.description.toLowerCase()) &&
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
          <h1>Contas a Pagar</h1>
          <p>Obrigações e despesas no formato de planilha com filtros.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <Plus size={20} />
            Nova Obrigação
          </button>
        </div>
      </header>

      <section className="table_container">
        <table className="data_table">
          <thead>
            <tr>
              <th>
                <div className="th_content">
                  <span className="th_label">Cód / ID <Filter size={12} /></span>
                  <input 
                    type="text" 
                    className="column_filter" 
                    placeholder="Filtrar ID"
                    value={filters.id}
                    onChange={(e) => handleFilterChange('id', e.target.value)}
                  />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Descrição <Filter size={12} /></span>
                  <input 
                    type="text" 
                    className="column_filter" 
                    placeholder="Filtrar Descrição"
                    value={filters.description}
                    onChange={(e) => handleFilterChange('description', e.target.value)}
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
                  <span className="th_label">Vencimento <Filter size={12} /></span>
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
                  <span className="th_label">Valor (R$) <Filter size={12} /></span>
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
                    <option value="pago">Pago</option>
                    <option value="pendente">Pendente</option>
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
                <td>{row.description}</td>
                <td>{row.category}</td>
                <td>{new Date(row.due).toLocaleDateString('pt-BR')}</td>
                <td style={{fontWeight: 700}}>{row.amount}</td>
                <td>
                  <span className={`status_badge ${row.status === 'pago' ? 'status_pago' : row.status === 'atrasado' ? 'status_atrasado' : 'status_pendente'}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="table_actions">
                    <button className="action_btn" title="Aprovar/Pagar">
                      <CheckCircle2 size={16} />
                    </button>
                    <button className="action_btn" title="Editar">
                      <Edit3 size={16} />
                    </button>
                    <button className="action_btn delete" title="Excluir">
                      <Trash2 size={16} />
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
