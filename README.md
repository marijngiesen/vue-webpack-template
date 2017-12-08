# vue-webpack-template [![Build Status](https://travis-ci.org/Toilal/vue-webpack-template.svg?branch=master)](https://travis-ci.org/Toilal/vue-webpack-template)

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

> This template is Vue 2.0 compatible.

> This is a fork of official webpack template. It adds a TypeScript option and allow building components with 
standard .js/.ts files using external .css and .html files. Developer still benefit of Hot Module Reload and 
scoped CSS though.

> It also adds a Library option to build and distribute a vue component only. In this case, an application is 
 still used for development, but it won't be packaged in the distribution.

## Why using this fork ?

You should really consider using this fork if ...

- You have issues with `.vue` files in your favorite code editor.
- You want to stick to pure `.js`/`.ts` files for some reason.
- You don't want to put HTML, CSS & Script in a single file.
- You want to build and distribute a vue component instead of a whole application.

## Known issues with `.vue` files and TypeScript

- Intellij IDEA (and probably others) can't resolve TypeScript modules coming from `.vue` files, making navigation in a vue project really 
painfull.
- [tslint doesn't support `.vue` files](https://github.com/palantir/tslint/issues/2099).

Despite those issues exists, you can still import `.vue` [Single Files Components](https://vuejs.org/v2/guide/single-file-components.html) with this 
boilerplate from your own code or dependency.

## Documentation

- [For this template](http://toilal.github.io/vue-webpack-template): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init Toilal/vue-webpack-template my-project
$ cd my-project
$ npm install
$ npm run dev
```

This will scaffold the project using the `master` branch. If you wish to use the latest version of the webpack template, do the following instead:

``` bash
$ vue init webpack#develop my-project
```

:warning: **The develop branch is not considered stable and can contain bugs or not build at all, so use at your own risk.**

The development server will run on port 8080 by default. If that port is already in use on your machine, the next free port will be used.

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-template-loader` + `vue-hot-reload-loader` for Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - Static assets compiled with version hashes for efficient long-term caching, and an auto-generated production `index.html` with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.

- `npm run unit`: Unit tests run in [JSDOM](https://github.com/tmpvar/jsdom) with [Jest](https://facebook.github.io/jest/), or in PhantomJS with Karma + Mocha + karma-webpack.
  - Supports ES2015+ in test files.
  - Easy mocking.

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```
