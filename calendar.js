import { updateCalendarCell, updateEventList } from "./template.js"
import { event_list, events_by_date } from "./event.js"

const N_DAY_IN_WEEK = 7;
const N_WEEK_IN_MONTH = 6;

const table = document.getElementById("calendar-table")
const table_month = document.getElementById("calendar-month");
const cells = []

export let selectedDate = new Date();  // initalize to today

// ====================
export function initalizeCalendar() {
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


export function updateCalendar(year = selectedDate.getFullYear(), month = selectedDate.getMonth()) {
    // month 0 = Jan, 1 = Feb, etc..

    // Change cell's date number
    cells.forEach(cell => {
        updateCalendarCell(cell, null)
    });
    const d = new Date(year, month, 1);
    const start_cell = d.getDay();
    for (let i = 1; new Date(year, month, i).getMonth() == month; i++) {
        const date = new Date(year, month, i);
        const date_str = date.toLocaleDateString();

        updateCalendarCell(
            cells[start_cell + i - 1],
            date,
            events_by_date[date_str]
        );
    }

    // Change month name
    const month_str = d.toLocaleString('default', { month: 'long' }).toUpperCase();
    table_month.textContent = `${month_str} ${year}`;

    // Change Event List on the side
    updateEventList(event_list, events_by_date[selectedDate.toLocaleDateString()]);
}

function onCellClick(i) {
    console.log(i)
}
// ====================

export function setSelectedDate(date) {
    selectedDate = date;
    updateCalendar();
}

function setMonth(month) {
    selectedDate.setDate(1);
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
// Export for html
window.monthUp = monthUp;
window.monthDown = monthDown;
window.gotoToday = gotoToday;