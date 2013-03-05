/**************************************** MAIN VARIABLE ****************************************/
var it={};
	it.error=[];
	it.valid={};
	it.isValid=StackMob.isLoggedIn();
	if(it.isValid){
		it.valid.id=StackMob.getLoggedInUser();
	}
	it.message = function(){};
	it.message.wisper = function(type, message){
		$("html, body").animate({ scrollTop: 0 }, "slow");
		$('#messaging').append('<div class="alert '+type+'"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button><span>'+message+'</span></div>');
	}	



/**************************************** INIT STACKMOB ****************************************/
StackMob.init({
	appName: "institute_tracker",
	clientSubdomain: "apex2060gmailcom",
	publicKey: "2e3c6101-6484-4c41-8b95-dcea42ec6b4f",
	apiVersion: 0
});




/**************************************** STARTUP CALLS ****************************************/
promptLocation();




/**************************************** MAIN FUNCTIONS ****************************************/
function updateModal(){
	angular.element(document.getElementById('all')).scope().$apply(function(scope){
		scope.it = it;
	});
}

function login(userInfo) {
	//var latlon = new StackMob.GeoPoint(it.currentLocation.coords.latitude, it.currentLocation.coords.longitude);
	console.log(userInfo);
	var user = new StackMob.User({ username: userInfo.username, password: userInfo.password });
	user.login(false, {
		success: function(model){
			it.isValid=true;
			it.valid=model;
			it.valid.id=StackMob.getLoggedInUser();
			updateModal();
		},
		error: function(model, response) {
			it.error.push(response);
		}
	});
	$('#loginModal').modal('hide');
}

function promptLocation(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(setLocation);
	}else{
		it.error.push("Geolocation is not supported by this browser.");
	}
}
function setLocation(position){
	it.currentLocation=position;
	updateModal();
}



function handleForm(form){
	it.form=$(form).serializeObject();
	var schema = $(form).data('schema');
	var obj = StackMob.Model.extend({ schemaName: schema });
	// completed will be a boolean field if it's not created already
	var newObj = new obj(it.form);
	newObj.create();

	if(schema=='user'){
		it.isValid=StackMob.isLoggedIn();
		if(it.isValid){
			it.valid.id=StackMob.getLoggedInUser();
		}
	}
}

function orgCreated(response){
	it.message.wisper('alert-success', response.org_name+' was created, and you were added to it.');
}
/**************************************** JQUERY LISTENERS ****************************************/
$('#formLogin').submit(function(e){
	login($(this).serializeObject());
	return false;
});

$('#formCreate').submit(function(e){
	handleForm($(this));
	return false;
});


/**************************************** JQUERY FUNCTIONS ****************************************/
$.fn.serializeObject = function(){
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