const findCompiler = (multiCompiler, name) => {
  return multiCompiler.compilers.filter(
    compiler => compiler.name.indexOf(name) === 0
  );
};

const findStats = (multiStats, name) => {
  return multiStats.stats.filter(
    stats => stats.compilation.name.indexOf(name) === 0
  );
};

module.exports = {
  findCompiler,
  findStats
};
