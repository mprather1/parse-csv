var fs = require('fs')
var iconvLite = require('iconv-lite')

function parseCSV (csv, json) {
  fs.readFile(csv, (err, res) => {
    if (err) throw new Error(err)

    let feed
    feed = iconvLite.decode(res, 'utf8')

    // var headers = feed.split('\n')[0]
    feed = feed.split('\n').slice(1).join('\n')
    feed = feed
      .split('\n')
      .map(line => line.split('\t'))
      .filter(line => line.length !== 1 && line[0] !== '')

    var arr = []
    feed.map(line => {
      for (let [id, name] of feed) {
        let obj = {}
        obj[name] = id
        arr.push(obj)
      }
    })

    fs.writeFile(json, JSON.stringify(arr))
  })
}

parseCSV('shintech.csv', 'shintech.json')
