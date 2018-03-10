const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = paths => ({
  mode: "development",
  entry: {
    main: [paths.clientIndex]
  },
  output: {
    path: paths.buildClient,
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/"
  },
  resolveLoader: {
    modules: paths.nodePaths
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        options: {
          cahe: paths.cacheEslint,
          baseConfig: {
            extends: [require.resolve("eslint-config-react-app")]
          },
          ignore: false,
          useEslintrc: false
        }
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                babelrc: false,
                presets: [require.resolve("babel-preset-react-app")],
                cacheDirectory: paths.cacheBabel
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "production")
      }
    }),
    new CleanWebpackPlugin(paths.build, {
      verbose: false,
      root: process.cwd()
    })
  ]
});