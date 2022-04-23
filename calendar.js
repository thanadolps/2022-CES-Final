const N_DAY_IN_WEEK = 7;
const N_WEEK_IN_MONTH = 6;

const table = document.getElementById("calendar-table")
const table_month = document.getElementById("calendar-month");
const cells = []

let selectedDate = new Date();  // initalize to today

// ====================
function initalizeCalendar() {
    // Generate cells in calendar
    for (let i = 0; i < N_WEEK_IN_MONTH; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < N_DAY_IN_WEEK; j++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
            cells.push(cell);
        }
        table.appendChild(row);
    }
}


function updateCalendar(year = selectedDate.getFullYear(), month = selectedDate.getMonth()) {
    // month 0 = Jan, 1 = Feb, etc..

    // Change cell's date number
    cells.forEach(cell => {
        updateCalendarCell(cell, null)
    });
    const d = new Date(year, month, 1);
    const start_cell = d.getDay();
    for (let i = 1; new Date(year, month, i).getMonth() == month; i++) {
        updateCalendarCell(
            cells[start_cell + i - 1],
            new Date(year, month, i),
            month_events[i]
        );
    }

    // Change month name
    const month_str = d.toLocaleString('default', { month: 'long' }).toUpperCase();
    table_month.textContent = `${month_str} ${year}`;

}

function onCellClick(i) {
    console.log(i)
}
// ====================

function setMonth(month) {
    selectedDate.setMonth(month)
    updateCalendar();
}

function setYear(year) {
    selectedDate.setYear(year)
    updateCalendar();
}

function monthUp() {
    setMonth(selectedDate.getMonth() + 1);
}

function monthDown() {
    setMonth(selectedDate.getMonth() - 1);
}

function gotoToday() {
    selectedDate = new Date();
    updateCalendar();
}

// ====================
initalizeCalendar();
updateCalendar();