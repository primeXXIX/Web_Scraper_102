const express = require( 'express' )
const fs = require( 'fs' )
const request = require( 'request' )
const cheerio = require( 'cheerio' )
const app = express()
const scrape = require('./public/scrape.js')

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.listen( '5000' )
console.log( 'Magic happens on port 5K!' )

module.exports = app
