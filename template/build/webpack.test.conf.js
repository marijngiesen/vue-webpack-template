'use strict'
// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseConfig, {
  {{#if_eq projectType "lib"}}
  entry: {
    '{{ name }}': './src'
  },{{/if_eq}}
  module: {
    rules: utils.styleLoaders()
  },
  // use inline sourcemap for karma-sourcemap-loader
  {{#unless_eq compiler "typescript"}}devtool: '#inline-source-map',{{/unless_eq}}
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    }){{#if_eq compiler "typescript"}},
    // devtool option doesn't output typescript sourcemaps to karma
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js|html)($|\?)/i
    }){{/if_eq}}
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
