// class Months {
//     January: 31,

// }

// let firstDay = "Sunday";
// let days = 31;

// document.write("<div id='calendarContainer'>");
// document.write("<table>");

// if (firstDay == "Sunday") {
//     for (let i = 1; i <= days; i++) {
//         if (i % 7 == 1) {
//             document.write("<tr>");
//         }

//         document.write("<td>" + i + "</td>");

//         if (i % 7 == 0) {
//             document.write("</tr>");
//         } else if (i == days) {
//             document.write("</tr>");
//         }

//     }
// }

// document.write("</table>");
// document.write("</div>");

let startDay = 5;
let days = 31;

// let targetID = 1;

// let targetCell = document.querySelector("#one" + targetID);
// targetCell.innerHTML = "2013";

let targetCell;
let startPrinting = false;
let dayToPrint = 1;

for (let i = 1; i <= 6; i++) {
    if (i == 1) {
        for (let j = 1; j <= 7; j++) {
            if (j == startDay) {
                startPrinting = true;
            }

            if (startPrinting == true) {
                targetCell = document.querySelector("#c" + i + j);
                targetCell.innerHTML = dayToPrint;
                dayToPrint += 1;
            }
        }
    } else if (i == 5) {
        for (let j = 1; j <= 7; j++) {
            if (startPrinting == true) {
                targetCell = document.querySelector("#c" + i + j);
                targetCell.innerHTML = dayToPrint;
            }
            
            if (dayToPrint == days) {
                startPrinting = false;
            } else {
                dayToPrint += 1;
            }
        }
    } else if (i == 6) {
        for (let j = 1; j <= 7; j++) {
            if (startPrinting == true) {
                targetCell = document.querySelector("#c" + i + j);
                targetCell.innerHTML = dayToPrint;
            }

            if (dayToPrint == days) {
                startPrinting = false;
            } else {
                dayToPrint += 1;
            }
        }
    } else {
        for (let j = 1; j <= 7; j++) {
            if (startPrinting == true) {
                targetCell = document.querySelector("#c" + i + j);
                targetCell.innerHTML = dayToPrint;
                dayToPrint += 1;
            }
        }
    }
}