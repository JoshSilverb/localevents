const geoLocatorOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

var map;
var coords;
var radius = 5000;

function geoLocatorSuccess(pos) {
	const crd = pos.coords;

	console.log('Your current position is:');
	console.log(`Latitude : ${crd.latitude}`);
	console.log(`Longitude: ${crd.longitude}`);
	console.log(`More or less ${crd.accuracy} meters.`);

	console.log(typeof parseFloat(crd.latitude))
	var coords = {lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)}
	loadMap(coords)
    loadCircle(coords, radius)
}

function geoLocatorError(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
	// crd = {lat: -25.363, lng: 131.044}
}

function initMap() {
	let e = document.getElementById("radiusSelect");
	radius = parseFloat(e.value);
	// uncomment after testing
	//navigator.geolocation.getCurrentPosition(geoLocatorSuccess, geoLocatorError, geoLocatorOptions);
	geoLocatorSuccess({coords: {latitude: 48.1645086, longitude: 17.0781901, accuracy: 69}})
}

function loadMap(coords) {
	console.log(typeof coords.lat)
	console.log(coords)
	// let latlong = new google.maps.LatLng(coords.lat, coords.lng)

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11.5,
		center: coords
    });
    var marker = new google.maps.Marker({
		position: coords,
		map: map
    });
	console.log(typeof map)

}

function loadCircle(center, radius) {
	console.log(typeof map)
	let circleOptions = {
		draggable: false,
		editable: false,
		strokeColor: '#000000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.15,
		map: map,
		center: center,
		radius: radius
	};
	
	var circle = new google.maps.Circle(circleOptions);

}

function refreshCircle() {
	let e = document.getElementById("radiusSelect");
	radius = parseFloat(e.value);
	loadCircle(coords, radius)
}

// var map = new google.maps.Map(canvas, mapOptions);

// var circleOptions = {
// 	draggable: false,
// 	editable: true,
//    	strokeColor: '#eeeeee',
//    	strokeOpacity: 0.8,
// 	strokeWeight: 1,
//    	fillColor: '#FF0000',
//    	fillOpacity: 0.15,
//    	map: map,
//    	center: myLatlng,
//    	radius: 2000
// };
// var circle = new google.maps.Circle(circleOptions);

// google.maps.event.addListener(circle, 'center_changed', update);
// google.maps.event.addListener(circle, 'radius_changed', update);
	
// function update() {
// 	var debug = document.getElementById("debug");
// 	var d = Math.pow(10,5);
// 	debug.innerHTML = "lat: " + Math.round(circle.getCenter().lat()*d)/d + "<br>";
// 	debug.innerHTML += "lng: " + Math.round(circle.getCenter().lng()*d)/d + "<br>";
// 	debug.innerHTML += "radius: " + Math.round(circle.getRadius()) + " m<br>";
// }

// update();
