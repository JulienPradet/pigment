const babelJest = require("babel-jest");

module.exports = babelJest.createTransformer({
  babelrc: false,
  presets: [require.resolve("babel-preset-react-app")],
  plugins: [require.resolve("babel-plugin-emotion")]
});
