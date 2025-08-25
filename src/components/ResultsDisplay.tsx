import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Trash2, TrendingDown, PieChart } from 'lucide-react';
import { Appliance, Tariff } from './EnergyCalculator';
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

interface ResultsDisplayProps {
  appliances: Appliance[];
  tariff: Tariff;
  onUpdateAppliance: (id: string, updates: Partial<Appliance>) => void;
  onRemoveAppliance: (id: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  appliances,
  tariff,
  onUpdateAppliance,
  onRemoveAppliance
}) => {
  const calculateConsumption = (appliance: Appliance) => {
    const dailyKwh = (appliance.power * appliance.hoursPerDay) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const dailyCost = dailyKwh * tariff.pricePerKwh;
    const monthlyCost = monthlyKwh * tariff.pricePerKwh;
    
    return { dailyKwh, monthlyKwh, dailyCost, monthlyCost };
  };

  const totalMonthly = appliances.reduce((acc, app) => {
    return acc + calculateConsumption(app).monthlyCost;
  }, 0);

  const totalDailyKwh = appliances.reduce((acc, app) => {
    return acc + calculateConsumption(app).dailyKwh;
  }, 0);

  const getSavingsMessage = (appliance: Appliance) => {
    const consumption = calculateConsumption(appliance);
    const potentialSavings = consumption.monthlyCost * 0.3; // 30% potential savings
    
    return `💰 Economia potencial: €${potentialSavings.toFixed(2)}/mês com aparelho classe A+++`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="gradient-success brutal-border brutal-shadow-lg p-6">
        <div className="text-center text-success-foreground">
          <PieChart className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">
            CONSUMO TOTAL
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-black">
                €{(totalMonthly / 30).toFixed(2)}
              </p>
              <p className="text-sm opacity-90">por dia</p>
            </div>
            <div>
              <p className="text-2xl font-black">
                €{totalMonthly.toFixed(2)}
              </p>
              <p className="text-sm opacity-90">por mês</p>
            </div>
            <div>
              <p className="text-2xl font-black">
                {totalDailyKwh.toFixed(1)} kWh
              </p>
              <p className="text-sm opacity-90">por dia</p>
            </div>
            <div>
              <p className="text-2xl font-black">
                {(totalDailyKwh * 30).toFixed(0)} kWh
              </p>
              <p className="text-sm opacity-90">por mês</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Individual Appliances */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">OS SEUS APARELHOS</h3>
        
        {appliances.map((appliance) => {
          const Icon = iconMap[appliance.icon as keyof typeof iconMap];
          const consumption = calculateConsumption(appliance);
          const percentage = (consumption.monthlyCost / totalMonthly) * 100;
          
          return (
            <Card key={appliance.id} className="brutal-border brutal-shadow p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="gradient-primary p-2 rounded-lg">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{appliance.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {appliance.power}W • {appliance.hoursPerDay}h/dia
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemoveAppliance(appliance.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Controls */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Potência (W)</label>
                    <Input
                      type="number"
                      value={appliance.power}
                      onChange={(e) => onUpdateAppliance(appliance.id, { 
                        power: Number(e.target.value) 
                      })}
                      className="brutal-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-semibold">Horas/dia</label>
                      <span className="text-sm font-bold">{appliance.hoursPerDay}h</span>
                    </div>
                    <Slider
                      value={[appliance.hoursPerDay]}
                      onValueChange={([value]) => onUpdateAppliance(appliance.id, { 
                        hoursPerDay: value 
                      })}
                      max={24}
                      min={0.5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t-2 border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Diário</p>
                    <p className="text-lg font-bold">
                      {consumption.dailyKwh.toFixed(2)} kWh
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Mensal</p>
                    <p className="text-lg font-bold">
                      {consumption.monthlyKwh.toFixed(0)} kWh
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Custo/dia</p>
                    <p className="text-lg font-bold text-accent">
                      €{consumption.dailyCost.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Custo/mês</p>
                    <p className="text-lg font-bold text-accent">
                      €{consumption.monthlyCost.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Percentage and Savings */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Contribuição para o total:</span>
                    <span className="font-bold">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="gradient-energy h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingDown className="w-4 h-4 text-success" />
                      <span className="text-success font-medium">
                        {getSavingsMessage(appliance)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export { ResultsDisplay };