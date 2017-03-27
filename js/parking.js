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