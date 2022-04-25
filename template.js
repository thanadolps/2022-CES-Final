import { selectedDate, setSelectedDate } from "./calendar.js"
import { event_list } from "./event.js"

/**
 * @typedef {{id: string, name: string, subject: string, type: string, date: string, difficulity: number}} Event
 */

/**
 * 
 * @param {HTMLTableCellElement} cell_element 
 * @param {Date?} date
 * @param {Event[]?} events 
 */
export function updateCalendarCell(cell_element, date, events) {
    cell_element.innerHTML = "";
    cell_element.onclick = null;
    cell_element.className = "calendar-cell";


    if (date === null) { return; }

    if (date.getDate() == selectedDate.getDate()) {
        cell_element.className += " calendar-cell-selected";
    }

    cell_element.innerHTML = `
        ${date.getDate()}
        <ul class="incell-list">
            ${(events ?? []).map(ev => `<li class="incell-text ${ev.type}">${ev.name}</li>`).join('\n')}
        </ul >
    `.trim();

    cell_element.onclick = () => {
        console.log(`Clicked ${date.toLocaleDateString('sv')}`)
        setSelectedDate(date);
        updateEventList(event_list, events);
    };
}

/**
 * 
 * @param {HTMLUListElement} event_list_element 
 * @param {Event[]?} events 
 */
export function updateEventList(event_list_element = event_list, events) {
    event_list_element.innerHTML =
        (events ?? [])
            .map(ev => `
                <li class="${ev.type}">
                    ${ev.name} |
                    ${ev.subject} | 
                    ยาก ${ev.difficulity}
                    <button onclick="deleteEvent('${ev.id}')" style="float:right">Delete</button>
                    <hr style="clear:both;"/>
                </li>
            `)
            .join('\n');
}