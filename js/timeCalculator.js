/* 
 * Bell Webapp
 * Created by Scott Numa
 * All rights reserved
 */


function Time(hour, minute){
    this.hour = hour;
    this.minute = minute;
    this.absoluteMinute = this.hour * 60 + this.minute;
    
    //Conversion to string format for time
    {
        if (this.hour > 12){
            this.print = String(this.hour - 12);
        } else {
            this.print = String(this.hour);
        }

        this.print += ":";
        if (this.minute > 9){
            this.print += String(minute);
        } else {
            this.print += "0" + String(minute);
        }
    }
}

function Period(label, start, stop){
    //basic definitions
    {
        this.label = label;
        this.start = start;
        this.stop = stop;
    }
    
    //The shortlabel consists of the abreviation, i.e. only the uppercaes letter
    //This would be IV for IV or S for Snack
    {
        this.shortLabel = ""
        for (i=0; i< this.label.length; i++){
            if(this.label[i] == this.label[i].toUpperCase()){
                this.shortLabel += this.label[i];
            }
        }
    }
    
    this.printTime = start.print + " - " + stop.print;
    this.printComplete = this.shortLabel + ": " + this.printTime;
}

function Schedule(label, times){
    this.label = label;
    this.periods = times;
    
    
    //Creates a list with all of the short period labels
    var shortList = [];
    for (i=0; i < this.periods.length; i++){
        shortList.push(this.periods[i].printComplete);
    }
    this.shortPeriodList = shortList;
    
    
    this.currentPeriod = function(){
        //Returns the object form of the current period
        for (i=0; i < this.periods.length; i++){
            testPeriod = this.periods[i];
            
            countDown = periodCountDownStop(testPeriod);
            if (countDown < 0){
                return testPeriod;
            }
        }
    };
    
    this.periodIndex = function(){
        //Returns the index of the current period, going by the list
        
        for (i=0; i < this.periods.length; i++){
            testPeriod = this.periods[i];
            countDown = periodCountDownStop(testPeriod);
            if (countDown < 0){
                return i;
            }
        }
    };
    
    this.remainingTime = function(){
        //The int of remaining minutes from the current period
        
        //Go through each of the periods of the schedule
        for (i=0; i < this.periods.length; i++){
            testPeriod = this.periods[i];
            
            //Determine the amount of time to the next period
            //Thus, this does not work for the last period of the day
            countDown = periodCountDownStart(testPeriod);
            if (countDown <  0){
                if (i == 0){
                    number = -periodCountDownStart(testPeriod);
                }
                else{
                    number = -periodCountDownStop(this.periods[i-1]);
                }
                if (number <= 0){
                    return -periodCountDownStop(testPeriod);
                }
                return number;
                //return -periodCountDownStart(testPeriod);

            }
        }
        
        //Check if the last period of the day has ended yet
        lastPeriod = this.periods[this.periods.length - 1];
        lastCountDown = periodCountDownStop(lastPeriod);
        if (lastCountDown < 0){
            return -lastCountDown;
        }
        
        //Should the last period have ended, return fals
        return '*';
    };
    
    
    
    //The following are functions used by the schedule function
    function currentTime(){
        //Returns a tuple with military time
        d = new Date();
        return new Time(d.getHours(), d.getMinutes());

    }
    
    function timeDifference(start, stop){
        return stop.absoluteMinute - start.absoluteMinute;
    }

    function periodTimeDifference(period, time){
        //Returns the time between the start of selected period and a selected
        //time
        
        //This function isn't actually used.
        return timeDifference(period.start, time);
    }

    function periodCountDownStart(period){
        //Returns the number of minutes between the start of a period and the 
        //current time
        return timeDifference(period.start, currentTime());
    }

    function periodCountDownStop(period){
        //Returns the number of minutes between the end of a period and the 
        //current time
        return timeDifference(period.stop, currentTime());
    }
}

//Determines what schedule today is
function scheduler(){
    //returns the relevant schedule
    //
    //scheduler is a two part function
    //the first part inputs the typical schedule, while part two adds exceptions
   
    //Different Schedules
    { 
        weekendSchedule = new Schedule(
            'Sample Day',
            [
                new Period('XII',     new Time(0,0),      new Time(1,0)),
                new Period('I',    new Time (1,0),     new Time(2,0)),
                new Period('II',   new Time(2,0),      new Time(3,0)),
                new Period('III',    new Time(3,0),      new Time(4,59)),
                new Period('IV',     new Time(4,0),      new Time(5,0)),
                new Period('V',    new Time (5,0),     new Time(6,0)),
                new Period('VI',   new Time(6,0),      new Time(7,0)),
                new Period('VII',  new Time(7,0),      new Time(8,0)),
                new Period('VIII',    new Time (8,0),     new Time(9,0)),
                new Period('IX',     new Time(9,0),      new Time(10,0)),
                new Period('X',    new Time(10,0),     new Time(11,0)),
                new Period('XI',   new Time (11,0),    new Time(12,0)),
                new Period('XII',     new Time(12,0),     new Time(13,0)),
                new Period('I',    new Time (13,0),    new Time(14,0)),
                new Period('II',   new Time(14,0),     new Time(15,0)),
                new Period('III',    new Time(15,0),     new Time(16,59)),
                new Period('IV',     new Time(16,0),     new Time(17,0)),
                new Period('V',    new Time (17,0),    new Time(18,0)),
                new Period('VI',   new Time(18,0),     new Time(19,0)),
                new Period('VII',  new Time(19,0),     new Time(20,0)),
                new Period('VIII',    new Time (20,0),    new Time(21,0)),
                new Period('IX',     new Time(21,0),     new Time(22,0)),
                new Period('X',    new Time(22,0),     new Time(23,0)),
                new Period('XI',   new Time (23,0),    new Time(24,0))
            ]
        );

        tutorialSchedule = new Schedule(
            'Tutorial',
            [
                new Period('I',     new Time(8,0),      new Time(8,55)),
                new Period('II',    new Time(9,0),      new Time(9,54)),
                new Period('Snack', new Time(9,54),     new Time(10,4)),
                new Period('III',   new Time(10,9),     new Time(11,3)),
                new Period('Tutorial',    new Time(11,8),    new Time(11,38)),
                new Period('IV',    new Time(11,43),    new Time(12,37)),
                new Period('Lunch', new Time(12,37),    new Time(13,17)),
                new Period('V',     new Time(13,22),     new Time(14,16)),
                new Period('VI',    new Time(14,21),    new Time(15,15))
            ]);
        nonTutorialSchedule = new Schedule(
            //string label of the day
            'Non-Tutorial', 

            //schedule of all the periods
            [
                new Period('I',     new Time(8,0),      new Time(9,0)),
                new Period('II',    new Time(9,5),      new Time(10,5)),
                new Period('Snack', new Time(10,5),     new Time(10,15)),
                new Period('III',   new Time(10,20),    new Time(11,20)),
                new Period('IV',    new Time(11,25),    new Time(12,25)),
                new Period('Lunch', new Time(12,25),    new Time(13,5)),
                new Period('V',     new Time(13,10),    new Time(14,10)),
                new Period('VI',    new Time(14,15),    new Time(15,15))
            ]
        );

        minimumSchedule = new Schedule(
            //string label of the day
            'Minimum', 

            //schedule of all the periods
            [
                new Period('I',     new Time(8,0),      new Time(8,40)),
                new Period('II',    new Time(8,45),     new Time(9,25)),
                new Period('III',   new Time(9,30),     new Time(10,10)),
                new Period('Lunch', new Time(10,10),    new Time(10,20)),
                new Period('IV',    new Time(10,25),    new Time(11,05)),
                new Period('V',     new Time(11,10),    new Time(11,50)),
                new Period('VI',    new Time(11,55),    new Time(12,35))
            ]
        );

        lateStartSchedule = new Schedule(
            //string label of the day
            'Late Start', 

            //schedule of all the periods
            [
                new Period('I',     new Time(10,15),      new Time(10,55)),
                new Period('II',    new Time(11,00),     new Time(11,40)),
                new Period('III',   new Time(11,45),     new Time(12,25)),
                new Period('Lunch', new Time(12,25),    new Time(13,0)),
                new Period('IV',    new Time(13,5),    new Time(13,45)),
                new Period('V',     new Time(13,50),    new Time(14,30)),
                new Period('VI',    new Time(14,35),    new Time(15,15))
            ]
        );

        pepRallySchedule = new Schedule(
            //string label of the day
            'Pep Rally', 

            //schedule of all the periods
            [
                new Period('I',     new Time(8,0),      new Time(8,55)),
                new Period('II',    new Time(9,0),      new Time(9,55)),
                new Period('Snack', new Time(9,55),     new Time(10,5)),
                new Period('III',   new Time(10,10),    new Time(11,40)),
                new Period('IV',    new Time(11,45),    new Time(12,40)),
                new Period('Lunch', new Time(12,40),    new Time(13,15)),
                new Period('V',     new Time(13,20),    new Time(14,15)),
                new Period('VI',    new Time(14,20),    new Time(15,10))
            ]
        );

        finalsSchedule = new Schedule(
                'Finals',
            [
                new Period('Final',     new Time(8,0),      new Time(10,0)),
                new Period('Snack',    new Time(10,0),      new Time(10,10)),
                new Period('Final', new Time(10,15),     new Time(12,15))
            ]);
    }
    
    //Turn to false for testing with the weekend schedule;
    testHere = 'false';
    if(testHere == 'false'){ 
        
        //Part I
        currentSchedule = schedulerPattern();

        //Part II
        replacement = schedulerException();
        if (replacement != 'false'){ //Should there be an exception, replace that instead
            if (replacement == 'Late Start'){
                return lateStartSchedule;
            }
            else if (replacement == 'Minimum'){
                return minimumSchedule;
            }
            else if (replacement == 'Pep Rally'){
                return pepRallySchedule;
            }
            else if (replacement == 'Finals'){
                return finalsSchedule;
            }
            else{
                console.log([replacement, replacement != false]);
                throw 'Error no replacemnt schedule found';
            };
            
            return replacement;
        }

        return currentSchedule;
    } else{            
        console.log('Testing Mode with Weekend Schedule');
        return weekendSchedule;
    }

    function schedulerPattern(){
        // returns the correct schedule to use

        today = dayWeek();
        if (today == 'Tuesday' || today == 'Wednesday' || today == 'Thursday'){
            return tutorialSchedule;
        } else if (today == 'Monday' || today == 'Friday'){
            return nonTutorialSchedule;
        } else if (today == 'Saturday' || today == 'Sunday'){
            return weekendSchedule;
        } else {
            throw "Custom Error - Invalid Day: " + today;
        }
        
        //Determining which schedule to use
        function dayWeek(){
            //Tells which day of the week it is
            d = new Date();
            weekDay = d.getDay();
            dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            return dayNames[weekDay];
}
        
    }

    function schedulerException(){
        //Returns the relevant schedule to use when an exception
        //If there is no exception- returns false
        
        function getNumericalDate(){
            //Returns the numerical date as (8,10) format

            d = new Date();
            numericalDay = d.getDate(); //returns value 1-31
            numericalMonth = d.getMonth() + 1; //returns value 1-12
            return [numericalMonth, numericalDay];
        }

        function within(list, thing){
            //checks whether an item is in a list
            //within(list, thing) = 1 or 0

            for (i=0; i < list.length; i++){
                if(String(list[i]) == String(thing)){
                    return true;
            }}
            return false;
        }
        
        lateStartList = [
            [8,26], [9,14], [9,28], [10,26], [11,9], [11,30],
			[12,7], [1,4], [1,26], [2,8], [2,22], [3,7], [3,21],
			[4,11], [4,25], [5,9], [5,23]
        ];
        
        minimumList = [
            [9,9], [12,18], [3,25], [5,27]
        ];
        
        pepRallyList = [
            [9,11], [10,16], [12,11], [4,22]
        ];
        
        finalsList = [
            [1,19],[1,20],[1,21],
			[6,7], [6,8], [6,9]
        ];
        
        today = getNumericalDate();
        
        testValue = false;
        if (testValue == true){
            today = [1,27];
        }
        
        if (within(lateStartList, today) == true){
            return 'Late Start';
        }
        else if(within(minimumList, today) == true){
            return 'Minimum';
        }
        else if(within(pepRallyList, today) == true){
            return 'Pep Rally';
        }
        else if(within(finalsList, today) == true){
            return 'Finals';
        }
        else{
            return 'false';
        }
    }
    
    
}


a = scheduler();