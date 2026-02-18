import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-16 border-t-4 border-border"
      style={{ background: 'hsl(var(--foreground))' }}
    >
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-8 text-sm" style={{ color: 'hsl(var(--background))' }}>
          {/* Brand */}
          <div>
            <p className="text-2xl font-black mb-2">💡 ContaDaLuz.pt</p>
            <p className="opacity-75 leading-relaxed">
              A calculadora de consumo elétrico mais completa de Portugal. Poupe na conta da luz com informação real.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-black mb-3 uppercase tracking-wide">Ferramentas</p>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/" className="hover:opacity-100 hover:underline transition-all">Calculadora de Consumo</Link></li>
              <li><Link to="/analisar-fatura" className="hover:opacity-100 hover:underline transition-all">Analisar Fatura</Link></li>
              <li><Link to="/tarifas" className="hover:opacity-100 hover:underline transition-all">Comparar Tarifas</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-black mb-3 uppercase tracking-wide">Informação</p>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/poupar-energia" className="hover:opacity-100 hover:underline transition-all">Poupar Energia</Link></li>
              <li><Link to="/perguntas-frequentes" className="hover:opacity-100 hover:underline transition-all">Perguntas Frequentes</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center text-xs opacity-50" style={{ color: 'hsl(var(--background))' }}>
          © {year} ContaDaLuz.pt — Informação sobre eletricidade em Portugal. Valores indicativos.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
