const geoLocatorOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

var map;
var coords;
var radius = 5000;
var circle;
var infoWindow;

function geoLocatorSuccess(pos) {
	const crd = pos.coords;

	console.log('Your current position is:');
	console.log(`Latitude : ${crd.latitude}`);
	console.log(`Longitude: ${crd.longitude}`);
	console.log(`More or less ${crd.accuracy} meters.`);

	var coords = {lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)}
	
	loadMap(coords)
	// Create an info window to share between markers.
	infoWindow = new google.maps.InfoWindow()
    loadCircle(coords, radius)
	loadEvents(coords, radius)
}

function geoLocatorError(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

function initMap() {
	// let e = document.getElementById("radiusSelect");
	// radius = parseFloat(e.value);
	// uncomment after testing
	//navigator.geolocation.getCurrentPosition(geoLocatorSuccess, geoLocatorError, geoLocatorOptions);
	geoLocatorSuccess({coords: {latitude: 48.1645086, longitude: 17.0781901, accuracy: 69}})
}

async function loadMap(coords) {
	console.log(typeof coords.lat)
	console.log(coords)

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11.5,
		center: coords,
		mapId: "2c6039eb9c169d8d"
    });
    var marker = new google.maps.Marker({
		position: coords,
		map: map,
		icon: '/static/icons/blue_circle.png'
    });
	console.log(typeof map)

}


function loadCircle(center, radius) {
	// console.log(typeof map)
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

	console.log(circleOptions)
	circle = new google.maps.Circle(circleOptions);
}


function refreshCircle() {
	let e = document.getElementById("radiusSelect");
	radius = parseFloat(e.value);
	circle.setRadius(radius)
}


async function loadEvents(center, radius) {
	console.log("getting events")
	let queryURL = '/events/?center_lat=' + String(center.lat) + '&center_lng=' + String(center.lng) + '&radius=' + String(radius)
	const response = await fetch(queryURL);
	const respjson = await response.json(); //extract JSON from the http response
	const events = respjson['events']
	console.log(events)


	events.forEach(({ lat, lng, label }, i) => {
		console.log(lat, lng, label )
		position = {lat: lat, lng: lng}
		console.log(position)

		const pinView = new google.maps.marker.PinView({
			glyph: `${i + 1}`,
		});

		const marker = new google.maps.marker.AdvancedMarkerView({
			position,
			map,
			title: `${label}`,
			content: pinView.element,
		});
		
		// Add a click listener for each marker, and set up the info window.
		marker.addListener("click", ({ domEvent, latLng }) => {
			const { target } = domEvent;
	  
			infoWindow.close();
			infoWindow.setContent(marker.title);
			infoWindow.open(marker.map, marker);
		});
		
	});

}


