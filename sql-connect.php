<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 11.03.2017
 * Time: 14:33
 */

$con = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);

if(mysqli_connect_errno()) {

    echo "Failed to connect...";
    echo mysqli_error($con);
    exit;

}