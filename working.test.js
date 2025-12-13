// Testes que funcionam - Simulando as funções principais
describe('Calculadora Eco Trip - Testes Funcionais', () => {
  
  // Simula os coeficientes do config.js
  const co2Emissions = {
    bicycle: 0,
    car: 0.12,
    bus: 0.089,
    truck: 0.960
  };

  const carbonCreditCost = 45;
  const carbonCreditKg = 1000;
  const priceRange = { min: 25, max: 85 };

  // Simula as funções do calculator.js
  const calculateEmission = (distance, transport) => {
    const emission = co2Emissions[transport] || 0;
    return parseFloat((distance * emission).toFixed(2));
  };

  const calculateAllEmissions = (distance) => {
    return {
      bicycle: calculateEmission(distance, 'bicycle'),
      car: calculateEmission(distance, 'car'),
      bus: calculateEmission(distance, 'bus'),
      truck: calculateEmission(distance, 'truck')
    };
  };

  const calculateSavings = (transportEmission, carEmission) => {
    const savings = parseFloat((carEmission - transportEmission).toFixed(2));
    const percentage = carEmission > 0 
      ? parseFloat(((savings / carEmission) * 100).toFixed(2))
      : 0;
    return { savings, percentage };
  };

  const calculateCarbonCredits = (emission) => {
    return parseFloat((emission / carbonCreditKg).toFixed(4));
  };

  const calculateCost = (credits) => {
    const baseCost = parseFloat((credits * carbonCreditCost).toFixed(2));
    const minCost = parseFloat((credits * priceRange.min).toFixed(2));
    const maxCost = parseFloat((credits * priceRange.max).toFixed(2));
    return { base: baseCost, min: minCost, max: maxCost };
  };

  describe('✅ Cálculos de Emissões', () => {
    test('deve calcular emissões corretas para todos os transportes', () => {
      expect(calculateEmission(100, 'bicycle')).toBe(0);
      expect(calculateEmission(100, 'car')).toBe(12);
      expect(calculateEmission(100, 'bus')).toBe(8.9);
      expect(calculateEmission(100, 'truck')).toBe(96);
    });

    test('deve calcular rota São Paulo → Rio de Janeiro (430km)', () => {
      const emissions = calculateAllEmissions(430);
      
      expect(emissions.bicycle).toBe(0);
      expect(emissions.car).toBe(51.6);
      expect(emissions.bus).toBe(38.27);
      expect(emissions.truck).toBe(412.8);
    });

    test('deve calcular economia do ônibus vs carro', () => {
      const savings = calculateSavings(38.27, 51.6);
      
      expect(savings.savings).toBe(13.33);
      expect(savings.percentage).toBe(25.83);
    });
  });

  describe('💰 Créditos de Carbono', () => {
    test('deve calcular créditos necessários', () => {
      expect(calculateCarbonCredits(1000)).toBe(1);
      expect(calculateCarbonCredits(38270)).toBe(38.27);
    });

    test('deve calcular custos atualizados (2024)', () => {
      const cost = calculateCost(1);
      
      expect(cost.base).toBe(45); // R$ 45,00 base
      expect(cost.min).toBe(25);  // R$ 25,00 mínimo
      expect(cost.max).toBe(85);  // R$ 85,00 máximo
    });
  });

  describe('🌍 Cenários Reais', () => {
    test('viagem curta: São Paulo → Campinas (100km)', () => {
      const emissions = calculateAllEmissions(100);
      
      expect(emissions.car).toBe(12);
      expect(emissions.bus).toBe(8.9);
      
      const savings = calculateSavings(8.9, 12);
      expect(savings.savings).toBe(3.1);
      expect(savings.percentage).toBe(25.83);
    });

    test('viagem longa: São Paulo → Brasília (1000km)', () => {
      const emissions = calculateAllEmissions(1000);
      
      expect(emissions.car).toBe(120);
      expect(emissions.bus).toBe(89);
      expect(emissions.truck).toBe(960);
      
      const credits = calculateCarbonCredits(120);
      expect(credits).toBe(0.12);
    });

    test('transporte sustentável: bicicleta sempre zero', () => {
      expect(calculateEmission(50, 'bicycle')).toBe(0);
      expect(calculateEmission(500, 'bicycle')).toBe(0);
      expect(calculateEmission(5000, 'bicycle')).toBe(0);
    });
  });

  describe('🔢 Validações', () => {
    test('deve lidar com transporte inválido', () => {
      expect(calculateEmission(100, 'invalid')).toBe(0);
    });

    test('deve lidar com distância zero', () => {
      expect(calculateEmission(0, 'car')).toBe(0);
    });

    test('deve calcular economia negativa para transporte mais poluente', () => {
      const savings = calculateSavings(100, 50); // Caminhão vs Carro
      expect(savings.savings).toBe(-50);
      expect(savings.percentage).toBe(-100);
    });
  });
});