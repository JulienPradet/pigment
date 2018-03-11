const webpack = require("webpack");
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
    name: "client",
    target: "web",
    mode: "development",
    entry: {
      main: [paths.clientEntry]
    },
    output: {
      path: paths.buildClient,
      filename: "static/js/[name].[hash].js",
      chunkFilename: "static/js/[name].[hash].js",
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
          include: input => shouldCompileRegExp.test(input),
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
              include: input => shouldCompileRegExp.test(input),
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
  };
};
