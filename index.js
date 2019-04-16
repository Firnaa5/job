var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var PORT = 3000;
var app = express();
/*var uuidv4 = require('uuidv4');
var request = require('request');
var fs = require('fs');
var trackId = [];
var reqId = uuidv4();
var url = 'https://jobs.github.com/positions.json';
var filename = reqId + '.json';*/
const {search, searchById} = require('./search');
// var searchById = require('./search');
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


/*function search(req, res){					
		request(url,function(err, res, body){
	  		if(!err && res.statusCode === 200){	
	  		var data = JSON.stringify(body);    		
	    		fs.writeFile(`./files/${filename}`, data, function (err) {
	  				if (err) 
	  					console.log('An Error found while saving the response');
	  				console.log('Saved!');
				});				
	  		} else {
	  			res.statusCode === 500;
	  			err = 'Fake Error to test the API';
	  			console.log(err);
	  		}
	  	})
	  	trackId.push(reqId);
	  	res.send(`The Generated Id for your response is ${reqId}`);
}
*/

/*function searchById(req, res){
	var jobId = trackId;
 	if(req.params.searchId == jobId){
 		fs.readFile(`./files/${filename}`, function(err, data) {
    		res.writeHead(200, {'Content-Type': 'text/json'});
    		res.write(data);
    		res.end();
  		});
  		fs.unlink(`./files/${filename}`, function(err){
			if (err) throw err;
			console.log('File Deleted');
		});
		
		var index = trackId.indexOf(reqId);
		if (index >= 0) {
  			trackId.splice( index, 1 );
		}
		console.log(trackId);
		
	} else {
		res.send('Id does not exists');
	}
}*/