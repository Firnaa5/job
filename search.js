var uuidv4 = require('uuidv4');
var request = require('request');
var fs = require('fs');
var trackId = [];
var reqId = uuidv4();
var url = 'https://jobs.github.com/positions.json';
var filename = reqId + '.json';

exports.search = function (req, res){					
		request(url,function(err, res, body){
	  		if(!err && res.statusCode === 200){	
	  			fs.writeFile(`./files/${filename}`, body, function (err) {
	  				if (err) 
	  					console.log('An Error found while saving the response');
	  				console.log('Saved!');	  				
				});		
				trackId.push(reqId);		
	  		} else {
	  			res.statusCode === 500;
	  			err = 'Fake Error to test the API';
	  			console.log(err);
	  		}
	  	})	  	
	  	res.status(200).json({
	  		pollId: reqId,
	  		completed: true
	  	});
}

exports.searchById = function (req, res){
	var jobId = trackId;
 	if(req.params.searchId == jobId){
 		fs.readFile(`./files/${filename}`, 'utf-8',function(err, data) {
    		res.status(200).json({
    		completed: true,
    		content: data
    		});
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
}


