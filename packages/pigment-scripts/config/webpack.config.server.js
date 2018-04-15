const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const publicPath = "/";

module.exports = paths => {
  // src
  // tmp
  // node_modules/@pigment/*/src (userland)
  // packages/pigment-*/src (dev)
  const { src, tmp } = paths;
  const shouldCompileRegExp = new RegExp(
    `^(${src}|${tmp})|(@pigment\/[^/]+\/src)|(packages\/pigment-[^/]+\/src)`
  );

  const modules = paths.nodePaths
    .filter(path => {
      try {
        fs.accessSync(path);
        return true;
      } catch (e) {
        return false;
      }
    })
    .map(modulesPath =>
      fs
        .readdirSync(modulesPath)
        .map(moduleName => path.join(modulesPath, moduleName))
    )
    .reduce((acc, curr) => [...acc, ...curr], []);

  return {
    name: "server",
    target: "node",
    externals: [
      (context, request, callback) => {
        const req = request.startsWith(".")
          ? path.join(context, request)
          : request;

        if (shouldCompileRegExp.test(req)) {
          return callback();
        }

        const moduleName = req.replace(/\/.*$/, "");
        const fullModulePath = modules.find(module =>
          module.endsWith(moduleName)
        );

        if (fullModulePath) {
          callback(
            null,
            "commonjs " + path.join(fullModulePath, req.replace(moduleName, ""))
          );
        } else {
          callback();
        }
      }
    ],
    node: {
      // The __dirname will be the original __dirname of the file
      // ``/.../src/...`
      __dirname: true
    },
    mode: "development",
    devtool: "inline-cheap-source-map",
    entry: {
      ssr: [paths.ssrEntry],
      graphql: [paths.graphQLEntry]
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
        express: require.resolve("express")
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
              test: /\.mjs$/,
              include: /node_modules/,
              type: "javascript/auto"
            },
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
          PUBLIC_URL: JSON.stringify("http://localhost:3000" + publicPath)
        }
      }),
      new CleanWebpackPlugin(paths.build, {
        verbose: false,
        root: process.cwd()
      })
    ]
  };
};
