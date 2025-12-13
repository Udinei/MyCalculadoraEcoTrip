// Testes para calculator.js
describe('Calculator - Cálculos de Emissões', () => {
  
  describe('calculateEmission', () => {
    test('deve calcular emissão zero para bicicleta', () => {
      expect(calculator.calculateEmission(100, 'bicycle')).toBe(0);
      expect(calculator.calculateEmission(500, 'bicycle')).toBe(0);
    });

    test('deve calcular emissão correta para carro', () => {
      expect(calculator.calculateEmission(100, 'car')).toBe(12);
      expect(calculator.calculateEmission(430, 'car')).toBe(51.6);
    });

    test('deve calcular emissão correta para ônibus', () => {
      expect(calculator.calculateEmission(100, 'bus')).toBe(8.9);
      expect(calculator.calculateEmission(430, 'bus')).toBe(38.27);
    });

    test('deve calcular emissão correta para caminhão', () => {
      expect(calculator.calculateEmission(100, 'truck')).toBe(96);
      expect(calculator.calculateEmission(430, 'truck')).toBe(412.8);
    });

    test('deve retornar 0 para transporte inválido', () => {
      expect(calculator.calculateEmission(100, 'invalid')).toBe(0);
    });
  });

  describe('calculateAllEmissions', () => {
    test('deve calcular todas as emissões para 430km', () => {
      const result = calculator.calculateAllEmissions(430);
      expect(result.bicycle).toBe(0);
      expect(result.car).toBe(51.6);
      expect(result.bus).toBe(38.27);
      expect(result.truck).toBe(412.8);
    });

    test('deve calcular todas as emissões para 100km', () => {
      const result = calculator.calculateAllEmissions(100);
      expect(result.bicycle).toBe(0);
      expect(result.car).toBe(12);
      expect(result.bus).toBe(8.9);
      expect(result.truck).toBe(96);
    });
  });

  describe('calculateSavings', () => {
    test('deve calcular economia correta vs carro', () => {
      const result = calculator.calculateSavings(38.27, 51.6);
      expect(result.savings).toBe(13.33);
      expect(result.percentage).toBe(25.83);
    });

    test('deve retornar economia zero para transporte mais poluente', () => {
      const result = calculator.calculateSavings(100, 50);
      expect(result.savings).toBe(-50);
      expect(result.percentage).toBe(-100);
    });

    test('deve lidar com emissão de carro zero', () => {
      const result = calculator.calculateSavings(10, 0);
      expect(result.savings).toBe(-10);
      expect(result.percentage).toBe(0);
    });
  });

  describe('calculateCarbonCredits', () => {
    test('deve calcular créditos de carbono corretamente', () => {
      expect(calculator.calculateCarbonCredits(1000)).toBe(1);
      expect(calculator.calculateCarbonCredits(38270)).toBe(38.27);
      expect(calculator.calculateCarbonCredits(500)).toBe(0.5);
    });
  });

  describe('calculateCost', () => {
    test('deve calcular custo dos créditos', () => {
      const result = calculator.calculateCost(1);
      expect(result.base).toBe(45);
      expect(result.min).toBe(25);
      expect(result.max).toBe(85);
    });

    test('deve calcular custo para frações de crédito', () => {
      const result = calculator.calculateCost(0.5);
      expect(result.base).toBe(22.5);
      expect(result.min).toBe(12.5);
      expect(result.max).toBe(42.5);
    });
  });
});