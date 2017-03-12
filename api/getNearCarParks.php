<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 09:52
 */


DEFINE("BASEDIR", dirname(__FILE__));

DEFINE("DISTANCE", 1000);
DEFINE("CARPARK_SOURCE", "https://api.tfl.lu/v1/Occupancy/CarPark");

require_once (BASEDIR . "/../Utils/objects/CarPark.php");

$carpark_response = json_decode(file_get_contents(CARPARK_SOURCE))->features;

if(!isset($_POST["lat"]) && !isset($_POST["lon"])) {
    echo 1;
    exit;
}

$latitude = $_POST["lat"];
$longitude = $_POST["lon"];

//var_dump($carpark_response);

/*$longitude = 49.6001358;
$latitude = 6.113006899999999;*/
$nearCarParks = [];

for($i = 0; $i < count($carpark_response); $i++) {

    if(($distance = distance($latitude, $longitude, $carpark_response[$i]->geometry->coordinates[0],$carpark_response[$i]->geometry->coordinates[1])) < DISTANCE) {
        $nearCarParks[] = new CarPark($carpark_response[$i]->geometry->coordinates[0],$carpark_response[$i]->geometry->coordinates[1], $distance, $carpark_response[$i]->properties->name,$carpark_response[$i]->properties->total,$carpark_response[$i]->properties->free,$carpark_response[$i]->properties->reserved_for_disabled,$carpark_response[$i]->properties->reserved_for_woman);
        //echo $distance;
    }

}
echo json_encode($nearCarParks);






function distance($lat1, $lon1, $lat2, $lon2) {

    $theta = $lon1 - $lon2;
    $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
    $dist = acos($dist);
    $dist = rad2deg($dist);
    $miles = $dist * 60 * 1.1515;

    return ($miles * 1.609344)*1000;
}