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
        
        <?php
            include(INC . "section2.php");
        ?>
        
        <div class="clear"></div>
        
        <?php
            include(INC . "section3.php");
        ?>
        
        <div class="clear"></div>
        
        <?php
            include(INC . "section4.php");
        ?>
    
    </div>
    
    <div clas="clear"></div>
    
    <?php
        include(INC . "footer.php");
    ?>

    <?php
        include(INC . "JSincludes.php");
    ?>

</body>
</html>