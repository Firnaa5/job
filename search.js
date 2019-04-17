var uuidv4 = require('uuidv4');
var request = require('request');
var fs = require('fs');
var trackId = [];
var reqId = uuidv4();
var url = 'https://jobs.github.com/positions.json';


exports.search = function (req, res){	
		var reqId = uuidv4();
		var filename = reqId + '.json';				
		request(url,function(err, res, body){
			if(!err && res.statusCode === 200){	
	  			fs.writeFile(`./files/${filename}`, body, function (err) {
	  				if (err){ 
	  					console.log('An Error found while saving the response');
	  					var index = trackId.indexOf(reqId);
						if (index >= 0) {
  							trackId.splice( index, 1 );
						}
						console.log(trackId);
	  				} else {
	  				console.log('Saved!');
	  				}	  				
				});		
						
	  		} else {
	  			res.statusCode === 500;
	  			err = 'Fake Error to test the API';
	  			console.log(err);
	  		}
	  	})
		trackId.push(reqId);
	  	res.status(200).json({
	  		pollId: reqId,
	  		completed: false
	  	});
}

exports.searchById = function (req, res){
	var jobId = trackId.includes(req.params.searchId);
 	if(jobId){
 		var filename = req.params.searchId + '.json';
 		fs.readFile(`./files/${filename}`, 'utf-8',function(err, data) {
 			if(err){
 				res.status(404).json({
    				content: 'Error Reading the file'
    			});
 			} else {
    			res.status(200).json({
    			completed: true,
    			content: data
    			});
    			fs.unlinkSync(`./files/${filename}`);
    			var index = trackId.indexOf(req.params.searchId);
				if (index >= 0) {
  					trackId.splice( index, 1 );
				}
				console.log(trackId);
    		}
  		});  		
		
		
		
	} else {
		res.status(404).json({
    		content: 'Id does not exists'
    	});	
	}
}


