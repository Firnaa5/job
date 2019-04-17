var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var PORT = 3000;
var app = express();

const {search, searchById} = require('./search');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
	res.send(`Github job api is running @ ${PORT}`)
});

app.listen(PORT, function(req, res){
	console.log(`Server is running @ ${PORT}`);
});

//search query
app.get('/searchJobs', search);	


app.get('/searchJobs/:searchId', searchById);



