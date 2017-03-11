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

    if ($stmt = mysqli_prepare($con,"SELECT COMMUNE_NOM, POPULATION, COMMUNE_LOYER_APPART_mq, COMMUNE_LOYER_MAISON_mq FROM goc.tblValues WHERE COMMUNE_NOM LIKE ?")) {
        mysqli_stmt_bind_param($stmt, "s", $loc);

        mysqli_stmt_execute($stmt);

        if(mysqli_stmt_errno($stmt)){

            echo mysqli_stmt_error($stmt);
            return null;

        }

        mysqli_stmt_bind_result($stmt, $name, $population, $loyerAppartParMQ, $loyerMaisonParMQ);

        /*while(mysqli_stmt_fetch($stmt)) {

        }*/

        mysqli_stmt_fetch($stmt);
        mysqli_stmt_store_result($stmt);
        /*if(mysqli_stmt_num_rows($stmt) <= 0){
            echo "NIX DA";
            return null;
        }*/
        //return $population;
        return new Location($name, $population, $loyerAppartParMQ, $loyerMaisonParMQ);
    }

    if(mysqli_errno($con)){
        echo mysqli_error($con);
    }
    return null;
}

if(isset($_POST["commun"]) || is_null($_POST["commun"])) {
    echo 0;
    exit;
}
//var_dump(getValuesByLocation("Colmar-Berg"));
//echo "<pre>" . print_r(getValuesByLocation("Colmar-Berg")) . "</pre>";
echo json_encode(getValuesByLocation($_POST["commun"]));
?>