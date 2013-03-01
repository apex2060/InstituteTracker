var it={};

function saveGeoLoc(){
	// If your schema name is different than `place`, then you need to replace `place` with your schema
	var Place = StackMob.Model.extend({ schemaName: 'place' });
	var Places = StackMob.Collection.extend({ model: Place });
	 
	// GeoPoint(lat, lon) has some constraints:
	//  lat: -90,90 (both inclusive)
	//  lon: -180 (inclusive), 180 (exclusive)
	var latlon = new StackMob.GeoPoint(37.772161, -122.406443);
	 
	var q = new StackMob.Collection.Query();
	q.mustBeNear('location', latlon, 1);
	 
	var placesContainer = new Places();
	placesContainer.query(q, {
	  success: function(model) {
	    console.debug(model);
	  },
	  error: function(model, response) {
	    console.debug(response);
	  }
	});
}





function login() {
	var user = new StackMob.User({ username: 'Ryan Quinlan', password: 'somecoolencryption', profession: 'developer'});
	user.create({
	    success: function(model) {
	        console.debug('User object is saved, username: ' + model.get('username'));
	        it=model;
	    },
	    error: function(model, response) {
	        console.debug(response);
	    }
	});
}

$('#login').click(function() {
	login();
});