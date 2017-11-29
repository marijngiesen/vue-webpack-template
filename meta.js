var metalsmith = require('./metalsmith')

module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "projectType": {
      "type": "list",
      "message": "Project type",
      "choices": [
        {
          "name": "Application (Targets end users)",
          "value": "app",
          "short": "Application"
        },
        {
          "name": "Library (Targets developers, includes demo application)",
          "value": "lib",
          "short": "Library"
        }
      ]
    },
    "build": {
      "type": "list",
      "message": "Vue build",
      "choices": [
        {
          "name": "Runtime + Compiler: recommended for most users",
          "value": "standalone",
          "short": "standalone"
        },
        {
          "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "router": {
      "type": "confirm",
      "message": "Install vue-router?"
    },
    "compiler": {
      "type": "list",
      "message": "Which language do you want to use?",
      "choices": [
        {
          "name": "TypeScript (ts-loader + babel + vue-class-component)",
          "value": "typescript",
          "short": "typescript"
        },
        {
          "name": "ES2015 (babel)",
          "value": "es2015",
          "short": "es2015"
        },
      ]
    },
    "lint": {
      "type": "confirm",
      "message": "Use ESLint to lint your JavaScript code?"
    },
    "lintConfig": {
      "when": "lint",
      "type": "list",
      "message": "Pick an ESLint preset",
      "choices": [
        {
          "name": "Standard (https://github.com/standard/standard)",
          "value": "standard",
          "short": "Standard"
        },
        {
          "name": "Airbnb (https://github.com/airbnb/javascript)",
          "value": "airbnb",
          "short": "Airbnb"
        },
        {
          "name": "none (configure it yourself)",
          "value": "none",
          "short": "none"
        }
      ]
    },
    "tslint": {
      "when": "compiler == 'typescript'",
      "type": "confirm",
      "message": "Use TSLint to lint your TypeScript code?"
    },
    "tslintConfig": {
      "when": "tslint",
      "type": "list",
      "message": "Pick a TSLint preset",
      "choices": [
        {
          "name": "Standard (https://github.com/blakeembrey/tslint-config-standard)",
          "value": "standard",
          "short": "Standard"
        },
        {
          "name": "AirBNB (https://github.com/progre/tslint-config-airbnb)",
          "value": "airbnb",
          "short": "AirBNB"
        },
        {
          "name": "none (configure it yourself)",
          "value": "none",
          "short": "none"
        }
      ]
    },
    "unit": {
      "type": "confirm",
      "message": "Setup unit tests"
    },
    "runner": {
      "when": "unit",
      "type": "list",
      "message": "Pick a test runner",
      "choices": [
        {
          "name": "Jest",
          "value": "jest",
          "short": "jest"
        },
        {
          "name": "Karma and Mocha",
          "value": "karma",
          "short": "karma"
        },
        {
          "name": "none (configure it yourself)",
          "value": "noTest",
          "short": "noTest"
        }
      ]
    },
    "e2e": {
      "type": "confirm",
      "message": "Setup e2e tests with Nightwatch?"
    }
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint",
    "tslint.json": "tslint",
    "tsconfig.json": "compiler == 'typescript'",
    "src/**/*.ts": "compiler == 'typescript'",
    "src/**/*.js": "compiler != 'typescript'",
    "config/test.env.js": "unit || e2e",
    "build/webpack.test.conf.js": "e2e || (unit && runner === 'karma')",
    "test/unit/specs/**/*.ts": "unit && compiler == 'typescript'",
    "test/unit/specs/**/*.js": "unit && compiler != 'typescript'",
    "test/unit/index.js": "unit && runner === 'karma'",
    "test/unit/jest.conf.js": "unit && runner === 'jest'",
    "test/unit/karma.conf.js": "unit && runner === 'karma'",
    "test/unit/specs/index.js": "unit && runner === 'karma'",
    "test/unit/setup.js": "unit && runner === 'jest'",
    "test/e2e/**/*": "e2e",
    "src/router/**/*": "router",
    "src/**/*.lib.*": "projectType == 'lib'"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack",
  "metalsmith": metalsmith
};
