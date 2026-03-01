"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  Filter,
  X,
  Settings2
} from "lucide-react";
import "@/styles/table.css";

const initialData = [
  { id: "REC-2001", client: "Cliente Delta Ltda", category: "Serviços", amount: "15400.00", due: "2024-05-12", status: "pendente" },
  { id: "REC-2002", client: "Posto Apex Sul", category: "Produtos", amount: "4200.00", due: "2024-05-02", status: "pago" },
  { id: "REC-2003", client: "Supermercados Alfa", category: "Consultoria", amount: "8900.00", due: "2024-04-25", status: "atrasado" },
  { id: "REC-2004", client: "Confeitaria Doce Mel", category: "Produtos", amount: "1550.00", due: "2024-05-18", status: "pendente" },
  { id: "REC-2005", client: "Lojas Beta SA", category: "Suporte", amount: "3300.00", due: "2024-05-05", status: "pago" },
];

const initialCategories = [
  { id: '1', name: 'Serviços' },
  { id: '2', name: 'Produtos' },
  { id: '3', name: 'Consultoria' },
  { id: '4', name: 'Suporte' }
];

export default function ContasAReceber() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  
  // Data State
  const [data, setData] = useState(initialData);
  const [categories, setCategories] = useState(initialCategories);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ client: '', category: '', amount: '', due: '', status: 'pendente' });

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<any>(null);

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

  // Actions
  const handleConfirmRecebimento = (id: string) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, status: 'pago' } : item));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este recebimento?")) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const openFormModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ client: item.client, category: item.category, amount: item.amount, due: item.due, status: item.status });
    } else {
      setEditingItem(null);
      setFormData({ client: '', category: '', amount: '', due: '', status: 'pendente' });
    }
    setIsModalOpen(true);
  };

  const handleSaveForm = (e: any) => {
    e.preventDefault();
    if (editingItem) {
      setData(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
    } else {
      const newId = `REC-200${data.length + 1}`;
      setData(prev => [...prev, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
  };

  // Category Actions
  const handleSaveCategory = (e: any) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, name: newCategoryName } : c));
      setEditingCategory(null);
    } else {
      setCategories(prev => [...prev, { id: Date.now().toString(), name: newCategoryName }]);
    }
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setNewCategoryName(cat.name);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
    setNewCategoryName("");
  };

  // Filters
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

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return `R$ ${value}`;
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (!isAuth) return null;

  return (
    <main className="content_view_port">
      <header className="page-header">
        <div className="header-titles">
          <h1>Contas a Receber</h1>
          <p>Obrigações dos clientes, comissão e entradas (formato planilha).</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" style={{backgroundColor: 'var(--success-green)'}} onClick={() => openFormModal()}>
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
                  <input type="text" className="column_filter" placeholder="Origem" value={filters.id} onChange={(e) => handleFilterChange('id', e.target.value)} />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Cliente / Pagador <Filter size={12} /></span>
                  <input type="text" className="column_filter" placeholder="Buscar Cliente" value={filters.client} onChange={(e) => handleFilterChange('client', e.target.value)} />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Categoria <Filter size={12} /></span>
                  <select className="column_filter" value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
                    <option value="">Todas</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Previsão <Filter size={12} /></span>
                  <input type="date" className="column_filter" value={filters.due} onChange={(e) => handleFilterChange('due', e.target.value)} />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Valor Liquido (R$) <Filter size={12} /></span>
                  <input type="text" className="column_filter" placeholder="Filtrar Valor" value={filters.amount} onChange={(e) => handleFilterChange('amount', e.target.value)} />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Status <Filter size={12} /></span>
                  <select className="column_filter" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                    <option value="">Todos</option>
                    <option value="pago">Recebido (Pago)</option>
                    <option value="pendente">A Receber</option>
                    <option value="atrasado">Atrasado</option>
                  </select>
                </div>
              </th>
              <th style={{width: '120px', textAlign: 'center'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td style={{fontWeight: 600}}>{row.id}</td>
                <td>{row.client}</td>
                <td>{row.category}</td>
                <td>{new Date(row.due).toLocaleDateString('pt-BR' , { timeZone: 'UTC' })}</td>
                <td style={{fontWeight: 700, color: 'var(--success-green)'}}>{formatCurrency(row.amount)}</td>
                <td>
                  <span className={`status_badge ${row.status === 'pago' ? 'status_pago' : row.status === 'atrasado' ? 'status_atrasado' : 'status_pendente'}`}>
                    {row.status === 'pago' ? 'Recebido' : row.status === 'pendente' ? 'A Receber' : 'Atrasado'}
                  </span>
                </td>
                <td>
                  <div className="table_actions">
                    <button className="action_btn" title="Confirmar Recebimento" style={{color: row.status === 'pago' ? 'var(--text-muted)' : 'var(--success-green)'}} onClick={() => handleConfirmRecebimento(row.id)} disabled={row.status === 'pago'}>
                      <CheckCircle2 size={16} />
                    </button>
                    <button className="action_btn" title="Editar" onClick={() => openFormModal(row)}>
                      <Edit3 size={16} />
                    </button>
                    <button className="action_btn delete" title="Excluir" onClick={() => handleDelete(row.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>Nenhum registro encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Main Form Modal */}
      {isModalOpen && (
        <div className="modal_overlay">
          <div className="modal_content">
            <div className="modal_header">
              <h2>{editingItem ? 'Editar Recebimento' : 'Novo Recebimento'}</h2>
              <button className="close_btn" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveForm} className="modal_body">
              <div className="form_group">
                <label>Cliente / Pagador</label>
                <input type="text" className="input_field" required value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
              </div>
              <div className="form_group">
                <div className="label_with_action">
                  <label>Categoria</label>
                  <button type="button" className="text_btn" onClick={() => setIsCategoryModalOpen(true)}>
                    <Settings2 size={14} /> Gerenciar
                  </button>
                </div>
                <select className="input_field" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">Selecione uma categoria...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form_grid">
                <div className="form_group">
                  <label>Valor (R$)</label>
                  <input type="number" step="0.01" className="input_field" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div className="form_group">
                  <label>Previsão</label>
                  <input type="date" className="input_field" required value={formData.due} onChange={e => setFormData({...formData, due: e.target.value})} />
                </div>
              </div>
              <div className="form_group">
                <label>Status</label>
                <select className="input_field" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="pendente">A Receber</option>
                  <option value="pago">Recebido</option>
                  <option value="atrasado">Atrasado</option>
                </select>
              </div>
              <div className="modal_footer">
                <button type="button" className="btn" style={{border: '1px solid var(--border-color)', background: 'white'}} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{backgroundColor: 'var(--success-green)'}}>Salvar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Management Modal (Nested) */}
      {isCategoryModalOpen && (
        <div className="modal_overlay modal_overlay_nested">
          <div className="modal_content" style={{maxWidth: '400px'}}>
             <div className="modal_header">
                <h2>Gerenciar Categorias</h2>
                <button type="button" className="close_btn" onClick={closeCategoryModal}><X size={20} /></button>
             </div>
             <div className="modal_body">
                <form onSubmit={handleSaveCategory} style={{display: 'flex', gap: '8px'}}>
                  <input type="text" className="input_field" style={{flex: 1}} required placeholder="Nova categoria..." value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                  <button type="submit" className="btn btn-primary" style={{padding: '0.75rem 1rem'}}>
                    {editingCategory ? 'Atualizar' : 'Adicionar'}
                  </button>
                </form>
                
                <div className="category_list">
                  {categories.length === 0 && <p style={{textAlign:'center', color:'var(--text-muted)'}}>Nenhuma categoria.</p>}
                  {categories.map(cat => (
                    <div key={cat.id} className="category_item">
                      <span>{cat.name}</span>
                      <div className="category_actions">
                        <button type="button" className="icon_btn" onClick={() => handleEditCategory(cat)} title="Editar"><Edit3 size={16}/></button>
                        <button type="button" className="icon_btn delete" onClick={() => handleDeleteCategory(cat.id)} title="Excluir"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      )}

    </main>
  );
}
