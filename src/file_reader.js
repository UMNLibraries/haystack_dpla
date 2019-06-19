const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const crypto = require('crypto');

function openFileStream(fileName) {
  return readline.createInterface({
    input: fs.createReadStream(fileName).pipe(zlib.createGunzip())
  });
}

module.exports.fileReader = (fileName, matchesDir, matcher) => {
  const lineReader = openFileStream(fileName);
  let lines = []
  lineReader.on('line', (line) => {
    try {
      let json = JSON.parse(line)
      match = matcher(json);
      if (match) {
        lines.push(match)
      }
    }
    catch (err) {
      console.log(err)
      logJsonError(`${err} Line: ${line}`)
    }

    if (lines.length == 1000) {
      saveMatches(JSON.stringify(lines), matchesDir)
      lines = [];
    }
  });

  lineReader.on('close', function () {
    if (lines.length > 0) {
      saveMatches(JSON.stringify(lines), matchesDir)
    }
  });

}

function saveMatches(matches, matchesDir) {
  const filename = `${crypto.createHash('sha1').update(matches).digest('hex')}.json`;
  console.log(`Saving Matches: ${filename}`);
  fs.writeFile(`${matchesDir}/${filename}`, JSON.stringify(matches), (err) => {
    if (err) throw err;
  });
}

function logJsonError(data) {
  console.log(data)
  fs.appendFile(`../logs/json_error.log`, `${data}\n`, () => { console.log('Error: check json_error.log') });
}