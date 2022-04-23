import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import { eventsRef } from './api.js';
import { selectedDate, updateCalendar } from './calendar.js';

/**
 * @typedef {{name: string, subject: string, type: string, date: string}} Event
 */


export let month_events = {};
export const event_list = document.getElementById("date-event-list")

export async function refetchEvents() {
    month_events = {};
    (await getDocs(eventsRef))
        .forEach(x => {
            const data = x.data();
            if (month_events[data.date] === undefined) {
                month_events[data.date] = []
            }

            month_events[data.date].push(data);
        })
    updateCalendar();
    console.log("Fetched Events: ", month_events);
}

/**
 * 
 * @param {Event} event
 */
async function addEvent(event) {
    console.log("Added Event", event);
    await addDoc(eventsRef, event);
    // alert("Added sucess");
    refetchEvents();
}

export async function submitEvent(e) {
    e.preventDefault();

    const subject = document.getElementsByName("subject")[0].value;
    const type = document.getElementsByName("type")[0].value;
    const name = document.getElementsByName("name")[0].value;
    const date = selectedDate.toLocaleDateString();

    const newEvent = { subject, type, name, date };
    await addEvent(newEvent)
    return false;
}

window.submitEvent = submitEvent;
window.refetchEvents = refetchEvents;