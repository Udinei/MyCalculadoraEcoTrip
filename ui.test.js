// Testes para ui.js
describe('UI - Interface do Usuário', () => {
  
  beforeEach(() => {
    // Mock do DOM
    document.body.innerHTML = `
      <input id="origin-input" value="São Paulo, SP">
      <input id="destination-input" value="Rio de Janeiro, RJ">
      <input id="distance-input" value="430">
      <input type="checkbox" id="manual-distance-checkbox">
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
      <div class="transport-option" data-transport="car"></div>
      <div class="transport-option selected" data-transport="bus"></div>
    `;
  });

  describe('setDistance', () => {
    test('deve atualizar distância atual e input', () => {
      ui.setDistance(500);
      expect(ui.currentDistance).toBe(500);
      expect(document.getElementById('distance-input').value).toBe('500');
    });

    test('deve converter string para número', () => {
      ui.setDistance('250.5');
      expect(ui.currentDistance).toBe(250.5);
    });

    test('deve usar 0 para valores inválidos', () => {
      ui.setDistance('invalid');
      expect(ui.currentDistance).toBe(0);
    });
  });

  describe('selectTransport', () => {
    test('deve atualizar transporte atual', () => {
      ui.selectTransport('car');
      expect(ui.currentTransport).toBe('car');
    });

    test('deve remover seleção anterior e marcar nova', () => {
      ui.selectTransport('car');
      
      const busOption = document.querySelector('[data-transport="bus"]');
      const carOption = document.querySelector('[data-transport="car"]');
      
      expect(busOption.classList.contains('selected')).toBe(false);
      expect(carOption.classList.contains('selected')).toBe(true);
    });
  });

  describe('toggleManualDistance', () => {
    test('deve habilitar input quando checked=true', () => {
      ui.toggleManualDistance(true);
      const input = document.getElementById('distance-input');
      expect(input.disabled).toBe(false);
    });

    test('deve desabilitar input quando checked=false', () => {
      ui.toggleManualDistance(false);
      const input = document.getElementById('distance-input');
      expect(input.disabled).toBe(true);
    });
  });

  describe('updateFormValues', () => {
    test('deve atualizar todos os campos do formulário', () => {
      ui.updateFormValues('Brasília, DF', 'Salvador, BA', 1200);
      
      expect(document.getElementById('origin-input').value).toBe('Brasília, DF');
      expect(document.getElementById('destination-input').value).toBe('Salvador, BA');
      expect(ui.currentDistance).toBe(1200);
    });
  });

  describe('showLoader/hideLoader', () => {
    test('deve mostrar loader', () => {
      ui.showLoader();
      const loader = document.getElementById('loader');
      expect(loader.style.display).toBe('flex');
    });

    test('deve esconder loader', () => {
      ui.hideLoader();
      const loader = document.getElementById('loader');
      expect(loader.style.display).toBe('none');
    });
  });

  describe('getProgressColor', () => {
    test('deve retornar verde para percentual <= 50', () => {
      expect(ui.getProgressColor(30)).toBe('#16b78a');
      expect(ui.getProgressColor(50)).toBe('#16b78a');
    });

    test('deve retornar laranja para percentual <= 100', () => {
      expect(ui.getProgressColor(75)).toBe('#f59e0b');
      expect(ui.getProgressColor(100)).toBe('#f59e0b');
    });

    test('deve retornar vermelho para percentual > 100', () => {
      expect(ui.getProgressColor(150)).toBe('#ef4444');
      expect(ui.getProgressColor(200)).toBe('#ef4444');
    });
  });

  describe('simulateCalculation', () => {
    test('deve ser uma função assíncrona', () => {
      const result = ui.simulateCalculation('São Paulo', 'Rio de Janeiro', 430);
      expect(result).toBeInstanceOf(Promise);
    });

    test('deve atualizar formulário com valores fornecidos', async () => {
      const promise = ui.simulateCalculation('Brasília', 'Salvador', 1200);
      
      expect(document.getElementById('origin-input').value).toBe('Brasília');
      expect(document.getElementById('destination-input').value).toBe('Salvador');
      expect(ui.currentDistance).toBe(1200);
      
      await promise;
    });
  });
});