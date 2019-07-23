const { program } = require('./program');
const { regexes } = require('./src/regexes');
const { searchAndSave } = require('./src/search_and_save');
const { matcher } = require('./src/matcher');

const run = async () => {
  searchAndSave(program.inputFilePath,
                program.matchesDir,
                matcher(regexes(program.regexFilePath)));
}

run();




