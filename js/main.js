window.fbAsyncInit = function() {
  FB.init({
    appId      : 'your_FB_app_ID', // FIXME
    channelUrl : '//developer.localhost:4567/index.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
 
  // Additional initialization code here
};
 (function(d){
   var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = '//connect.facebook.net/en_US/all.js';
   d.getElementsByTagName('head')[0].appendChild(js);
 }(document));



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
	//Login with Facebook
	FB.login(function(response) {
		if (response.authResponse) {
			var accessToken = response.authResponse.accessToken;

			FB.api('/me', function(response) {
				var user = new StackMob.User({ username: response.email });
				user.createUserWithFacebook(accessToken, {
					success: function(model) {
						console.debug(model);
					},
					error: function(model, response) {
						console.debug(model);
						console.debug(response);
					}
				});
			});
		} else {
			console.log('User canceled login or did not fully authorize.');
		}
	}, {scope: 'email'});
}

$('#login').click(function() {
	login();
});