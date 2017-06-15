const merge = require('webpack-merge');
const glob = require('glob');

const parts = require('./webpack.parts');

module.exports = ({ PATHS }) => {
  return (
    merge([
      {
        output: {
          chunkFilename: '[name].[chunkhash:8].js',
          filename: '[name].[chunkhash:8].js',
        },
      },
      parts.utils.hashedModuleIdsPlugin(),
      parts.utils.dashboardWebpackPlugins(),
      parts.utils.clean(PATHS.root, PATHS.build),
      parts.typescript.minify(),
      parts.css.minify(),
      // parts.attachRevision(),
      parts.css.extractVendor({ include: PATHS.app }),
      parts.css.purify({
        verbose: true,
        minimize: true,
        paths: glob.sync(`${PATHS.app}/*`),
        styleExtensions: ['.css'],
      }),
      parts.css.extract({ include: PATHS.app }),
      parts.utils.setEnvironmentVariable(
        'process.env.NODE_ENV',
        'production'
      ),
    ])
  );
};
