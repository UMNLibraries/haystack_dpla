var fs = require('fs');

module.exports.regexes = (regexesPath) => {
  const regexes = JSON.parse(fs.readFileSync(regexesPath, 'utf8'));
  return {
    include: toIncludeRegexes(regexes.include),
    exclude: toRegexes(regexes.exclude)
  }
}

const toIncludeRegexes = (config) => {
  const regexp = new RegExp(config.patterns.join('|'), config.flags)
  return [{ allMustMatch: false, patterns: [regexp] }];
}

const toRegexes = (configs) => {
  if (!configs) return [];
  return configs.map(config => {
    const patterns = config.patterns.map(pattern => new RegExp(pattern, config.flags));
    return Object.assign(config, { patterns: patterns });
  })
}