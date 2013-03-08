function updateCoord(latLng){
	console.log(latLng);
}

function initialize_map(lat, lng) {
	var map = new GMap2(document.getElementById("map_canvas"));
	map.setCenter(new GLatLng(lat, lng), 16);
	map.setUIToDefault();
	var marker = new GMarker(new GLatLng(lat, lng), {draggable: true});        
	map.addOverlay(marker);
	GEvent.addListener(marker, "dragend", function() {
		updateCoord(marker.getLatLng());
		marker.closeInfoWindow();
	});
	marker.openInfoWindow("Drag this to the actual location.");
	updateCoord(marker.getLatLng());
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
	var nospace=words.replace(/\s/g, '');
	if(numbers.length==9 || numbers.length==5){
		return 'address_zip'
	}else if(numbers.length==7 || numbers.length==10 || numbers.length==11){
		return 'phone';
	}else if(str.indexOf("@") !== -1){
		return 'email';
	}else if(numbers.length>0){
		return 'address_street';
	}else if(nospace.length>0){
		return 'other';
	}
}