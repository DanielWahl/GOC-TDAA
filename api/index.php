<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 11.03.2017
 * Time: 14:31
 */
DEFINE("BASEDIR", dirname(__FILE__));
DEFINE("SQL_CONNECTION_FILE", BASEDIR . "/../sql-connect.php");

require_once(SQL_CONNECTION_FILE);
require_once(BASEDIR . "/../Utils/objects/Location.php");

function getValuesByLocation($loc) {
    GLOBAL $con;

    if ($stmt = mysqli_prepare($con,"SELECT Name, dtOne, dtTwo, dtTree FROM tblValues WHERE dtLocation LIKE ?")) {
        mysqli_stmt_bind_param($stmt, "s", $loc);

        mysqli_stmt_execute($stmt);

        mysqli_stmt_bind_result($stmt, $name, $one, $two, $tree);

        /*while(mysqli_stmt_fetch($stmt)) {

        }*/

        mysqli_stmt_fetch($stmt);

        return new Location($name, $one, $two, $tree);
    }

}