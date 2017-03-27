<?php
/**
 * Created by PhpStorm.
 * User: Alex Vesic
 * Date: 12.03.2017
 * Time: 01:32
 */

if (!isset($_COOKIE["GLS_COOKIE_SET"])) {
?>

<div id="cookie_alert_main">

    <div id="cookie_alert">
        <div id="cookie_alert_middle">
            <p>
                Wir verwenden Cookies, um Inhalte zu personalisieren.
                Wenn du auf unsere Webseite klickst oder hier navigierst, stimmst du der Erfassung von Informationen durch Cookies auf und außerhalb von unserer Webseite zu.
                Weitere Informationen zu unseren Cookies und dazu, wie du die Kontrolle darüber behältst, findest du hier: <a href="impressum.php">Cookie-Richtlinien</a>.
            </p>
        </div>
        <span onclick="clickCookieAlert()" class="closeButton">&times;</span>
    </div>

</div>

<script>

    function clickCookieAlert(){
        var xml = new XMLHttpRequest();
        xml.open("POST", "includes/setCookie.php");
        xml.addEventListener("load", function(e) {
            if(e.target.response == "1"){
                document.getElementById("cookie_alert_main").style.display = "none";
                document.getElementById("cookie_alert")     .style.display = "none";
            } else {
                console.log("Error by setting cookie cookie...");
            }
        });
        var data = new FormData();
        data.append("setCookieCookie", true);
        xml.send(data);
    }

</script>

<?php

}

?>