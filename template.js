import { selectedDate, setSelectedDate } from "./calendar.js"
import { event_list } from "./event.js"

/**
 * @typedef {{id: string, name: string, subject: string, type: string, date: string, difficulity: number}} Event
 */

/**
 * 
 * @param {HTMLTableCellElement} cell 
 * @param {Date?} date
 * @param {Event[]?} events 
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
        console.log(`Select ${date.toLocaleDateString()}`)
        setSelectedDate(date);
        updateEventList(event_list, events);
    };
}

/**
 * 
 * @param {HTMLUListElement} list 
 * @param {Event[]?} events 
 */
export function updateEventList(list = event_list, events) {
    list.innerHTML =
        (events ?? [])
            .map(ev => `
                <li>
                    ${ev.name}
                    <button onclick="deleteEvent('${ev.id}')">Delete</button>
                </li>
            `)
            .join('\n');
}