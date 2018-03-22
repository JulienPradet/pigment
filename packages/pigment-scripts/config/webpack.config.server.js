const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = paths => {
  // src
  // tmp
  // node_modules/@pigment/*/src (userland)
  // packages/pigment-*/src (dev)
  const shouldCompileRegExp = new RegExp(
    `^(${paths.src}|${
      paths.tmp
    })|(node_modules\/@pigment\/[^/]+\/src)|(packages\/pigment-[^/]+\/src)`
  );

  return {
    name: "server",
    target: "node",
    externals: [
      nodeExternals({
        whitelist: [/^(lodash|@?pigment)/]
      })
    ],
    node: {
      // The __dirname will be the original __dirname of the file
      // ``/.../src/...`
      __dirname: true
    },
    mode: "development",
    devtool: "inline-cheap-source-map",
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
          include: input => shouldCompileRegExp.test(input),
          loader: "eslint-loader",
          options: {
            cache: paths.cacheEslint,
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
              include: input => shouldCompileRegExp.test(input),
              use: {
                loader: "babel-loader",
                options: {
                  babelrc: false,
                  presets: [require.resolve("babel-preset-react-app")],
                  plugins: [
                    require.resolve("babel-plugin-dynamic-import-node")
                  ],
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
  };
};
