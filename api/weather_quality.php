<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 02:01
 */
DEFINE("BASEDIR", dirname(__FILE__));
require_once(BASEDIR . "/../Utils/objects/WeatherStation.php");

$response = file_get_contents("https://api.tfl.lu/v1/Weather/Airquality");

$array = json_decode($response)->features;

//var_dump($array[0]);
//exit;

$latitude = 49.6001358;
$longitude = 6.113006899999999;

$positions = [];
$nearest = null;
for($i = 0; $i < count($array); $i++) {

    $lat = $array[$i]->geometry->coordinates[1];
    $lng = $array[$i]->geometry->coordinates[0];

    $distance = sqrt(abs(pow(($lat-$latitude),2)+pow($lng-$longitude,2)));

    if($nearest != null) {
        if($nearest->Distance > $distance ) $nearest = new WeatherStation($lat, $lng, $distance, $array[$i]->properties->name, $array[$i]->properties->temp,$array[$i]->properties->pm10, $array[$i]->properties->no2, $array[$i]->properties->o3, $array[$i]->properties->so2, $array[$i]->properties->co);
    } else {
        $nearest = new WeatherStation($lat, $lng, $distance, $array[$i]->properties->name, $array[$i]->properties->temp,$array[$i]->properties->pm10, $array[$i]->properties->no2, $array[$i]->properties->o3, $array[$i]->properties->so2, $array[$i]->properties->co);
    }
    //$positions[] = new AirStation($lat, $lng, $distance, $array[$i]->properties->name);
}

//$test1 = sqrt(abs(pow(($lat-$latitude),2)+pow($lng-$longitude,2)));

//echo $test1;

//echo print_r($nearest);

echo json_encode($nearest);