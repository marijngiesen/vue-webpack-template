const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',{{#if_eq compiler "typescript"}}
    'ts',{{/if_eq}}
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',{{#if_eq compiler "typescript"}}
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',{{/if_eq}}
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },{{#if_eq compiler "typescript"}}
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',{{/if_eq}}{{#e2e}}
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],{{/e2e}}
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    {{#router}}
    '!src/router/index.js',
    {{/router}}
    '!**/node_modules/**'
  ]
}
