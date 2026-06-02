console.log("Welcome to the Community Portal");

window.addEventListener("load", function() {
    alert("Welcome to the Local Community Event Portal");
    showAvailableEvents();
});

let events = [
    {
        code: "tree",
        name: "Tree Planting",
        date: "2026-06-10",
        location: "City Park",
        fee: "Free",
        seats: 25
    },
    {
        code: "health",
        name: "Health Camp",
        date: "2026-06-12",
        location: "Community Hall",
        fee: "₹50",
        seats: 40
    },
    {
        code: "blood",
        name: "Blood Donation",
        date: "2026-06-15",
        location: "Govt School",
        fee: "Free",
        seats: 30
    },
    {
        code: "yoga",
        name: "Yoga Session",
        date: "2025-06-18",
        location: "Open Ground",
        fee: "₹100",
        seats: 20
    },
    {
        code: "music",
        name: "Music Night",
        date: "2026-06-20",
        location: "Town Hall",
        fee: "₹150",
        seats: 0
    }
];

let selectedEvent = null;
let registeredEvents = [];
let registrationCount = 0;

function showAvailableEvents() {
    var eventsBody = document.getElementById("eventsBody");
    var hiddenEventMessage = document.getElementById("hiddenEventMessage");
    var today = new Date("2026-06-01");

    eventsBody.innerHTML = "";
    var hiddenCount = 0;

    events.forEach(function(eventItem) {
        var eventDate = new Date(eventItem.date);

        if (eventDate >= today && eventItem.seats > 0) {
            eventsBody.innerHTML += `
                <tr>
                    <td>${eventItem.name}</td>
                    <td>${eventItem.date}</td>
                    <td>${eventItem.location}</td>
                    <td>${eventItem.fee}</td>
                    <td>${eventItem.seats}</td>
                    <td><button type="button" onclick="selectEvent('${eventItem.code}')">Register</button></td>
                </tr>
            `;
        } else {
            hiddenCount++;
        }
    });

    if (hiddenCount > 0) {
        hiddenEventMessage.innerHTML = `${hiddenCount} event(s) hidden because they are past events or full.`;
    } else {
        hiddenEventMessage.innerHTML = "";
    }
}

function selectEvent(eventCode) {
    events.forEach(function(eventItem) {
        if (eventItem.code == eventCode) {
            selectedEvent = eventItem;
        }
    });

    if (selectedEvent != null) {
        document.getElementById("eventType").value = selectedEvent.name;
        document.getElementById("date").value = selectedEvent.date;
        document.getElementById("register").scrollIntoView();
    }
}

var eventForm = document.getElementById("eventForm");
var result = document.getElementById("result");

eventForm.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var date = document.getElementById("date").value;
        var eventType = document.getElementById("eventType").value;
        var message = document.getElementById("message").value;

        if (selectedEvent == null) {
            throw "Please select an event from Available Events.";
        }

        if (selectedEvent.seats <= 0) {
            throw "No seats available for this event.";
        }

        selectedEvent.seats--;

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

        console.log(`${registeredData.name} registered for ${registeredData.eventName}`);
    } catch (error) {
        result.style.color = "red";
        result.innerHTML = error;
        console.log("Registration error:", error);
    }
});

function showRegisteredEvents() {
    var registeredList = document.getElementById("registeredList");

    registeredList.innerHTML = "";

    registeredEvents.forEach(function(eventData) {
        var item = document.createElement("div");

        item.className = "registeredItem";
        item.innerHTML = `${eventData.name} registered for ${eventData.eventName}`;
        item.setAttribute("onclick", `showRegisteredDetails(${eventData.id})`);

        registeredList.appendChild(item);
    });
}

function showRegisteredDetails(id) {
    var registeredDetails = document.getElementById("registeredDetails");
    var eventData = null;

    registeredEvents.forEach(function(item) {
        if (item.id == id) {
            eventData = item;
        }
    });

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