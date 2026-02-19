import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Leaf, Lightbulb, Home, Thermometer, Droplets } from 'lucide-react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

const appliances = [
  { name: 'Frigorífico antigo (A)', kwh: 500, kwh_new: 130, savings: 370 },
  { name: 'Máquina de lavar (60°C vs eco)', kwh: 220, kwh_new: 90, savings: 130 },
  { name: 'Iluminação (10 lâmpadas)', kwh: 320, kwh_new: 50, savings: 270 },
  { name: 'Televisão (plasma vs LED)', kwh: 180, kwh_new: 60, savings: 120 },
  { name: 'Standby de aparelhos', kwh: 150, kwh_new: 15, savings: 135 },
];

const tips = [
  {
    icon: Lightbulb,
    area: 'Iluminação',
    color: 'gradient-energy',
    tips: [
      'Substitua todas as lâmpadas por LED — poupa até 85% de energia',
      'Use sensores de movimento em corredores e casas de banho',
      'Aproveite ao máximo a luz natural — abra estores e persianas de manhã',
      'Desligue luzes ao sair de divisões',
    ],
  },
  {
    icon: Home,
    area: 'Cozinha',
    color: 'gradient-primary',
    tips: [
      'Use micro-ondas em vez do forno — consome 70% menos energia',
      'Descongele alimentos no frigorífico, não à temperatura ambiente',
      'Tape as panelas para ferver água mais rapidamente',
      'Ajuste o frigorífico para 5°C e o congelador para -18°C',
    ],
  },
  {
    icon: Droplets,
    area: 'Águas Quentes',
    color: 'gradient-secondary',
    tips: [
      'Reduza a temperatura do termoacumulador para 55°C',
      'Duches de 5 minutos poupam 30–40€/mês numa família de 4',
      'Instale redutores de caudal nas torneiras (€5–€15)',
      'Considere um painel solar térmico — retorno em 5–7 anos',
    ],
  },
  {
    icon: Thermometer,
    area: 'Aquecimento e A/C',
    color: 'gradient-success',
    tips: [
      'Cada grau a mais de aquecimento aumenta 6–8% a fatura',
      'Aquecimento: 18–20°C no inverno; Arrefecimento: 25–26°C no verão',
      'Vede portas e janelas — perdas pelo envelope são 30% do calor',
      'Mantenha filtros do ar condicionado limpos (eficiência cai 15% se sujos)',
    ],
  },
];

const PouparEnergia = () => {
  const kwh_price = 0.22;

  return (
    <Layout>
      <SEOHead
        title="Como Poupar Energia em Casa - Dicas Práticas | ContaDaLuz.pt"
        description="Guia prático para poupar energia e reduzir a conta da luz em Portugal. Dicas por divisão da casa, comparação de aparelhos eficientes e retorno do investimento em LED."
        canonical="https://contadaluz.pt/poupar-energia"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://contadaluz.pt/" },
            { "@type": "ListItem", "position": 2, "name": "Poupar Energia", "item": "https://contadaluz.pt/poupar-energia" }
          ]
        }}
      />
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Hero */}
          <Card className="gradient-primary brutal-shadow-lg brutal-border p-6 text-primary-foreground text-center">
            <Leaf className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-2xl font-black mb-2">Como Poupar Energia em Casa</h1>
            <p className="opacity-90 font-medium">
              Guia prático com dicas reais para reduzir a conta da luz em Portugal — sem grandes investimentos.
            </p>
          </Card>

          {/* Stats rápidas */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '30%', label: 'Poupança média possível' },
              { value: '€400', label: 'Economia anual típica' },
              { value: '0€', label: 'Custo das dicas básicas' },
            ].map((s, i) => (
              <Card key={i} className="brutal-border brutal-shadow p-4 text-center">
                <p className="text-2xl font-black text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
              </Card>
            ))}
          </div>

          {/* Tips by area */}
          {tips.map((section, i) => (
            <Card key={i} className="brutal-border brutal-shadow overflow-hidden">
              <div className={`${section.color} p-4 flex items-center gap-3`}>
                <section.icon className="w-6 h-6 text-primary-foreground" />
                <h2 className="text-lg font-black text-primary-foreground">{section.area}</h2>
              </div>
              <div className="p-5 space-y-3">
                {section.tips.map((tip, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center font-black flex-shrink-0 mt-0.5">
                      {j + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Comparison Table */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-xl font-black mb-4">📊 Tabela: Aparelho Antigo vs. Eficiente (kWh/ano)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 font-black">Aparelho</th>
                    <th className="text-right py-2 font-black text-destructive">Antigo</th>
                    <th className="text-right py-2 font-black text-success">Eficiente</th>
                    <th className="text-right py-2 font-black">Poupança €/ano</th>
                  </tr>
                </thead>
                <tbody>
                  {appliances.map((a, i) => (
                    <tr key={i} className="border-b border-muted">
                      <td className="py-3 font-medium">{a.name}</td>
                      <td className="py-3 text-right text-destructive font-bold">{a.kwh} kWh</td>
                      <td className="py-3 text-right font-bold" style={{ color: 'hsl(var(--success))' }}>{a.kwh_new} kWh</td>
                      <td className="py-3 text-right font-black">
                        €{(a.savings * kwh_price).toFixed(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">* Valores estimados com base em consumo médio anual. Preço kWh: €{kwh_price}/kWh.</p>
          </Card>

          {/* LED ROI */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-xl font-black mb-3">💡 Retorno do Investimento em LED</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Uma lâmpada LED de 9W substitui uma incandescente de 60W. Com 5 horas/dia de utilização:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-center">
              <div className="brutal-border p-3 rounded-xl bg-muted/30">
                <p className="text-xl font-black text-primary">€2–4</p>
                <p className="text-xs text-muted-foreground">Custo lâmpada LED</p>
              </div>
              <div className="brutal-border p-3 rounded-xl bg-muted/30">
                <p className="text-xl font-black" style={{ color: 'hsl(var(--success))' }}>€10</p>
                <p className="text-xs text-muted-foreground">Poupança anual/lâmpada</p>
              </div>
              <div className="brutal-border p-3 rounded-xl bg-muted/30">
                <p className="text-xl font-black text-accent">3 meses</p>
                <p className="text-xs text-muted-foreground">Retorno do investimento</p>
              </div>
            </div>
          </Card>

          {/* Links internos */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-lg font-black mb-3">📖 Artigos Relacionados</h2>
            <div className="space-y-2">
              <Link to="/tarifas" className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                → Comparar Tarifas de Eletricidade em Portugal
              </Link>
              <Link to="/analisar-fatura" className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                → Como Ler a Fatura da Eletricidade
              </Link>
              <Link to="/perguntas-frequentes" className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                → Perguntas Frequentes sobre Eletricidade
              </Link>
            </div>
          </Card>

          {/* CTA */}
          <Card className="brutal-border brutal-shadow gradient-energy p-6 text-center text-accent-foreground">
            <Calculator className="w-10 h-10 mx-auto mb-3" />
            <h2 className="text-xl font-black mb-2">Calcule a poupança real</h2>
            <p className="mb-4 opacity-90 font-medium">Veja quanto gasta cada aparelho e descubra onde pode poupar mais.</p>
            <Button asChild size="lg" className="brutal-border brutal-shadow bg-background text-foreground hover:bg-muted font-bold">
              <Link to="/">Abrir Calculadora</Link>
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PouparEnergia;
