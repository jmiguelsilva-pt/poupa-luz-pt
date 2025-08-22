import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Zap, Clock, Sun } from 'lucide-react';
import { Tariff } from './EnergyCalculator';

const tariffOptions: Tariff[] = [
  {
    id: 'normal',
    name: 'Tarifa Normal',
    pricePerKwh: 0.22
  },
  {
    id: 'bi-vazio',
    name: 'Bi-horário (Vazio)',
    pricePerKwh: 0.15
  },
  {
    id: 'bi-cheio',
    name: 'Bi-horário (Fora-Vazio)',
    pricePerKwh: 0.30
  }
];

const tariffIcons = {
  'normal': Zap,
  'bi-vazio': Clock,
  'bi-cheio': Sun
};

interface TariffSelectorProps {
  selectedTariff: Tariff;
  onTariffChange: (tariff: Tariff) => void;
}

const TariffSelector: React.FC<TariffSelectorProps> = ({ 
  selectedTariff, 
  onTariffChange 
}) => {
  const [customPrice, setCustomPrice] = useState(selectedTariff.pricePerKwh);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTariffSelect = (tariff: Tariff) => {
    if (tariff.id === 'normal') {
      setShowCustomInput(true);
      setCustomPrice(tariff.pricePerKwh);
    } else {
      setShowCustomInput(false);
    }
    onTariffChange(tariff);
  };

  const handleCustomPriceChange = (price: number) => {
    setCustomPrice(price);
    onTariffChange({
      ...selectedTariff,
      pricePerKwh: price
    });
  };

  return (
    <Card className="brutal-border brutal-shadow p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            TARIFA DE ENERGIA
          </h2>
          <p className="text-muted-foreground">
            Selecione a sua tarifa (consulte a fatura)
          </p>
        </div>

        <div className="grid gap-3">
          {tariffOptions.map((tariff) => {
            const Icon = tariffIcons[tariff.id as keyof typeof tariffIcons];
            const isSelected = selectedTariff.id === tariff.id;
            
            return (
              <button
                key={tariff.id}
                onClick={() => handleTariffSelect(tariff)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected 
                    ? 'gradient-energy brutal-shadow border-border' 
                    : 'bg-card border-muted hover:border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-accent-foreground' : 'text-foreground'
                    }`} />
                    <div>
                      <p className={`font-bold ${
                        isSelected ? 'text-accent-foreground' : 'text-foreground'
                      }`}>
                        {tariff.name}
                      </p>
                      <p className={`text-sm ${
                        isSelected ? 'text-accent-foreground opacity-90' : 'text-muted-foreground'
                      }`}>
                        {tariff.id === 'bi-vazio' && '22h-6h'}
                        {tariff.id === 'bi-cheio' && '6h-22h'}
                        {tariff.id === 'normal' && 'Todas as horas'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-black ${
                      isSelected ? 'text-accent-foreground' : 'text-foreground'
                    }`}>
                      €{(tariff.id === 'normal' && isSelected ? customPrice : tariff.pricePerKwh).toFixed(2)}
                    </p>
                    <p className={`text-sm ${
                      isSelected ? 'text-accent-foreground opacity-90' : 'text-muted-foreground'
                    }`}>
                      /kWh
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Price Input for Normal Tariff */}
        {showCustomInput && selectedTariff.id === 'normal' && (
          <div className="space-y-2">
            <Label htmlFor="customPrice">Preço Personalizado (€/kWh)</Label>
            <Input
              id="customPrice"
              type="number"
              value={customPrice}
              onChange={(e) => handleCustomPriceChange(Number(e.target.value))}
              step="0.01"
              min="0.01"
              max="1.00"
              className="brutal-border text-center text-lg font-semibold"
              placeholder="0.22"
            />
            <p className="text-xs text-muted-foreground text-center">
              Consulte o preço na sua fatura elétrica
            </p>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground bg-muted p-3 rounded-lg">
          💡 Dica: Encontre o preço do kWh na sua fatura elétrica
        </div>
      </div>
    </Card>
  );
};

export { TariffSelector };