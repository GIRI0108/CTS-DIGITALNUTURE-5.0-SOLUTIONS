console.log("Welcome to the Community Portal");

window.addEventListener("load", function() {
    alert("Welcome to the Local Community Event Portal");

    addEvent("tree", "Tree Planting", "2026-06-10", "City Park", "Environment", "Free", 25);
    addEvent("health", "Health Camp", "2026-06-12", "Community Hall", "Health", "₹50", 40);
    addEvent("blood", "Blood Donation", "2026-06-15", "Govt School", "Health", "Free", 30);
    addEvent("yoga", "Yoga Session", "2025-06-18", "Open Ground", "Fitness", "₹100", 20);
    addEvent("music", "Music Night", "2026-06-20", "Town Hall", "Music", "₹150", 0);

    showAvailableEvents(events);

    document.getElementById("categoryFilter").onchange = function() {
        var selectedCategory = document.getElementById("categoryFilter").value;
        var searchText = document.getElementById("searchEvent").value;

        filterEventsByCategory(selectedCategory, function(filteredEvents) {
            var searchedEvents = searchEventsByName(filteredEvents, searchText);
            showAvailableEvents(searchedEvents);
        });
    };

    document.getElementById("searchEvent").onkeyup = function() {
        var selectedCategory = document.getElementById("categoryFilter").value;
        var searchText = document.getElementById("searchEvent").value;

        filterEventsByCategory(selectedCategory, function(filteredEvents) {
            var searchedEvents = searchEventsByName(filteredEvents, searchText);
            showAvailableEvents(searchedEvents);
        });
    };
});

let events = [];
let selectedEvent = null;
let registeredEvents = [];
let registrationCount = 0;

function CommunityEvent(code, name, date, location, category, fee, seats) {
    this.code = code;
    this.name = name;
    this.date = date;
    this.location = location;
    this.category = category;
    this.fee = fee;
    this.seats = seats;
}

CommunityEvent.prototype.checkAvailability = function() {
    var today = new Date("2026-06-01");
    var eventDate = new Date(this.date);

    if (eventDate >= today && this.seats > 0) {
        return true;
    } else {
        return false;
    }
};

function addEvent(code, name, date, location, category, fee, seats) {
    var newEvent = new CommunityEvent(code, name, date, location, category, fee, seats);
    events.push(newEvent);
}

function createCategoryCounter() {
    let categoryCounts = {};

    return function(category) {
        if (categoryCounts[category] == undefined) {
            categoryCounts[category] = 1;
        } else {
            categoryCounts[category]++;
        }

        return categoryCounts[category];
    };
}

let countCategoryRegistration = createCategoryCounter();

function filterEventsByCategory(category, callback) {
    let filteredEvents = [];

    if (category == "All") {
        filteredEvents = events;
    } else {
        filteredEvents = events.filter(function(eventItem) {
            return eventItem.category == category;
        });
    }

    callback(filteredEvents);
}

function searchEventsByName(eventList, searchText) {
    return eventList.filter(function(eventItem) {
        return eventItem.name.toLowerCase().includes(searchText.toLowerCase());
    });
}

function showAvailableEvents(eventList) {
    var eventsBody = document.getElementById("eventsBody");
    var hiddenEventMessage = document.getElementById("hiddenEventMessage");

    eventsBody.innerHTML = "";
    var hiddenCount = 0;

    eventList.forEach(function(eventItem) {
        if (eventItem.checkAvailability()) {
            eventsBody.innerHTML += `
                <tr>
                    <td>${eventItem.name}</td>
                    <td>${eventItem.date}</td>
                    <td>${eventItem.location}</td>
                    <td>${eventItem.category}</td>
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
        showObjectEntries(selectedEvent);
        document.getElementById("register").scrollIntoView();
    }
}

function showObjectEntries(eventObject) {
    var objectOutput = document.getElementById("objectOutput");
    var objectData = Object.entries(eventObject);

    objectOutput.innerHTML = "<h3>Selected Event Object Details</h3>";

    objectData.forEach(function(entry) {
        objectOutput.innerHTML += `<p><b>${entry[0]}:</b> ${entry[1]}</p>`;
    });

    objectOutput.innerHTML += `<p><b>Available:</b> ${eventObject.checkAvailability()}</p>`;
}

function registerUser(name, email, date, eventType, message) {
    if (selectedEvent == null) {
        throw "Please select an event from Available Events.";
    }

    if (!selectedEvent.checkAvailability()) {
        throw "No seats available for this event.";
    }

    selectedEvent.seats--;
    registrationCount++;

    var categoryTotal = countCategoryRegistration(selectedEvent.category);

    var registeredData = {
        id: registrationCount,
        name: name,
        email: email,
        eventName: eventType,
        eventDate: date,
        eventLocation: selectedEvent.location,
        eventCategory: selectedEvent.category,
        eventFee: selectedEvent.fee,
        message: message,
        categoryTotal: categoryTotal
    };

    registeredEvents.push(registeredData);

    return registeredData;
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

        var registeredData = registerUser(name, email, date, eventType, message);

        result.style.color = "green";
        result.innerHTML = "Form submitted successfully.";

        document.getElementById("categoryCount").innerHTML =
            `${registeredData.eventCategory} category registrations: ${registeredData.categoryTotal}`;

        showAvailableEvents(events);
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
            <p><b>Category:</b> ${eventData.eventCategory}</p>
            <p><b>Fee:</b> ${eventData.eventFee}</p>
            <p><b>Message:</b> ${eventData.message}</p>
        `;
    }
}