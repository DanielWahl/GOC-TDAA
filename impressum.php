<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        DEFINE('INC', "includes/");
        include(INC . "head.php");
    ?>
</head>
<body>
    <?php
        if(!isset($_COOKIE["Save_Cookie"]))
           include(INC . "cookie.php");
    ?>
    
    <?php
        include(INC . "header.php");
    ?>
    
    <div class="clear"></div>
    
    <div id="main">
    
        <?php
            include(INC . "section1.php");
        ?>
        
        <div class="clear"></div>
        
        <section id="two">
            <div class="middletext">
                <h1>Impressum</h1> 
                <h2>Angaben gem&auml;&szlig; &sect; 5 TMG:</h2> 
                <p>
                    Daniel Wahl<br />
                    Adresse: [auf Anfrage per E-Mail]
                </p> 
                <h2>Kontakt:</h2> 
                <p>
                    E-Mail: doughid@gmail.com <br>
                    Telefon: [auf Anfrage per E-Mail]
                </p>
            </div>
        </section>
        
        <div class="clear"></div>
        
        <section id="three" style="height:auto; background-color:white;">
            <div class="mediumcontent">
                <h2>Cookies</h2> 
                <p>
                    Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
                </p> 
                <p>
                    Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gel&ouml;scht. Andere Cookies bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie diese l&ouml;schen. Diese Cookies erm&ouml;glichen es uns, Ihren Browser beim n&auml;chsten Besuch wiederzuerkennen.
                </p> 
                <p>
                    Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie &uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschlie&szlig;en sowie das automatische L&ouml;schen der Cookies beim Schlie&szlig;en des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.
                </p>

                <br>

                <h2>SSL-Verschl&uuml;sselung</h2> 
                <p>
                    Diese Seite nutzt aus Gr&uuml;nden der Sicherheit und zum Schutz der &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p> 
                <p>
                    Wenn die SSL Verschl&uuml;sselung aktiviert ist, k&ouml;nnen die Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen werden.
                </p>
            </div>   
        </section>
           
    </div>
    
    <div clas="clear"></div>
    
    <?php
        include(INC . "footer.php");
    ?>
    
    <script src="js/map.js"></script>   
    <script>
    function initMapindex(){
        initMap();
    }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0klnwhWakNF6e3pkI2hkYGvu-By8CZ7I&signed_in=true&callback=initMapindex" async defer></script>
</body>
</html>