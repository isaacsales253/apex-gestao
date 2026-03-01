"use client";

import { 
  BarChart3, 
  Box, 
  ChevronRight, 
  DollarSign, 
  FileText, 
  LayoutDashboard, 
  Package, 
  Settings, 
  ShoppingCart, 
  Users 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "@/styles/sidebar.css";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { 
    icon: ShoppingCart, 
    label: "Compras", 
    href: "/compras",
    subItems: ["Pedidos", "Fornecedores", "Insumos"]
  },
  { 
    icon: Package, 
    label: "Estoque", 
    href: "/estoque",
    subItems: ["Movimentação", "Fichas Técnicas", "Inventário"]
  },
  { 
    icon: DollarSign, 
    label: "Financeiro", 
    href: "/financeiro",
    subItems: ["Contas a Pagar", "Contas a Receber", "Fluxo de Caixa"]
  },
  { 
    icon: Users, 
    label: "RH", 
    href: "/rh",
    subItems: ["Custo Trabalhista", "Colaboradores"]
  },
  { icon: FileText, label: "Relatórios", href: "/relatorios" },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar_header">
        <div className="logo">
          <span className="logo_apex">APEX</span>
          <span className="logo_gestao">GESTÃO</span>
        </div>
      </div>

      <nav className="sidebar_nav">
        {menuItems.map((item) => (
          <div key={item.label} className="nav_group">
            <div 
              className={`nav_item ${pathname === item.href ? "nav_item_active" : ""}`}
              onClick={() => item.subItems && toggleExpand(item.label)}
            >
              <Link href={item.href} className="nav_link">
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
              {item.subItems && (
                <ChevronRight 
                  size={16} 
                  className={`chevron ${expandedItems.includes(item.label) ? "chevron_expanded" : ""}`} 
                />
              )}
            </div>

            {item.subItems && expandedItems.includes(item.label) && (
              <div className="sub_menu">
                {item.subItems.map(subItem => (
                  <Link 
                    key={subItem} 
                    href={`${item.href}/${subItem.toLowerCase().replace(/ /g, "-")}`}
                    className="sub_nav_item"
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
