var info = document.getElementById("info");
var latitude;
var longitude;
var address;
var mainlat;
var mainlng;
      

    function updateAll(){
        initStreetView();
       
        getNrOfBusses();
    }
      
      function geoFindMe() {
        
                info.innerHTML = "It may take some time";
                
                if (!navigator.geolocation){
                  info.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                  return;
                }
                
                
              
                function success(position) {
                  latitude  =  position.coords.latitude; //49.5708937;
                  longitude = position.coords.longitude; //6.152702999999974;
                  mainlat   = latitude;
                  mainlng   = longitude;
                  
                  //output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
                  document.getElementById('latlng').value = latitude+","+longitude;
                  document.getElementById('submit').click();
                  
                  resetMap();
                  resetStreetView();
                  //info.innerHTML = adress+"";
                }
              
                function error() {
                  info.innerHTML = "Unable to retrieve your location";
                }
              
                
              
                navigator.geolocation.getCurrentPosition(success, error);
                document.getElementById('latlng').value = latitude+","+longitude;
            
      }

      function initMap() {
          geoFindMe();
          var lat = mainlat;
          var lng = mainlng;
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: {lat: lat, lng: lng}
          });
          var geocoder   = new google.maps.Geocoder();
          var infowindow = new google.maps.InfoWindow();
        
          document.getElementById('submit').addEventListener('click', function() {
            geocodeLatLng(geocoder, map, infowindow);
          });
          updateAll();
      }
          
          
           
      function resetMap() {
        var lat = mainlat;
        var lng = mainlng
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: lat, lng: lng}
        });
        var geocoder   = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();
        geocodeLatLng(geocoder, map, infowindow);
          
      }
      
      
      
      

      function geocodeLatLng(geocoder, map, infowindow) {
        var input     = document.getElementById('latlng').value;
        var latlngStr = input.split(',', 2);
        var latlng    = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              map.setZoom(14);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[1].formatted_address);
              address = results[0].address_components[2].long_name+"";//.formatted_address.address_components[1].long_name;
                //address = results[0].address_components[1].long_name;
//                for(var i=0; i<results.length; i++){
//                    console.log("i: "+i);
//                    for(var j=0; j<results[i].address_components.length; j++){
//                        
//                        console.log("j:"+ j +" --> ");
//                        console.log(results[i].address_components[j]);
//                    }
//                    console.log("\n\n\n\n");
//                }
              info.innerHTML = address+"";
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
      
      
      
      
      var panorama;
      function initStreetView() {
        
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('streetview'),
            {
              position: {lat: 49.37, lng: 6.09},
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
      }
      
      function resetStreetView() {
        var lat = mainlat;
        var lng = mainlng;
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('streetview'),
            {
              position: {lat: lat, lng: lng},
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
      }


var busData;
    function getData() {
        
        var xml = new XMLHttpRequest();
        xml.open("POST", "../api/busstops.php");
        xml.addEventListener("load", function (e){
            //console.log(e.target.response);
            //info.innerHTML = e.target.response;
            //console.log(jQuery.type(e.target.response));
            console.log(JSON.parse(e.target.response));
            busData = JSON.parse(e.target.response);
            
        });
        var data = new FormData();
        data.append("lon", longitude);
        data.append("lat", latitude);
        xml.send(data);
        
    }

    function getNrOfBusses(){
        if(busData == null)
            getData()
        //console.log(busData);
        
        var counter;
        var arBusses = new Array(200);
            
        for(var i=0; i<busData.length; i++){
            for(var j=0; j<busData[i].Busses.length; j++){
                arBusses[(i+1)*j] = counterbusData[i].Busses[j];
            }
        }
            
            
        info.innerHTML = "Esouvill Busser fueren an engem Ëmfeld vun 500m: " + busData;
    }
