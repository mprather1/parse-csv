var fs = require('fs')
var iconvLite = require('iconv-lite')

let csv = process.argv[3]
let json = csv.split('.')
json = json.slice(0, json.length - 1).join('.') + '.json'

parseCSV(csv, json)

function parseCSV (csv, json) {
  fs.readFile(csv, (err, res) => {
    if (err) throw new Error(err)

    let feed
    let headers

    var arr = []
    var obj = {}

    feed = iconvLite.decode(res, 'utf8')

    headers = feed.split('\n').slice(0, 1)
    headers = headers
      .map(line => line.split('\t'))
      .filter(line => line.length !== 1 && line[0] !== '')

    feed = feed.split('\n').slice(1).join('\n')
    feed = feed
      .split('\n')
      .map(line => line.split('\t'))
      .filter(line => line.length !== 1 && line[0] !== '')

    for (var j = 0; j < feed.length; j++) {
      for (var k = 0; k < feed[j].length; k++) {
        for (var i = 0; i < headers[0].length; i++) {
          obj[headers[0][k]] = feed[j][k]
          arr.push(obj)
        }
      }
    }
    fs.writeFile(json, JSON.stringify(arr, null, 2))
  })
}
