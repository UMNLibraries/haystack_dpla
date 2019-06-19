const fetch = require('node-fetch');

const remoteRegexes = async (url, fetcher = fetch) => {
  try {
    const response = await fetcher(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};


module.exports.remoteRegexes = async (url, fetcher = fetch) => {
  const regexes = await remoteRegexes(url, fetcher);
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