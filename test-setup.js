// Configuração global para testes Jest
const fs = require('fs');
const path = require('path');

// Carrega os módulos JavaScript para os testes
const configJs = fs.readFileSync(path.join(__dirname, 'js/config.js'), 'utf8');
const calculatorJs = fs.readFileSync(path.join(__dirname, 'js/calculator.js'), 'utf8');
const distanceApiJs = fs.readFileSync(path.join(__dirname, 'js/distance-api.js'), 'utf8');
const uiJs = fs.readFileSync(path.join(__dirname, 'js/ui.js'), 'utf8');

// Executa os scripts no contexto global
eval(configJs);
eval(calculatorJs);
eval(distanceApiJs);
eval(uiJs);

// Disponibiliza globalmente para os testes
global.config = config;
global.calculator = calculator;
global.distanceApi = distanceApi;
global.ui = ui;

// Mock básico do DOM para testes de UI
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
    appendChild: jest.fn()
  })),
  body: {
    innerHTML: ''
  }
};

// Mock do console para testes
global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Mock do window
global.window = {
  google: undefined,
  distanceApi: global.distanceApi
};