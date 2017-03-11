<?php

/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 11.03.2017
 * Time: 21:52
 */
class BusStop
{

    public $Lat;
    public $Lon;
    public $Distance;
    public $Name;
    public $ID;
    public $Busses = [];

    public function __construct($lat, $lon, $distance, $name, $id)
    {

        $this->Lat = $lat;
        $this->Lon = $lon;
        $this->Distance = $distance;
        $this->Name = $name;
        $this->ID = $id;

    }

}