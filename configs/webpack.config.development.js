const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const WebpackBuildNotifier = require('webpack-build-notifier');
// const {
//   BundleAnalyzerPlugin,
// } = require('webpack-bundle-analyzer');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const Dotenv = require('dotenv-webpack');
const {
  ENV_FILE_PATH,
} = require('./constants');

const common = require('./webpack.config.common');

module.exports = merge.smart(
  common,
  {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      port: 1991,
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new Dotenv({
        path: ENV_FILE_PATH,
      }),
      new WebpackBuildNotifier({
        title: 'Goodreads Chrome Extension Dev Build',
      }),
      new HardSourceWebpackPlugin(),
      new ChromeExtensionReloader({
        port: 1991,
        reloadPage: true,
        entries: {
          contentScript: 'content',
          background: 'background',
        },
      }),
    ],
    watch: true,
  },
);
