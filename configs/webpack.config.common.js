const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  BASE_DIRECTORY,
  OUTPUT_DIRECTORY_NAME,
  OUTPUT_PATH,
  ENTRY_FILE_PATHS,
} = require('./constants');

module.exports = {
  entry: {
    content: ENTRY_FILE_PATHS.CONTENT,
    background: ENTRY_FILE_PATHS.BACKGROUND,
    popup: ENTRY_FILE_PATHS.POPUP,
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertInto: 'html',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // Load in-line so that don't have to specify web-accessible fonts, etc.
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
        }],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'url-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(
      [
        OUTPUT_DIRECTORY_NAME,
      ],
      {
        root: BASE_DIRECTORY,
      },
    ),
    new CopyWebpackPlugin([
      {
        from: 'source/manifest.json',
      },
      // {
      //   from: 'source/icons',
      //   to: 'icons',
      //   toType: 'dir',
      // },
      {
        from: 'source/popup.html',
      },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
