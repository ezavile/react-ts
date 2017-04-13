const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardWebpackPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.devServer = ({ HOST, PORT }) => ({
  devServer: {
    quiet: true,
    historyApiFallback: true,
    stats: 'none',
    host: HOST,
    port: PORT,
    overlay: {
      errors: true,
      warnings: false,
    },
  },
});

exports.htmlWebpackPlugin = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-takeoff',
    }),
  ]
});

exports.friendlyErrorsPlugin = ({ HOST, PORT }) => ({
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${HOST}:${PORT}`],
      },
    }),
  ]
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

exports.dashboardWebpackPlugins = () => ({
  plugins: [
    new DashboardWebpackPlugin(),
  ]
});

exports.hashedModuleIdsPlugin = () => ({
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ]
});

exports.setEnvironmentVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

exports.clean = (root, path) => ({
  plugins: [
    new CleanWebpackPlugin([path], {
      root,
      verbose: true,
      dry: false
    }),
  ],
});
