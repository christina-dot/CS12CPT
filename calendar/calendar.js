
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
function objectInfoStorer (object) {
    monthDaysList.push(object.getNumDays());
    monthNamesList.push(object.getMonth());
}

// Now storing the information for each month
objectInfoStorer(january);
objectInfoStorer(february);
objectInfoStorer(march);
objectInfoStorer(april);
objectInfoStorer(may);
objectInfoStorer(june);
objectInfoStorer(july);
objectInfoStorer(august);
objectInfoStorer(september);
objectInfoStorer(october);
objectInfoStorer(november);
objectInfoStorer(december);


//  =================================== Document Targeting Global Variables
let nextMonthArrow = document.querySelector("#nextMonthArrow");


//  =================================== Main Code

createCalendar();

nextMonthArrow.addEventListener("click", goNextMonth);


//  =================================== Functions

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
        startDay = endDay += 1;
    }

    console.log(endDay);
    console.log(startDay);

    // Next changing the month
    if (month == 12) {
        month = 1;
        year += 1;

        let targetYear = document.querySelector("#calendarYear");
        targetYear.innerHTML = year;
    } else {
        month += 1;
    }

    console.log(year);

    // Changing the Month title
    let targetMonth = document.querySelector("#calendarMonth");
    targetMonth.innerHTML = monthNamesList[month-1];

    // Setting the number of days for calendar printing
    days = monthDaysList[month-1];
    // Taking into account leap years
    if (month == 2 && year % 4 == 0) {
        days += 1;
    }

    console.log(days);
    console.log(month);

    // Reseting the counter
    dayToPrint = 1;

    // Creating the calendar
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
                    break;
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
                    break;
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

        // To stop the second loop from continuing to loop
        if (startPrinting == false) {
            break;
        }
    }
}
