var path = require('path')
var fs = require('fs')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
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
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      enforce: 'post', // To support scoped css properly
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// Workaround for .babelrc env merge issues (waiting for babel>=7 .babelrc.js file)
exports.buildBabelOptions = function() {
  var babelOptions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc')));
  var env = babelOptions.env;

  if (env) {
    delete babelOptions.env;

    for (var key in env) {
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
  var packageJson = require('../package.json');
  var externals = {};
  for (var dependency in packageJson.dependencies) {
    externals[dependency] = dependency;
  }
  return externals;
}
{{/if_eq}}
