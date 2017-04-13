const BabiliPlugin = require('babili-webpack-plugin');

exports.lint = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        include,
        exclude: /node_modules/,
        options: {
          tsConfigFile: 'tsconfig.json',
        }
      },
    ],
  },
});

exports.load = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        include,
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        loader: 'source-map-loader',
        enforce: 'pre',
        include,
        exclude: /node_modules/,
      },
    ],
  },
});

exports.minify = () => ({
  plugins: [
    new BabiliPlugin(),
  ],
});
