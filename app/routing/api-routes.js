// ===============================================================================
// LOAD DATA
// ===============================================================================

var friendsData 	= require('../data/friends.js');
var bodyParser 		= require('body-parser');
var path 			= require('path');



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.status(200).json({message: 'connected.'})
		res.json(friendsData);				
	});

	
	// API POST Requests
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){
		res.json(true);
		//console.log(req.body);
		console.log(friendsData);

		//functions to return best match
		var userMatch = {
			'name': 'none',
			'photo': 'none'
		};

		function sum (array) {
			var total = 0;
			for (var j = 0; j < array.length; j++) {
				total += parseInt(array[j]);
				//console.log(array[n]);
				//console.log(parseInt(total));
			}
			return total;
		}

		var userTotal = sum(req.body.scores);


		//console.log(userTotal);

		var friendTotal = 0;

		for (var i = 0; i < friendsData.length; i++) {
			friendTotal = sum(friendsData[i].scores);
			//console.log(friendTotal);
			if (friendTotal == userTotal) {
				userMatch.name = friendsData[i].name;
				userMatch.photo = friendsData[i].photo;
			}
		};

		if (userMatch.name == 'none') {
			var closest = 50;

			for (var i = 0; i < friendsData.length; i++) {
				friendTotal = sum(friendsData[i].scores);
				var difference = Math.abs(friendTotal - userTotal);
				if ( difference <= closest ){
					closest = difference;
					userMatch.name = friendsData[i].name;
					userMatch.photo = friendsData[i].photo;
				};
			};
		};
		console.log(userMatch);
		res.json(userMatch);

	});

	
};