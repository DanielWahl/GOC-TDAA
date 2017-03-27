<script src="js/variables.js"></script>
<script src="js/global.js"></script>
<script src="js/bus.js"></script>
<script src="js/air.js"></script>
<script src="js/parking.js"></script>
<script src="js/map.js"></script>
<script>
    function initMapindex(){
        initMap();
    }
    function doNothing(i) {
        initMapindex();
        if(i==0)
            doNothing(1);
    }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0klnwhWakNF6e3pkI2hkYGvu-By8CZ7I&signed_in=true&callback=initMapindex" async defer></script>