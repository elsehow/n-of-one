var last = arr => arr[arr.length-1]
var testcsvfile = __dirname + '/test.csv'
var fs = require('fs')
var test = require('tape')
var server = require('..')
var request = require('request')
var s = null
test('testing server', t => {
  t.plan(6)
  var port = 9998
  s = server(function () {
    t.ok(true, 'server is listening')
    var hostname = 'http://localhost:' + port + '/'
    s.on('error', (err) => {
      t.ok(err,
           'gets err / bad schema')
    })
    s.on('post', (timestamp) => {
      t.ok(timestamp,
           `seeing timestamp ${timestamp}`)
      // try to read csv file
      var f = fs
          .readFileSync(testcsvfile)
          .toString()
      t.ok(f, 'log ' + f)
      let latest = last(f.trim().split('\n'))
      t.equals(timestamp, parseInt(latest),
                  'latest log entry matches timestamp')
    })
    request(hostname, function (err, res, body) {
      t.notOk(err,
              'no errors on post')
      t.equal(res.statusCode,
              202,
              'good data 202')
    })
  }, {
    port: port,
    outfile: testcsvfile,
  })
})

test.onFinish(function () {
  s.close()
  fs.unlinkSync(testcsvfile)
})
