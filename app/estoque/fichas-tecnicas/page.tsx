"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Package, 
  Trash2, 
  Edit3,
  Coffee,
  UtensilsCrossed,
  Pizza
} from "lucide-react";
import "@/styles/fichas-tecnicas.css";

export default function FichasTecnicas() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="main_content_sheets">
        <header className="page-header">
          <div className="header-titles">
            <h1>Fichas Técnicas</h1>
            <p>Composição de custos, insumos e rendimento por produto.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">
              <Plus size={18} />
              Nova Ficha
            </button>
          </div>
        </header>

        <section className="sheets_container">
          <SheetAccordionItem 
            id={1}
            title="Hambúrguer Gourmet Apex" 
            category="Pratos Principais"
            yieldVal="10 Unidades"
            totalCost="R$ 145,20"
            unitCost="R$ 14,52"
            icon={<UtensilsCrossed size={20} />}
            isOpen={openId === 1}
            onToggle={() => toggle(1)}
            ingredients={[
              { name: "Carne Bovina (Blend)", qty: "2.0 kg", unitCost: "R$ 45,00", total: "R$ 90,00" },
              { name: "Pão Brioche", qty: "10 un", unitCost: "R$ 2,50", total: "R$ 25,00" },
              { name: "Queijo Cheddar", qty: "0.5 kg", unitCost: "R$ 38,00", total: "R$ 19,00" },
              { name: "Bacon Fatiado", qty: "0.3 kg", unitCost: "R$ 37,33", total: "R$ 11,20" },
            ]}
          />

          <SheetAccordionItem 
            id={2}
            title="Pizza Artesanal (M)" 
            category="Pizzas"
            yieldVal="5 Unidades"
            totalCost="R$ 98,50"
            unitCost="R$ 19,70"
            icon={<Pizza size={20} />}
            isOpen={openId === 2}
            onToggle={() => toggle(2)}
            ingredients={[
              { name: "Farinha Tipo 00", qty: "3.0 kg", unitCost: "R$ 12,00", total: "R$ 36,00" },
              { name: "Molho de Tomate", qty: "1.0 l", unitCost: "R$ 15,00", total: "R$ 15,00" },
              { name: "Mussarela Rala", qty: "1.5 kg", unitCost: "R$ 31,66", total: "R$ 47,50" },
            ]}
          />

          <SheetAccordionItem 
            id={3}
            title="Café Apex Especial" 
            category="Bebidas"
            yieldVal="20 Xícaras"
            totalCost="R$ 62,00"
            unitCost="R$ 3,10"
            icon={<Coffee size={20} />}
            isOpen={openId === 3}
            onToggle={() => toggle(3)}
            ingredients={[
              { name: "Grão Arábica", qty: "0.5 kg", unitCost: "R$ 110,00", total: "R$ 55,00" },
              { name: "Leite Integral", qty: "2.0 l", unitCost: "R$ 3,50", total: "R$ 7,00" },
            ]}
          />
        </section>
      </main>
    </div>
  );
}

function SheetAccordionItem({ 
  id, title, category, yieldVal, totalCost, unitCost, icon, isOpen, onToggle, ingredients 
}: any) {
  return (
    <div className={`sheet_accordion_item ${isOpen ? 'open' : ''}`}>
      <button className="sheet_header_btn" onClick={onToggle}>
        <div className="sheet_title_group">
          <div className="sheet_icon">{icon}</div>
          <div className="sheet_info">
            <h3>{title}</h3>
            <span>{category}</span>
          </div>
        </div>

        <div className="sheet_meta">
          <div className="meta_item">
            <span className="meta_label">Rendimento</span>
            <span className="meta_value">{yieldVal}</span>
          </div>
          <div className="meta_item">
            <span className="meta_label">Custo Unit.</span>
            <span className="meta_value cost">{unitCost}</span>
          </div>
          <div className="meta_item">
            <span className="meta_label">Custo Total</span>
            <span className="meta_value">{totalCost}</span>
          </div>
          <div className="chevron">
            {isOpen ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="sheet_content">
          <table className="ingredients_table">
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Qtd/Uso</th>
                <th>Custo Unit.</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ing: any, idx: number) => (
                <tr key={idx}>
                  <td style={{fontWeight: 500}}>{ing.name}</td>
                  <td>{ing.qty}</td>
                  <td>{ing.unitCost}</td>
                  <td style={{fontWeight: 600}}>{ing.total}</td>
                  <td style={{textAlign: 'right'}}>
                    <button style={{color: 'var(--text-muted)'}}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button className="btn_add_item">
            <Plus size={14} />
            Adicionar Insumo
          </button>

          <footer className="sheet_actions_footer">
            <button className="btn_small btn-secondary">
              <Edit3 size={14} />
              Editar Ficha
            </button>
            <button className="btn_small btn-primary">
              Salvar Alterações
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
