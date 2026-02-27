import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Share2, ArrowLeft } from 'lucide-react';
import { 
  Refrigerator, 
  Tv, 
  WashingMachine, 
  AirVent, 
  Microwave, 
  Monitor,
  Lightbulb,
  Zap,
  Coffee,
  Wind,
  Flame,
  Circle,
  Gamepad2,
  Wifi,
  Bot
} from 'lucide-react';

const iconMap = {
  'Refrigerator': Refrigerator,
  'Tv': Tv,
  'WashingMachine': WashingMachine,
  'AirVent': AirVent,
  'Microwave': Microwave,
  'Monitor': Monitor,
  'Lightbulb': Lightbulb,
  'Zap': Zap,
  'Coffee': Coffee,
  'Wind': Wind,
  'Flame': Flame,
  'Circle': Circle,
  'Gamepad2': Gamepad2,
  'Wifi': Wifi,
  'Bot': Bot,
};

interface ReportData {
  appliances: Array<{
    name: string;
    power: number;
    hoursPerDay: number;
    daysPerWeek?: number;
    icon: string;
  }>;
  tariff: {
    name: string;
    pricePerKwh: number;
  };
}

const Report = () => {
  const { reportId } = useParams();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (reportId) {
        const decodedData = JSON.parse(atob(reportId));
        setReportData(decodedData);
      }
    } catch (error) {
      console.error('Error decoding report data:', error);
    } finally {
      setLoading(false);
    }
  }, [reportId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Calculator className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p>A carregar relatório...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!reportData) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20 px-4">
          <Card className="brutal-border brutal-shadow p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Relatório não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              O link do relatório pode estar inválido ou expirado.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Calculadora
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  const calculations = reportData.appliances.map(appliance => {
    const daysPerWeek = appliance.daysPerWeek ?? 7;
    const dailyKwh = (appliance.power * appliance.hoursPerDay) / 1000 * (daysPerWeek / 7);
    const monthlyKwh = dailyKwh * 30;
    const dailyCost = dailyKwh * reportData.tariff.pricePerKwh;
    const monthlyCost = monthlyKwh * reportData.tariff.pricePerKwh;

    return {
      ...appliance,
      daysPerWeek,
      dailyKwh,
      monthlyKwh,
      dailyCost,
      monthlyCost
    };
  });

  const totals = calculations.reduce(
    (acc, calc) => ({
      dailyKwh: acc.dailyKwh + calc.dailyKwh,
      monthlyKwh: acc.monthlyKwh + calc.monthlyKwh,
      dailyCost: acc.dailyCost + calc.dailyCost,
      monthlyCost: acc.monthlyCost + calc.monthlyCost,
    }),
    { dailyKwh: 0, monthlyKwh: 0, dailyCost: 0, monthlyCost: 0 }
  );

  const shareReport = () => {
    const message = `💡 Relatório de Consumo Elétrico

🏠 Total Diário: €${totals.dailyCost.toFixed(2)} (${totals.dailyKwh.toFixed(1)} kWh)
💰 Total Mensal: €${totals.monthlyCost.toFixed(2)} (${totals.monthlyKwh.toFixed(1)} kWh)

📋 Aparelhos analisados:
${calculations.map(calc => 
  `• ${calc.name}: €${calc.monthlyCost.toFixed(2)}/mês`
).join('\n')}

Tarifa: ${reportData.tariff.name} (€${reportData.tariff.pricePerKwh.toFixed(2)}/kWh)

Calcule o seu consumo: ${window.location.origin}`;

    if (navigator.share) {
      navigator.share({
        title: 'Relatório de Consumo Elétrico',
        text: message
      });
    } else {
      navigator.clipboard.writeText(message);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Relatório de Consumo Elétrico | ContaDaLuz.pt"
        description="Relatório personalizado de consumo elétrico dos seus eletrodomésticos."
        canonical="https://contadaluz.pt/"
        noindex
      />
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card className="gradient-primary brutal-shadow-lg brutal-border p-6">
            <div className="text-center text-primary-foreground">
              <Calculator className="w-12 h-12 mx-auto mb-4" />
              <h1 className="text-3xl font-black mb-2">
                RELATÓRIO DE CONSUMO
              </h1>
              <p className="text-lg font-medium opacity-90">
                Análise detalhada dos seus eletrodomésticos
              </p>
            </div>
          </Card>

          {/* Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="brutal-border brutal-shadow p-6 gradient-energy">
              <div className="text-center text-accent-foreground">
                <h2 className="text-lg font-bold mb-2">CONSUMO DIÁRIO</h2>
                <p className="text-3xl font-black">€{totals.dailyCost.toFixed(2)}</p>
                <p className="text-sm opacity-90">{totals.dailyKwh.toFixed(1)} kWh</p>
              </div>
            </Card>
            
            <Card className="brutal-border brutal-shadow p-6 gradient-secondary">
              <div className="text-center text-secondary-foreground">
                <h2 className="text-lg font-bold mb-2">CONSUMO MENSAL</h2>
                <p className="text-3xl font-black">€{totals.monthlyCost.toFixed(2)}</p>
                <p className="text-sm opacity-90">{totals.monthlyKwh.toFixed(1)} kWh</p>
              </div>
            </Card>
          </div>

          {/* Tariff Info */}
          <Card className="brutal-border brutal-shadow p-4">
            <div className="text-center">
              <p className="font-semibold">
                Tarifa: {reportData.tariff.name} - €{reportData.tariff.pricePerKwh.toFixed(2)}/kWh
              </p>
            </div>
          </Card>

          {/* Appliances List */}
          <Card className="brutal-border brutal-shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">APARELHOS ANALISADOS</h2>
            <div className="space-y-4">
              {calculations.map((calc, index) => {
                const IconComponent = iconMap[calc.icon as keyof typeof iconMap] || Zap;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">{calc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {calc.power}W • {calc.hoursPerDay}h/dia • {calc.daysPerWeek}x/sem
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">€{calc.monthlyCost.toFixed(2)}/mês</p>
                      <p className="text-sm text-muted-foreground">
                        €{calc.dailyCost.toFixed(2)}/dia
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="success" size="lg" onClick={shareReport} className="gap-2">
              <Share2 className="w-5 h-5" />
              Partilhar Relatório
            </Button>
            
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/'} className="gap-2">
              <Calculator className="w-5 h-5" />
              Nova Calculação
            </Button>
          </div>

          {/* Footer note */}
          <div className="text-center text-sm text-muted-foreground">
            <p>💡 Relatório gerado pela Calculadora de Consumo Elétrico</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
