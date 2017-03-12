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
    
        <section id="one">
            <div class="middletext">
                <p>APP is coming soon!</p>
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