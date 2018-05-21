const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

const publicPath = "/";

module.exports = (paths, env) => {
  // src
  // tmp
  // node_modules/pigment-*/src (userland)
  // packages/pigment-*/src (dev)
  const { src, tmp } = paths;
  const shouldCompileRegExp = new RegExp(
    `^(${src}|${tmp})|(pigment-[^/]+\/src)|(packages\/pigment-[^/]+\/src)`
  );

  const whitelist = [/^pigment-\w+\/src/, /^react-apollo/];

  return {
    name: "server",
    target: "node",
    externals: [
      nodeExternals({
        whitelist: whitelist
      }),
      nodeExternals({
        modulesDir: path.join(__dirname, "../../../node_modules"),
        whitelist: whitelist
      })
    ],
    node: {
      // The __dirname will be the original __dirname of the file
      // ``/.../src/...`
      __dirname: true
    },
    mode: process.env === "production" ? "production" : "development",
    devtool: env === "production" ? "source-map" : "inline-cheap-source-map",
    entry: {
      ssr: [paths.ssrEntry],
      graphql: [paths.graphQLEntry],
      styleguideGraphQL: [paths.styleguideGraphQLEntry]
    },
    output: {
      path: paths.buildServer,
      filename: "[name].[hash].js",
      chunkFilename: "[name].[hash].js",
      publicPath: publicPath,
      libraryTarget: "commonjs2"
    },
    resolve: {
      // Resolve any dependency of the pigment packages
      modules: paths.nodePaths,
      // Dedupplicate peer dependencies
      alias: {
        "loadable-components": require.resolve("loadable-components"),
        express: require.resolve("express"),
        "pigment-app": path.join(__dirname, "../../pigment-app"),
        "pigment-fs": path.join(__dirname, "../../pigment-fs"),
        "pigment-graphql": path.join(__dirname, "../../pigment-graphql"),
        "pigment-log": path.join(__dirname, "../../pigment-log"),
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
                  plugins: [
                    require.resolve("babel-plugin-emotion"),
                    require.resolve("babel-plugin-dynamic-import-node")
                  ],
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
          SERVER: "true"
        }
      }),
      new CleanWebpackPlugin(paths.build, {
        verbose: false,
        root: process.cwd()
      }),
      new StatsWriterPlugin({
        filename: "../stats/stats.server.json"
      })
    ]
  };
};
