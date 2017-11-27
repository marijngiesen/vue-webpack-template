'use strict'
const path = require('path')
const fs = require('fs')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkg = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      enforce: 'post', // To support scoped css properly
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.createNotifierCallback = function () {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') {
      return
    }
    const error = errors[0]

    const filename = error.file && error.file.split('!').pop()
    notifier.notify({
      title: pkg.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// Workaround for .babelrc env merge issues (waiting for babel>=7 .babelrc.js file)
exports.buildBabelOptions = function() {
  let babelOptions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc')));
  const env = babelOptions.env;

  if (env) {
    delete babelOptions.env;

    for (const key in env) {
      if (!env.hasOwnProperty(key)) continue;

      if (process.env['BABEL_ENV'] === key) {
        babelOptions = env[process.env['BABEL_ENV']];
        break;
      }

      if (process.env['NODE_ENV'] === key) {
        babelOptions = env[process.env['NODE_ENV']];
        break;
      }
    }
  }

  babelOptions.babelrc = false;
  return babelOptions;
}

{{#if_eq projectType "lib"}}
// Generate externals object from dependencies
exports.buildExternalsFromDependencies = function() {
  const packageJson = require('../package.json');
  const externals = {};
  for (var dependency in packageJson.dependencies) {
    externals[dependency] = dependency;
  }
  return externals;
}
{{/if_eq}}
