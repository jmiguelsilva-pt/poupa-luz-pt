import React, { useState } from 'react';
import { Appliance } from './EnergyCalculator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
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

const appliancePresets = [
  { name: 'Frigorífico', power: 150, icon: 'Refrigerator' },
  { name: 'TV', power: 100, icon: 'Tv' },
  { name: 'Máquina de Lavar', power: 2000, icon: 'WashingMachine' },
  { name: 'Ar Condicionado', power: 1500, icon: 'AirVent' },
  { name: 'Micro-ondas', power: 800, icon: 'Microwave' },
  { name: 'Computador', power: 300, icon: 'Monitor' },
  { name: 'Lâmpadas LED', power: 10, icon: 'Lightbulb' },
  { name: 'Forno Elétrico', power: 2500, icon: 'Zap' },
  { name: 'Chaleira Elétrica', power: 2000, icon: 'Coffee' },
  { name: 'Torradeira', power: 1200, icon: 'Zap' },
  { name: 'Aspirador', power: 1400, icon: 'Wind' },
  { name: 'Máquina de Café', power: 1000, icon: 'Coffee' },
  { name: 'Ventoinha', power: 75, icon: 'Wind' },
  { name: 'Aquecedor Elétrico', power: 2000, icon: 'Flame' },
  { name: 'Placa de Indução', power: 3000, icon: 'Circle' },
  { name: 'Ferro de Engomar', power: 2200, icon: 'Zap' },
  { name: 'Secador de Cabelo', power: 1800, icon: 'Wind' },
  { name: 'Consola de Jogos', power: 150, icon: 'Gamepad2' },
  { name: 'Router Wi-Fi', power: 15, icon: 'Wifi' },
  { name: 'Monitor PC', power: 120, icon: 'Monitor' },
  { name: 'Exaustor Cozinha', power: 200, icon: 'Wind' },
  { name: 'Robô de Cozinha', power: 1000, icon: 'Bot' },
  { name: 'Box TV', power: 20, icon: 'Tv' },
  { name: 'Personalizado', power: 100, icon: 'Zap' },
];

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

interface ApplianceSelectorProps {
  onAddAppliance: (appliance: Omit<Appliance, 'id'>) => void;
}

const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({ onAddAppliance }) => {
  const [selectedPreset, setSelectedPreset] = useState(appliancePresets[0]);
  const [customName, setCustomName] = useState('');
  const [power, setPower] = useState(150);
  const [hoursPerDay, setHoursPerDay] = useState([8]);

  const handlePresetSelect = (preset: typeof appliancePresets[0]) => {
    setSelectedPreset(preset);
    setPower(preset.power);
    if (preset.name === 'Personalizado') {
      setCustomName('');
    }
  };

  const handleAddAppliance = () => {
    const name = selectedPreset.name === 'Personalizado' && customName 
      ? customName 
      : selectedPreset.name;
    
    onAddAppliance({
      name,
      power,
      hoursPerDay: hoursPerDay[0],
      icon: selectedPreset.icon
    });

    // Reset form
    setCustomName('');
    setHoursPerDay([8]);
  };

  const IconComponent = iconMap[selectedPreset.icon as keyof typeof iconMap];

  return (
    <Card className="brutal-border brutal-shadow p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            ADICIONAR ELETRODOMÉSTICO
          </h2>
          <p className="text-muted-foreground">
            Escolha um aparelho ou crie um personalizado
          </p>
        </div>

        {/* Appliance Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {appliancePresets.map((preset) => {
            const Icon = iconMap[preset.icon as keyof typeof iconMap];
            const isSelected = selectedPreset.name === preset.name;
            
            return (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected 
                    ? 'gradient-secondary brutal-shadow border-border' 
                    : 'bg-card border-muted hover:border-border'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  isSelected ? 'text-secondary-foreground' : 'text-foreground'
                }`} />
                <p className={`text-sm font-semibold ${
                  isSelected ? 'text-secondary-foreground' : 'text-foreground'
                }`}>
                  {preset.name}
                </p>
                <p className={`text-xs ${
                  isSelected ? 'text-secondary-foreground opacity-80' : 'text-muted-foreground'
                }`}>
                  {preset.power}W
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom Name Input */}
        {selectedPreset.name === 'Personalizado' && (
          <div className="space-y-2">
            <Label htmlFor="customName">Nome do Aparelho</Label>
            <Input
              id="customName"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Ex: Torradeira, Ferro de Engomar..."
              className="brutal-border"
            />
          </div>
        )}

        {/* Power Input */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="power">Potência (Watts)</Label>
            <span className="text-sm text-muted-foreground">
              Consulte a etiqueta do aparelho
            </span>
          </div>
          <Input
            id="power"
            type="number"
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
            className="brutal-border text-center text-lg font-semibold"
            min="1"
            max="10000"
          />
        </div>

        {/* Hours Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Horas de uso diário</Label>
            <span className="text-lg font-bold gradient-energy bg-clip-text text-transparent">
              {hoursPerDay[0]}h
            </span>
          </div>
          <Slider
            value={hoursPerDay}
            onValueChange={setHoursPerDay}
            max={24}
            min={0.5}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Add Button */}
        <Button 
          onClick={handleAddAppliance}
          variant="primary"
          size="lg"
          className="w-full gap-2"
          disabled={selectedPreset.name === 'Personalizado' && !customName.trim()}
        >
          <IconComponent className="w-5 h-5" />
          Adicionar {selectedPreset.name === 'Personalizado' && customName 
            ? customName 
            : selectedPreset.name}
        </Button>
      </div>
    </Card>
  );
};

export { ApplianceSelector };