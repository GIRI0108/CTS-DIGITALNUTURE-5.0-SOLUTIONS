console.log("Welcome to the Community Portal");

window.addEventListener("load", function() {
    alert("Welcome to the Local Community Event Portal");
    showAvailableEvents();
});

const treeEventName = "Tree Planting";
const treeEventDate = "2026-06-10";
const treeEventLocation = "City Park";
const treeEventFee = "Free";
let treeSeats = 25;

const healthEventName = "Health Camp";
const healthEventDate = "2026-06-12";
const healthEventLocation = "Community Hall";
const healthEventFee = "₹50";
let healthSeats = 40;

const bloodEventName = "Blood Donation";
const bloodEventDate = "2026-06-15";
const bloodEventLocation = "Govt School";
const bloodEventFee = "Free";
let bloodSeats = 30;

let selectedEvent = null;
let registeredEvents = [];
let registrationCount = 0;

function showAvailableEvents() {
    var eventsBody = document.getElementById("eventsBody");

    eventsBody.innerHTML = `
        <tr>
            <td>${treeEventName}</td>
            <td>${treeEventDate}</td>
            <td>${treeEventLocation}</td>
            <td>${treeEventFee}</td>
            <td>${treeSeats}</td>
            <td><button type="button" onclick="selectEvent('tree')">Register</button></td>
        </tr>
        <tr>
            <td>${healthEventName}</td>
            <td>${healthEventDate}</td>
            <td>${healthEventLocation}</td>
            <td>${healthEventFee}</td>
            <td>${healthSeats}</td>
            <td><button type="button" onclick="selectEvent('health')">Register</button></td>
        </tr>
        <tr>
            <td>${bloodEventName}</td>
            <td>${bloodEventDate}</td>
            <td>${bloodEventLocation}</td>
            <td>${bloodEventFee}</td>
            <td>${bloodSeats}</td>
            <td><button type="button" onclick="selectEvent('blood')">Register</button></td>
        </tr>
    `;
}

function selectEvent(eventCode) {
    if (eventCode == "tree") {
        selectedEvent = {
            code: "tree",
            name: treeEventName,
            date: treeEventDate,
            location: treeEventLocation,
            fee: treeEventFee
        };
    } else if (eventCode == "health") {
        selectedEvent = {
            code: "health",
            name: healthEventName,
            date: healthEventDate,
            location: healthEventLocation,
            fee: healthEventFee
        };
    } else if (eventCode == "blood") {
        selectedEvent = {
            code: "blood",
            name: bloodEventName,
            date: bloodEventDate,
            location: bloodEventLocation,
            fee: bloodEventFee
        };
    }

    document.getElementById("eventType").value = selectedEvent.name;
    document.getElementById("date").value = selectedEvent.date;
    document.getElementById("register").scrollIntoView();
}

var eventForm = document.getElementById("eventForm");
var result = document.getElementById("result");

eventForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var date = document.getElementById("date").value;
    var eventType = document.getElementById("eventType").value;
    var message = document.getElementById("message").value;

    if (selectedEvent == null) {
        result.style.color = "red";
        result.innerHTML = "Please select an event from Available Events.";
        return;
    }

    if (selectedEvent.code == "tree") {
        if (treeSeats <= 0) {
            result.style.color = "red";
            result.innerHTML = "No seats available for Tree Planting.";
            return;
        }

        treeSeats--;
    } else if (selectedEvent.code == "health") {
        if (healthSeats <= 0) {
            result.style.color = "red";
            result.innerHTML = "No seats available for Health Camp.";
            return;
        }

        healthSeats--;
    } else if (selectedEvent.code == "blood") {
        if (bloodSeats <= 0) {
            result.style.color = "red";
            result.innerHTML = "No seats available for Blood Donation.";
            return;
        }

        bloodSeats--;
    }

    registrationCount++;

    var registeredData = {
        id: registrationCount,
        name: name,
        email: email,
        eventName: eventType,
        eventDate: date,
        eventLocation: selectedEvent.location,
        eventFee: selectedEvent.fee,
        message: message
    };

    registeredEvents.push(registeredData);

    result.style.color = "green";
    result.innerHTML = "Form submitted successfully.";

    showAvailableEvents();
    showRegisteredEvents();

    eventForm.reset();
    selectedEvent = null;
});

function showRegisteredEvents() {
    var registeredList = document.getElementById("registeredList");

    registeredList.innerHTML = "";

    for (var i = 0; i < registeredEvents.length; i++) {
        var item = document.createElement("div");

        item.className = "registeredItem";
        item.innerHTML = `${registeredEvents[i].name} registered for ${registeredEvents[i].eventName}`;
        item.setAttribute("onclick", `showRegisteredDetails(${registeredEvents[i].id})`);

        registeredList.appendChild(item);
    }
}

function showRegisteredDetails(id) {
    var registeredDetails = document.getElementById("registeredDetails");
    var eventData = null;

    for (var i = 0; i < registeredEvents.length; i++) {
        if (registeredEvents[i].id == id) {
            eventData = registeredEvents[i];
        }
    }

    if (eventData != null) {
        registeredDetails.innerHTML = `
            <h3>Registered Event Details</h3>
            <p><b>Name:</b> ${eventData.name}</p>
            <p><b>Email:</b> ${eventData.email}</p>
            <p><b>Event:</b> ${eventData.eventName}</p>
            <p><b>Date:</b> ${eventData.eventDate}</p>
            <p><b>Location:</b> ${eventData.eventLocation}</p>
            <p><b>Fee:</b> ${eventData.eventFee}</p>
            <p><b>Message:</b> ${eventData.message}</p>
        `;
    }
}