document.addEventListener('deviceready', onDeviceReady);

// Global Variables 
let marker;
let distance;
let positionCircle;
let map; // this is defined as let instead of const to have it as global and initialize the variable on the onDeviceReady function


function onDeviceReady(){
	// create map
	map = L.map('the_map').setView([51.505, -0.09], 13);
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(map);

	// Check location
	const watchId = navigator.geolocation.watchPosition(geolocationSuccess,geolocationError);
	//setTimeout (function run(){
	//	navigator.geolocation.watchPosition(geolocationSuccess,geolocationError),
	//	setTimeout(run,5000);
	//},100)

	// Add destination marker on click
	map.on('click', function(e){
		if (marker != null){
			marker.remove();
		}
		marker = new L.marker(e.latlng).addTo(map);
		//console.log(getDistanceFromLatLon(marker._latlng.lat, marker._latlng.lng, 40.416951, -3.703483))
	  }
	);
}

// Auxiliary functions
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = (R * c)*1000; // Distance in meters
  return d;
}
  
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function geolocationSuccess(position){
	// Update position circle
	if (positionCircle != null){
		positionCircle.remove();
	}
	var positionObject =  L.latLng(position.coords.latitude, position.coords.longitude);
	positionCircle = L.circle(positionObject,10).addTo(map);

	//console.log(position);

	// Check if the marker is close to the user. In that case then vibrate.
	if (marker != null){
		distance = getDistanceFromLatLon(marker._latlng.lat, marker._latlng.lng, position.coords.latitude, position.coords.longitude);
		//console.log(distance);
		if (distance < 100){
			console.log("Wake up!");
			console.log(navigator.vibrate([1500, 1000, 1500]));
		}
	}
}

function geolocationError(err){
	console.log(err);
}
