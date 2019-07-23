const program = require('commander')
const path = require('path');
var appDir = path.dirname(require.main.filename);

program
  .version('0.1.0')
  .option('-i, --inputFilePath <filepath>', 'Gzipped filepath to search')
  .option('-r, --regexFilePath <regexFilePath>','The local file path to a JSON file with an regex patterns', `${appDir}/umbra_regexes.json`)
  .option('-m, --matchesDir <matches directory>', 'Directory to store matches', 'matches', `${appDir}/matches`)
  .parse(process.argv);

module.exports.program = program;