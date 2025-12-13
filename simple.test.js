// Teste simples para verificar se Jest está funcionando
describe('Jest Setup', () => {
  test('deve executar testes básicos', () => {
    expect(1 + 1).toBe(2);
    expect('hello').toBe('hello');
  });

  test('deve testar operações matemáticas', () => {
    const distance = 100;
    const emission = distance * 0.12; // Carro
    expect(emission).toBe(12);
  });

  test('deve testar cálculo de créditos de carbono', () => {
    const emission = 1000; // kg CO₂
    const credits = emission / 1000; // 1 crédito = 1000 kg
    expect(credits).toBe(1);
  });

  test('deve testar cálculo de economia', () => {
    const carEmission = 51.6;
    const busEmission = 38.27;
    const savings = carEmission - busEmission;
    expect(savings).toBeCloseTo(13.33, 2);
  });

  test('deve testar percentual relativo', () => {
    const busEmission = 38.27;
    const carEmission = 51.6;
    const percentage = (busEmission / carEmission) * 100;
    expect(percentage).toBeCloseTo(74.17, 2);
  });
});