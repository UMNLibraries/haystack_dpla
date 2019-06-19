const path = require('path');
var appDir = path.dirname(require.main.filename);
const { downloadLatestDpla } = require('./src/download_latest_dpla');

var dplaBucket = 'dpla-provider-export';
var downloadDir = `${appDir}/dpla_data`;

downloadLatestDpla(dplaBucket, downloadDir)

