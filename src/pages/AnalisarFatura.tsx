import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';

const AnalisarFatura = () => {
  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Hero */}
          <Card className="gradient-primary brutal-shadow-lg brutal-border p-6 text-primary-foreground text-center">
            <FileText className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-2xl font-black mb-2">Como Ler a Fatura da Eletricidade</h1>
            <p className="opacity-90 font-medium">
              Guia completo para entender cada linha da sua fatura de luz em Portugal — kWh, tarifas, custos fixos e variáveis.
            </p>
          </Card>

          {/* O que é o kWh */}
          <Card className="brutal-border brutal-shadow p-6">
            <h2 className="text-xl font-black mb-3">⚡ O que é um kWh?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O <strong>quilowatt-hora (kWh)</strong> é a unidade de medida de energia elétrica usada na sua fatura. Um aparelho de 1.000W (1 kW) ligado durante 1 hora consome exatamente 1 kWh.
            </p>
            <div className="bg-muted rounded-xl p-4 font-mono text-sm">
              <p className="font-bold mb-1 text-foreground">Fórmula:</p>
              <p className="text-primary font-black text-base">kWh = Potência (W) × Horas ÷ 1.000</p>
              <p className="text-muted-foreground mt-2">Ex: Frigorífico 150W × 24h ÷ 1000 = <strong>3,6 kWh/dia</strong></p>
            </div>
          </Card>

          {/* Estrutura da Fatura */}
          <Card className="brutal-border brutal-shadow p-6">
            <h2 className="text-xl font-black mb-4">🧾 Estrutura da Fatura — Campo a Campo</h2>
            <div className="space-y-4">
              {[
                {
                  label: 'Período de Consumo',
                  color: 'bg-primary',
                  desc: 'Datas de início e fim da leitura do contador. Pode ser mensal ou bimestral.',
                },
                {
                  label: 'Consumo (kWh)',
                  color: 'gradient-energy',
                  desc: 'Energia total consumida no período. É a diferença entre a leitura atual e a anterior no contador.',
                },
                {
                  label: 'Potência Contratada (kVA)',
                  color: 'gradient-secondary',
                  desc: 'Custo fixo mensal, independente do consumo. Determina quantos aparelhos pode ter ligados em simultâneo.',
                },
                {
                  label: 'Tarifa de Acesso às Redes',
                  color: 'bg-accent',
                  desc: 'Custo regulado pela ERSE para uso da rede de distribuição. Igual para todos os comercializadores.',
                },
                {
                  label: 'Contribuição Audiovisual',
                  color: 'bg-muted',
                  desc: 'Taxa fixa de €2,85/mês para financiar a RTP. Aparece separada com IVA a 23%.',
                },
                {
                  label: 'IVA',
                  color: 'bg-muted',
                  desc: '6% sobre energia e potência (taxa reduzida). 23% sobre outros encargos e taxas.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-3 h-3 mt-1.5 rounded-full flex-shrink-0 brutal-border ${item.color}`} />
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Custos Fixos vs Variáveis */}
          <Card className="brutal-border brutal-shadow p-6">
            <h2 className="text-xl font-black mb-4">📊 Custos Fixos vs. Variáveis</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="brutal-border p-4 rounded-xl bg-muted/30">
                <h3 className="font-black mb-2 text-primary">Custos Fixos</h3>
                <p className="text-sm text-muted-foreground mb-3">Paga sempre, independentemente do consumo:</p>
                <ul className="text-sm space-y-1 text-foreground">
                  <li>• Potência contratada</li>
                  <li>• Taxa de Exploração</li>
                  <li>• Contribuição Audiovisual</li>
                  <li>• Taxa DGEG (regulação)</li>
                </ul>
              </div>
              <div className="brutal-border p-4 rounded-xl bg-muted/30">
                <h3 className="font-black mb-2 text-accent">Custos Variáveis</h3>
                <p className="text-sm text-muted-foreground mb-3">Dependem do que consome:</p>
                <ul className="text-sm space-y-1 text-foreground">
                  <li>• Energia consumida (kWh)</li>
                  <li>• Tarifa de uso da rede (kWh)</li>
                  <li>• Tarifa de vazio vs. ponta</li>
                  <li>• Impostos sobre energia</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-primary/10 rounded-xl brutal-border">
              <div className="flex gap-2 items-start">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  <strong>Dica:</strong> Em muitas faturas, os custos fixos representam 30–40% do total. Reduzir a potência contratada (se usar menos de 50% da capacidade) pode gerar poupanças imediatas.
                </p>
              </div>
            </div>
          </Card>

          {/* Como Identificar a Tarifa */}
          <Card className="brutal-border brutal-shadow p-6">
            <h2 className="text-xl font-black mb-4">🔍 Como Identificar a Sua Tarifa</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Na sua fatura aparece o tipo de ciclo tarifário contratado. As principais opções em Portugal são:
            </p>
            <div className="space-y-3">
              {[
                { name: 'Tarifa Simples', desc: 'Preço único o dia todo. Mais simples, ideal para quem não pode mudar hábitos.', badge: '1 preço' },
                { name: 'Tarifa Bi-horária', desc: 'Preço mais baixo nas horas de vazio (22h–08h). Ideal para quem pode usar máquinas à noite.', badge: '2 preços' },
                { name: 'Tarifa Tri-horária', desc: 'Três períodos: super-vazio, vazio e cheio. Complexa mas rentável para grandes consumos controláveis.', badge: '3 preços' },
              ].map((tariff, i) => (
                <div key={i} className="flex gap-3 items-start p-3 brutal-border rounded-xl bg-muted/20">
                  <span className="text-xs font-black bg-primary text-primary-foreground px-2 py-1 rounded-full flex-shrink-0">{tariff.badge}</span>
                  <div>
                    <p className="font-bold text-sm">{tariff.name}</p>
                    <p className="text-muted-foreground text-sm">{tariff.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <Card className="brutal-border brutal-shadow gradient-success p-6 text-center text-success-foreground">
            <Calculator className="w-10 h-10 mx-auto mb-3" />
            <h2 className="text-xl font-black mb-2">Simule o seu consumo</h2>
            <p className="mb-4 opacity-90 font-medium">Agora que sabe ler a fatura, use a calculadora para perceber quanto gasta cada aparelho.</p>
            <Button asChild size="lg" className="brutal-border brutal-shadow bg-background text-foreground hover:bg-muted font-bold">
              <Link to="/">Abrir Calculadora Grátis</Link>
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalisarFatura;
