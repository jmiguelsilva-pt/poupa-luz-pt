import React, { useState } from 'react';
import { Plus, Calculator, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ApplianceSelector } from './ApplianceSelector';
import { TariffSelector } from './TariffSelector';
import { ResultsDisplay } from './ResultsDisplay';
import { AdBanner } from './AdBanner';
import { useToast } from '@/hooks/use-toast';
export interface Appliance {
  id: string;
  name: string;
  power: number; // watts
  hoursPerDay: number;
  icon: string;
}
export interface Tariff {
  id: string;
  name: string;
  pricePerKwh: number;
}
const EnergyCalculator = () => {
  const {
    toast
  } = useToast();
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [selectedTariff, setSelectedTariff] = useState<Tariff>({
    id: 'normal',
    name: 'Tarifa Normal',
    pricePerKwh: 0.22
  });
  const addAppliance = (appliance: Omit<Appliance, 'id'>) => {
    const newAppliance = {
      ...appliance,
      id: Date.now().toString()
    };
    setAppliances(prev => [...prev, newAppliance]);
    toast({
      title: "Aparelho adicionado!",
      description: `${appliance.name} foi adicionado à sua calculadora.`
    });
  };
  const removeAppliance = (id: string) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };
  const updateAppliance = (id: string, updates: Partial<Appliance>) => {
    setAppliances(prev => prev.map(app => app.id === id ? {
      ...app,
      ...updates
    } : app));
  };
  const shareResults = () => {
    // Create report data
    const reportData = {
      appliances: appliances.map(app => ({
        name: app.name,
        power: app.power,
        hoursPerDay: app.hoursPerDay,
        icon: app.icon
      })),
      tariff: {
        name: selectedTariff.name,
        pricePerKwh: selectedTariff.pricePerKwh
      }
    };

    // Encode data and create shareable link
    const encodedData = btoa(JSON.stringify(reportData));
    const reportUrl = `${window.location.origin}/report/${encodedData}`;
    const totalDaily = appliances.reduce((acc, app) => {
      return acc + app.power * app.hoursPerDay / 1000 * selectedTariff.pricePerKwh;
    }, 0);
    const message = `💡 Calculei o meu consumo elétrico:
    
🏠 Total diário: €${totalDaily.toFixed(2)}
💰 Total mensal: €${(totalDaily * 30).toFixed(2)}

📊 Ver relatório completo: ${reportUrl}

Descubra o seu consumo em: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: 'Calculadora de Consumo Elétrico',
        text: message,
        url: reportUrl
      });
    } else {
      navigator.clipboard.writeText(message);
      toast({
        title: "Link copiado!",
        description: "Link do relatório copiado para partilhar."
      });
    }
  };
  return <div className="min-h-screen bg-background px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="gradient-primary brutal-shadow-lg brutal-border p-6">
          <div className="text-center text-primary-foreground">
            <Calculator className="w-12 h-12 mx-auto mb-4" />
            <h1 className="font-black mb-2 text-2xl">Calculadora Consumo Electricidade 🇵🇹</h1>
            <p className="opacity-90 font-medium text-base mx-0">Descubra quanto gastam os seus eletrodomésticos e como poupar na conta de eletricidade em Portugal.</p>
          </div>
        </Card>

        {/* Top Banner */}
        <AdBanner slot="1234567890" format="horizontal" />

        {/* Tariff Selection */}
        <TariffSelector selectedTariff={selectedTariff} onTariffChange={setSelectedTariff} />

        {/* Appliance Selection */}
        <ApplianceSelector onAddAppliance={addAppliance} />

        {/* Middle Banner */}
        <AdBanner slot="0987654321" format="auto" />

        {/* Results */}
        {appliances.length > 0 && <>
            <ResultsDisplay appliances={appliances} tariff={selectedTariff} onUpdateAppliance={updateAppliance} onRemoveAppliance={removeAppliance} />
            
            {/* Results Banner */}
            <AdBanner slot="1122334455" format="square" className="lg:float-right lg:ml-4 lg:mb-4" />
            
            {/* Share Button */}
            <div className="flex justify-center">
              <Button variant="success" size="lg" onClick={shareResults} className="gap-2">
                <Share2 className="w-5 h-5" />
                Partilhar Resultados
              </Button>
            </div>
          </>}

        {appliances.length === 0 && <Card className="brutal-border brutal-shadow p-8 text-center">
            <div className="text-muted-foreground">
              <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl font-semibold mb-2">
                Adicione um eletrodoméstico para começar
              </p>
              <p>
                Selecione aparelhos acima para calcular o seu consumo elétrico
              </p>
            </div>
          </Card>}
      </div>
    </div>;
};
export default EnergyCalculator;