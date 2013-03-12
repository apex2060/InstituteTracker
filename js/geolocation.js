var maps={
	scriptLoaded: 	false,
	scriptLoading: 	false,
	pendingMaps: 	[],
	openMaps: 		[],
	marker: 		[]
};

maps.init = function(mapCanvasId, lat, lng){
	var mapData={};
	mapData.canvasId=mapCanvasId;
	mapData.lat=lat;
	mapData.lng=lng;

	if(this.scriptLoaded){
		this.newMap(mapData);
	}else{
		this.getScript();
		this.pendingMaps.push(mapData);
	}
}

maps.getScript = function(){
	if(!this.scriptLoaded){
		if(!this.scriptLoading){
			this.scriptLoading=true;
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAw0i5KC7opeWmEF4jE6oYWu0UxjTOINj4&sensor=false&callback=maps.setScriptLoaded";
			document.body.appendChild(script);
		}
	}
}

maps.setScriptLoaded = function(){
	this.scriptLoaded	= true;
	this.scriptLoading	= false;
	this.geocoder 		= new google.maps.Geocoder();
	for(var i=0; i<this.pendingMaps.length; i++){
		this.newMap(this.pendingMaps[i]);
	}
}

maps.newMap = function(mapData){
	if(mapData.canvasId!=undefined){
		var mapOptions = {
			center: new google.maps.LatLng(mapData.lat,mapData.lng),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.openMaps[mapData.canvasId] = new google.maps.Map(document.getElementById(mapData.canvasId), mapOptions);
	}
}

maps.setFromAddress = function(canvasId, address, dragable){
	if(dragable==undefined)
		var dragable=false;

	this.geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var geo = results[0].geometry.location;

			mapData={};
			mapData.canvasId=canvasId;
			mapData.lat=geo.ib;
			mapData.lng=geo.jb;

			var myLatLng = new google.maps.LatLng(mapData.lat, mapData.lng);
			maps.openMaps[canvasId].setCenter(myLatLng);
			if(maps.marker[canvasId]==undefined)
				maps.marker[canvasId] = [];
			maps.marker[canvasId].push(
				new google.maps.Marker({
					map: maps.openMaps[canvasId], 
					position: geo
				})
			);

			// maps.marker[canvasId][maps.marker[canvasId].length-1].setDraggable (true);
			// google.maps.event.addListener(maps.marker[canvasId][maps.marker[canvasId].length-1], "dragend", function(event){
			// 	maps.markerMove(event, canvasId, maps.marker[canvasId].length-1);
			// });
		}
	});
}

maps.markerMove = function(event, canvasId, markerId){
	console.log(event);
	console.log(canvasId);
	console.log(markerId);
	//it.point = it.marker.getPosition();
	//it.map.panTo(it.point);
	//console.log(it.point);
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