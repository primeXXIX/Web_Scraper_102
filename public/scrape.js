const express = require( 'express' )
const request = require( 'request' )
const cheerio = require( 'cheerio' )
const app = express()

app.get( '/scrape', function( req, res ) {
  const url = 
  url = $('#linkform').click(function(){
  request(url, function(error, response, html) {
    if (!error) {
      let $ = cheerio.load(html)
      let title, rating;

      let json = {
        title: '',
        rating: '',
      }

      $( '.itemList' ).filter(function() {
        let data = $(this)
        console.log(data)
        title = data.text()
        console.log(title)
        // release = data.children().last().children().text()
        json.title = title
        // json.release = release
      })
      $( '.score' ).filter(function() {
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
})
