'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  {{#if_eq projectType "lib"}}entry: {
    app: './app/main.{{#if_eq compiler "typescript"}}ts{{else}}js{{/if_eq}}'
  },{{/if_eq}}
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },{{#unless_eq compiler "typescript"}}
  // cheap-module-eval-source-map is faster for development, but it seems to not work properly here
  devtool: '#inline-source-map',{{/unless_eq}}
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(){{#if_eq compiler "typescript"}},
    // devtool option doesn't output typescript sourcemaps to karma
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js|vue|html)($|\?)/i
    }){{/if_eq}}
  ]
})

if (config.dev.hotModuleReload) {
  module.exports.module.rules.push(
    {
      test: {{#if_eq compiler "typescript"}}/\.vue\.(ts|js)$/{{else}}/\.vue\.js$/{{/if_eq}},
      enforce: 'post',
      use: ['vue-hot-reload-loader'],
      include: [resolve('src'),{{#if_eq projectType "lib"}} resolve('app'),{{/if_eq}} resolve('test')]
    });
}

// add hot-reload related code to entry chunks
Object.keys(module.exports.entry).forEach(function (name) {
  module.exports.entry[name] = ['./build/dev-client'].concat(module.exports.entry[name])
})
