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
    public $Population;
    public $LoyerAppartParMQ;
    public $LoyerMaisonParMQ;

    public function __construct($Name, $population, $loyerAppartParMQ, $loyerMaisonParMQ)
    {
        $this->Name = $Name;
        $this->Population = $population;
        $this->LoyerAppartParMQ = $loyerAppartParMQ;
        $this->LoyerMaisonParMQ= $loyerMaisonParMQ;

    }

}

?>