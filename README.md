# Calculadora Eco Trip 🌍

🌐 **[Acesse o projeto online](https://udinei.github.io/MyCalculadoraEcoTrip/)**

> **Projeto desenvolvido como desafio do curso "Desenvolvimento de Software na prática com GitHub Copilot" da DIO.**

Uma aplicação web interativa para calcular e comparar emissões de CO₂ em diferentes meios de transporte, com integração completa ao Google Maps para cálculo automático de distâncias.

## 📋 Funcionalidades

A **Calculadora Eco Trip** oferece:
- ✅ **Cálculo automático de distâncias** via Google Maps Distance Matrix API
- ✅ **Autocomplete de endereços** com Google Places API
- ✅ **Cálculo de emissões de CO₂** para 4 meios de transporte (Bicicleta, Carro, Ônibus, Caminhão)
- ✅ **Comparativo visual** entre transportes com barras de progresso
- ✅ **Cálculo de economia** vs transporte por carro
- ✅ **Estimativa de créditos de carbono** e custos de compensação
- ✅ **Interface responsiva** para desktop, tablet e mobile
- ✅ **Fallback para entrada manual** de distâncias

## 🏗️ Estrutura do Projeto

```
mycalculadora-eco-trip/
├── index.html                  # Página principal com integração Google Maps
├── css/
│   └── style.css              # Estilos responsivos completos
├── js/
│   ├── app.js                 # Inicialização e eventos principais
│   ├── calculator.js          # Lógica de cálculos de CO₂
│   ├── config.js              # Constantes e configurações
│   ├── distance-api.js        # Integração Google Maps Distance Matrix
│   ├── routes-data.js         # Dados de rotas pré-definidas
│   └── ui.js                  # Manipulação da interface
├── assets/
│   ├── icons/                 # Ícones dos meios de transporte
│   ├── favicon.svg            # Ícone do site
│   └── logo.svg               # Logo da aplicação
├── .gitignore                  # Arquivos ignorados pelo Git
└── README.md                   # Documentação do projeto
```

## 🚀 Como Usar

### 🌐 Online (Recomendado)
Acesse diretamente: **[https://udinei.github.io/MyCalculadoraEcoTrip/](https://udinei.github.io/MyCalculadoraEcoTrip/)**

### 💻 Desenvolvimento Local
```bash
# Clone o repositório
git clone https://github.com/udinei/MyCalculadoraEcoTrip.git
cd MyCalculadoraEcoTrip

# Inicie um servidor local
py -m http.server 8000
# ou
npx serve .

# Acesse http://localhost:8000
```

### 📝 Utilizando a Aplicação
1. **Digite origem e destino** - Use o autocomplete do Google Places
2. **Distância calculada automaticamente** - Ou marque "inserir manualmente"
3. **Selecione o meio de transporte** - Bicicleta, Carro, Ônibus ou Caminhão
4. **Clique em "Calcular Emissões"** - Veja resultados detalhados
5. **Explore os comparativos** - Barras visuais e dados de economia
6. **Confira créditos de carbono** - Custos de compensação ambiental

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

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+ (Vanilla)
- **APIs**: Google Maps JavaScript API, Google Places API, Distance Matrix API
- **Hospedagem**: GitHub Pages
- **Desenvolvimento**: Python HTTP Server (local)
- **Controle de Versão**: Git com .gitignore para proteção de API keys

## 🔧 Arquitetura do Código

### 🗺️ distance-api.js
- Integração com Google Maps Distance Matrix API
- Autocomplete de endereços com Places API
- Fallback para cálculo de distância em linha reta (Haversine)
- Tratamento de erros e casos especiais

### 🧮 calculator.js
- Cálculos de emissões de CO₂ por meio de transporte
- Comparativos percentuais e economia vs carro
- Estimativa de créditos de carbono e custos
- Fórmulas baseadas em dados científicos

### 🎨 ui.js
- Manipulação dinâmica da interface
- Atualização de resultados em tempo real
- Animações e feedback visual
- Responsividade e acessibilidade

### ⚙️ config.js
- Constantes de emissões por transporte
- Configurações de créditos de carbono
- Dados de referência e fórmulas

### 🚀 app.js
- Inicialização da aplicação
- Event listeners e interações
- Integração entre módulos
- Callback do Google Maps

## 📱 Responsividade

Layout adaptável para:
- **Desktop** (>1024px): Grid 2-3 colunas
- **Tablet** (640px-1024px): Grid 2 colunas
- **Mobile** (<640px): Stack vertical

## 🔒 Segurança e Boas Práticas

- ✅ **API Key protegida** com restrições de domínio no Google Cloud
- ✅ **Arquivo .gitignore** para proteger configurações sensíveis
- ✅ **Separação de ambientes** (desenvolvimento e produção)
- ✅ **Tratamento de erros** robusto nas chamadas de API
- ✅ **Fallbacks** para casos de falha na API

## 🎯 Aprendizados do Projeto

- **GitHub Copilot**: Utilização de IA para acelerar desenvolvimento
- **APIs do Google**: Integração completa com Maps, Places e Distance Matrix
- **JavaScript Modular**: Organização de código em módulos especializados
- **Responsividade**: Design adaptável para diferentes dispositivos
- **Segurança Web**: Proteção de API keys e boas práticas

## ✨ Possíveis Melhorias Futuras

- [ ] Histórico de cálculos com LocalStorage
- [ ] Gráficos interativos com Chart.js
- [ ] PWA (Progressive Web App)
- [ ] Modo escuro/claro
- [ ] Compartilhamento de resultados
- [ ] Múltiplas rotas simultâneas
- [ ] Integração com APIs de transporte público

## 📄 Licença

Este projeto é de código aberto e livre para uso e modificação.

---

**Desenvolvido com ❤️ para um planeta mais sustentável** 🌱

## 🌐 Configuração do Google Maps (Para Desenvolvedores)

### 1. Obter API Key
- Acesse [Google Cloud Console](https://console.cloud.google.com/)
- Ative: Maps JavaScript API, Places API, Distance Matrix API
- Crie uma API Key

### 2. Configurar Restrições
```
HTTP referrers (web sites):
- https://seudominio.github.io/*
- http://localhost:8000/*
- http://127.0.0.1:8000/*
```

### 3. Implementar no Código
```html
<script async defer 
  src="https://maps.googleapis.com/maps/api/js?key=SUA_API_KEY&libraries=places&callback=initMapCallback">
</script>
```

### 4. Estrutura de Segurança
- API Key restrita por domínio
- Arquivo `js/config-local.js` no .gitignore
- Separação entre desenvolvimento e produção

---

## 👨‍💻 Desenvolvido por

**Udinei Silva**  
📧 [Contato](mailto:udineisilva@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/udinei-silva-1b029b5b/)  
🐙 [GitHub](https://github.com/udinei)

---

**Desenvolvido com ❤️ e GitHub Copilot IA para um planeta mais sustentável** 🌱

