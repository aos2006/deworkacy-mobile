// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reScript = /\.(js|jsx|mjs)$/;

module.exports = {
  context: path.resolve(__dirname, '..'),
  resolve: {
    modules: ['node_modules', 'src'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      story: path.resolve(__dirname, '../src/components'),
    }
  },
  plugins: [],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [
                  {removeTitle: false}
                ],
                floatPrecision: 2,
              }
            }
          }
        ]
      },
      {
        test: reScript,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../tools'),
        ],
        loader: 'babel-loader',
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            [
              '@babel/preset-env',
              {
                targets: {
                  forceAllTransforms: false, // for UglifyJS
                },
                modules: false,
                useBuiltIns: false,
                debug: false,
              },
            ],
            // Experimental ECMAScript proposals
            // https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
            '@babel/preset-stage-2',
            // Flow
            // https://github.com/babel/babel/tree/master/packages/babel-preset-flow
            '@babel/preset-flow',
            // JSX
            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
            ['@babel/preset-react', {development: true}],
          ],
        },
      },
      {
        test: reStyle,
        rules: [
          // Convert CSS into JS module
          {
            issuer: {not: [reStyle]},
            use: 'isomorphic-style-loader',
          },

          // Process external/third-party styles
          {
            exclude: path.resolve(__dirname, '../src'),
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: false,
            },
          },

          // Process internal/project styles (from src folder)
          {
            include: [
              path.resolve(__dirname, '../src'),
            ],
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: true,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              // CSS Nano http://cssnano.co/
              minimize: false,
            },
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './tools/postcss.config.js',
              },
            },
          },
        ],
      }
      // add your custom rules.
    ],
  },
};
