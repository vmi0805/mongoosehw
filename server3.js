// ~~~ Set-up ~~~

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var mongojs = require("mongojs");

var db = mongojs('coins', ["coinsdb"]);

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/coins")

// ~~~ Start server ~~~

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


// ~~~ Test ~~~
app.get("/hi", function(req, res) {
  res.send("Hello world");
});


// ~~~ Scraping ~~~

app.get("/scrape", function(req, res){

	request("https://etherscan.io/tokens?p=1", function(error, response, html){
		
		var $ = cheerio.load(html)

		$("td.hidden-xs").each(function(i, element){

			var result = new Object

			var coinNAME = $(element).find("h5").text()
			var coinDES = $(element).find("small.hex.hidden-xs").text()
			var coinLINK1 = $(element).find("h5").find("a").attr("href")
			var link1 = "https://etherscan.io/token/"
			var coinLINK = link1.concat(coinLINK1)

			result.name = coinNAME
			result.description = coinDES
			result.link = coinLINK
			result.note = false

			console.log(result)

			if (result.name){
				db.coinsdb.insert(result)
			}
		})
	})
})

app.get("/coins", function(req, res){

  db.coinsdb.find({}, function(err, found) {
    if (err) {
      console.log(err);
    }
    else {
      // res.send(found);
      // console.log(found)
    }
  });

})



// ~~~ Manage articles ~~~
		// // Route for getting all Articles from the db
		// app.get("/articles", function(req, res) {
		//   // Grab every document in the Articles collection
		//   db.Article.find({})
		//     .then(function(dbArticle) {
		//       // If we were able to successfully find Articles, send them back to the client
		//       res.json(dbArticle);
		//     })
		//     .catch(function(err) {
		//       // If an error occurred, send it to the client
		//       res.json(err);
		//     });
		// });

		// // Route for grabbing a specific Article by id, populate it with it's note
		// app.get("/articles/:id", function(req, res) {
		//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
		//   db.Article.findOne({ _id: req.params.id })
		//     // ..and populate all of the notes associated with it
		//     .populate("note")
		//     .then(function(dbArticle) {
		//       // If we were able to successfully find an Article with the given id, send it back to the client
		//       res.json(dbArticle);
		//     })
		//     .catch(function(err) {
		//       // If an error occurred, send it to the client
		//       res.json(err);
		//     });
		// });

		// // Route for saving/updating an Article's associated Note
		// app.post("/articles/:id", function(req, res) {
		//   // Create a new note and pass the req.body to the entry
		//   db.Note.create(req.body)
		//     .then(function(dbNote) {
		//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
		//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
		//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
		//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
		//     })
		//     .then(function(dbArticle) {
		//       // If we were able to successfully update an Article, send it back to the client
		//       res.json(dbArticle);
		//     })
		//     .catch(function(err) {
		//       // If an error occurred, send it to the client
		//       res.json(err);
		//     });
		// });