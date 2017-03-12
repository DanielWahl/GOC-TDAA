<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 11.03.2017
 * Time: 23:10
 */


DEFINE("BUS_SOURCE", "https://api.tfl.lu/v1/Line/Mode/bus/Route");


$busResponse = json_decode(file_get_contents(BUS_SOURCE));

/*
var_dump($busResponse[0]);
var_dump($busResponse[0]->stopPoints);*/

$busStops = [];

for($i = 0; $i < count($busResponse); $i++) {

    $stopPoints = $busResponse[$i]->stopPoints;

    for($j = 0; $j < count($stopPoints); $j++) {

        $busStops[$stopPoints[$j]][] = explode(":", $busResponse[$i]->id)[2];

    }

}

echo "<pre>" . print_r($busStops) . "</pre>";