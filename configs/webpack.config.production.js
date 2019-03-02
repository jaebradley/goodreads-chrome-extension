const merge = require('webpack-merge');
// const {
//   BundleAnalyzerPlugin,
// } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

const common = require('./webpack.config.common');

module.exports = merge.smart(
  common,
  {
    mode: 'production',
    plugins: [
      new webpack.EnvironmentPlugin(['GOODREADS_SERVER_BASE_URL']),
    ],
  },
);
