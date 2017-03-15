var info 		= document.getElementById("info");
var airinfo 	= document.getElementById("airinfo");
var parkinfo 	= document.getElementById("parkinfo");
var latitude;
var longitude;
var address;
var mainlat;
var mainlng;
var map;
var busData;
var mapSV;
var arBusses = [];
var airData;


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
		info.innerHTML = "Unable to retrieve your location";
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



function getDataBus() {

	var xml = new XMLHttpRequest();
	xml.open("POST", "api/getBusstopsAndBusses.php");
	xml.addEventListener("load", function (e) {
		//console.log(e.target.response);
		//info.innerHTML = e.target.response;
		//console.log(jQuery.type(e.target.response));
		//console.log(JSON.parse(e.target.response));
		busData = JSON.parse(e.target.response);
		getNrOfBusses();
		setMarkers();

	});
	var data = new FormData();
	data.append("lon", longitude);
	data.append("lat", latitude);
	xml.send(data);

}




function getNrOfBusses() {

	var arBussesTemp = [];

	for (var i = 0; i < busData.length; i++) {
		for (var j = 0; j < busData[i].Busses.length; j++)
			arBussesTemp.push(busData[i].Busses[j]);
	}


	for (var i = 0; i < arBussesTemp.length; i++) {
		if (!isAlreadyExist(arBussesTemp[i]))
			arBusses.push(arBussesTemp[i]);
	}

	info.innerHTML = "Et sin <u>" + arBusses.length + "</u> Buslinnen am Ëmkrees vun 500m.";
}

function isAlreadyExist(bus) {
	for (var i = 0; i < arBusses.length; i++) {
		if (arBusses[i] == bus)
			return true;
	}
	return false;
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


function getParkings() {
        let xml = new XMLHttpRequest();

        xml.open("POST", "api/getNearCarParks.php");
        xml.addEventListener("load", function(e) {

            
        	let parkings = JSON.parse(e.target.response);
        	parkinfo.innerHTML = "";
        	for(let p = 0; p < parkings.length; p++) {

				var infowindow = new google.maps.InfoWindow({
					content: ''
				});


				var marker = new google.maps.Marker({
					position: {lat: parkings[p].Lon, lng: parkings[p].Lat},
					label: 'P',
					map: map,
					title: 'Parking - ' + parkings[p].Name
				});

				google.maps.event.addListener(marker, 'click', (function (marker, p) {
					return function () {
						infowindow.setContent('<div id="content">' +
							'<div id="siteNotice">' +
							'</div>' +
							'<h1 id="firstHeading" class="firstHeading">' + parkings[p].Name + '</h1>' +
							'<div id="bodyContent">' +
							'<p>Et sin  ' + parkings[p].FreeParkings + ' vun ' + parkings[p].TotalParkings + ' Parkingen frei!' +
							'</p>' +
								'<p>Distance: ' + Math.round(parkings[p].Distance) + "m" +
								'</p>' +
							'</div>' +
							'</div>');
						infowindow.open(map, marker);
					}
				})(marker, p));

                parkinfo.innerHTML += parkings[p].Name+ "; ";
			}
			if(parkings.length > 0){
				parkinfo.innerHTML = "Folgend Parkingen sin am Ëmkrees vun 1km: " + parkinfo.innerHTML;
			}

		});
        let data = new FormData();
        data.append("lon", latitude);
        data.append("lat", longitude);

        xml.send(data);

}
function bussesToString(busses) {
	let string = "";
	busses.sort();

	for (let i = 0; i < busses.length; i++) {

		string += (string == "" ? "" : ", ") + busses[i];

	}
	return string;
}



function getDataAir() {
	var xml = new XMLHttpRequest();
	xml.open("POST", "api/getNearestAirStation.php");
	xml.addEventListener("load", function (e) {
		airData = JSON.parse(e.target.response);

		arValues = [airData.pm10, airData.no2, airData.o3, airData.so2, airData.co];

		var indexperc = 1;
        var count = 0;

		//  (1-((airData.pm10-25)/(75-25))) * (1-((airData.no20-20)/(70-20))) * (1-((airData.o3-40)/(180-40))) * (1-(airData.so2/60)) * (1-(airData.co/200));
        
		if(airData.pm10!=undefined){
			indexperc += (1-((airData.pm10)/(50)));
            count++;
		}
        if(airData.no2!=undefined){
			indexperc += (1-((airData.no2-20)/(70-20)));
            count++;
		}
        if(airData.o3!=undefined){
			indexperc += (1-((airData.o3-40)/(180-40)));
            count++;
		}
        if(airData.so2!=undefined){
			indexperc += (1-(airData.so2/60));
            count++;
		}
        if(airData.co!=undefined){
			indexperc += (1-(airData.co/100));
            count++;
		}

		var index   = (indexperc 	!= 1	? "Den Loftqualitéits-index ass: " + Math.round((100-((indexperc/count)*10))) + "%<br>"          :"error");

		var pm10 	= (airData.pm10	!= null ? "Den PM10 Gehalt ass: " 	+ airData.pm10 	+ " µg/m^3<br>" : "");
		var no2 	= (airData.no2 	!= null ? "Den NO2 Gehalt ass: " 	+ airData.no2 	+ " µg/m^3<br>" : "");
		var o3 		= (airData.o3 	!= null ? "Den O2 Gehalt ass: " 	+ airData.o3 	+ " µg/m^3<br>" : "");
		var so2 	= (airData.so2 	!= null ? "Den SO2 Gehalt ass: " 	+ airData.so2 	+ " µg/m^3<br>" : "");
		var co 		= (airData.co 	!= null ? "Den CO Gehalt ass: " 	+ airData.co 	+ " mg/m^3<br>" : "");


		airinfo.innerHTML = index + pm10 + no2 + o3 + so2 + co;

	});
	var data = new FormData();
	data.append("lon", longitude);
	data.append("lat", latitude);
	xml.send(data);
}