const express = require( 'express' )
const fs = require( 'fs' )
const request = require( 'request' )
const cheerio = require( 'cheerio' )
const path = require( 'path' )
const app = express()

app.get('/', function(req, res){
  app.use('/public', express.static(path.join(__dirname + '/public')));
})

app.get( '/scrape', function( req, res ) {
  url = 'http://www.imdb.com/title/tt1229340/'
  request(url, function(error, response, html) {
    if (!error) {
      let $ = cheerio.load(html)
      let title, release, rating;

      let json = {
        title: '',
        release: '',
        rating: '',
      }

      $( '.title_wrapper > h1').filter(function() {
        let data = $(this)
        console.log(data)
        title = data.text()
        console.log(title)
        release = data.children().last().children().text()
        json.title = title
        json.release = release
      })
      $( '.imdbRating' ).filter(function() {
        let data = $(this)
        rating = data.text()
        json.rating = rating
      })
      // To write to the system we will use the built in 'fs' library.
      // In this example we will pass 3 parameters to the writeFile function
      // Parameter 1 :  output.json - this is what the created filename will be called
      // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
      // Parameter 3 :  callback function - a callback function to let us know the status of our function
      fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
        console.log( 'File succesfully written! Check your project directory for output.JSON file.' )
      })
      res.send( 'Check your console!' )
    }
  })
})

app.listen( '5000' )
console.log( 'Magic happens on port 5K!' )

exports = module.exports = app
