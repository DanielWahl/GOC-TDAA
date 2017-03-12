<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 11.03.2017
 * Time: 21:19
 */
DEFINE("BASEDIR", dirname(__FILE__));

DEFINE("DISTANCE", 500);
DEFINE("BUSSTOP_SOURCE", "https://api.tfl.lu/v1/StopPoint/around/{lon}/{lat}/{radius}");
DEFINE("BUS_SOURCE", "https://api.tfl.lu/v1/Line/Mode/bus/Route");
require_once (BASEDIR . "/../Utils/objects/BusStop.php");


if(!isset($_POST["lat"]) && !isset($_POST["lon"])) {
    echo 1;
    exit;
}

$latitude = $_POST["lat"];
$longitude = $_POST["lon"];



/*$latitude = 49.6001358;
$longitude = 6.113006899999999;*/
$busstop_source = BUSSTOP_SOURCE;
$busstop_source = str_replace("{lon}",$longitude, $busstop_source);
$busstop_source = str_replace("{lat}",$latitude, $busstop_source);
$busstop_source = str_replace("{radius}",DISTANCE, $busstop_source);
$busstopsResponse = json_decode(file_get_contents($busstop_source))->features;

//$busstopsResponse["features"];

//var_dump($busstopsResponse);

if(count($busstopsResponse) <= 0) {
    echo 2;
    exit;
}

$busstops = [];

for($i = 0; $i < count($busstopsResponse);$i++) {

    $busstops[] = new BusStop($busstopsResponse[$i]->geometry->coordinates[1],$busstopsResponse[$i]->geometry->coordinates[0],$busstopsResponse[$i]->properties->distance,$busstopsResponse[$i]->properties->name,$busstopsResponse[$i]->properties->id);

}

$busResponse = json_decode(file_get_contents(BUS_SOURCE));


for($i = 0; $i < count($busstops);$i++) {
    $busStopId = $busstops[$i]->ID;
    
    for($j = 0; $j < count($busResponse); $j++) {

        $busstopsByBus = $busResponse[$j]->stopPoints;

        for($k = 0; $k < count($busstopsByBus);$k++) {

            if($busStopId == $busstopsByBus[$k]){
                $busstops[$i]->Busses[] = explode(":", $busResponse[$j]->id)[2];
            }

        }

    }
    
}

echo json_encode($busstops);