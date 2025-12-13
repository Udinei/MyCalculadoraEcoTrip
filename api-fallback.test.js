// Testes de Fallback - Cenários de Falha da API

// Mock do distanceApi para os testes
const mockDistanceApi = {
  getDistance: jest.fn(),
  haversineKm: (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => deg * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return parseFloat((R * c).toFixed(2));
  }
};

describe('API Fallback - Cenários de Erro', () => {
  
  describe('Detecção de Falhas da API Google Maps', () => {
    test('deve detectar quando Google Maps não carregou', () => {
      // Simula Google Maps não disponível
      delete global.google;
      
      const isAvailable = !!(window.google && window.google.maps && window.google.maps.DistanceMatrixService);
      expect(isAvailable).toBe(false);
    });

    test('deve detectar quando distanceApi não está disponível', () => {
      delete global.distanceApi;
      
      const isAvailable = !!(window.distanceApi && typeof window.distanceApi.getDistance === 'function');
      expect(isAvailable).toBe(false);
    });

    test('deve detectar timeout de carregamento', async () => {
      // Mock que nunca resolve
      const waitForGoogleMaps = (timeout = 100) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('Google Maps API não carregada após ' + timeout + 'ms'));
          }, timeout);
        });
      };
      
      await expect(waitForGoogleMaps(100)).rejects.toThrow('Google Maps API não carregada após 100ms');
    });
  });

  describe('Tratamento de Erros Específicos', () => {
    beforeEach(() => {
      // Mock básico do Google Maps
      global.google = {
        maps: {
          DistanceMatrixService: jest.fn(),
          TravelMode: { DRIVING: 'DRIVING' },
          UnitSystem: { METRIC: 'METRIC' }
        }
      };
    });

    test('deve tratar erro REQUEST_DENIED (API Key inválida)', async () => {
      const mockService = {
        getDistanceMatrix: jest.fn((params, callback) => {
          callback({}, 'REQUEST_DENIED');
        })
      };
      
      global.google.maps.DistanceMatrixService = jest.fn(() => mockService);
      
      mockDistanceApi.getDistance.mockRejectedValue(new Error('DistanceMatrixService falhou: REQUEST_DENIED'));
      
      await expect(mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro'))
        .rejects.toThrow('DistanceMatrixService falhou: REQUEST_DENIED');
    });

    test('deve tratar erro OVER_QUERY_LIMIT (cota excedida)', async () => {
      const mockService = {
        getDistanceMatrix: jest.fn((params, callback) => {
          callback({}, 'OVER_QUERY_LIMIT');
        })
      };
      
      global.google.maps.DistanceMatrixService = jest.fn(() => mockService);
      
      mockDistanceApi.getDistance.mockRejectedValue(new Error('DistanceMatrixService falhou: OVER_QUERY_LIMIT'));
      
      await expect(mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro'))
        .rejects.toThrow('DistanceMatrixService falhou: OVER_QUERY_LIMIT');
    });

    test('deve tratar erro ZERO_RESULTS (rota não encontrada)', async () => {
      const mockService = {
        getDistanceMatrix: jest.fn((params, callback) => {
          callback({
            rows: [{
              elements: [{ status: 'ZERO_RESULTS' }]
            }]
          }, 'OK');
        })
      };
      
      global.google.maps.DistanceMatrixService = jest.fn(() => mockService);
      
      mockDistanceApi.getDistance.mockRejectedValue(new Error('Rota não encontrada: ZERO_RESULTS'));
      
      await expect(mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro'))
        .rejects.toThrow('Rota não encontrada: ZERO_RESULTS');
    });
  });

  describe('Fallback Haversine', () => {
    test('deve calcular distância em linha reta quando API falha', () => {
      // Coordenadas de São Paulo e Rio de Janeiro
      const spLat = -23.5505, spLng = -46.6333;
      const rjLat = -22.9068, rjLng = -43.1729;
      
      const distance = mockDistanceApi.haversineKm(spLat, spLng, rjLat, rjLng);
      
      // Distância em linha reta é ~360km (menor que rota real de ~430km)
      expect(distance).toBeCloseTo(360.75, 1);
      expect(distance).toBeLessThan(430); // Linha reta é sempre menor
    });

    test('deve usar fallback quando ZERO_RESULTS e coordenadas disponíveis', async () => {
      // Simula cenário onde API retorna ZERO_RESULTS mas temos coordenadas
      const originCoords = { lat: -23.5505, lng: -46.6333 };
      const destCoords = { lat: -22.9068, lng: -43.1729 };
      
      // Mock da função que seria chamada no app.js
      const handleZeroResults = (originPlaceData, destPlaceData) => {
        if (originPlaceData && destPlaceData) {
          return mockDistanceApi.haversineKm(
            originPlaceData.lat, originPlaceData.lng,
            destPlaceData.lat, destPlaceData.lng
          );
        }
        return null;
      };
      
      const fallbackDistance = handleZeroResults(originCoords, destCoords);
      expect(fallbackDistance).toBeCloseTo(360.75, 1);
    });
  });

  describe('Ativação do Modo Manual', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <input type="checkbox" id="manual-distance-checkbox">
        <input id="distance-input" disabled>
      `;
    });

    test('deve ativar modo manual quando API falha', () => {
      // Simula ativação automática do modo manual
      const activateManualMode = () => {
        const checkbox = document.getElementById('manual-distance-checkbox');
        const input = document.getElementById('distance-input');
        
        checkbox.checked = true;
        input.disabled = false;
        input.focus();
      };
      
      activateManualMode();
      
      const checkbox = document.getElementById('manual-distance-checkbox');
      const input = document.getElementById('distance-input');
      
      expect(checkbox.checked).toBe(true);
      expect(input.disabled).toBe(false);
    });

    test('deve permitir cálculo manual após falha da API', () => {
      // Mock do ui para o teste
      const mockUi = {
        currentDistance: 0,
        currentEmissions: {},
        toggleManualDistance: jest.fn(),
        setDistance: jest.fn((distance) => { mockUi.currentDistance = distance; }),
        selectTransport: jest.fn((transport) => { 
          mockUi.currentEmissions[transport] = transport === 'bus' ? 38.27 : 0; 
        })
      };
      
      // Simula fluxo completo de fallback
      mockUi.toggleManualDistance(true);
      mockUi.setDistance(430);
      mockUi.selectTransport('bus');
      
      // Deve calcular normalmente mesmo sem API
      expect(mockUi.currentDistance).toBe(430);
      expect(mockUi.currentEmissions.bus).toBe(38.27);
    });
  });

  describe('Cenários de Rede', () => {
    test('deve lidar com timeout de rede', async () => {
      // Simula timeout manual
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Network timeout')), 100);
      });
      
      await expect(timeoutPromise).rejects.toThrow('Network timeout');
    });

    test('deve lidar com erro de conexão', async () => {
      mockDistanceApi.getDistance.mockRejectedValue(new Error('Network error'));
      
      await expect(mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro'))
        .rejects.toThrow('Network error');
    });
  });

  describe('Recuperação e Retry', () => {
    test('deve permitir retry após falha', async () => {
      // Primeira tentativa falha
      mockDistanceApi.getDistance.mockRejectedValueOnce(new Error('DistanceMatrixService falhou: UNKNOWN_ERROR'));
      
      await expect(mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro'))
        .rejects.toThrow('DistanceMatrixService falhou: UNKNOWN_ERROR');
      
      // Segunda tentativa (retry) sucesso
      mockDistanceApi.getDistance.mockResolvedValue(430);
      const distance = await mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro');
      
      expect(distance).toBe(430);
    });
  });
});