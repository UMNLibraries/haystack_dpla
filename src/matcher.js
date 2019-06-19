const { regexFilter } = require('./regex_filter');

module.exports.matcher = (regexes) => {
  return (row) => {
    const match = regexFilter(row, regexes.include, false)
    const matches = (regexes.exclude && Object.keys(match).length !== 0) ? regexFilter(match, regexes.exclude, true) : match

    if (Object.keys(matches).length !== 0) {
      return matches;
    } else {
      return false
    }
  }
}