const fs = require('fs');
const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4'
});

module.exports.downloadLatestDpla = (dplaBucket, downloadDir) => {
  var today = new Date();
  var month = ('0' + (today.getMonth() + 1)).slice(-2)
  prefix = `${today.getFullYear()}/${month}/all.jsonl/`
  return S3.listObjects({ Bucket: dplaBucket, Prefix: prefix }, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      let items = data.Contents
      if (items.length > 0) {
        items.map((item) => saveExport(item.Key, downloadDir, dplaBucket))
      } else {
        console.log(`No New DPLA Dump Available For Download for ${prefix}`)
      }
    }
  });
}

function saveExport(key, downloadDir, dplaBucket) {
  filename = key.split('/')[key.split('/').length - 1]
  if (filename.match(/^part/i)) {
    console.log(`Downloading Fresh DPLA Dump: ${key}`)
    var params = {
      Bucket: dplaBucket,
      Key: key
    };

    fs.writeFile(`${downloadDir}/${filename}`, '', (err) => { console.log(err) });
    var jsonFile = require('fs').createWriteStream(`./dpla_data/${filename}`);
    S3.getObject(params).createReadStream().pipe(jsonFile);
  }
}