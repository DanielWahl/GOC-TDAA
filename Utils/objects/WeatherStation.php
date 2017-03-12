<?php

/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 02:25
 */
class WeatherStation
{
    public $Lat;
    public $Lon;
    public $Distance;
    public $Name;
    public $temp;
    public $pm10;
    public $no2;
    public $o3;
    public $so2;
    public $co;

    public function __construct($lat, $lon, $distance, $name, $temp, $pm10,$no2,$o3,$so2,$co)
    {
        $this->Lat = $lat;
        $this->Lon = $lon;
        $this->Distance = $distance;
        $this->Name = $name;
        $this->temp = $temp;
        $this->pm10 = $pm10;
        $this->no2 = $no2;
        $this->o3 = $o3;
        $this->so2 = $so2;
        $this->co = $co;

    }
}