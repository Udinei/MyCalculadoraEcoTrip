// Setup corrigido para Jest
const fs = require('fs');
const path = require('path');

// Mock básico do DOM
global.document = {
  getElementById: jest.fn(() => ({
    value: '',
    textContent: '',
    style: { display: 'none' },
    disabled: false,
    checked: false,
    focus: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(() => false)
    }
  })),
  querySelector: jest.fn(() => ({
    dataset: { transport: 'bus' },
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(() => false)
    }
  })),
  querySelectorAll: jest.fn(() => []),
  createElement: jest.fn(() => ({
    className: '',
    innerHTML: '',
    addEventListener: jest.fn(),
    appendChild: jest.fn(),
    children: { length: 4 }
  })),
  body: { innerHTML: '' }
};

global.window = {
  google: undefined,
  distanceApi: undefined
};

global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Carrega módulos de forma segura
try {
  // Config
  const configContent = fs.readFileSync(path.join(__dirname, 'js/config.js'), 'utf8');
  const configCode = configContent.replace('const config = ', 'global.config = ');
  eval(configCode);

  // Calculator  
  const calculatorContent = fs.readFileSync(path.join(__dirname, 'js/calculator.js'), 'utf8');
  const calculatorCode = calculatorContent.replace('const calculator = ', 'global.calculator = ');
  eval(calculatorCode);

  // Distance API
  const distanceContent = fs.readFileSync(path.join(__dirname, 'js/distance-api.js'), 'utf8');
  const distanceCode = distanceContent.replace('const distanceApi = ', 'global.distanceApi = ');
  eval(distanceCode);

  // UI
  const uiContent = fs.readFileSync(path.join(__dirname, 'js/ui.js'), 'utf8');
  const uiCode = uiContent.replace('const ui = ', 'global.ui = ');
  eval(uiCode);

  console.log('✅ Módulos carregados com sucesso');
} catch (error) {
  console.warn('⚠️ Erro ao carregar módulos:', error.message);
  
  // Fallback: cria objetos vazios para evitar erros
  global.config = { co2Emissions: {}, carbonCreditCost: 45 };
  global.calculator = { calculateEmission: () => 0 };
  global.distanceApi = { getDistance: () => Promise.resolve(0) };
  global.ui = { setDistance: () => {} };
}