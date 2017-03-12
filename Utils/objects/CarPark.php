<?php

/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 09:55
 */
class CarPark
{
    public $Lat;
    public $Lon;
    public $Distance;
    public $Name;
    public $TotalParkings;
    public $FreeParkings;
    public $Disabled;
    public $Woman;

    public function __construct($lat, $lon, $distance, $name, $totalParking, $freeParking, $disabled, $woman)
    {
        $this->Lat = $lat;
        $this->Lon = $lon;
        $this->Distance = $distance;
        $this->Name = $name;
        $this->TotalParkings = $totalParking;
        $this->FreeParkings = $freeParking;
        $this->Disabled = $disabled;
        $this->Woman = $woman;

    }


}