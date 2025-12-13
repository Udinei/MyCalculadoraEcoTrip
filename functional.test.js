// Testes funcionais carregando módulos diretamente
const fs = require('fs');
const path = require('path');

// Carrega e executa os módulos
const configJs = fs.readFileSync(path.join(__dirname, 'js/config.js'), 'utf8');
const calculatorJs = fs.readFileSync(path.join(__dirname, 'js/calculator.js'), 'utf8');

// Executa no contexto global
eval(configJs);
eval(calculatorJs);

describe('Calculadora Eco Trip - Testes Funcionais', () => {
  
  describe('Cálculos de Emissões', () => {
    test('deve calcular emissões corretas para todos os transportes', () => {
      expect(calculator.calculateEmission(100, 'bicycle')).toBe(0);
      expect(calculator.calculateEmission(100, 'car')).toBe(12);
      expect(calculator.calculateEmission(100, 'bus')).toBe(8.9);
      expect(calculator.calculateEmission(100, 'truck')).toBe(96);
    });

    test('deve calcular rota São Paulo → Rio de Janeiro (430km)', () => {
      const emissions = calculator.calculateAllEmissions(430);
      
      expect(emissions.bicycle).toBe(0);
      expect(emissions.car).toBe(51.6);
      expect(emissions.bus).toBe(38.27);
      expect(emissions.truck).toBe(412.8);
    });

    test('deve calcular economia do ônibus vs carro', () => {
      const savings = calculator.calculateSavings(38.27, 51.6);
      
      expect(savings.savings).toBe(13.33);
      expect(savings.percentage).toBe(25.83);
    });
  });

  describe('Créditos de Carbono', () => {
    test('deve calcular créditos necessários', () => {
      expect(calculator.calculateCarbonCredits(1000)).toBe(1);
      expect(calculator.calculateCarbonCredits(38270)).toBe(38.27);
    });

    test('deve calcular custos atualizados (2024)', () => {
      const cost = calculator.calculateCost(1);
      
      expect(cost.base).toBe(45); // R$ 45,00 base
      expect(cost.min).toBe(25);  // R$ 25,00 mínimo
      expect(cost.max).toBe(85);  // R$ 85,00 máximo
    });
  });

  describe('Configurações', () => {
    test('deve ter coeficientes corretos', () => {
      expect(config.co2Emissions.bicycle).toBe(0);
      expect(config.co2Emissions.car).toBe(0.12);
      expect(config.co2Emissions.bus).toBe(0.089);
      expect(config.co2Emissions.truck).toBe(0.960);
    });

    test('deve ter preços atualizados de créditos', () => {
      expect(config.carbonCreditCost).toBe(45);
      expect(config.priceRange.min).toBe(25);
      expect(config.priceRange.max).toBe(85);
    });
  });

  describe('Cenários Reais', () => {
    test('viagem curta: São Paulo → Campinas (100km)', () => {
      const emissions = calculator.calculateAllEmissions(100);
      
      expect(emissions.car).toBe(12);
      expect(emissions.bus).toBe(8.9);
      
      const savings = calculator.calculateSavings(8.9, 12);
      expect(savings.savings).toBe(3.1);
      expect(savings.percentage).toBe(25.83);
    });

    test('viagem longa: São Paulo → Brasília (1000km)', () => {
      const emissions = calculator.calculateAllEmissions(1000);
      
      expect(emissions.car).toBe(120);
      expect(emissions.bus).toBe(89);
      expect(emissions.truck).toBe(960);
      
      const credits = calculator.calculateCarbonCredits(120000); // 120kg = 120000g
      expect(credits).toBe(120);
    });

    test('transporte sustentável: bicicleta sempre zero', () => {
      expect(calculator.calculateEmission(50, 'bicycle')).toBe(0);
      expect(calculator.calculateEmission(500, 'bicycle')).toBe(0);
      expect(calculator.calculateEmission(5000, 'bicycle')).toBe(0);
    });
  });
});