const program = require('commander')

program
  .version('0.1.0')
  .option('-i, --inputFilePath <filepath>', 'Gzipped filepath to search')
  .option('-r, --regexURL [URL]', 'A URL to a JSON array of regex patterns (example: https://lib-metl-prd-01.oit.umn.edu/lookups/34)')
  .option('-m, --matchesDir <matches directory>', 'Directory to store matches', 'matches')
  .parse(process.argv);

module.exports.program = program;