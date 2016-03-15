/* 
 * Bell Webapp
 * Created by Scott Numa
 * All rights reserved
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var a=document.getElementsByTagName("a");
for(var i=0;i<a.length;i++)
{
    a[i].onclick=function()
    {
        window.location=this.getAttribute("href");
        return false;
    };
}

//Mini-functions for use in calculations
{
    if (document.title == "Bell"){
        function timeToString(time){
            if (time[0] <= 12){
                var hour = time[0].toString();
            }
            else{
                var temp = time[0] - 12;
                var hour = temp.toString();
            }

            if (time[1]<10){
                var minute = "0" + time[1].toString();
            }
            else{
                var minute = time[1].toString();
            }

            return hour + ":" + minute;

        }
        function within(day, stuff){
            //Answers whether day is in the set stuff
            for (var i = 0; i<stuff.length; i++){
                if (day == stuff[i]){
                    return true;
                }
            }
            return false;
        }
        function pairtomin(pair){
            //Turns a time pair into the number of minutes
            //e.g. [2,33] becomes 153
            stuff = pair[0]*60 + pair[1];
            return stuff;
        }
        function mintopair(min){
            //Turns a number of minutes into a time pair
            //e.g. 153 becomes [2,33]
            var a = min;
            var hours = 0;
            for (var i = 0; a >= 60; i++){
                hours += 1;
                a -= 60;
            }
            return [hours,a];
        }
    }
    function timediff(a, b){
    //Finds the differences between two time pairs
    //Returns the answer as a time pair
    var timeA = a;
    var timeB = b;
    
    //Converts to min() form for differnence    
    var minDiff = pairtomin(timeA) - pairtomin(timeB);
    var pairDiff = mintopair(minDiff);
    return pairDiff;
}
}

function show(){
    
    //set time variables
    {
    var d = new Date();
    
    var nowhrs = d.getHours();
    var nowmins = d.getMinutes();
    
    
            
    
    //Special time pair format
    var hrsmins = [nowhrs, nowmins];
    
    var weekday = d.getDay();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    
    
  
    
    
    //Special date format: mm.dd
    var monthday = month + day/100;
    }
    
    //Fun themessage occupiers
    if (document.title == "Bell"){
    var symbollist = [
        '*',
        '*',
        '*',
        '*'        
    ];
    
    var fillersmessage = symbollist[(day +2) % symbollist.length];
    document.getElementById("fillermessage").innerHTML = fillersmessage;
    }
    
    var themessage = "";
    
    //Special Messages
    {
    if (document.title == "Bell"){
        if (day == 6 && month == 12){
            document.getElementById("specialmessage").innerHTML = "DL?";
        }
    }
    }
    
    //Schedules-----------------------------------------------------------------
    
    //Bell Schedules
    if (document.title == "Bell"){
        var tutorialschedule = [
            [7,0], [7,55], 
            [8,0], [8,55],
            [9,0], [9,54],
            [10,4],
            [10,9], [11,3], 
            [11,8], [11,38],
            [11,43],  [12,37],
            [13,12],
            [13,17], [14,11],
            [14,16], [15,10]
        ];

        var nonschedule = [
            [7,0],  [7,55],
            [8,0],  [9,0],
            [9,5],  [10,5], 
            [10,15], 
            [10,20],[11,20],
            [11,25],[12,25],
            [13,0],
            [13,5],[14,5],
            [14,10],[15,10]
        ];

        var lateschedule = [
            [9,30], [10,10],
            [10,15], [10,55], 
            [11,0], [11,40],
            [11,45], [12,25],
            [13,0],  
            [13,5], [13,45], 
            [13,50], [14,30], 
            [14,35], [15,15]
        ];

        var minimumschedule = [
            [7,0],      [7,55],
            [8,0],      [8,40],
            [8,45],     [9,25],  
            [9,30],     [10,10],
            [10,20],
            [10,25],    [11,5],
            [11,10],    [11,50], 
            [11,55],    [12,35]
        ];

        var pepschedule = [
            [7,0], [7,55], 
            [8,0], [8,55], 
            [9,0], [9,55],
            [10,5], 
            [10,10], [11,40],
            [11,45], [12,40],
            [13,15],
            [13,20], [14,15], 
            [2,20], [15,15]
        ];
        var finalschedule = [
            [8,0], [10,0],
            [10,10],
            [10,15],[12,15]
        ];
        
    }
    
    //Times Schedules
    if (document.title == "Times"){
        var tutorialtiming = [
            ['X',   [7,0],  [7,55]], 
            ['I',   [8,0],  [8,55]],
            ['II',  [9,0],  [9,54]],
            ['B',   [9,54], [10,4]],
            ['III', [10,9], [11,3]], 
            ['T',   [11,8], [11,38]],
            ['IV',  [11,43],[12,37]],
            ['L',   [12,37],[13,12]],
            ['V',   [13,17],[14,11]],
            ['VI',  [14,16],[15,10]] 
        ];

        var nontiming = [
            ['X',   [7,0],  [7,55]],
            ['I',   [8,0],  [9,0]],
            ['II',  [9,5],  [10,5]], 
            ['B',   [10,5], [10,15]], 
            ['III', [10,20],[11,20]],
            ['IV',  [11,25],[12,25]],
            ['L',   [12,25],[13,0]],
            ['V',   [13,5], [14,5]],
            ['VI',  [14,10],[15,10]]
        ];

        var latetiming = [
            ['X',   [9,30],     [10,10]],
            ['I',   [10,15],    [10,55]], 
            ['II',  [11,0],     [11,40]],
            ['III', [11,45],    [12,25]],
            ['L',   [12,25],    [13,0]],  
            ['IV',  [13,5],     [13,45]], 
            ['V',   [13,50],    [14,30]], 
            ['VI',  [14,35],    [15,15]]
        ];

        var minimumtiming =[
            ['X',   [7,0],      [7,55]],
            ['I',   [8,0],      [8,40]],
            ['II',  [8,45],     [9,25]],  
            ['III', [9,30],     [10,10]],
            ['B',   [10,20]],
            ['IV',  [10,25],    [11,5]],
            ['V',   [11,10],    [11,50]], 
            ['VI',  [11,55],    [12,35]]
        ];

        var peptiming = [
            ['X',   [7,0],      [7,55]], 
            ['I',   [8,0],      [8,55]], 
            ['II',  [9,0],      [9,55]],
            ['B',   [9,55],     [10,5]], 
            ['III', [10,10],    [11,40]],
            ['IV',  [11,45],    [12,40]],
            ['L',   [12,40],    [13,15]],
            ['V',   [13,20],    [14,15]], 
            ['VI',  [2,20],     [15,15]]
        ];
        
        var finaltiming = [
            ['*',   [8,0],      [10,0]], 
            ['B',   [10,0],      [10,10]], 
            ['*',  [10,15],      [12,15]]
        ];
    }
    
    //Calendar------------------------------------------------------------------

    //Init of schedule folder, used later    
    var schedule = 0;
    var timing = 0;
    var scheduleName = "Times";
    
    //Is today a weekday?
    var weekweekday = false;
    
    //nonschedule used on monday and friday    
    if (weekday == 1 || weekday == 5) {
        schedule = nonschedule;
        scheduleName = "Non-Tutorial";
        timing = nontiming;
        weekweekday = true;
    }
    
    //tutorial schedule used on tues, wednes, thurs    
    else if (weekday == 2 || weekday == 3 || weekday == 4){
        schedule = tutorialschedule;
        timing = tutorialtiming;
        scheduleName = "Tutorial";
        weekweekday = true;        
    }
    
    
   //Late starts and minimum days override the usual 
   var latestarts = [
       9.23,  10.07, 10.21, 11.04,
       11.18, 12.09, 1.06,  2.10,
       3.03,  3.17,  3.31,  4.21,
       5.05,  5.19,  6.02,  6.16
   ];
   
  
   if (within(monthday, latestarts)){
       schedule = lateschedule;
       timing = latetiming;
       scheduleName = "Late Start";
   }
   
   var minimum = [9.25,12.20,4.11,5.23];
   if (within(monthday, minimum)){
       schedule = minimumschedule;
       timing = minimumtiming;
       scheduleName = "Minimum";
   }

   var pep = [9.27,11.08,12.13,2.14,3.28];
   if (within(monthday, pep)){
       schedule = pepschedule;
       timing = peptiming;
       scheduleName = "Pep Rally";
   }
   
   var final = [2.03,2.04,2.05,6.23,6.24,6.25];
   if (within(monthday, final)){
       schedule = finalschedule;
       timing = finaltiming;
       scheduleName = "Finals";
   }
   
   //List Calc -----------------------------------------------------------------
   if (document.title == "Times"){
       if (weekweekday == false){
           var i = 0
           var stuff = "<div class='slot' id='slot" + i.toString() + "'>Dum Spiro</div>";
                    document.getElementById("slot" + i.toString()).innerHTML = stuff;

                    var stuffInt = i + 1;
                    var stuffB = "<div class='slot' id='slot" + stuffInt.toString() + "'>Spero</div>";
                    document.getElementById("slot" + stuffInt.toString()).innerHTML = stuffB;
       }
        for (var i=0; i<timing.length; i++){ //cycle through the classes
            var timeSlot = timing[i]; //select the class "['V',   [13,20],    [14,15]],"
            var label = timeSlot[0]; //select the label "'V'"
            var belltimes = timeToString(timeSlot[1]) + "-" + timeToString(timeSlot[2]);

            var content = "<div class='slot' id='slot" + i.toString() + "'><div class='square'>" + label + "</div>" + belltimes + "</div>";
            if (document.title == "Times"){
                document.getElementById("slot" + i.toString()).innerHTML = content;
            }
        }

        //For the past times - delete them
        //Set the header to the Schedule Name
        document.getElementById("header").innerHTML = scheduleName;

        //Look through all of the slots
        for (var i=0; i<timing.length; i++){
            var relevantTime = timing[i][2];

            //Remove all slots whose second time has passed
            if (timediff(relevantTime,[nowhrs,nowmins])[1] < 0){ 
                 //For the last time slot, do something different
                var lastSlotPast = timediff(timing[timing.length-1][2],[nowhrs,nowmins])[1] < 0;
                if (i==timing.length - 2 && lastSlotPast){
                    var stuff = "<div class='slot' id='slot" + i.toString() + "'>Must be the</div>";
                    document.getElementById("slot" + i.toString()).innerHTML = stuff;

                    var stuffInt = i + 1;
                    var stuffB = "<div class='slot' id='slot" + stuffInt.toString() + "'>H</div>";
                    document.getElementById("slot" + stuffInt.toString()).innerHTML = stuffB;
                }
                else{
                     if (i==timing.length - 1){
                     }
                     else{
                         var trash = document.getElementById("slot" + i.toString());
                         trash.parentNode.removeChild(trash);
                     }
                }
            }
        }

        //For the unused images- delete them
            for (var i=timing.length; i<10; i++){
                var deleteDiv = document.getElementById("slot" + i.toString());
                deleteDiv.parentNode.removeChild(deleteDiv);
            }
   }
   //Calculator-----------------------------------------------------------------

   if (document.title == "Bell"){
        //Use the schedule to determine-
        for (var i =0; i <schedule.length; i++) {
            //Find difference between certain time end ascertained from sched
            remaining = timediff(schedule[i],hrsmins);
            //Continue if the time has not already passed
            //(i.e is positive)
            if (pairtomin(remaining) >= 0) {
                //Analyze in minute from
                var remainingMin = pairtomin(remaining);

                //Print to copy if less than an hour
                if (remainingMin < 60){
                    themessage += remainingMin.toString();
                }

                //Use special formatting when more than an hour
                if (remainingMin >= 60){
                    themessage += remaining[0];
                    themessage += ":";

                    //if single digit, append leading 0
                    if (remaining[1] < 10){
                        themessage += "0";
                    }
                    themessage += remaining[1];
                }

                //Print Print
                if (document.title == "Bell"){
                    document.getElementById("mymessage").innerHTML = themessage;
                }

                //Quit circling
                break;
            }

        //for loop closer
        }
   }

//function closer
}




