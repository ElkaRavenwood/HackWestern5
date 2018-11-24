var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.192.48.135",
  user: "root",
  password: "YfYjx7SKMdXVHtdd",
  database: "test"
});

con.connect();

app.get('/', async function(req, res) {


	var acr = req.query.acr;
	var meaning = [];
	var returnVal = {};
	var q = 'SELECT * FROM Acr WHERE Acronym="' + acr + '"';
	con.query(q, function(err, rows, fields) {
		if (err) throw err;

		for(var i = 0; i < rows.length ; i++){
			meaning.push(rows[i]['Full']);
		}
		returnVal[acr] = meaning;
		//res.send(returnVal);
		res.json(JSON.stringify(returnVal));
	});
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);