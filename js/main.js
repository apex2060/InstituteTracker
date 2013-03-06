/**************************************** MAIN VARIABLE ****************************************/
var it={};
	it.error=[];
	it.valid={};
	it.isValid=StackMob.isLoggedIn();
	if(it.isValid){
		it.valid=$.parseJSON(localStorage.userInfo);
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
	var user = new StackMob.User({ username: userInfo.username, password: userInfo.password });
	user.login(false, {
		success: function(model){
			it.isValid=true;
			localStorage.userInfo=JSON.stringify(model);
			it.valid=model;
			it.valid.id=StackMob.getLoggedInUser();
			updateModal();
		},
		error: function(model, response) {
			it.error.push(response);
			it.message('alert-warning', response);
		}
	});
	$('#loginModal').modal('hide');
}
function logout(){
	var user = new StackMob.User({ username: it.valid.id});
	user.logout();

	localStorage.clear();
	it.isValid=false;

	it.valid={};
	updateModal();
}
function handleForm(form){
	console.log('saving form');
	var schema 	= $(form).data('schema');
	var hash 	= $(form).data('hash');

	var newForm = cleanForm(schema, $(form).serializeObject());
	var obj 	= StackMob.Model.extend({ schemaName: schema });
	// completed will be a boolean field if it's not created already
	var newObj = new obj(newForm);
	newObj.create({
		success: function(model, response) {
			it.message.wisper('alert-success', schema+' created successfully.');
			if(hash)
				window.location.hash=hash;
		},
		error: function(model, response) {
			it.error.push(response);
			it.message.wisper('alert-error', response.error);
		}
	});
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

function orgCreated(response){
	it.message.wisper('alert-success', response.org_name+' was created, and you were added to it.');
}
/**************************************** JQUERY LISTENERS ****************************************/
$('#formLogin').submit(function(e){
	login($(this).serializeObject());
	return false;
});

$('#formCreate').submit(function(e){
	console.log('form submitted');
	handleForm($(this));
	return false;
});

$('#loginModal').on('shown', function () {
  $('input:text:visible:first', this).focus();
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


/**************************************** FORM VALIDATE ****************************************/
function cleanForm(schema, form){
	console.log('cleaning form');
	console.log(schema);
	console.log(form);
	switch(schema){
	case 'user':
		console.log('is user');
		delete form.password2;
		form.phone=form.phone.replace(/\D/g, '');
	break;
	case 'organization':
		form.org_phone=form.org_phone.replace(/\D/g, '');
		form.org_area=form.org_area.replace(/[\",\],\[]/g, '');
	break;
	default:
		console.log('default');
	}
	return form;
}