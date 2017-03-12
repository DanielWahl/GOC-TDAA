<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 01:34
 */

if(isset($_POST["setCookieCookie"])) {
    setcookie("Deng_Mamm_An_Den_Daniel_Sein_Poul", true);
    echo 1;
}

echo 0;