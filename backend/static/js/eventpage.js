const geoLocatorOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

var map;
var coords;
var radius = 5000;
var latbox = document.getElementById('eventLatitude')
var lngbox = document.getElementById('eventLongitude')
var geocoder;



function initialize() {
	geocoder = new google.maps.Geocoder();
	getLatlng();
}



async function getLatlng() {
	var location = document.getElementById('address').innerHTML;
	console.log("location:" + location)
	var latlng;
	geocoder.geocode( { 'address': location}, function(results, status) {
		if (status == 'OK') {
			latlng = results[0].geometry.location;
			console.log("changing latlng to " + latlng);
			
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
			latlng = {lat: 0, lng: 0};
		}
		loadMap(latlng)
	});
}

async function loadMap(coords) {
	

	console.log(coords)

	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11.5,
		center: coords,
		mapId: "2c6039eb9c169d8d"
    });

    // const eventCoords = {lat: parseFloat(latbox.value), lng: parseFloat(lngbox.value)}
    const eventMarker = new google.maps.Marker({
        position: coords,
        map: map,
    })

}




