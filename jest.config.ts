// Importa o tipo Config do Jest (framework de testes)
import type { Config } from 'jest';

// Cria uma configuração do Jest (objeto que define como os testes serão executados)
const config: Config = {
  // Para na primeira falha - se um teste falhar, não executa os outros
  bail: true,

  // Limpa todos os mocks automaticamente entre cada teste
  // (mocks = simulações de funções para testes)
  clearMocks: true,

  // Usa o V8 para gerar relatórios de cobertura de código
  coverageProvider: 'v8',

  // Usa o preset ts-jest para trabalhar com TypeScript
  // (preset = configuração pré-definida)
  preset: 'ts-jest',

  // Roda os testes em ambiente Node.js (servidor)
  // ao invés de navegador
  testEnvironment: 'node',

  // Define onde procurar arquivos de teste
  // Busca arquivos .test.ts dentro da pasta src e suas subpastas
  testMatch: ['<rootDir>/src/**/*.test.ts'],

  // Mapeia nomes de módulos (está vazio neste caso)
  // Serve para criar "apelidos" para caminhos de arquivos
  moduleNameMapper: {
    // Mapear o símbolo @ para a pasta src (muito comum)
    '^@/(.*)$': '<rootDir>/src/$1',

    // Mapear diferentes pastas com aliases
    // '^@components/(.*)$': '<rootDir>/src/components/$1',
    // '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    // '^@services/(.*)$': '<rootDir>/src/services/$1',
    // '^@types/(.*)$': '<rootDir>/src/types/$1',
  },
};

// Exporta a configuração como padrão do arquivo
export default config;
