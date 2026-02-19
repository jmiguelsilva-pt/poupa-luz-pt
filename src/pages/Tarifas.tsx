import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Clock, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const Tarifas = () => {
  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Hero */}
          <Card className="gradient-primary brutal-shadow-lg brutal-border p-6 text-primary-foreground text-center">
            <Clock className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-2xl font-black mb-2">Comparar Tarifas de Eletricidade em Portugal</h1>
            <p className="opacity-90 font-medium">
              Tarifa simples, bi-horária e tri-horária — perceba qual compensa para o seu perfil de consumo.
            </p>
          </Card>

          {/* Comparação Tabela */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-xl font-black mb-4">📊 Comparação de Tarifas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border text-left">
                    <th className="py-3 pr-4 font-black">Caraterística</th>
                    <th className="py-3 px-3 font-black text-center">Simples</th>
                    <th className="py-3 px-3 font-black text-center">Bi-horária</th>
                    <th className="py-3 px-3 font-black text-center">Tri-horária</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                  ['Nº de períodos', '1', '2', '3'],
                  ['Preço Cheio/Ponta (aprox.)', '€0,22/kWh', '€0,25/kWh', '€0,28/kWh'],
                  ['Preço Vazio (aprox.)', '—', '€0,14/kWh', '€0,17/kWh'],
                  ['Preço Super-Vazio', '—', '—', '€0,09/kWh'],
                  ['Complexidade', 'Baixa', 'Média', 'Alta'],
                  ['Ideal para', 'Consumo diurno fixo', 'Uso noturno fácil', 'VE + bateria doméstica']].
                  map(([feat, ...vals], i) =>
                  <tr key={i} className={i % 2 === 0 ? 'bg-muted/20' : ''}>
                      <td className="py-3 pr-4 font-medium text-foreground">{feat}</td>
                      {vals.map((v, j) =>
                    <td key={j} className="py-3 px-3 text-center">{v}</td>
                    )}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">* Preços indicativos de mercado livre 2025. Consulte o simulador da ERSE para preços exatos.</p>
          </Card>

          {/* Horários */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-xl font-black mb-4">🕐 Horários de Vazio e Ponta (Ciclo Diário)</h2>
            <div className="space-y-3">
              {[
              { period: 'Super-Vazio', time: '00h00 – 02h00 e 06h00 – 08h00', color: 'gradient-success', label: 'mais barato' },
              { period: 'Vazio Normal', time: '02h00 – 06h00 e 22h00 – 00h00', color: 'gradient-primary', label: 'barato' },
              { period: 'Cheio / Ponta', time: '08h00 – 22h00', color: 'gradient-energy', label: 'mais caro' }].
              map((h, i) =>
              <div key={i} className={`${h.color} brutal-border p-4 rounded-xl flex items-center justify-between`}>
                  <div className="text-primary-foreground">
                    <p className="font-black">{h.period}</p>
                    <p className="text-sm opacity-90">{h.time}</p>
                  </div>
                  <span className="text-xs font-black bg-background text-foreground px-3 py-1 rounded-full brutal-border">{h.label}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Nota:</strong> Ao fim de semana e feriados nacionais, todo o dia é considerado período de Vazio. Ideal para fazer grandes consumos nesses dias.
            </p>
          </Card>

          {/* Ciclo Semanal */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-xl font-black mb-3">📅 Ciclo Semanal</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="brutal-border p-4 rounded-xl">
                <p className="font-black mb-2">Segunda a Sexta</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>🌙 22h–08h → <strong>Vazio</strong></li>
                  <li>☀️ 08h–22h → <strong>Ponta/Cheio</strong></li>
                </ul>
              </div>
              <div className="brutal-border p-4 rounded-xl bg-muted/20">
                <p className="font-black mb-2">Sábados, Domingos e Feriados</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>🌟 Todo o dia → <strong>Vazio</strong></li>
                  <li>💰 Ótimo para máquinas, cozinhados, etc.</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Quando compensa cada tarifa */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-xl font-black mb-4">✅ Quando Compensa Cada Tarifa?</h2>
            <div className="space-y-4">
              {[
              {
                tariff: 'Tarifa Simples',
                ideal: 'Para quem trabalha em casa ou tem bebés/idosos — consumo distribuído ao longo do dia sem flexibilidade de horário.',
                notIdeal: 'Se puder deslocar máquinas de lavar e dishwasher para a noite, perde vantagem.',
                color: 'border-l-4 border-muted'
              },
              {
                tariff: 'Tarifa Bi-horária',
                ideal: 'Para a maioria das famílias portuguesas. Bastam 2–3 hábitos simples: máquina de lavar à noite, dishwasher com timer, carregar telemóveis depois das 22h.',
                notIdeal: 'Se todos os consumos forem inevitavelmente diurnos.',
                color: 'border-l-4 border-primary'
              },
              {
                tariff: 'Tarifa Tri-horária',
                ideal: 'Para quem tem veículo elétrico, bateria doméstica, ou instalações com controlo automático de cargas programáveis.',
                notIdeal: 'Demasiado complexa para uso doméstico comum — o benefício extra vs. bi-horária raramente justifica a gestão.',
                color: 'border-l-4 border-accent'
              }].
              map((t, i) =>
              <div key={i} className={`pl-4 ${t.color}`}>
                  <p className="font-black mb-1">{t.tariff}</p>
                  <p className="text-sm text-muted-foreground mb-1">✅ {t.ideal}</p>
                  <p className="text-sm text-muted-foreground opacity-70">❌ {t.notIdeal}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Como mudar */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-xl font-black mb-3">🔄 Como Mudar de Tarifa</h2>
            <ol className="space-y-3">
              {[
              'Contacte o seu comercializador por telefone, app ou área de cliente online.',
              'Peça a alteração do ciclo tarifário — é gratuita e sem custos de rescisão.',
              'A mudança é processada no próximo ciclo de leitura (geralmente 20 dias úteis).',
              'Compare ofertas antes de decidir.'].
              map((step, i) =>
              <li key={i} className="flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-full gradient-primary text-primary-foreground text-sm flex items-center justify-center font-black flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">{step}</p>
                </li>
              )}
            </ol>
            









          </Card>

          {/* CTA */}
          <Card className="brutal-border brutal-shadow gradient-secondary p-6 text-center text-secondary-foreground">
            <Calculator className="w-10 h-10 mx-auto mb-3" />
            <h2 className="text-xl font-black mb-2">Simule com a sua tarifa real</h2>
            <p className="mb-4 opacity-90 font-medium">Use o preço exato do kWh da sua fatura para obter cálculos precisos.</p>
            <Button asChild size="lg" className="brutal-border brutal-shadow bg-background text-foreground hover:bg-muted font-bold">
              <Link to="/">Abrir Calculadora</Link>
            </Button>
          </Card>
        </div>
      </div>
    </Layout>);

};

export default Tarifas;