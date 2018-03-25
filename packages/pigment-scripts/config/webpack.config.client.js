const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = paths => {
  // src
  // tmp
  // node_modules/@pigment/*/src (userland)
  // packages/pigment-*/src (dev)
  const { src, tmp } = paths;
  const shouldCompileRegExp = new RegExp(
    `^(${src}|${tmp})|(node_modules\/@pigment\/[^/]+\/src)|(packages\/pigment-[^/]+\/src)`
  );

  return {
    name: "client",
    target: "web",
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
      main: [paths.clientEntry]
    },
    output: {
      path: paths.buildClient,
      filename: "static/js/[name].[hash].js",
      chunkFilename: "static/js/[name].[hash].js",
      publicPath: "/"
    },
    resolve: {
      // Dedupplicate peer dependencies
      alias: {
        "loadable-components": require.resolve("loadable-components"),
        "loadable-components/babel": require.resolve(
          "loadable-components/babel"
        ),
        "loadable-components/server": require.resolve(
          "loadable-components/server"
        )
      }
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
                  plugins: [require.resolve("loadable-components/babel")],
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
