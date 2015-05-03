/* 
 * Bell Webapp
 * Created by Scott Numa
 * All rights reserved
 */

$(document).ready(function(){
    $('#menu').click(function(){
        toggleMenu();
    });

    $('#cover').click(function(){
        toggleMenu();
    });

    $('.inner').swipe({
        swipe:function(event, direction, distance, duration, fingerCount){

            if (direction=='left'){
                toggleMenu();
            }
        }
    });
    loadPage();


    
});

function loadPage(url) {
    scrollTo(0,0);
	
    NProgress.start();
    if (url == undefined) {
        $('#container').load('regular.html #content', function(){
            bannerLoader();
            $('.remainder').click(function(){loadTime();});
            hijackLinks(url);
        });
    } else {
        $('#container').load(url + ' #content', function(){
            hijackLinks

            if (urlCheck(url)){
                bannerLoader();
                $('.remainder').click(function(){loadTime();});
            }
            
            else if (urlCheckTwo(url)){
                listLoader();
            }
        });
    }
	
    NProgress.done();
}

function hijackLinks(message) {
    $('.inner a').click(function(e){
        e.preventDefault();
        loadPage(e.target.href);
        toggleMenu();
    });
}

function  toggleMenu(){
    $('.inner').animate({width: 'toggle'}, 350);
    cover = $('#cover');
    coverMode = cover.css('display');
    
    if (coverMode == 'block'){
        cover.fadeOut(350);
    }
    else if (coverMode == 'none'){
        cover.fadeIn(350);
    }
   
    else{
        throw '#Error bad Cover Mode'
    };
}


function bannerLoader(){
    function photoLocation(){
        randomNumber = Math.floor(Math.random()*19);
        photo = 'url("img/' + String(randomNumber) + '.jpg' + '")';
        console.log(randomNumber);
        return photo;
    }

    $('.period').css('background-image', photoLocation());

    windowHeight = $(window).height();
    bannerHeight = 50;
    periodHeight = $('.period').height();
    remainderHeight = windowHeight - bannerHeight - periodHeight;
    $('.vertCenter').css('height', String(remainderHeight + 'px'));



    loadTime();
}

function loadTime(){
    schedule = scheduler();

    //Present the remaining Time
    remainingTime = schedule.remainingTime();
    $('.remainder').html(String(remainingTime));

    $('.remainder').click(function(){
        $('.remainder').html(String(remainingTime));
    });

    periodIndex = schedule.periodIndex();
    period = schedule.periods[periodIndex];
    try {$('.period #label').html(period.shortLabel);}
    catch(TypeError){};
    try {$('.period #time').html(period.printTime);}
    catch(TypeError){};
	
    var t = setTimeout(function(){loadTime()}, 500);
}

function urlCheck(url){
    //Determines if the url provided matches Regular
    length = url.length;
    if (url[length-6] == 'r'){
        if(url[length-7] == 'a'){
            if(url[length-8] == 'l'){
                return true;
            }
        }
    }
    return false;
}

function urlCheckTwo(url){
    //Determines if the url provided matches periodList
    length = url.length;
        
    if (url[length-6] == 't'){
        if(url[length-7] == 's'){
            if(url[length-8] == 'i'){
                return true;
            }
        }
    }
    return false;
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

/*
 * 
 * <div class="slot">
                <img src="img/0.jpg">
                <div class="time">hi</div>
            </div>
 */


