const geoLocatorOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

var map;
var coords;
var radius = 5000;
var circle;
var marker;
var markersArray = [];
var geocoder;

var latbox = document.getElementById('eventLatitudeInput')
var lngbox = document.getElementById('eventLongitudeInput')
var addressbox = document.getElementById('floatingAddressInput')
var eventLocation;


function initialize() {
	geocoder = new google.maps.Geocoder();
	initMap();
}


function geoLocatorSuccess(pos) {
	const crd = pos.coords;

	console.log('Your current position is:');
	console.log(`Latitude : ${crd.latitude}`);
	console.log(`Longitude: ${crd.longitude}`);
	console.log(`More or less ${crd.accuracy} meters.`);

	var coords = {lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)}
	
    latbox.value = coords.lat
    lngbox.value = coords.lng

	loadMap(coords)
    loadCircle(coords, radius)
}

function geoLocatorError(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

function initMap() {
	
	// uncomment after testing
	//navigator.geolocation.getCurrentPosition(geoLocatorSuccess, geoLocatorError, geoLocatorOptions);
	geoLocatorSuccess({coords: {latitude: 48.1645086, longitude: 17.0781901, accuracy: 69}})
}

async function loadMap(coords) {
	console.log(coords)

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11.5,
		center: coords,
		mapId: "2c6039eb9c169d8d"
    });
    
	createMarker(coords);
	
}

function createMarker(coords) {
	marker = new google.maps.Marker({
		position: coords,
		map: map,
		draggable: true,
    });

	marker.addListener("dragend", ({ domEvent, latLng }) => {
        const { target } = domEvent;
  
        console.log("new lat:" + String(latLng.lat()));
        console.log("new lng:" + String(latLng.lng()));

        latbox.value = latLng.lat();
        lngbox.value = latLng.lng();

		updateAddyFromMap({lat: latLng.lat(), lng: latLng.lng()});

    });

	markersArray.push(marker)
}


function loadCircle(center, radius) {
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

	console.log(circleOptions);
	circle = new google.maps.Circle(circleOptions);
}


function deleteMarkers() {
	for (var i = 0; i < markersArray.length; i++ ) {
		markersArray[i].setMap(null);
	}
	markersArray.length = 0;
	markersArray = [];
}


async function addychange() {
	// geocoder = new google.maps.Geocoder();
	var address = addressbox.value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == 'OK') {
			var latlng = results[0].geometry.location;
			map.setCenter(latlng);
			deleteMarkers();
			createMarker(latlng);
			updateAddyFromMap(latlng)
			latbox.value = parseFloat(latlng.lat);
        	lngbox.value = parseFloat(latlng.lng);
		} else {
		  	console.log('Geocode was not successful for the following reason: ' + status);
		}
	});

}



async function updateAddyFromMap(latlng) {
	console.log(latlng)
	geocoder.geocode({ location: latlng }, function(results, status) {
		if (status == 'OK') {
			addressbox.value = results[0].formatted_address;
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
	  }
	})
    
	// var querystring = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ',' + lng + 
}