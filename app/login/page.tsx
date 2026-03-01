"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import "@/styles/login.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Clear session on mount to ensure starting from scratch
  useEffect(() => {
    localStorage.removeItem("apex_auth");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "jus88077462") {
      localStorage.setItem("apex_auth", "true");
      router.push("/");
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="login_container">
      <div className="login_card">
        <header className="login_header">
          <h1 className="login_logo">APEX <span>GESTÃO</span></h1>
          <p>Faça login para acessar o sistema</p>
        </header>

        <form className="login_form" onSubmit={handleLogin}>
          {error && <div className="error_msg">{error}</div>}
          
          <div className="input_group">
            <label>Usuário</label>
            <div className="input_wrapper">
              <User size={18} />
              <input 
                type="text" 
                placeholder="Digite seu usuário" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input_group">
            <label>Senha</label>
            <div className="input_wrapper">
              <Lock size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                style={{position: 'absolute', right: '12px', color: 'var(--text-muted)'}}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login_btn">Entregar</button>
        </form>

        <footer className="login_footer">
          <p>© 2024 Apex Gestão. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
