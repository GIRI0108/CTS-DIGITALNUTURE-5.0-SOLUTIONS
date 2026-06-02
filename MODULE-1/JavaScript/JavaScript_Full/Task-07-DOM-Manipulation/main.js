console.log("Welcome to the Community Portal");

window.addEventListener("load", function() {
    alert("Welcome to the Local Community Event Portal");

    addEvent("tree", "Tree Planting", "2026-06-10", "City Park", "Environment", "Free", 25);
    addEvent("health", "Health Camp", "2026-06-12", "Community Hall", "Health", "₹50", 40);
    addEvent("blood", "Blood Donation", "2026-06-15", "Govt School", "Health", "Free", 30);
    addEvent("yoga", "Yoga Session", "2025-06-18", "Open Ground", "Fitness", "₹100", 20);
    addEvent("music", "Music Night", "2026-06-20", "Town Hall", "Music", "₹150", 5);

    showAvailableEvents(events);
    showDynamicEventCards(events);

    document.querySelector("#categoryFilter").onchange = function() {
        applyFilters();
    };

    document.querySelector("#searchEvent").onkeyup = function() {
        applyFilters();
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
    addEventOption(name);
}

function addEventOption(eventName) {
    var eventType = document.querySelector("#eventType");
    var alreadyExists = false;

    for (var i = 0; i < eventType.options.length; i++) {
        if (eventType.options[i].value == eventName) {
            alreadyExists = true;
        }
    }

    if (!alreadyExists) {
        var option = document.createElement("option");
        option.value = eventName;
        option.text = eventName;
        eventType.appendChild(option);
    }
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

function applyFilters() {
    var selectedCategory = document.querySelector("#categoryFilter").value;
    var searchText = document.querySelector("#searchEvent").value;

    filterEventsByCategory(selectedCategory, function(filteredEvents) {
        var searchedEvents = searchEventsByName(filteredEvents, searchText);
        showAvailableEvents(searchedEvents);
        showDynamicEventCards(searchedEvents);
    });
}

function showAvailableEvents(eventList) {
    var eventsBody = document.querySelector("#eventsBody");
    var hiddenEventMessage = document.querySelector("#hiddenEventMessage");

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
                    <td>
                        <button type="button" class="detailsBtn" onclick="showEventDetails('${eventItem.code}')">Details</button>
                        <button type="button" onclick="selectEvent('${eventItem.code}')">Register</button>
                    </td>
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

function showDynamicEventCards(eventList) {
    var cardsContainer = document.querySelector("#cardsContainer");
    cardsContainer.innerHTML = "";

    eventList.forEach(function(eventItem) {
        if (eventItem.checkAvailability()) {
            var card = document.createElement("div");
            card.className = "dynamicCard";

            var title = document.createElement("h3");
            title.innerHTML = eventItem.name;

            var date = document.createElement("p");
            date.innerHTML = "<b>Date:</b> " + eventItem.date;

            var location = document.createElement("p");
            location.innerHTML = "<b>Location:</b> " + eventItem.location;

            var fee = document.createElement("p");
            fee.innerHTML = "<b>Fee:</b> " + eventItem.fee;

            var seats = document.createElement("p");
            seats.innerHTML = "<b>Seats:</b> " + eventItem.seats;

            var detailsButton = document.createElement("button");
            detailsButton.innerHTML = "Details";
            detailsButton.className = "detailsBtn";
            detailsButton.onclick = function() {
                showEventDetails(eventItem.code);
            };

            var registerButton = document.createElement("button");
            registerButton.innerHTML = "Register";
            registerButton.onclick = function() {
                selectEvent(eventItem.code);
            };

            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(location);
            card.appendChild(fee);
            card.appendChild(seats);
            card.appendChild(detailsButton);
            card.appendChild(registerButton);

            cardsContainer.appendChild(card);
        }
    });
}

function findEventByCode(eventCode) {
    var foundEvent = null;

    events.forEach(function(eventItem) {
        if (eventItem.code == eventCode) {
            foundEvent = eventItem;
        }
    });

    return foundEvent;
}

function showEventDetails(eventCode) {
    var eventItem = findEventByCode(eventCode);

    if (eventItem != null) {
        showObjectEntries(eventItem);
        document.querySelector("#eventObjectDetails").scrollIntoView();
    }
}

function selectEvent(eventCode) {
    selectedEvent = findEventByCode(eventCode);

    if (selectedEvent != null) {
        document.querySelector("#eventType").value = selectedEvent.name;
        document.querySelector("#date").value = selectedEvent.date;
        showObjectEntries(selectedEvent);
        document.querySelector("#register").scrollIntoView();
    }
}

function showObjectEntries(eventObject) {
    var objectOutput = document.querySelector("#objectOutput");
    var objectData = Object.entries(eventObject);

    objectOutput.innerHTML = "<h3>Event Details</h3>";

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
        eventCode: selectedEvent.code,
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

var eventForm = document.querySelector("#eventForm");
var result = document.querySelector("#result");

eventForm.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        var name = document.querySelector("#name").value;
        var email = document.querySelector("#email").value;
        var date = document.querySelector("#date").value;
        var eventType = document.querySelector("#eventType").value;
        var message = document.querySelector("#message").value;

        var registeredData = registerUser(name, email, date, eventType, message);

        result.style.color = "green";
        result.innerHTML = "Form submitted successfully.";

        document.querySelector("#categoryCount").innerHTML =
            `${registeredData.eventCategory} category registrations: ${registeredData.categoryTotal}`;

        updateFullUI();

        eventForm.reset();
        selectedEvent = null;

        console.log(`${registeredData.name} registered for ${registeredData.eventName}`);
    } catch (error) {
        result.style.color = "red";
        result.innerHTML = error;
        console.log("Registration error:", error);
    }
});

function updateFullUI() {
    applyFilters();
    showRegisteredEvents();
}

function showRegisteredEvents() {
    var registeredList = document.querySelector("#registeredList");

    registeredList.innerHTML = "";

    registeredEvents.forEach(function(eventData) {
        var item = document.createElement("div");
        item.className = "registeredItem";

        var text = document.createElement("p");
        text.innerHTML = `${eventData.name} registered for ${eventData.eventName}`;

        var detailsButton = document.createElement("button");
        detailsButton.innerHTML = "View Details";
        detailsButton.className = "detailsBtn";
        detailsButton.onclick = function() {
            showRegisteredDetails(eventData.id);
        };

        var cancelButton = document.createElement("button");
        cancelButton.innerHTML = "Cancel";
        cancelButton.className = "cancelBtn";
        cancelButton.onclick = function() {
            cancelRegistration(eventData.id);
        };

        item.appendChild(text);
        item.appendChild(detailsButton);
        item.appendChild(cancelButton);

        registeredList.appendChild(item);
    });
}

function showRegisteredDetails(id) {
    var registeredDetails = document.querySelector("#registeredDetails");
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

function cancelRegistration(id) {
    var cancelledEvent = null;

    registeredEvents.forEach(function(item) {
        if (item.id == id) {
            cancelledEvent = item;
        }
    });

    if (cancelledEvent != null) {
        var originalEvent = findEventByCode(cancelledEvent.eventCode);

        if (originalEvent != null) {
            originalEvent.seats++;
        }

        registeredEvents = registeredEvents.filter(function(item) {
            return item.id != id;
        });

        document.querySelector("#registeredDetails").innerHTML = "";
        document.querySelector("#result").style.color = "green";
        document.querySelector("#result").innerHTML = "Registration cancelled successfully.";

        updateFullUI();
    }
}

function addEventFromPopup() {
    var name = prompt("Enter event name:");
    var date = prompt("Enter event date in YYYY-MM-DD format:");
    var location = prompt("Enter event location:");
    var category = prompt("Enter event category:");
    var fee = prompt("Enter event fee:");
    var seatsText = prompt("Enter available seats:");

    if (name == null || date == null || location == null || category == null || fee == null || seatsText == null) {
        return;
    }

    if (name == "" || date == "" || location == "" || category == "" || fee == "" || seatsText == "") {
        document.querySelector("#arrayOutput").innerHTML = "<p>Please enter all event details.</p>";
        return;
    }

    var seats = Number(seatsText);

    if (isNaN(seats) || seats <= 0) {
        document.querySelector("#arrayOutput").innerHTML = "<p>Please enter valid seats.</p>";
        return;
    }

    var code = name.toLowerCase().replaceAll(" ", "") + Date.now();

    addEvent(code, name, date, location, category, fee, seats);
    applyFilters();

    document.querySelector("#arrayOutput").innerHTML =
        `<p>${name} added successfully.</p>`;
}

function showEventSummaryCards() {
    var formattedCards = events.map(function(eventItem) {
        return `
            <div class="arrayCard">
                <h3>${eventItem.name}</h3>
                <p><b>Date:</b> ${eventItem.date}</p>
                <p><b>Location:</b> ${eventItem.location}</p>
                <p><b>Category:</b> ${eventItem.category}</p>
                <p><b>Fee:</b> ${eventItem.fee}</p>
                <p><b>Seats:</b> ${eventItem.seats}</p>
            </div>
        `;
    });

    document.querySelector("#arrayOutput").innerHTML =
        "<h3>Event Summary Cards</h3>" + formattedCards.join("");
}