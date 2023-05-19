
// =================================== Global Varibales

let startDay = 2;   // Which day of the week we will start on
let days = 31;  // Number of days in the specific month
let endDay;     // This variable will store the day which the month ended
let month = 5;  // This variable will store the current month
let year = 2023; // This variable will store the current year

let monthDaysList = [];     // This variable holds the number of days of each month
let monthNamesList = [];    // This variable holds the names of the months

let targetCell;             // This variable will store the html element that we want to target
let startPrinting = false;  // This variable stores whether or not to change the html element
let dayToPrint = 1;         // This variable stores the day that is currently printing

// These variables store indicies of any values within arrays that match up with the information of tasks
let taskIndexDay;
let taskIndexMonth;
let taskIndexYear;


// =================================== Month Information Creation and Storage

// This class will store the days of each month
class MonthDays {
    // Each object will contain the name of the month and the number of days within the month
    constructor (month, numDays) {
        this.month = month;
        this.numDays = numDays;
    }

    getMonth() {
        return this.month;
    }

    getNumDays() {
        return this.numDays;
    }
}

// Creating all the month objects
let january = new MonthDays("January", 31);
let february = new MonthDays("February", 28);
let march = new MonthDays("March", 31);
let april = new MonthDays("April", 30);
let may = new MonthDays("May", 31);
let june = new MonthDays("June", 30);
let july = new MonthDays("July", 31);
let august = new MonthDays("August", 31);
let september = new MonthDays("September", 30);
let october = new MonthDays("October", 31);
let november = new MonthDays("November", 30);
let december = new MonthDays("December", 31);

// This function will add the information of a li
function monthInfoStorer (object) {
    monthDaysList.push(object.getNumDays());
    monthNamesList.push(object.getMonth());
}

// Now storing the information for each month
monthInfoStorer(january);
monthInfoStorer(february);
monthInfoStorer(march);
monthInfoStorer(april);
monthInfoStorer(may);
monthInfoStorer(june);
monthInfoStorer(july);
monthInfoStorer(august);
monthInfoStorer(september);
monthInfoStorer(october);
monthInfoStorer(november);
monthInfoStorer(december);


//  =================================== Calendar Task Information

// These lists will contain all the information for each calendar task

let taskDay = [];
let taskMonth = [];
let taskYear = [];
let taskTitles = [];

//  =================================== Document Targeting Global Variables
let backMonthArrow = document.querySelector("#backMonthArrow");
let nextMonthArrow = document.querySelector("#nextMonthArrow");


//  =================================== Main Code

createCalendar(); // Creates the calendar when the page is first opened


// Event listeners for when the previous and next month buttons are pressed
backMonthArrow.addEventListener("click", goPreviousMonth);
nextMonthArrow.addEventListener("click", goNextMonth);


// Event listener for when the user clicks on a calendar cell to create an event
document.addEventListener("click", function(e){
    if (e.target.innerHTML >= 1 && e.target.innerHTML <= days){
        taskCreation(parseInt(e.target.innerHTML), e.target);
    }
})



//  =================================== Functions

function taskCreation(day, target) {
    let taskTitle = prompt("Please enter a title for your task: ");

    taskDay.push(day);
    taskMonth.push(month);
    taskYear.push(year);
    taskTitles.push(taskTitle);

    target.innerHTML = day + "<div class='taskBox'><p>" + taskTitle + "</p></div>";

}

// This function will create the calendar for the previous month when the back arrow is pressed
function goPreviousMonth() {

    // First we clear the calendar
    for (let i = 1; i <= 6; i++) {

        for (let j = 1; j <= 7; j++) {
            targetCell = document.querySelector("#c" + i + j);
            targetCell.innerHTML = ""; 
        }
        
    }

    // Setting the last day of the month
    if (startDay == 1) {
        endDay = 7;
    } else {
        endDay = startDay - 1;
    }

    // Next changing the month and possibly the year
    if (month == 1) {
        month = 12;
        year -= 1;

        let targetYear = document.querySelector("#calendarYear");
        targetYear.innerHTML = year;
    } else {
        month -= 1;
    }

    // Changing the Month title
    let targetMonth = document.querySelector("#calendarMonth");
    targetMonth.innerHTML = monthNamesList[month-1];

    // Setting the number of days for calendar printing
    days = monthDaysList[month-1];
    // Taking into account leap years
    if (month == 2 && year % 4 == 0) {
        days += 1;
    }

    // Finding the Start Day of the previous month
    let tempDays = days;
    for (let i = 6; i >= 1; i--) {
        // Last Week
        if (i == 6) {
            for (let j = endDay; j >= 1; j--) {
                tempDays -= 1;
            }
        } else if (i == 3) {
            // Takes into account a 28-week month that starts on Sunday
            
            for (let j = 7; j >= 1; j--) {
                if (tempDays > 1) {
                    tempDays -= 1;
                    if (tempDays == 1) {
                        startDay = 7;
                    }
                } else {
                    startDay = j;
                    break;
                }
            }
        } else if (i == 2) {
            // Checks if the first ends on the second week

            for (let j = 7; j >= 1; j--) {
                if (tempDays > 1) {
                    tempDays -= 1;
                    
                    // Takes into account when the loop ends on Sunday where tempDays equals 1 and still needs to loop through but will encounter the if/break statement at the end of the greater for loop.
                    if (tempDays == 1) {
                        startDay = 7;
                    }
                } else {
                    startDay = j;
                    break;
                }
            }
        } else if (i == 1) {
            // Checks if the first ends on the first week

            for (let j = 7; j >= 1; j--) {
                if (tempDays > 1) {
                    tempDays -= 1;
                    if (tempDays == 1) {
                        startDay = 7;
                    }
                } else {
                    startDay = j;
                    break;
                }
            }
        } else {
            for (let j = 7; j >= 1; j--) {
                tempDays -= 1;
            }
        }

        if (tempDays <= 1) {
            break;
        }
    }

    // Reseting the counter
    dayToPrint = 1;

    // Creating the calendar
    createCalendar();

}

// This function will create the calendar for the next month when the next arrow is pressed
function goNextMonth() {

    // First we clear the calendar
    for (let i = 1; i <= 6; i++) {

        for (let j = 1; j <= 7; j++) {
            targetCell = document.querySelector("#c" + i + j);
            targetCell.innerHTML = ""; 
        }
        
    }

    // Setting the first day of the month
    if (endDay == 7) {
        startDay = 1;
    } else {
        startDay = endDay + 1;
    }

    // Next changing the month
    if (month == 12) {
        month = 1;
        year += 1;

        let targetYear = document.querySelector("#calendarYear");
        targetYear.innerHTML = year;
    } else {
        month += 1;
    }

    // Changing the Month title
    let targetMonth = document.querySelector("#calendarMonth");
    targetMonth.innerHTML = monthNamesList[month-1];

    // Setting the number of days for calendar printing
    days = monthDaysList[month-1];
    // Taking into account leap years
    if (month == 2 && year % 4 == 0) {
        days += 1;
    }

    // Reseting the counter
    dayToPrint = 1;

    // Creating the calendar
    createCalendar();

}

// This function will create a calendar based on the start day and number of days within the month
function createCalendar() {

    console.log(taskDay);
    console.log(taskMonth);
    console.log(taskYear);
    console.log(taskTitles);

    // This for loop controls the rows of the calendar
    for (let i = 1; i <= 6; i++) {

        // This targets the first week
        if (i == 1) {

            // This for loop loops through each day of the week
            for (let j = 1; j <= 7; j++) {

                // If the day of the week is the same as the day of the week of the start day, then this if statement tells the function to start targeting the html elements
                if (j == startDay) {
                    startPrinting = true;
                }
                
                // If we want to print, we target the ID using the week and day (row/column)
                if (startPrinting == true) {
                    taskIndexDay = taskDay.indexOf(dayToPrint);
                    targetCell = document.querySelector("#c" + i + j);

                    console.log(taskIndexDay);

                    if (taskMonth[taskIndexDay] == month && taskYear[taskIndexDay] == year) {
                        targetCell.innerHTML = dayToPrint + "<div class='taskBox'><p>" + taskTitles[taskIndexDay] + "</p></div>";
                    } else {
                        targetCell.innerHTML = dayToPrint;
                    } 

                    dayToPrint += 1;
                }
            }
        } else if (i == 4) {
            // This checks when the calendar ends on row 4

            for (let j = 1; j <= 7; j++) {

                // This checks if we still want to target html elements
                if (startPrinting == true) {
                    taskIndexDay = taskDay.indexOf(dayToPrint);
                    targetCell = document.querySelector("#c" + i + j);

                    console.log(taskIndexDay);

                    if (taskMonth[taskIndexDay] == month && taskYear[taskIndexDay] == year) {
                        targetCell.innerHTML = dayToPrint + "<div class='taskBox'><p>" + taskTitles[taskIndexDay] + "</p></div>";
                    } else {
                        targetCell.innerHTML = dayToPrint;
                    } 
                }
                
                // If we have hit the last day, we check if dayToPrint lines up with the number of days in the month. If it is the same, then we know to stop printing, if not, then we add a day and keep going
                if (dayToPrint == days) {
                    startPrinting = false;
                    endDay = j;
                    break;
                } else {
                    dayToPrint += 1;
                }
            }
        } else if (i == 5) {
            // This checks when the calendar ends on row 5

            for (let j = 1; j <= 7; j++) {

                // This checks if we still want to target html elements
                if (startPrinting == true) {
                    taskIndexDay = taskDay.indexOf(dayToPrint);
                    targetCell = document.querySelector("#c" + i + j);

                    console.log(taskIndexDay);

                    if (taskMonth[taskIndexDay] == month && taskYear[taskIndexDay] == year) {
                        targetCell.innerHTML = dayToPrint + "<div class='taskBox'><p>" + taskTitles[taskIndexDay] + "</p></div>";
                    } else {
                        targetCell.innerHTML = dayToPrint;
                    } 
                }
                
                // If we have hit the last day, we check if dayToPrint lines up with the number of days in the month. If it is the same, then we know to stop printing, if not, then we add a day and keep going
                if (dayToPrint == days) {
                    startPrinting = false;
                    endDay = j;
                    break;
                } else {
                    dayToPrint += 1;
                }
            }
        } else if (i == 6) {
            // This is the same as the last condition except checking for row 6 instead

            for (let j = 1; j <= 7; j++) {
                if (startPrinting == true) {
                    taskIndexDay = taskDay.indexOf(dayToPrint);
                    targetCell = document.querySelector("#c" + i + j);

                    console.log(taskIndexDay);

                    if (taskMonth[taskIndexDay] == month && taskYear[taskIndexDay] == year) {
                        targetCell.innerHTML = dayToPrint + "<div class='taskBox'><p>" + taskTitles[taskIndexDay] + "</p></div>";
                    } else {
                        targetCell.innerHTML = dayToPrint;
                    } 
                }
    
                if (dayToPrint == days) {
                    startPrinting = false;
                    endDay = j;
                    break;
                } else {
                    dayToPrint += 1;
                }
            }
        } else {
            // Every other week will just print as usual

            for (let j = 1; j <= 7; j++) {
                if (startPrinting == true) {
                    taskIndex = taskDay.indexOf(dayToPrint);
                    targetCell = document.querySelector("#c" + i + j);

                    console.log(taskIndex);

                    if (taskMonth[taskIndex] == month && taskYear[taskIndex] == year) {
                        targetCell.innerHTML = dayToPrint + "<div class='taskBox'><p>" + taskTitles[taskIndex] + "</p></div>";
                    } else {
                        targetCell.innerHTML = dayToPrint;
                    } 

                    dayToPrint += 1;
                }
            }
        }

        // To stop the second loop from continuing to loop
        if (startPrinting == false) {
            break;
        }
    }
}
