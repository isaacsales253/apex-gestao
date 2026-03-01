"use client";

import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Users, 
  FileText, 
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import "@/styles/sidebar.css";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("apex_auth");
    router.push("/login");
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <ShoppingCart size={20} />, label: "Compras" },
    { icon: <Package size={20} />, label: "Estoque" },
    { icon: <DollarSign size={20} />, label: "Financeiro" },
    { icon: <Users size={20} />, label: "RH" },
    { icon: <FileText size={20} />, label: "Relatórios" },
    { icon: <Settings size={20} />, label: "Configurações" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar_header">
        <h2 className="sidebar_logo">APEX <span>GESTÃO</span></h2>
      </div>

      <nav className="sidebar_nav">
        {menuItems.map((item, index) => (
          <div key={index} className="nav_item_group">
            <button className={`nav_btn ${item.active ? 'active' : ''}`}>
              <div className="nav_btn_content">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight size={14} className="chevron" />
            </button>
          </div>
        ))}
      </nav>

      <div className="sidebar_footer">
        <button className="logout_btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
}
