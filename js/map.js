var info    = document.getElementById("info");
var airinfo = document.getElementById("airinfo");
var latitude;
var longitude;
var address;
var mainlat;
var mainlng;
var map;
      

    function updateAll() {
        initStreetView();
       
        getDataBus();
        getDataAir();
    }
      
      function geoFindMe() {
        
                info.innerHTML = "It may take some time";
                
                if (!navigator.geolocation){
                  info.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                  return;
                }
                
                
              
                function success(position) {
                  latitude  = position.coords.latitude; //49.5708937;
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
      }
          
          
           
      function resetMap() {
        //var lat = mainlat;
        //var lng = mainlng;
          
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: mainlat, lng: mainlng}
        });
        var geocoder   = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();
        //document.getElementById('submit').addEventListener('click', function() {
            geocodeLatLng(geocoder, map, infowindow);
          //});
        updateAll();
      }
      
      
      
      

      function geocodeLatLng(geocoder, map, infowindow) {
        var input     = document.getElementById('latlng').value;
        var latlngStr = input.split(',', 2);
        var latlng    = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              map.setZoom(15);
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
//                       console.log(results[i].address_components[j]);
//                    }
//                    console.log("\n\n\n\n");
//                }
              //info.innerHTML = address+"";
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
              position: {lat: mainlat, lng: mainlng},
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
              zoom: 15
            });
          updateAll();
      }


var busData;
    function getDataBus() {
        
        var xml = new XMLHttpRequest();
        xml.open("POST", "api/busstops.php");
        xml.addEventListener("load", function (e){
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


    var arBusses = [];

    function getNrOfBusses(){
        
        var arBussesTemp = [];
            
        for(var i=0; i<busData.length; i++){
            for(var j=0; j<busData[i].Busses.length; j++)
                arBussesTemp.push(busData[i].Busses[j]);
        }
        
        
        for(var i=0; i<arBussesTemp.length; i++){
            if(!isAlreadyExist(arBussesTemp[i]))
                arBusses.push(arBussesTemp[i]);
        }
            
        info.innerHTML = "Ed sin <u>" + arBusses.length + "</u> Buslinnen an engem Radius vun 500m.";
    }

    function isAlreadyExist(bus){
        for(var i=0; i<arBusses.length; i++){
            if(arBusses[i] == bus)
                return true;
        }
        return false;
    }




    function setMarkers() {
          
        /*var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {lat: mainlat, lng: mainlng}
        });*/

          for(var i=0; i<busData.length; i++){
              var obj    = busData[i];
              var bus    = {lat: obj.Lat, lng: obj.Lon};
              var busses = "";
              
              for(var j=0; j<busData[i].Busses.length; j++){
                  busses += (busses=="" ? "" : ", ") + busData[i].Busses[j];
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
//              marker.addListener('click', function() {
//                infowindow.open(map, marker);
//              });
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                      infowindow.setContent('<div id="content">'+
                              '<div id="siteNotice">'+
                              '</div>'+
                              '<h1 id="firstHeading" class="firstHeading">'+busData[i].Name+'</h1>'+
                              '<div id="bodyContent">'+
                              '<p>Buslinnen op desem Arrêt: '+ bussesToString(busData[i].Busses) +
                              '</p>'+
                              '</div>'+
                              '</div>');
                      infowindow.open(map, marker);
                    }
                  })(marker, i));
          }
        
        
        }


    function bussesToString (busses) {
        let string = "";
        for(let i = 0; i < busses.length; i++) {
            
            string += (string=="" ? "" : ", ") + busses[i];
            
        }
        return string;
    }


var airData;
    function getDataAir() {
        var xml = new XMLHttpRequest();
        xml.open("POST", "api/weather_quality.php");
        xml.addEventListener("load", function (e){
            //console.log(e.target.response);
            //info.innerHTML = e.target.response;
            //console.log(jQuery.type(e.target.response));
            //console.log(JSON.parse(e.target.response));
            airData = JSON.parse(e.target.response);
            
            arValues = [airData.pm10, airData.no2, airData.o3, airData.so2, airData.co];
            var index = 0;

            var pm10    = (airData.pm10!=null   ? "Den PM10 Gehalt ass: "   + airData.pm10  + " µg/m^3<br>"   :"");
            var no2     = (airData.no2!=null    ? "Den NO2 Gehalt ass: "    + airData.no2   + " µg/m^3<br>"   :"");
            var o3      = (airData.o3!=null     ? "Den O2 Gehalt ass: "     + airData.o3    + " µg/m^3<br>"   :"");
            var so2     = (airData.so2!=null    ? "Den SO2 Gehalt ass: "    + airData.so2   + " µg/m^3<br>"   :"");
            var co      = (airData.co!=null     ? "Den CO Gehalt ass: "     + airData.co    + " mg/m^3<br>"   :"");


            document.getElementById("airinfo").innerHTML = pm10 + no2 + o3 + so2 + co;
            
        });
        var data = new FormData();
        data.append("lon", longitude);
        data.append("lat", latitude);
        xml.send(data);
    }