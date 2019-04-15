var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var PORT = 3000;
var app = express();
var uuidv4 = require('uuidv4');
var request = require('request');
var fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
	res.send(`Github job api is running @ ${PORT}`)
});

app.listen(3000, function(req, res){
	console.log("Server is running @ 3000");
});

//search query
app.get('/searchJobs', search);
	
	function search(req, res){
		let trackId = [];
		var req_id = uuidv4();
		module.exports = trackId;
		trackId.push(req_id);
		console.log(trackId);
		var filename = req_id + '.json';
		console.log(filename);
		var queryParameter = req.query;
		request({
	    	uri: 'https://jobs.github.com/positions.json?description='+ req.query.description +'&location='+ req.query.location,
	    	
	  	},function(err, res, body){
	  		if(!err && res.statusCode === 200){
	  			let data = [];
	  			console.log(res.statusCode) 
	    		console.log(res.headers['content-type'])
	    		data.push(body);
	    		fs.writeFile(`./files/${filename}`, data, function (err) {
	  				if (err) throw err;
	  				console.log('Saved!');
				});

				
	  		}
	  	})
	  	res.send(`The Generated Id for your response is ${req_id}`);
}

app.get('/searchJobs/:searchId', function(req, res){
	var jobId = require('./index');
 	if(req.params.searchId == jobId){
 		var filename = req.params.searchId + '.json';
 		fs.readFile(`./files/${filename}`, 'utf-8' ,function(err, file) {
   			res.send(file);
  		});
  		fs.unlink(`./files/${filename}`, function(err){
			if (err) throw err;
			console.log('File Deleted');
		});
		jobId.shift();
		console.log(jobId);
		
	}
})
/*removeTrackId(jobId);
		function removeTrackid(arr) {
    			var what, a = arguments, L = a.length, ax;
    			while (L > 1 && arr.length) {
        		what = a[--L];
        		while ((ax= arr.indexOf(what)) !== -1) {
            	arr.splice(ax, 1);
        		}
    		}
    		return arr;
		}*/


