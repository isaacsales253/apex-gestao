"use client";

import { 
  LayoutDashboard, 
  DollarSign, 
  LogOut,
  Clock
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

  return (
    <nav className="navbar">
      <Link href="/" className="nav_logo">
        APEX <span>GESTÃO</span>
      </Link>

      <div className="nav_links">
        <Link 
          href="/" 
          className={`nav_item ${pathname === "/" ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <div className="nav_item_wrapper">
          <div className={`nav_item ${pathname.includes("/financeiro") ? 'active' : ''}`}>
             <DollarSign size={18} />
             <span>Financeiro</span>
          </div>
          
          <div className="dropdown_menu">
            <Link href="/financeiro/contas-a-pagar" className="dropdown_item">
              <Clock size={16} />
              Contas a Pagar
            </Link>
            <Link href="/financeiro/contas-a-receber" className="dropdown_item">
              <DollarSign size={16} />
              Contas a Receber
            </Link>
          </div>
        </div>
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
