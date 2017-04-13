const path = require('path');
const fs = require('fs');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const postcssRulesUse = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => ([
        require('postcss-import'),
        require('postcss-cssnext'),
        require('rucksack-css'),
        require('postcss-modules')({
          getJSON: (cssFileName, json) => {
            if (cssFileName.includes('.postcss')) {
              const dirname = path.dirname(cssFileName);
              const componentName = path.basename(cssFileName, '.postcss');
              const content = require('../lib/ts-classname')(componentName, json);
              const classHash  = path.resolve(`${dirname}/${componentName}.ts`);
              fs.writeFile(classHash, content, (err) => {
                if (err) throw new Error(error);
              });
            }
          }
        }),
      ])
    }
  }
];

const cssRulesUse = [
  'style-loader',
  'css-loader',
];

exports.lint = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.postcss$/,
        enforce: 'pre',
        loader: 'postcss-loader',
        include,
        exclude: /node_modules/,
        options: {
          plugins: () => ([
            require('stylelint')({
              ignorePath: '/node_modules/**/*.css'
            }),
            require('postcss-bem-linter'),
            require('postcss-browser-reporter'),
            require("postcss-reporter")({
              clearMessages: true
            }),
          ]),
        },
      },
    ],
  },
});

exports.minify = () => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        },
        safe: true,
      },
      canPrint: false,
    }),
  ],
});

exports.load = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.postcss$/,
        include,
        exclude: /node_modules/,
        use: postcssRulesUse,
      },
      {
        test: /\.css$/,
        include,
        exclude: /node_modules/,
        use: cssRulesUse
      }
    ],
  }
});

exports.extract = ({ include }) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.postcss$/,
          include,
          exclude: /node_modules/,
          use: plugin.extract({
            use: postcssRulesUse.slice(1, postcssRulesUse.length),
            fallback: 'style-loader',
          }),
        }
      ],
    },
    plugins: [ plugin ],
  };
};

exports.extractVendor = ({ include }) => {
  const plugin = new ExtractTextPlugin({
    filename: 'vendor.[contenthash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude: /node_modules/,
          use: plugin.extract({
            use: cssRulesUse.slice(1, cssRulesUse.length),
            fallback: 'style-loader',
          }),
        }
      ]
    },
    plugins: [ plugin ],
  };
};

exports.purify = (options) => {
  return {
    plugins: [
      new PurifyCSSPlugin(options)
    ]
  };
};
