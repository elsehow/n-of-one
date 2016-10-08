var restify = require('restify')
var fs = require('fs')
var EventEmitter = require('events').EventEmitter

/*
  10-8-16
  Exposes a function (opts, cb)
  Calls `cb` once the server is listening.
  Returns a server,
  which emits events
  - 'post' (an object, representing post request)
  - 'error' (error)
*/

module.exports = function (cb, opts={
  cors: true,
  port: 9999,
  outfile: 'out.csv',}) {
  var server = restify.createServer()
  server.use(restify.bodyParser())
  if (opts.cors)
    server.use(restify.CORS())
  // JSON post request route is named /
  server.get('/', handle(opts.outfile))
  // when server is listening, call back
  server.listen(opts.port, cb)
  server.on = (ev, cb) => emitter.on(ev, cb)
  return server
}

var emitter = new EventEmitter()

function timestamp () {
  return Date.now()
}

function handle (outfile) {
  return function (req, res, next) {
    var now = timestamp()
    return fs.appendFile(outfile, now+'\n', err => {
      if (err) {
        emitter.emit('error', msg)
        return next(
          new restify.UnprocessableEntityError(msg))
      }
      else {
        emitter.emit('post', now)
        res.send(202)
        return next()
      }
    })
  }
}

