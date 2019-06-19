const fs = require('fs');
const rimraf = require('rimraf');


function wipeLocalData(matchesDir) {
  truncate(`../logs/keys.log`, 'Cleared Batch Log');
  rimraf.sync(`${matchesDir}/*`)
  console.log('Cleared Batches Directory')
}

function truncate(filePath, message) {
  fs.truncate(fs.openSync(filePath, 'r+'), 0, () => console.log(message) );
}

module.exports.wipeLocalData = wipeLocalData;
