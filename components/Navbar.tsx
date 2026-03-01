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
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "@/styles/navbar.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("apex_auth");
    router.push("/login");
  };

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/" },
    { icon: <ShoppingCart size={18} />, label: "Compras", href: "/compras" },
    { icon: <Package size={18} />, label: "Estoque", href: "/estoque" },
    { icon: <DollarSign size={18} />, label: "Financeiro", href: "/financeiro" },
    { icon: <Users size={18} />, label: "RH", href: "/rh" },
    { icon: <FileText size={18} />, label: "Relatórios", href: "/relatorios" },
    { icon: <Settings size={18} />, label: "Configurações", href: "/configuracoes" },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="nav_logo">
        APEX <span>GESTÃO</span>
      </Link>

      <div className="nav_links">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`nav_item ${pathname === item.href ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="nav_user_section">
        <div className="user_profile">
          <div className="user_avatar">AD</div>
          <span>Administrador</span>
        </div>
        <button className="logout_icon_btn" onClick={handleLogout} title="Sair">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
