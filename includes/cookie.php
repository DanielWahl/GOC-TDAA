<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 01:32
 */

if (!isset($_COOKIE["Deng_Mamm_An_Den_Daniel_Sein_Poul"])) {
?>
<!--
<div id="cookie_alert">
    <span onclick="clickCookieAlert()" class="closeButton" style="margin-left: 90%; margin-top: 10px; font-size: 45px; cursor: pointer; position: relative;">&times;</span>
    <div style="width:80%; margin: 0 auto;">
        <p>
            Wir verwenden Cookies, um Inhalte zu personalisieren. Wenn du auf unsere Webseite klickst oder hier navigierst, stimmst du der Erfassung von Informationen durch Cookies auf und außerhalb von Facebook zu. Weitere Informationen zu unseren Cookies und dazu, wie du die Kontrolle darüber behältst, findest du hier: <a href="impressum.php">Cookie-Richtlinie</a>.
        </p>
    </div>
</div>-->

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