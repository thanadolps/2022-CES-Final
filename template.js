/**
 * 
 * @param {HTMLTableCellElement} cell 
 * @param {Date?} date
 * @param {number[]?} events 
 */
function updateCalendarCell(cell, date, events) {
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
            ${(events ?? []).map(e => `<li>${e}</li>`).join('\n')}
        </ul >
    `.trim();

    cell.onclick = () => {
        selectedDate = date;
        updateCalendar();
        updateEventList();
    };
}

/**
 * 
 * @param {HTMLUListElement} list 
 */
function updateEventList(list = event_list) {
    const events = month_events[selectedDate.getDate()] ?? [];
    list.innerHTML = events.map(e => `<li>${e}</li>`).join('\n');
}