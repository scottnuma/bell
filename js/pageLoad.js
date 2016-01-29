/* 
 * Bell Webapp
 * Created by Scott Numa
 * All rights reserved
 */

$(document).ready(function(){
    loadTime();
});

function loadTime(){
    schedule = scheduler();

    //Present the remaining Time
    remainingTime = schedule.remainingTime();
    $('.top').html(String(remainingTime));

    periodIndex = schedule.periodIndex();
    period = schedule.periods[periodIndex];
    try {$('#label').html(period.shortLabel);}
    catch(TypeError){};
    try {$('#time').html(period.printTime);}
    catch(TypeError){};
	
    var t = setTimeout(function(){loadTime()}, 500);
}

function listLoader(){
    currentSchedule = scheduler();
    currentPeriods = currentSchedule.periods;
    length = currentPeriods.length;
    
    specialPeriod = currentSchedule.currentPeriod();
    
    for (i=0; i< length; i++){
        period = currentPeriods[i];
        periodTime = period.shortLabel + ': ' + period.start.print + " - " + period.stop.print;
        
        x = i;
        if (x > 19){ //There are only 19 photos
            x -= 20;
        }
        
        if (specialPeriod == period){
            htmlStuff = "<div class='slot' id='currentSlot'><img src='img/" + x + ".jpg'><div class='time'>" + periodTime + "</div>";
            $('#content').append(htmlStuff);
        }
        else{
            
            
            htmlStuff = "<div class='slot'><img src='img/" + x + ".jpg'><div class='time'>" + periodTime + "</div>";
            $('#content').append(htmlStuff);
        }
        
    }
    
    $( document ).ready(function() {
        $(window).scrollTop($('#currentSlot').offset().top);
    });
    
}