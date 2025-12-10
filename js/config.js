// Constantes CO2 (objeto global)
const config = {
  // kg CO2 por km por pessoa
  co2Emissions: {
    bicycle: 0,        // 0 kg
    car: 0.12,         // 120g = 0.12 kg por km
    bus: 0.089,        // 89g = 0.089 kg por km
    truck: 0.960       // 960g = 0.96 kg por km
  },
  
  // Custo estimado por crédito de carbono
  carbonCreditCost: 12.00, // R$ por crédito
  carbonCreditKg: 1000,    // 1 crédito = 1000 kg CO2
  
  // Variação de preço (para range de custo)
  priceRange: {
    min: 6.00,
    max: 18.00
  },
  
  // Nomes amigáveis dos transportes
  transportNames: {
    bicycle: "Bicicleta",
    car: "Carro",
    bus: "Ônibus",
    truck: "Caminhão"
  },
  
  // Ícones e cores (aproximadas das imagens)
  transports: {
    bicycle: {
      name: "Bicicleta",
      icon: "assets/icons/bike.png",
      color: "#6b7280"
    },
    car: {
      name: "Carro",
      icon: "assets/icons/carro.png",
      color: "#ef4444"
    },
    bus: {
      name: "Ônibus",
      icon: "assets/icons/bus.png",
      color: "#16b78a"
    },
    truck: {
      name: "Caminhão",
      icon: "assets/icons/truck.png",
      color: "#dc2626"
    }
  }
};
