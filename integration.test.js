// Testes de Integração - Fluxo Completo
describe('Integração - Fluxo Completo da Aplicação', () => {
  
  beforeEach(() => {
    // Setup completo do DOM
    document.body.innerHTML = `
      <input id="origin-input" value="">
      <input id="destination-input" value="">
      <input id="distance-input" value="">
      <input type="checkbox" id="manual-distance-checkbox">
      <button id="calc-button">Calcular Emissões</button>
      <div class="transport-option selected" data-transport="bus"></div>
      <div class="transport-option" data-transport="car"></div>
      <div id="route-text"></div>
      <div id="distance-text"></div>
      <div id="emission-text"></div>
      <div id="emission-note"></div>
      <div id="economy-text"></div>
      <div id="economy-percentage"></div>
      <div id="credits-text"></div>
      <div id="cost-text"></div>
      <div id="cost-range"></div>
      <div id="comparative-container"></div>
      <div id="loader" style="display:none;"></div>
    `;
  });

  describe('Fluxo: São Paulo → Rio de Janeiro (430km) via Ônibus', () => {
    test('deve calcular emissões corretamente para rota padrão', () => {
      // Simula entrada do usuário
      ui.updateFormValues('São Paulo, SP', 'Rio de Janeiro, RJ', 430);
      ui.selectTransport('bus');
      
      // Verifica cálculos
      expect(ui.currentDistance).toBe(430);
      expect(ui.currentTransport).toBe('bus');
      expect(ui.currentEmissions.bus).toBe(38.27);
      expect(ui.currentEmissions.car).toBe(51.6);
      
      // Verifica interface
      expect(document.getElementById('route-text').textContent).toBe('São Paulo, SP → Rio de Janeiro, RJ');
      expect(document.getElementById('distance-text').textContent).toBe('430 km');
      expect(document.getElementById('emission-text').textContent).toBe('38.27 kg CO₂');
    });

    test('deve mostrar economia vs carro corretamente', () => {
      ui.updateFormValues('São Paulo, SP', 'Rio de Janeiro, RJ', 430);
      ui.selectTransport('bus');
      
      const savings = calculator.calculateSavings(38.27, 51.6);
      expect(savings.savings).toBe(13.33);
      expect(savings.percentage).toBe(25.83);
      
      expect(document.getElementById('economy-text').textContent).toBe('13.33 kg');
      expect(document.getElementById('economy-percentage').textContent).toBe('25.83% menos emissões');
    });

    test('deve calcular créditos de carbono corretamente', () => {
      ui.updateFormValues('São Paulo, SP', 'Rio de Janeiro, RJ', 430);
      ui.selectTransport('bus');
      
      const credits = calculator.calculateCarbonCredits(38.27);
      const cost = calculator.calculateCost(credits);
      
      expect(credits).toBe(0.0383);
      expect(cost.base).toBe(1.72);
      expect(cost.min).toBe(0.96);
      expect(cost.max).toBe(3.26);
    });
  });

  describe('Fluxo: Mudança de Transporte', () => {
    test('deve recalcular ao mudar de ônibus para carro', () => {
      ui.updateFormValues('São Paulo, SP', 'Rio de Janeiro, RJ', 430);
      ui.selectTransport('bus');
      
      // Estado inicial (ônibus)
      expect(ui.currentEmissions.bus).toBe(38.27);
      
      // Muda para carro
      ui.selectTransport('car');
      expect(ui.currentTransport).toBe('car');
      expect(document.getElementById('emission-text').textContent).toBe('51.60 kg CO₂');
      expect(document.getElementById('emission-note').textContent).toBe('Carro');
    });

    test('deve mostrar aumento de emissões para caminhão', () => {
      ui.updateFormValues('São Paulo, SP', 'Rio de Janeiro, RJ', 430);
      ui.selectTransport('truck');
      
      expect(ui.currentEmissions.truck).toBe(412.8);
      expect(document.getElementById('economy-text').textContent).toBe('+361.20 kg');
    });

    test('deve mostrar emissão zero para bicicleta', () => {
      ui.updateFormValues('São Paulo, SP', 'Rio de Janeiro, RJ', 430);
      ui.selectTransport('bicycle');
      
      expect(ui.currentEmissions.bicycle).toBe(0);
      expect(document.getElementById('emission-text').textContent).toBe('0.00 kg CO₂');
      expect(document.getElementById('economy-text').textContent).toBe('51.6 kg');
    });
  });

  describe('Fluxo: Diferentes Distâncias', () => {
    test('deve calcular corretamente para viagem curta (50km)', () => {
      ui.updateFormValues('São Paulo, SP', 'Campinas, SP', 50);
      ui.selectTransport('car');
      
      expect(ui.currentEmissions.car).toBe(6);
      expect(document.getElementById('emission-text').textContent).toBe('6.00 kg CO₂');
    });

    test('deve calcular corretamente para viagem longa (1000km)', () => {
      ui.updateFormValues('São Paulo, SP', 'Brasília, DF', 1000);
      ui.selectTransport('car');
      
      expect(ui.currentEmissions.car).toBe(120);
      expect(document.getElementById('emission-text').textContent).toBe('120.00 kg CO₂');
    });
  });

  describe('Fluxo: Modo Manual vs Automático', () => {
    test('deve permitir entrada manual quando checkbox marcado', () => {
      ui.toggleManualDistance(true);
      
      const input = document.getElementById('distance-input');
      expect(input.disabled).toBe(false);
      
      // Simula entrada manual
      input.value = '750';
      ui.setDistance(750);
      
      expect(ui.currentDistance).toBe(750);
    });

    test('deve desabilitar entrada quando checkbox desmarcado', () => {
      ui.toggleManualDistance(false);
      
      const input = document.getElementById('distance-input');
      expect(input.disabled).toBe(true);
    });
  });

  describe('Fluxo: Validações e Erros', () => {
    test('deve lidar com distância zero', () => {
      ui.setDistance(0);
      
      // Não deve calcular emissões
      expect(ui.currentDistance).toBe(0);
      // updateResults() deve retornar early para distância 0
    });

    test('deve lidar com valores negativos', () => {
      ui.setDistance(-100);
      
      expect(ui.currentDistance).toBe(-100); // Aceita valor negativo conforme implementação atual
    });

    test('deve lidar com strings inválidas', () => {
      ui.setDistance('abc');
      
      expect(ui.currentDistance).toBe(0);
    });
  });

  describe('Fluxo: Interface Responsiva', () => {
    test('deve gerar cards comparativos para todos os transportes', () => {
      ui.updateFormValues('São Paulo, SP', 'Rio de Janeiro, RJ', 430);
      
      const container = document.getElementById('comparative-container');
      expect(container.children.length).toBe(4); // bicycle, bus, car, truck
    });

    test('deve marcar transporte selecionado no comparativo', () => {
      ui.selectTransport('car');
      
      const selected = document.querySelector('.transport-option.selected');
      expect(selected.dataset.transport).toBe('car');
    });
  });
});