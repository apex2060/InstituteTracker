function showAddress(addressField) {
	var geocoder = new GClientGeocoder();
	if(addressField){
		address=document.getElementById(addressField).value;
		var splitAddress = address.split(" ");
		document.getElementById('streetNum').value = splitAddress[0];
	}else{
		address=document.getElementById('streetNum').value+' '+document.getElementById('street').value+', '+document.getElementById('city').value+', '+document.getElementById('state').value;
	}
	geocoder.getLatLng(address,
		function(point) {
			if (!point) {
				if(address){
					notice("Address: "+address+" not found.");
				}
			}else {
				var map = new GMap2(document.getElementById("map_canvas"));
				document.getElementById('locLatLng').value=point.x+', '+point.y;
				map.setCenter(point, 16);
				map.setUIToDefault();
				var marker = new GMarker(point, {draggable: true});        
				map.addOverlay(marker);
				GEvent.addListener(marker, "dragend", function() {
					updateCoord(marker.getLatLng());
					marker.closeInfoWindow();
				});
				marker.openInfoWindow("Click and drag marker to better represent the institute&rsquo;s location.");
				updateCoord(marker.getLatLng());
				notice("");
			}
		}
	);
}

function findLoc(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showMap);
	}
}

function showMap(position){
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	updateCoord(lat+', '+lng);
	initialize(lat, lng);
	put('', '', 'http://ws.geonames.org/findNearestAddressJSON?lat='+lat+'&lng='+lng);
}

function updateCoord(latLng){
	if(latLng.x){
		var lng=Math.round(latLng.x * 100000) / 100000;
		var lat=Math.round(latLng.y * 100000) / 100000;
		document.getElementById('locLatLng').value=lat+', '+lng;
		put('', '', 'http://ws.geonames.org/findNearestAddressJSON?lat='+latLng.y+'&lng='+latLng.x);
	}else{
		document.getElementById('locLatLng').value=latLng;
	}
}

function initialize(lat, lng) {
	if (GBrowserIsCompatible()) {
		var map = new GMap2(document.getElementById("map_canvas"));
		map.setCenter(new GLatLng(lat, lng), 16);
		map.setUIToDefault();
		var marker = new GMarker(new GLatLng(lat, lng), {draggable: true});        
		map.addOverlay(marker);
		GEvent.addListener(marker, "dragend", function() {
			updateCoord(marker.getLatLng());
			marker.closeInfoWindow();
		});
		marker.openInfoWindow("Click and drag marker to better represent your location.");
		updateCoord(marker.getLatLng());
	}
}

function placeAddress(a){
	document.getElementById('street').value=a.address.street;
	document.getElementById('city').value=a.address.placename;
	document.getElementById('state').value=a.address.adminCode1;
	document.getElementById('zip').value=a.address.postalcode;
}



function parseContact(str){
	var lines 	= str.split("\n");
	var contact = [];

	for(var i=0; i<lines.length; i++){
		contact[checkType(lines[i])]=lines[i];
	}
	return contact;
}

function checkType(str){
	var numbers=str.replace(/\D/g, '');
	var words=str.replace(/\W/g, '');
	if(numbers.length==9){
		return 'address_zip'
	}else if(numbers.length==7 || numbers.length==10 || numbers.length==11){
		return 'phone';
	}else if(str.indexOf("@") !== -1){
		return 'email';
	}else if(numbers.length>0){
		return 'address_street';
	}else{
		return 'unknown';
	}
}