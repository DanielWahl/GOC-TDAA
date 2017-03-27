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



function bussesToString(busses) {
    var string = "";
    busses.sort();

    for (var i = 0; i < busses.length; i++) {

        string += (string == "" ? "" : ", ") + busses[i];

    }
    return string;
}