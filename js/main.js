/**************************************** MAIN VARIABLE ****************************************/
var it={};
	it.error=[];

/**************************************** INIT STACKMOB ****************************************/
StackMob.init({
	appName: "institute_tracker",
	clientSubdomain: "apex2060gmailcom",
	publicKey: "2e3c6101-6484-4c41-8b95-dcea42ec6b4f",
	apiVersion: 0
});



/**************************************** MAIN FUNCTIONS ****************************************/
function signup(userInfo) {
	if(it.currentLocation==undefined){
		alert('Geo Location must be activated to sign up.');
		promptLocation();
	}else{
		var latlon = new StackMob.GeoPoint(position.coords.latitude, position.coords.longitude);
		var user = new StackMob.User({ username: userInfo.username, password: userInfo.password, profession: 'developer', geoloc: latlon});
		user.create({
		    success: function(model) {
		        console.debug('User object is saved, username: ' + model.get('username'));
		        it.valid=model;
		    },
		    error: function(model, response) {
		        console.debug(response);
		    }
		});
	}
}
function login(userInfo) {
	if(it.currentLocation==undefined){
		alert('Geo Location must be activated to use this.');
		promptLocation();
	}else{
		var latlon = new StackMob.GeoPoint(it.currentLocation.coords.latitude, it.currentLocation.coords.longitude);
		var user = new StackMob.User({ username: userInfo.username, password: userInfo.password, profession: 'developer', geoloc: latlon});
		user.create({
		    success: function(model) {
		        console.debug('User object is saved, username: ' + model.get('username'));
		        it.valid=model;
				angular.element(document.getElementById('all')).scope().$apply(function(scope){
		        	scope.it = it;
		    	});
		    	$('#loginModal').modal('hide');
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




$('#loginForm').submit(function(e){
	it.login=$(this).serializeObject();
	login(it.login);
	return false;
});










/**************************************** JQUERY FUNCTIONS ****************************************/
$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};