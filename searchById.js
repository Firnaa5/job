
function searchById(req, res){
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
		/*jobId.shift();
		console.log(jobId);*/
		
		var index = trackId.indexOf(reqId);
		if (index >= 0) {
  			trackId.splice( index, 1 );
		}
		console.log(trackId);
		
	} else {
		res.send('Id does not exists');
	}
}

module.exports = searchById;