var it={};
	it.error=[];


function login(userInfo) {
	if(it.currentLocation==undefined){
		alert('Geo Location must be activated to use this.');
		promptLocation();
	}else{
		var latlon = new StackMob.GeoPoint(position.coords.latitude, position.coords.longitude);
		var user = new StackMob.User({ username: userInfo.username, password: userInfo.password, profession: 'developer', geoloc: latlon});
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
}

function promptLocation(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(setLocation);
	}
	else{
		it.error.push("Geolocation is not supported by this browser.");
	}
}
function setLocation(position){
	it.currentLocation=position;
}




$('#loginForm').submit(function(){
	console.log('form submitted');
	it.login=$(this).serialize();
	login(it.login);
	return false;
});