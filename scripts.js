const N_DAY_IN_WEEK = 7;
const N_WEEK_IN_MONTH = 6;

const table = document.getElementById("calendar-table")
const table_month = document.getElementById("calendar-month");
const cells = []

function initalizeCalendar() {
    // Generate cells in calendar
    for (let i = 0; i < N_WEEK_IN_MONTH; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < N_DAY_IN_WEEK; j++) {
            const cell = document.createElement("td");
            cell.className = "calendar-cell";
            row.appendChild(cell);
            cells.push(cell);
        }
        table.appendChild(row);
    }
}

const referenceDate = new Date();  // initalize to today

function populateCalendar(year = referenceDate.getFullYear(), month = referenceDate.getMonth()) {
    // month 0 = Jan, 1 = Feb, etc..
    console.log(month);
    // Change cell's date number
    cells.forEach(cell => cell.textContent = "");
    const d = new Date(year, month, 1);
    const start_cell = d.getDay();
    for (let i = 1; new Date(year, month, i).getMonth() == month; i++) {
        cells[start_cell + i - 1].innerHTML = i;
    }

    // Change month name
    const month_str = d.toLocaleString('default', { month: 'long' }).toUpperCase();
    table_month.textContent = `${month_str} ${year}`;

}


function monthUp() {
    referenceDate.setMonth(referenceDate.getMonth() + 1);
    populateCalendar();
}

function monthDown() {
    referenceDate.setMonth(referenceDate.getMonth() - 1);
    populateCalendar();
}


initalizeCalendar();
populateCalendar();