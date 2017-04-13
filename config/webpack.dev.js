const merge = require('webpack-merge');

const parts = require('./webpack.parts');

module.exports = ({ PATHS, HOST, PORT }) => {
  return (
    merge([
      {
        output: {
          devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
        },
      },
      parts.utils.devServer({ HOST, PORT }),
      parts.css.load({ include: PATHS.app }),
    ])
  );
};
