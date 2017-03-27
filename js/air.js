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

        var index   = (indexperc 	!= 1	? "Den Loftqualitéits-index ass: " + round((100-((indexperc/count)*10)),0.1) + "%<br>"          :"error");

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