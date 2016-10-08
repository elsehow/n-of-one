#!/usr/bin/env node
var usage = require('usage-and-quit')
var usageFile = require('path').join(__dirname, 'USAGE.txt')
var argv = require('minimist')(process.argv.slice(2), {
  default: {
    port: 9999,
    outfile: 'out.csv',
    cors: true,
    log: false,
  }
})
if (argv.cors === 'false')
  argv.cors = false
if (argv.log=== 'false')
  argv.log = false
if (argv.h || argv.help)
  usage(usageFile)
var server = require('.')(function () {
  if (argv.log)
    console.log('listening on', argv.port)
  server.on('post', timestamp => {
    if (argv.log)
      console.log('got post with timestamp', timestamp)
  })
  server.on('error', err => {
    console.warn('ERR!', err)
  } )
}, argv)
