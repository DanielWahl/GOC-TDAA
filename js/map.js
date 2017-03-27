function updateAll() {
	initStreetView();
	getDataBus();
	getDataAir();
}

function geoFindMe() {

	info.innerHTML = "It may take some time";

	if (!navigator.geolocation) {
		info.innerHTML = "<p>Geolocation gëtt ned vun äerem Browser ennerstezt!</p>";
		return;
	}


	function success(position) {
		latitude  = position.coords.latitude; //49.5708937;
		longitude = position.coords.longitude; //6.152702999999974;
		mainlat   = latitude;
		mainlng   = longitude;

		document.getElementById('latlng').value = latitude + "," + longitude;
		document.getElementById('submit').click();


		resetMap();
		resetStreetView();

	}

	function error() {
		switch(error.code) {
        //alert('example alert - enable GPS');

        case error.PERMISSION_DENIED:
            info.innerHTML = '<p>Dier hudd Geolocalisation ausgeschalt.</p>';
            break;
        case error.POSITION_UNAVAILABLE:
            info.innerHTML = '<p>Et gin keng Informationen zu ärer Localisation.</p>';
            break;
        case error.TIMEOUT:
            info.innerHTML = '<p>Time out! Äer Localisation huet ze laang gedauert!</p>';
            break;
        case error.UNKNOWN_ERROR:
            info.innerHTML = '<p>En onbekannten Fehler ass opgetrueden!</p>';
            break;
        default:
            info.innerHTML = '<p>En onbekannten Fehler ass opgetrueden!</p>';   
        }
	}


	navigator.geolocation.getCurrentPosition(success, error);
	document.getElementById('latlng').value = latitude + "," + longitude;

}

function initMap() {
	geoFindMe();
}


function resetMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: {lat: mainlat, lng: mainlng}
	});
	var geocoder 	= new google.maps.Geocoder();
	var infowindow 	= new google.maps.InfoWindow();
	geocodeLatLng(geocoder, map, infowindow);

	updateAll();
}


function geocodeLatLng(geocoder, map, infowindow) {
	var input = document.getElementById('latlng').value;
	var latlngStr = input.split(',', 2);
	var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

	geocoder.geocode({'location': latlng}, function (results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				map.setZoom(15);
				var marker = new google.maps.Marker({
					position: latlng,
					map: map
				});
				infowindow.setContent(results[1].formatted_address);
				address = results[0].address_components[2].long_name + "";
				infowindow.open(map, marker);
			} else
				window.alert('No results found');
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}



function initStreetView() {

	mapSV = new google.maps.StreetViewPanorama(
		document.getElementById('streetview'),
		{
			position: {lat: mainlat, lng: mainlng},
			pov: {heading: 165, pitch: 0},
			zoom: 1
		});
}

function resetStreetView() {
	var lat = mainlat;
	var lng = mainlng;
	mapSV = new google.maps.StreetViewPanorama(
		document.getElementById('streetview'),
		{
			position: {lat: lat, lng: lng},
			pov: {heading: 165, pitch: 0},
			zoom: 15
		});
	updateAll();
}



function setMarkers() {

	for (var i = 0; i < busData.length; i++) {
		var obj = busData[i];
		var bus = {lat: obj.Lat, lng: obj.Lon};
		var busses = "";

		for (var j = 0; j < busData[i].Busses.length; j++) {
			busses += (busses == "" ? "" : ", ") + busData[i].Busses[j];
		}
		//console.log(busses);

		var infowindow = new google.maps.InfoWindow({
			content: ''
		});


        var marker = new google.maps.Marker({
            position: bus,
            label: 'B',
            map: map,
            title: 'Busarrêt - ' + busData[i].Name
        });

        var markerSV = new google.maps.Marker({
            position: bus,
            label: 'B',
            map: mapSV,
            title: 'Busarrêt - ' + busData[i].Name
        });
//              marker.addListener('click', function() {
//                infowindow.open(map, marker);
//              });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent('<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading">' + busData[i].Name + '</h1>' +
                    '<div id="bodyContent">' +
                    '<p>Buslinnen op desem Arrêt: ' + bussesToString(busData[i].Busses) +
                    '</p>' +
                    '<p>Distance: ' + Math.round(busData[i].Distance) + "m" +
                    '</p>' +
                    '</div>' +
                    '</div>');
                infowindow.open(map, marker);
            }
        })(marker, i));

        google.maps.event.addListener(markerSV, 'click', (function (markerSV, i) {
            return function () {
                infowindow.setContent('<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading">' + busData[i].Name + '</h1>' +
                    '<div id="bodyContent">' +
                    '<p>Buslinnen op desem Arrêt: ' + bussesToString(busData[i].Busses) +
                    '</p>' +
                    '<p>Distance: ' + Math.round(busData[i].Distance) + "m" +
                    '</p>' +
                    '</div>' +
                    '</div>');
                infowindow.open(map, markerSV);
            }
        })(markerSV, i));

		var styles = [{
			"featureType": "transit.station.bus",
			"stylers": [{"visibility": "off"}]
		}];

		map.setOptions({styles: styles});
	}

	getParkings();
}








