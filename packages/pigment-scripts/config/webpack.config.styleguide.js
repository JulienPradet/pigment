const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

const publicPath = "/";

module.exports = (paths, env) => {
  // src
  // tmp
  // node_modules/pigment-*/src (userland)
  // packages/pigment-*/src (dev)
  const { src, tmp } = paths;
  const shouldCompileRegExp = new RegExp(
    `^(${src}|${tmp})|(node_modules\/pigment-[^/]+\/src)|(packages\/pigment-[^/]+\/src)`
  );

  return {
    name: "styleguide",
    target: "web",
    node: false,
    mode: env === "production" ? "production" : "development",
    devtool: env === "production" ? "source-map" : "cheap-module-source-map",
    entry: {
      styleguide: []
        .concat(
          env === "production"
            ? []
            : [
                require.resolve("webpack-hot-middleware/client") +
                  "?name=styleguide&reload=true&overlayWarnings=true"
              ]
        )
        .concat([paths.styleguideEntry])
    },
    output: {
      path: paths.buildClient,
      filename: "_pigment/styleguide/[name].[hash:8].js",
      chunkFilename: "_pigment/styleguide/[name].[hash:8].js",
      publicPath: publicPath
    },
    resolve: {
      alias: {
        "loadable-components": require.resolve("loadable-components"),
        "pigment-app": path.join(__dirname, "../../pigment-app"),
        "pigment-utils": path.join(__dirname, "../../pigment-utils")
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
            cache: env === "production" ? false : paths.cacheEslint,
            baseConfig: {
              extends: [require.resolve("eslint-config-react-app")],
              rules: {
                "no-unused-vars": ["error", { args: "none" }]
              }
            },
            ignore: false,
            useEslintrc: false,
            failOnWarning: env === "production",
            failOnError: env === "production"
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
                  plugins: [require.resolve("babel-plugin-emotion")],
                  cacheDirectory:
                    env === "production" ? false : paths.cacheBabel
                }
              }
            },
            {
              test: /\.(graphql|gql)$/,
              include: input => shouldCompileRegExp.test(input),
              loader: "graphql-tag/loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || "production"),
          PUBLIC_URL: JSON.stringify("http://localhost:3000" + publicPath),
          SERVER: "false"
        }
      }),
      new CleanWebpackPlugin(paths.build, {
        verbose: false,
        root: process.cwd()
      }),
      new StatsWriterPlugin({
        filename: "../stats/stats.styleguide.json"
      }),
      new webpack.NamedModulesPlugin()
    ].concat(
      env === "production" ? [] : [new webpack.HotModuleReplacementPlugin()]
    )
  };
};
