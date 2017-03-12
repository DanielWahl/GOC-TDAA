<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 01:34
 */

if(isset($_POST["setCookieCookie"])) {
    setcookie("Save_Cookie", "Deng_Mamm_An_Den_Daniel_Sein_Poul", time() + (86400 * 30), "/", "goc.whale-cms.de", true);
    
    echo 1;
    exit;
}

echo 0;

?>