const { program } = require('./program');
const { remoteRegexes } = require('./src/remote_regexes');
const { fileReader } = require('./src/file_reader');
const { matcher } = require('./src/matcher');
const path = require('path');
var appDir = path.dirname(require.main.filename);

var inputFilePath = program.inputFilePath
var matchesDir = (program.matchesDir ? program.matchesDir : `${appDir}/matches`);
var regexURL = (program.regexURL ? program.regexURL : 'https://lib-metl-prd-01.oit.umn.edu/lookups/34.json');

const run = async () => {
  const regexes =  await remoteRegexes(regexURL);
  fileReader(inputFilePath, matchesDir, matcher(regexes));
}

run();




