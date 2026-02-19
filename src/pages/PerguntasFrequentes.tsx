import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

const faqs = [
  {
    q: 'Qual o preço do kWh em Portugal em 2025?',
    a: 'Em 2025, o preço médio do kWh em Portugal ronda os €0,20–€0,25/kWh na tarifa simples (indexada), dependendo do comercializador e do ciclo tarifário. O Comercializador de Último Recurso (CUR) pratica preços regulados que servem de referência. Use a nossa calculadora para simular com o preço exato da sua fatura.',
  },
  {
    q: 'Quanto gasta um frigorífico por mês?',
    a: 'Um frigorífico moderno de classe A+++ consome entre 100–150 kWh por ano, o que equivale a cerca de €2–€3 por mês. Um frigorífico antigo pode consumir 400–600 kWh/ano, custando €7–€10/mês. A diferença anual pode ultrapassar €80.',
  },
  {
    q: 'Vale a pena mudar para a tarifa bi-horária?',
    a: 'A tarifa bi-horária pode compensar se conseguir deslocar consumos pesados (máquina de lavar, dishwasher, carregar veículos elétricos) para o período de vazio (22h–08h). Em média, poupar 20–30% na fatura é possível. Não compensa se o seu perfil de consumo for predominantemente diurno.',
  },
  {
    q: 'O que é a potência contratada e como afeta a fatura?',
    a: 'A potência contratada (em kVA) é a quantidade máxima de energia que pode usar em simultâneo. É cobrada mensalmente como custo fixo, independentemente do consumo. Se tiver muitos aparelhos ligados ao mesmo tempo e saltar o disjuntor, pode precisar de aumentar a potência. Reduzi-la é uma forma de baixar a componente fixa da fatura.',
  },
  {
    q: 'Como funciona o ciclo diário da tarifa bi-horária?',
    a: 'No ciclo diário: Hora de Vazio das 22h00 às 08h00 (preço mais baixo) e Hora de Ponta das 08h00 às 22h00 (preço mais alto). No ciclo semanal, ao fim de semana e feriados todo o dia é considerado Vazio. A diferença de preço entre os dois períodos pode ser de 40–60%.',
  },
  {
    q: 'Quanto gasta um ar condicionado por hora?',
    a: 'Um ar condicionado típico de 12.000 BTU (split) consome entre 1.000–1.500W por hora. A €0,22/kWh, isso corresponde a €0,22–€0,33 por hora de utilização. Usar 4 horas por dia durante um mês de verão pode custar €26–€40 apenas no ar condicionado.',
  },
  {
    q: 'Qual o eletrodoméstico que mais consome eletricidade em casa?',
    a: 'Em Portugal, os maiores consumidores domésticos são: Aquecimento/Arrefecimento (30–40% da fatura), Esquentador elétrico/termoacumulador (20–25%), Frigorífico (10–15%), Máquina de lavar e secar (10%), Iluminação (5–10%). Otimizar aquecimento e águas quentes sanitárias tem o maior impacto.',
  },
  {
    q: 'Como reduzir a conta da luz sem grandes investimentos?',
    a: 'Medidas simples e gratuitas: mudar aparelhos em standby para off, lavar a roupa em programas eco, usar a máquina de lavar à noite (bi-horária), regular o termostato entre 18–20°C no inverno, aproveitar luz natural, e verificar se a potência contratada está ajustada ao seu perfil.',
  },
  {
    q: 'O que é o IVA na fatura da eletricidade?',
    a: 'A fatura de eletricidade tem IVA a 6% sobre a energia consumida e sobre a potência contratada (taxa reduzida). Outros encargos como a Taxa de Audiovisual (€2,85/mês) ou a Taxa de Exploração têm IVA a 23%. Verifique sempre a decomposição do IVA na sua fatura.',
  },
  {
    q: 'Quanto gasta uma máquina de lavar por ciclo?',
    a: 'Uma máquina de lavar modern consome entre 0,5–1,5 kWh por ciclo, dependendo do programa (frio vs. 60°C). A €0,22/kWh, um ciclo custa entre €0,11–€0,33. Usar o programa eco ou lavar a 30°C pode reduzir o consumo em 60% face ao programa a 60°C.',
  },
  {
    q: 'Como posso mudar de comercializador de eletricidade?',
    a: 'Pode mudar de comercializador livremente, sem custos, através do portal ERSE ou contactando diretamente o novo fornecedor. O processo demora cerca de 20 dias úteis. Compare as ofertas no simulador da ERSE em erse.pt para encontrar a melhor tarifa para o seu perfil.',
  },
  {
    q: 'O que é a Tarifa Social da eletricidade?',
    a: 'A Tarifa Social é um desconto atribuído a famílias em situação de vulnerabilidade económica. Pode dar direito a descontos entre 30–65% na fatura. Para se candidatar, é necessário estar inscrito na Segurança Social e cumprir critérios de rendimento. A candidatura é feita junto da Segurança Social.',
  },
  {
    q: 'Vale a pena investir em painéis solares?',
    a: 'Com preços a partir de €3.000–€5.000 para uma instalação residencial típica (3–5 kWp), o retorno do investimento é de 7–12 anos em Portugal, um dos países com mais horas de sol na Europa. A autoconsumo pode reduzir a fatura em 50–80%. O regime de injeção na rede (venda de excedentes) torna o investimento ainda mais rentável.',
  },
  {
    q: 'Como ler o contador de eletricidade em casa?',
    a: 'Contadores digitais mostram o consumo em kWh. Em tarifa bi-horária, verá dois registos: "Cheio/Ponta" e "Vazio". Para calcular o consumo mensal, registe o valor no início e fim do mês e subtraia. A diferença é o kWh consumido. Multiplique pelo preço do kWh da sua tarifa.',
  },
  {
    q: 'Quando devo considerar uma tarifa tri-horária?',
    a: 'A tarifa tri-horária (super-vazio, vazio e cheio) compensa para quem tem cargas muito grandes deslocáveis para o super-vazio (00h–02h e 06h–08h). É especialmente interessante para carregamento de veículos elétricos ou baterias domésticas. Para a maioria das famílias, a bi-horária já oferece bons resultados.',
  },
];

const PerguntasFrequentes = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <Layout>
      <SEOHead
        title="Perguntas Frequentes sobre Eletricidade Portugal | ContaDaLuz.pt"
        description="Respostas às perguntas mais frequentes sobre eletricidade em Portugal: preço do kWh, tarifas bi-horárias, consumo de eletrodomésticos e como poupar na conta da luz."
        canonical="https://contadaluz.pt/perguntas-frequentes"
        structuredData={faqSchema}
      />
      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Hero */}
          <Card className="gradient-primary brutal-shadow-lg brutal-border p-6 text-primary-foreground text-center">
            <h1 className="text-2xl font-black mb-2">Perguntas Frequentes sobre Eletricidade</h1>
            <p className="opacity-90 font-medium">
              Respostas claras sobre preço do kWh, tarifas bi-horárias, eletrodomésticos e como poupar na conta da luz em Portugal.
            </p>
          </Card>

          {/* Intro */}
          <Card className="brutal-border brutal-shadow p-5">
            <p className="text-muted-foreground leading-relaxed">
              Reunimos as perguntas mais frequentes dos portugueses sobre a conta da luz. Desde o preço do kWh em 2025 até quanto gasta um frigorífico por mês — encontre aqui as respostas baseadas em dados reais do mercado português.
            </p>
          </Card>

          {/* FAQ Accordion */}
          <Card className="brutal-border brutal-shadow p-5">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-muted last:border-0">
                  <AccordionTrigger className="text-left font-bold hover:no-underline hover:text-primary py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Links internos */}
          <Card className="brutal-border brutal-shadow p-5">
            <h2 className="text-lg font-black mb-3">📖 Artigos Relacionados</h2>
            <div className="space-y-2">
              <Link to="/tarifas" className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                → Comparar Tarifas de Eletricidade em Portugal
              </Link>
              <Link to="/poupar-energia" className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                → Como Poupar Energia em Casa
              </Link>
              <Link to="/analisar-fatura" className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                → Como Ler a Fatura da Eletricidade
              </Link>
            </div>
          </Card>

          {/* CTA */}
          <Card className="brutal-border brutal-shadow gradient-energy p-6 text-center text-accent-foreground">
            <Calculator className="w-10 h-10 mx-auto mb-3" />
            <h2 className="text-xl font-black mb-2">Calcule o seu consumo agora</h2>
            <p className="mb-4 opacity-90 font-medium">Use a nossa calculadora para descobrir exatamente quanto gasta cada aparelho da sua casa.</p>
            <Button asChild size="lg" className="brutal-border brutal-shadow bg-background text-foreground hover:bg-muted font-bold">
              <Link to="/">Abrir Calculadora</Link>
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PerguntasFrequentes;
