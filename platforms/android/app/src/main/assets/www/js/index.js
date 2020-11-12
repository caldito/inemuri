document.addEventListener('deviceready', onDeviceReady);

function onDeviceReady(){
	console.log(navigator.vibrate);
	console.log(navigator.geolocation);


	const watchId = navigator.geolocation.watchPosition(geolocationSuccess,geolocationError);
	const map = L.map('the_map');
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			maxZoom: 18
	}).addTo(map);
}

function geolocationSuccess(position){
	console.log(position);
}

function geolocationError(err){
	console.log(err);
}
