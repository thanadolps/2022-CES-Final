import { month_events } from "./event.js"
import { selectedDate, setSelectedDate } from "./calendar.js"
import { event_list } from "./event.js"

/**
 * 
 * @param {HTMLTableCellElement} cell 
 * @param {Date?} date
 * @param {{name: string, subject: string, type: string}[]?} events 
 */
export function updateCalendarCell(cell, date, events) {
    cell.innerHTML = "";
    cell.onclick = null;
    cell.className = "calendar-cell";

    if (date === null) { return; }

    if (date.getDate() == selectedDate.getDate()) {
        cell.className += " calendar-cell-selected";
    }

    cell.innerHTML = `
        ${date.getDate()}
        <ul>
            ${(events ?? []).map(ev => `<li>${ev.name}</li>`).join('\n')}
        </ul >
    `.trim();

    cell.onclick = () => {
        setSelectedDate(date);
        updateEventList();
    };
}

/**
 * 
 * @param {HTMLUListElement} list 
 */
export function updateEventList(list = event_list) {
    const events = month_events[selectedDate.getDate()] ?? [];
    list.innerHTML =
        events
            .map(ev => `<li>${ev.name}</li>`)
            .join('\n');
}