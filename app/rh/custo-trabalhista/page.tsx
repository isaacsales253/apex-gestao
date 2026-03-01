"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { 
  Calculator, 
  ChevronRight, 
  Download, 
  User
} from "lucide-react";
import "@/styles/rh.css";

export default function CustoTrabalhista() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="main_content_rh">
        <header className="page-header">
          <div className="header-titles">
            <h1>Composição de Custo Trabalhista</h1>
            <p>Análise detalhada do custo real por colaborador (encargos + benefícios).</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <Download size={18} />
              Exportar
            </button>
            <button className="btn btn-primary">
              <Calculator size={18} />
              Novo Cálculo
            </button>
          </div>
        </header>

        <section className="dashboard_grid">
          <div className="card cost_summary">
            <h3>Visão Geral (Média Mensal)</h3>
            <div className="summary_stats">
              <div className="summary_item">
                <span className="label">Total Salários Base</span>
                <span className="value">R$ 85.000,00</span>
              </div>
              <div className="summary_item">
                <span className="label">Total Encargos (FGTS/INSS)</span>
                <span className="value">R$ 28.450,00</span>
              </div>
              <div className="summary_item summary_item_highlight">
                <span className="label">Custo Total Efetivo</span>
                <span className="value">R$ 113.450,00</span>
              </div>
            </div>
            <div className="cost-ratio">
              <div className="ratio_bar">
                <div className="segment_salary" style={{width: '75%'}}></div>
                <div className="segment_charges" style={{width: '25%'}}></div>
              </div>
              <p className="ratio_text">Encargos representam <strong>33.4%</strong> sobre o salário base.</p>
            </div>
          </div>

          <div className="card employee_list">
            <div className="card_header">
              <h3>Custo por Colaborador</h3>
              <button className="text_btn">Ver todos</button>
            </div>
            <div className="list-container">
              <EmployeeCostRow 
                name="Ana Silva" 
                role="Gerente de Produção" 
                base="R$ 8.500,00" 
                total="R$ 11.850,00" 
              />
              <EmployeeCostRow 
                name="Carlos Oliveira" 
                role="Operador Sênior" 
                base="R$ 4.200,00" 
                total="R$ 5.920,00" 
              />
              <EmployeeCostRow 
                name="Juliana Lima" 
                role="Analista Financeiro" 
                base="R$ 5.500,00" 
                total="R$ 7.710,00" 
              />
            </div>
          </div>
        </section>

        <section className="composition-details card">
          <h3>Calculadora de Encargos (Simulação)</h3>
          <div className="calculator_grid">
            <div className="calc_group">
              <label>Salário Base (R$)</label>
              <input type="number" defaultValue="5000" />
            </div>
            <div className="calc_group">
              <label>Regime Tributário</label>
              <select>
                <option>Simples Nacional</option>
                <option>Lucro Presumido</option>
                <option>Lucro Real</option>
              </select>
            </div>
            <div className="calc_results">
              <div className="result_line">
                <span>FGTS (8%)</span>
                <span>R$ 400,00</span>
              </div>
              <div className="result_line">
                <span>Provisão de Férias/13º</span>
                <span>R$ 966,50</span>
              </div>
              <div className="result_line result_line_total">
                <span>Custo Real Estimado</span>
                <span>R$ 6.366,50</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function EmployeeCostRow({ name, role, base, total }: any) {
  return (
    <div className="employee_row">
      <div className="employee_icon">
        <User size={32} strokeWidth={1} />
      </div>
      <div className="employee_info">
        <span className="employee_name">{name}</span>
        <span className="employee_role">{role}</span>
      </div>
      <div className="employee_costs">
        <div className="cost_item">
          <span className="cost_item_label">Base</span>
          <span className="cost_item_value">{base}</span>
        </div>
        <div className="cost_item">
          <span className="cost_item_label">Real</span>
          <span className="cost_item_value cost_item_real">{total}</span>
        </div>
      </div>
      <button style={{color: 'var(--border-color)'}}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
