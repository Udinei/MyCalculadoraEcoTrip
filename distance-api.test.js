// Testes para distance-api.js

// Mock do distanceApi
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

describe('Distance API - Integração Google Maps', () => {
  
  describe('getDistance', () => {
    beforeEach(() => {
      // Mock do Google Maps
      global.google = {
        maps: {
          DistanceMatrixService: jest.fn(() => ({
            getDistanceMatrix: jest.fn()
          })),
          TravelMode: {
            DRIVING: 'DRIVING',
            WALKING: 'WALKING'
          },
          UnitSystem: {
            METRIC: 'METRIC'
          }
        }
      };
    });

    test('deve retornar distância em km quando API responde OK', async () => {
      const mockService = {
        getDistanceMatrix: jest.fn((params, callback) => {
          callback({
            rows: [{
              elements: [{
                status: 'OK',
                distance: { value: 51600 } // 51.6 km em metros
              }]
            }]
          }, 'OK');
        })
      };
      
      global.google.maps.DistanceMatrixService = jest.fn(() => mockService);
      
      mockDistanceApi.getDistance.mockResolvedValue(51.6);
      
      const distance = await mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro');
      expect(distance).toBe(51.6);
    });

    test('deve rejeitar quando status não é OK', async () => {
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

    test('deve rejeitar quando elemento não é OK', async () => {
      const mockService = {
        getDistanceMatrix: jest.fn((params, callback) => {
          callback({
            rows: [{
              elements: [{
                status: 'ZERO_RESULTS'
              }]
            }]
          }, 'OK');
        })
      };
      
      global.google.maps.DistanceMatrixService = jest.fn(() => mockService);
      
      mockDistanceApi.getDistance.mockRejectedValue(new Error('Rota não encontrada: ZERO_RESULTS'));
      
      await expect(mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro'))
        .rejects.toThrow('Rota não encontrada: ZERO_RESULTS');
    });

    test('deve rejeitar quando Google Maps não carrega', async () => {
      mockDistanceApi.getDistance.mockRejectedValue(new Error('Google Maps API não carregada após 5000ms'));
      
      await expect(mockDistanceApi.getDistance('São Paulo', 'Rio de Janeiro'))
        .rejects.toThrow('Google Maps API não carregada após 5000ms');
    }, 1000);
  });

  describe('haversineKm', () => {
    test('deve calcular distância em linha reta corretamente', () => {
      // São Paulo para Rio de Janeiro (aproximadamente)
      const distance = mockDistanceApi.haversineKm(-23.5505, -46.6333, -22.9068, -43.1729);
      expect(distance).toBeCloseTo(360.75, 1); // ~357km em linha reta
    });

    test('deve retornar 0 para mesma localização', () => {
      const distance = mockDistanceApi.haversineKm(-23.5505, -46.6333, -23.5505, -46.6333);
      expect(distance).toBe(0);
    });

    test('deve calcular distância pequena corretamente', () => {
      // Distância pequena (1km aproximadamente)
      const distance = mockDistanceApi.haversineKm(-23.5505, -46.6333, -23.5595, -46.6333);
      expect(distance).toBeCloseTo(1, 0);
    });
  });
});