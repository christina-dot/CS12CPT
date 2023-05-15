

let startDay = 7;   // Which day of the week we will start on
let days = 31;  // Number of days in the specific month
let endDay;     // This variable will store the day which the month ended
let month = 5;  // This variable will store the current month

// This class will store the days of each month
class MonthDays {
    constructor (numDays) {
        numDays = this.numDays;
    }

    getNumDays() {
        return this.numDays;
    }
}

let monthDaysList = [];

// Creating all the month objects
let januaryDays = new MonthDays(31);
monthDaysList.push(januaryDays.getNumDays());

console.log(januaryDays.getNumDays());
console.log(monthDaysList);

let februaryDays = new MonthDays(28);
monthDaysList.push(februaryDays.getNumDays());
let marchDays = new MonthDays(31);
monthDaysList.push(marchDays.getNumDays());
let aprilDays = new MonthDays(30);
monthDaysList.push(aprilDays.getNumDays());
let mayDays = new MonthDays(31);
monthDaysList.push(mayDays.getNumDays());
let juneDays = new MonthDays(30);
monthDaysList.push(juneDays.getNumDays());
let julyDays = new MonthDays(31);
monthDaysList.push(julyDays.getNumDays());
let augustDays = new MonthDays(31);
monthDaysList.push(augustDays.getNumDays());
let septemberDays = new MonthDays(30);
monthDaysList.push(septemberDays.getNumDays());
let octoberDays = new MonthDays(31);
monthDaysList.push(octoberDays.getNumDays());
let novemberDays = new MonthDays(30);
monthDaysList.push(novemberDays.getNumDays());
let decemberDays = new MonthDays(31);
monthDaysList.push(decemberDays.getNumDays());

let targetCell;             // This variable will store the html element that we want to target
let startPrinting = false;  // This variable stores whether or not to change the html element
let dayToPrint = 1;         // This variable stores the day that is currently printing


let nextMonthArrow = document.querySelector("#nextMonthArrow");

createCalendar();

nextMonthArrow.addEventListener("click", goNextMonth);

// This function will create the calendar for the next month when the next arrow is pressed
function goNextMonth() {

    console.log(monthDaysList);

    // Setting the first day of the month
    if (endDay == 7) {
        startDay = 1;
    } else {
        startDay = endDay += 1;
    }

    if (month == 12) {
        month = 1;
    } else {
        month += 1;
    }
    days = monthDaysList[month-1];

    console.log(days);

    dayToPrint = 1;

    createCalendar();

}

// This function will create a calendar based on the start day and number of days within the month
function createCalendar() {

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
                    targetCell = document.querySelector("#c" + i + j);
                    targetCell.innerHTML = dayToPrint; 
                    dayToPrint += 1;
                }
            }
        } else if (i == 5) {
            // This checks when the calendar ends on row 5

            for (let j = 1; j <= 7; j++) {

                // This checks if we still want to target html elements
                if (startPrinting == true) {
                    targetCell = document.querySelector("#c" + i + j);
                    targetCell.innerHTML = dayToPrint;
                }
                
                // If we have hit the last day, we check if dayToPrint lines up with the number of days in the month. If it is the same, then we know to stop printing, if not, then we add a day and keep going
                if (dayToPrint == days) {
                    startPrinting = false;
                    endDay = j;
                } else {
                    dayToPrint += 1;
                }
            }
        } else if (i == 6) {
            // This is the same as the last condition except checking for row 6 instead

            for (let j = 1; j <= 7; j++) {
                if (startPrinting == true) {
                    targetCell = document.querySelector("#c" + i + j);
                    targetCell.innerHTML = dayToPrint;
                }
    
                if (dayToPrint == days) {
                    startPrinting = false;
                    endDay = j;
                } else {
                    dayToPrint += 1;
                }
            }
        } else {
            // Every other week will just print as usual

            for (let j = 1; j <= 7; j++) {
                if (startPrinting == true) {
                    targetCell = document.querySelector("#c" + i + j);
                    targetCell.innerHTML = dayToPrint;
                    dayToPrint += 1;
                }
            }
        }
    }
}
