require('dotenv').config();
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./config/webpack.common');
const developmentConfig = require('./config/webpack.dev');
const productionConfig = require('./config/webpack.prod');

const PATHS = {
  root: path.join(__dirname),
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};
const HOST = process.env.HOST;
const PORT = process.env.PORT;

module.exports = (env) => {
  if (env === 'production') {
    return merge(
      commonConfig({ PATHS, HOST, PORT }),
      productionConfig({ PATHS })
    );
  }

  return merge(
    commonConfig({ PATHS, HOST, PORT }),
    developmentConfig({ PATHS, HOST, PORT })
  );
};
