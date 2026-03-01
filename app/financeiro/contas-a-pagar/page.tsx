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
import { supabase } from "@/lib/supabase";

export default function ContasAPagar() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  
  // Data State
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ description: '', category: '', amount: '', due: '', status: 'pendente' });

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Filter States
  const [filters, setFilters] = useState({
    custom_id: "",
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
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch transactions
    const { data: transData } = await supabase
      .from('finance_transactions')
      .select('*')
      .eq('type', 'payable')
      .order('due_date', { ascending: true });
    
    // Fetch categories
    const { data: catData } = await supabase
      .from('finance_categories')
      .select('*')
      .eq('type', 'payable')
      .order('name', { ascending: true });

    if (transData) setData(transData);
    if (catData) setCategories(catData);
    setLoading(false);
  };

  // Actions
  const handleConfirmPagamento = async (id: string) => {
    const { error } = await supabase.from('finance_transactions').update({ status: 'pago' }).eq('id', id);
    if (!error) {
      setData(prev => prev.map(item => item.id === id ? { ...item, status: 'pago' } : item));
    } else {
      alert("Erro ao atualizar!");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
      const { error } = await supabase.from('finance_transactions').delete().eq('id', id);
      if (!error) setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const openFormModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        description: item.description, 
        category: item.category, 
        amount: item.amount.toString(), 
        due: item.due_date, 
        status: item.status 
      });
    } else {
      setEditingItem(null);
      setFormData({ description: '', category: '', amount: '', due: '', status: 'pendente' });
    }
    setIsModalOpen(true);
  };

  const handleSaveForm = async (e: any) => {
    e.preventDefault();
    const payload = {
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
      due_date: formData.due,
      status: formData.status,
      type: 'payable',
      entity_name: 'Fornecedor', // Padrão
      custom_id: editingItem ? editingItem.custom_id : `PAG-${Math.floor(1000 + Math.random() * 9000)}`
    };

    if (editingItem) {
      const { data: updated, error } = await supabase
        .from('finance_transactions')
        .update(payload)
        .eq('id', editingItem.id)
        .select()
        .single();
        
      if (!error && updated) {
        setData(prev => prev.map(item => item.id === editingItem.id ? updated : item));
      }
    } else {
      const { data: inserted, error } = await supabase
        .from('finance_transactions')
        .insert(payload)
        .select()
        .single();

      if (!error && inserted) {
        setData(prev => [...prev, inserted]);
      }
    }
    setIsModalOpen(false);
  };

  // Category Actions
  const handleSaveCategory = async (e: any) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    if (editingCategory) {
      const { data: updated, error } = await supabase
        .from('finance_categories')
        .update({ name: newCategoryName })
        .eq('id', editingCategory.id)
        .select()
        .single();
        
      if (!error && updated) {
        setCategories(prev => prev.map(c => c.id === editingCategory.id ? updated : c));
        setEditingCategory(null);
      }
    } else {
      const { data: inserted, error } = await supabase
        .from('finance_categories')
        .insert({ name: newCategoryName, type: 'payable' })
        .select()
        .single();
        
      if (!error && inserted) {
        setCategories(prev => [...prev, inserted]);
      }
    }
    setNewCategoryName("");
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      const { error } = await supabase.from('finance_categories').delete().eq('id', id);
      if (!error) {
        setCategories(prev => prev.filter(c => c.id !== id));
      }
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
      (item.custom_id || '').toLowerCase().includes(filters.custom_id.toLowerCase()) &&
      (item.description || '').toLowerCase().includes(filters.description.toLowerCase()) &&
      (item.category || '').toLowerCase().includes(filters.category.toLowerCase()) &&
      (item.amount?.toString() || '').includes(filters.amount) &&
      (item.due_date || '').includes(filters.due) &&
      (item.status || '').toLowerCase().includes(filters.status.toLowerCase())
    );
  });

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (!isAuth) return null;

  return (
    <main className="content_view_port">
      <header className="page-header">
        <div className="header-titles">
          <h1>Contas a Pagar</h1>
          <p>Obrigações e despesas no formato de planilha com filtros integrados ao banco.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => openFormModal()} disabled={loading}>
            <Plus size={20} />
            {loading ? 'Carregando...' : 'Nova Obrigação'}
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
                  <input type="text" className="column_filter" placeholder="Filtrar ID" value={filters.custom_id} onChange={(e) => handleFilterChange('custom_id', e.target.value)} />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Descrição <Filter size={12} /></span>
                  <input type="text" className="column_filter" placeholder="Filtrar Descrição" value={filters.description} onChange={(e) => handleFilterChange('description', e.target.value)} />
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
                  <span className="th_label">Vencimento <Filter size={12} /></span>
                  <input type="date" className="column_filter" value={filters.due} onChange={(e) => handleFilterChange('due', e.target.value)} />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Valor (R$) <Filter size={12} /></span>
                  <input type="text" className="column_filter" placeholder="Filtrar Valor" value={filters.amount} onChange={(e) => handleFilterChange('amount', e.target.value)} />
                </div>
              </th>
              <th>
                 <div className="th_content">
                  <span className="th_label">Status <Filter size={12} /></span>
                  <select className="column_filter" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                    <option value="">Todos</option>
                    <option value="pago">Pago</option>
                    <option value="pendente">Pendente</option>
                    <option value="atrasado">Atrasado</option>
                  </select>
                </div>
              </th>
              <th style={{width: '120px', textAlign: 'center'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} style={{textAlign: 'center', padding: '3rem'}}>Conectando ao banco de dados...</td></tr>}
            {!loading && filteredData.map((row) => (
              <tr key={row.id}>
                <td style={{fontWeight: 600}}>{row.custom_id}</td>
                <td>{row.description}</td>
                <td>{row.category}</td>
                <td>{new Date(`${row.due_date}T00:00:00`).toLocaleDateString('pt-BR')}</td>
                <td style={{fontWeight: 700}}>{formatCurrency(row.amount)}</td>
                <td>
                  <span className={`status_badge ${row.status === 'pago' ? 'status_pago' : row.status === 'atrasado' ? 'status_atrasado' : 'status_pendente'}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="table_actions">
                    <button className="action_btn" title="Aprovar/Pagar" style={{color: row.status === 'pago' ? 'var(--text-muted)' : 'var(--success-green)'}} onClick={() => handleConfirmPagamento(row.id)} disabled={row.status === 'pago'}>
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
            {!loading && filteredData.length === 0 && (
              <tr><td colSpan={7} style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>Nenhum registro encontrado no banco de dados.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Main Form Modal */}
      {isModalOpen && (
        <div className="modal_overlay">
          <div className="modal_content">
            <div className="modal_header">
              <h2>{editingItem ? 'Editar Conta a Pagar' : 'Nova Obrigação'}</h2>
              <button className="close_btn" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveForm} className="modal_body">
              <div className="form_group">
                <label>Descrição</label>
                <input type="text" className="input_field" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
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
                  <label>Vencimento</label>
                  <input type="date" className="input_field" required value={formData.due} onChange={e => setFormData({...formData, due: e.target.value})} />
                </div>
              </div>
              <div className="form_group">
                <label>Status</label>
                <select className="input_field" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="atrasado">Atrasado</option>
                </select>
              </div>
              <div className="modal_footer">
                <button type="button" className="btn" style={{border: '1px solid var(--border-color)', background: 'white'}} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar Obrigação</button>
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
