let notificationTasks = [];

/**
 * 
 * @param {string} title
 * @param {Date} at 
 * @param {NotificationOptions?} options 
 */
export function createNotification(title, at, options) {
    const waitMs = at - new Date();
    if (waitMs < 0) { return; }

    const d = new Date()
    d.setSeconds(d.getSeconds() + waitMs / 1000);

    console.log("Add notifiation", title, "at", d, `(in ${waitMs} ms)`);
    const taskId = setTimeout(() => {
        new Notification(title, options)
    }, waitMs);
    notificationTasks.push(taskId);
}

export function cancelAll() {
    console.log("Cancel notification");
    notificationTasks.forEach(id => window.clearTimeout(id))
    notificationTasks = [];
}


document.addEventListener('mouseover', () =>
    Notification.requestPermission().then(status => console.log("Notification permission", status))
    , { once: true }
);