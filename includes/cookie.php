<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 01:32
 */

if (!isset($_COOKIE["Deng_Mamm_An_Den_Daniel_Sein_Poul"])) {
?>

<div id="cookie_alert">
    <span onclick="clickCookieAlert()" class="closeButton">&times;</span>
    <p>Diese Seite benutzt Cookies! Wenn du diese Seite weiterhin benutzt zählt das als ein Einverständnis zu den Cookie Richtlinien usw...</p>
</div>

<script>

    function clickCookieAlert(){
        let xml = new XMLHttpRequest();
        xml.open("POST", "includes/setCookie.php");
        xml.addEventListener("load", function(e) {
            if(e.target.response == "1"){
                document.getElementById("cookie_alert").style.display = "none";
            } else {
                console.log("Error by setting cookie cookie...");
            }
        });
        let data = new FormData();
        data.append("setCookieCookie", true);
        xml.send(data);
    }

</script>

<?php

}

?>