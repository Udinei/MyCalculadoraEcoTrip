# Calculadora Eco Trip 🌍

Uma aplicação web interativa para calcular e comparar emissões de CO₂ em diferentes meios de transporte.

## 📋 Descrição

A **Calculadora Eco Trip** permite aos usuários:
- Calcular emissões de CO₂ para diferentes meios de transporte (Bicicleta, Carro, Ônibus, Caminhão)
- Comparar as emissões relativas entre transportes
- Calcular economias vs transporte por carro
- Estimar créditos de carbono necessários para compensar emissões
- Simular jornadas entre diferentes origens e destinos

## 🏗️ Estrutura do Projeto

```
carbon-calculator/
├── index.html                  # Estrutura + todos os scripts inline ou linkados
├── css/
│   └── style.css              # Estilos completos
├── js/
│   ├── routes-data.js         # ⭐ Dados de rotas (objeto global)
│   ├── config.js              # Constantes CO2 (objeto global)
│   ├── calculator.js          # Lógica de cálculos (funções globais)
│   ├── ui.js                  # Manipulação DOM (funções globais)
│   └── app.js                 # Inicialização e eventos
├── assets/                     # Imagens, ícones (SVGs da internet)
└── README.md                   # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir no Navegador
Abra o arquivo `index.html` no seu navegador web (Chrome, Firefox, Safari, Edge).

```bash
# No Windows (PowerShell)
Invoke-Item index.html

# Ou simplesmente arraste o arquivo para o navegador
```

### 2. Preencher o Formulário
- Digite a **Origem** (ex: São Paulo, SP)
- Digite o **Destino** (ex: Rio de Janeiro, RJ)
- Escolha a **Distância** (desabilitada por padrão; marque "Inserir distância manualmente" para editar)
- Selecione o **Meio de Transporte**

### 3. Calcular Emissões
Clique no botão **"Calcular Emissões"** para:
- Exibir um loader por 1,5 segundos (simulação)
- Atualizar todos os resultados
- Mostrar resumo, comparativo e créditos de carbono

### 4. Explorar Resultados
- **Resumo da Emissão**: rota, distância, emissão total e economia vs carro
- **Comparativo**: cards para cada transporte com barras de progresso
- **Créditos de Carbono**: número de créditos necessários e custo estimado

## 📐 Fórmulas e Constantes

### Emissões de CO₂ (kg por km)
- **Bicicleta**: 0 kg/km
- **Carro**: 0.12 kg/km
- **Ônibus**: 0.089 kg/km
- **Caminhão**: 0.96 kg/km

### Créditos de Carbono
- **1 crédito = 1000 kg CO₂**
- **Custo base = R$ 12,00 por crédito**
- **Variação: R$ 6,00 - R$ 18,00 por crédito**

### Fórmulas

```javascript
// Emissão total
Emissão (kg CO₂) = Distância (km) × Emissão por km

// Percentual vs Carro
Percentual = (Emissão do Transporte / Emissão do Carro) × 100

// Economia
Economia = Emissão do Carro - Emissão do Transporte

// Créditos de Carbono
Créditos = Emissão Total (kg) / 1000

// Custo Estimado
Custo (R$) = Créditos × 12,00
```

## 🎨 Design e Cores

| Elemento | Cor | Hex |
|----------|-----|-----|
| Primária (Verde) | Verde Eco | #16b78a |
| Primária Clara | Verde Claro | #e9f8f2 |
| Secundária (Laranja) | Laranja Alerta | #f59e0b |
| Danger (Vermelho) | Vermelho | #ef4444 |
| Texto Principal | Cinza Escuro | #111827 |
| Texto Leve | Cinza Médio | #6b7280 |
| Background | Cinza Claro | #f9fafb |
| Borda | Cinza Borda | #e5e7eb |

## 📦 Dependências

- **Nenhuma!** O projeto usa apenas HTML, CSS e JavaScript vanilla.
- Ícones são carregados via CDN (Flaticon).

## 🔧 Estrutura de Scripts

### routes-data.js
```javascript
const routesData = {
  routes: [...],
  getRoute(id) { ... },
  addRoute(origin, destination, distance) { ... }
}
```

### config.js
```javascript
const config = {
  co2Emissions: {...},
  carbonCreditCost: 12.00,
  priceRange: {...},
  transports: {...}
}
```

### calculator.js
```javascript
const calculator = {
  calculateEmission(distance, transport) { ... },
  calculateAllEmissions(distance) { ... },
  calculateRelativePercentage(emission, carEmission) { ... },
  calculateSavings(transportEmission, carEmission) { ... },
  calculateCarbonCredits(emission) { ... },
  calculateCost(credits) { ... }
}
```

### ui.js
```javascript
const ui = {
  selectTransport(transport) { ... },
  setDistance(distance) { ... },
  updateFormValues(origin, destination, distance) { ... },
  toggleManualDistance(checked) { ... },
  updateResults() { ... },
  updateSummaryCard(...) { ... },
  updateComparativeCards(...) { ... },
  updateCarbonCredits(...) { ... },
  simulateCalculation(...) { ... }
}
```

### app.js
Inicializa event listeners para:
- Seleção de transporte
- Input de distância
- Checkbox de entrada manual
- Botão de cálculo
- Botão de compensação

## 📱 Responsividade

Layout adaptável para:
- **Desktop** (>1024px): Grid 2-3 colunas
- **Tablet** (640px-1024px): Grid 2 colunas
- **Mobile** (<640px): Stack vertical

## ✨ Funcionalidades Futuras

- [ ] Integração com API de distâncias (Google Maps)
- [ ] Histórico de cálculos salvos
- [ ] Gráficos e visualizações mais avançadas
- [ ] Autenticação de usuário
- [ ] Sistema de pagamento para compensação
- [ ] Exportar relatório em PDF
- [ ] Integração com redes sociais

## 📄 Licença

Este projeto é de código aberto e livre para uso e modificação.

---

**Desenvolvido com ❤️ para um planeta mais sustentável** 🌱

## 🌐 Integração com Distance Matrix (Google Maps)

Esta versão suporta obter a distância automaticamente entre Origem e Destino usando o Google Maps Distance Matrix (via Google Maps JavaScript API).

Passos para ativar:

1. Obtenha uma chave de API do Google Cloud com o serviço Maps JavaScript API habilitado.
2. No `index.html` substitua `YOUR_API_KEY` na tag de script pelo seu API key:

```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

3. A chamada de distância é feita no cliente pelo `js/distance-api.js` usando `google.maps.DistanceMatrixService`.

Observações importantes:
- A Google Maps JavaScript API deve ter restrições de uso adequadas (domínios permitidos) para segurança.
- Se preferir não expor a chave no cliente, use um proxy/endpoint no servidor que invoque a API Web Service de Distance Matrix.
- Em caso de erro ao obter distância automaticamente, a aplicação exibirá uma mensagem e você poderá inserir a distância manualmente.

