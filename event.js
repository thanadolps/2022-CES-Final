import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
import { eventDoc, eventsRef } from './api.js';
import { selectedDate, updateCalendar } from './calendar.js';
import * as notification from "./notification.js"

/**
 * @typedef {{id: string, name: string, subject: string, type: string, date: string, difficulity: number}} Event
 */

/**
 * @type {Record<string, Event[]>}
 */
export let events_by_date = {};
export const event_list = document.getElementById("date-event-list")

/**
 * 
 * @param {Event} event
 */
export async function addEvent(event) {
    console.log("Added Event", event);
    await addDoc(eventsRef, event);
    // alert("Added sucess");
}

export async function deleteEvent(id) {
    console.log("Delete Event with id", id);
    const docRef = eventDoc(id);
    await deleteDoc(docRef);
}

export async function submitEvent(e) {
    e.preventDefault();

    const form = document.getElementById("date-event-form");
    const subject = document.getElementsByName("subject")[0].value;
    const type = document.getElementsByName("type")[0].value;
    const name = document.getElementsByName("name")[0].value;
    const difficulity = +document.getElementsByName("difficulity")[0].value;
    const date = selectedDate.toLocaleDateString('sv');

    const newEvent = { subject, type, name, date, difficulity };
    await addEvent(newEvent);
    form.reset();
    return false;
}

// Run when data in backend change
onSnapshot(eventsRef, (events_doc) => {
    // Construct events_by_date from data from backend database 
    events_by_date = {};
    events_doc
        .forEach(x => {
            const data = x.data();
            if (events_by_date[data.date] === undefined) {
                events_by_date[data.date] = []
            }

            events_by_date[data.date].push({ ...data, id: x.id });
        })

    // Update notification
    notification.cancelAll();
    for (const date in events_by_date) {
        const events = events_by_date[date];
        events.forEach(event =>
            notification.createNotification(
                event.name,
                Date.parse(event.date)
            )
        )
    }

    updateCalendar();
    console.log("Fetched Events: ", events_by_date);
})

window.submitEvent = submitEvent;
window.deleteEvent = deleteEvent;