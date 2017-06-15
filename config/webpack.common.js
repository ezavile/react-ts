const merge = require('webpack-merge');

const parts = require('./webpack.parts');

module.exports = ({ PATHS, HOST, PORT }) => {
  return (
    merge([
      {
        entry: {
          app: PATHS.app,
        },
        node: {
          fs: 'empty',
        },
        output: {
          path: PATHS.build,
          filename: '[name].js',
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        }
      },
      parts.utils.htmlWebpackPlugin(),
      parts.utils.friendlyErrorsPlugin({ HOST, PORT }),
      parts.utils.generateSourceMaps({ type: 'source-map' }),
      parts.typescript.lint({ include: PATHS.app }),
      parts.css.lint({ include: PATHS.app }),
      parts.typescript.load({ include: PATHS.app }),
      parts.utils.extractBundles([
        {
          name: 'vendor',
          minChunks: ({ resource }) => (
            resource &&
            resource.indexOf('node_modules') >= 0 &&
            resource.match(/\.js$/)
          ),
        },
        {
          name: 'manifest',
          minChunks: Infinity,
        },
      ]),
    ])
  );
};
