const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = paths => ({
  name: "server",
  target: "node",
  externals: [
    nodeExternals({
      whitelist: [/^lodash/]
    })
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    // The __dirname will be the original __dirname of the file
    // ``/.../src/...`
    __dirname: true
  },
  mode: "development",
  entry: {
    main: [paths.serverEntry]
  },
  output: {
    path: paths.buildServer,
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/",
    libraryTarget: "commonjs2"
  },
  resolveLoader: {
    modules: paths.nodePaths
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
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
            exclude: /node_modules\/(!@pigment\/[^/]+\/src)/,
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
