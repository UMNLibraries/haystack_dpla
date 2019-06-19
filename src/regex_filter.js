const { match } = require('./match');

module.exports.regexFilter = (row, regexes, excludeMatches = false) => {
  const search = {
    value: row,
    matcher: regexes.map(regex => match(regex, JSON.stringify(row)))
  }
  const passes = (excludeMatches) ? !hasMatch(search) : hasMatch(search)

  if (passes) {
    return Object.assign(search.value, { matches: matchStrings(search.value, search, excludeMatches) })
  } else {
    return {};
  }
}

const hasMatch = (search) => {
  return search.matcher.filter(match => match.matched == true).length > 0
}

// When excludeMatches is set to true, we have a set of records that have already
// been positively matched for inclusion and seek to filter out false positives
// with a second pass of "negative" matches, excluding records that match a given
// pattern. For this reason, we preserve row.matches from the original match,
// since if the record makes it past the filter, we want to remember why we originally
// matched the term
const matchStrings = (orignialRow, search, excludeMatches) => {
  if (orignialRow.matches) {
    return orignialRow.matches;
  } else {
    return [].concat(...search.matcher.map(match => match.matches))
  }
  // return (orignialRow.matches) ? orignialRow.matches : [].concat(...row.matcher.map(match => match.matches))
}