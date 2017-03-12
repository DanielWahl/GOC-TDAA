var on = false;

function expand(){
    if(on == false){//document.getElementById('toggleopen').style.display == 'block') {
         
        $('#toggleopen')    .css("display", "none");
        $('#toggleclose')   .css("display", "block");
        $('nav')            .css("height",  "100%");
        $('header')         .css("height",  "100%");
        $('#navigation')    .css("height",  "100%");
        $('nav')            .css("display", "block");
        
        $('#logonav')          .css("display", "none");
        on = true;
        
    } else {
        
        $('#toggleopen')    .css("display", "block");
        $('#toggleclose')   .css("display", "none");
        $('nav')            .css("height",  "70px");
        $('header')         .css("height",  "60px");
        $('#navigation')    .css("height",  "60px");
        $('nav')            .css("height",  "70px");
        $('nav')            .css("display", "none");
        
        $('#logonav')          .css("display", "block");
        on = false;
    }
    
}           