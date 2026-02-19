import EnergyCalculator from '../components/EnergyCalculator';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Calculadora Consumo Electricidade - Quanto Gasta em Luz | Portugal"
        description="Calcule o consumo elétrico dos seus eletrodomésticos em Portugal. Descubra quanto gasta por dia e mês com frigorífico, TV, máquina de lavar e mais. Simule a sua conta da luz."
        canonical="https://contadaluz.pt/"
      />
      <EnergyCalculator />
    </Layout>
  );
};

export default Index;
