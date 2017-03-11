<?php

/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 11.03.2017
 * Time: 15:19
 */
class Location
{
    public $Name;
    public $var1;
    public $var2;
    public $var3;

    public function __construct($Name, $var1, $var2, $var3)
    {
        $this->Name = $Name;
        $this->var1 = $var1;
        $this->var2 = $var2;
        $this->var3 = $var3;

    }

}