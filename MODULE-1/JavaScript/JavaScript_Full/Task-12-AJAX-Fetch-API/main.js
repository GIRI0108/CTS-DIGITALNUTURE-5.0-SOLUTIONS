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
});

let events = [];
let selectedEvent = null;
let registeredEvents = [];
let registrationCount = 0;

function CommunityEvent(code, name, date, location, category, fee = "Free", seats = 10) {
    this.code = code;
    this.name = name;
    this.date = date;
    this.location = location;
    this.category = category;
    this.fee = fee;
    this.seats = seats;
}

CommunityEvent.prototype.checkAvailability = function() {
    const today = new Date("2026-06-01");
    const eventDate = new Date(this.date);

    return eventDate >= today && this.seats > 0;
};

function addEvent(code, name, date, location, category, fee = "Free", seats = 10) {
    const exists = events.some(function(eventItem) {
        return eventItem.code == code;
    });

    if (!exists) {
        const newEvent = new CommunityEvent(code, name, date, location, category, fee, seats);
        events.push(newEvent);
        addEventOption(name);
    }
}

function addEventOption(eventName = "") {
    const eventType = document.querySelector("#eventType");
    let alreadyExists = false;

    for (let i = 0; i < eventType.options.length; i++) {
        if (eventType.options[i].value == eventName) {
            alreadyExists = true;
        }
    }

    if (!alreadyExists && eventName != "") {
        const option = document.createElement("option");
        option.value = eventName;
        option.text = eventName;
        eventType.appendChild(option);
    }
}

function createCategoryCounter() {
    const categoryCounts = {};

    return function(category = "General") {
        if (categoryCounts[category] == undefined) {
            categoryCounts[category] = 1;
        } else {
            categoryCounts[category]++;
        }

        return categoryCounts[category];
    };
}

const countCategoryRegistration = createCategoryCounter();

function filterEventsByCategory(category = "All", callback = showAvailableEvents) {
    const clonedEvents = [...events];

    let filteredEvents = [];

    if (category == "All") {
        filteredEvents = clonedEvents;
    } else {
        filteredEvents = clonedEvents.filter(function(eventItem) {
            const { category: eventCategory } = eventItem;
            return eventCategory == category;
        });
    }

    callback(filteredEvents);
}

function searchEventsByName(eventList = [], searchText = "") {
    const clonedList = [...eventList];

    return clonedList.filter(function(eventItem) {
        const { name } = eventItem;
        return name.toLowerCase().includes(searchText.toLowerCase());
    });
}

document.querySelector("#categoryFilter").addEventListener("change", function() {
    applyFilters();
});

document.querySelector("#searchEvent").addEventListener("keydown", function() {
    setTimeout(function() {
        applyFilters();
    }, 0);
});

function applyFilters() {
    const selectedCategory = document.querySelector("#categoryFilter").value;
    const searchText = document.querySelector("#searchEvent").value;

    filterEventsByCategory(selectedCategory, function(filteredEvents) {
        const searchedEvents = searchEventsByName(filteredEvents, searchText);
        showAvailableEvents(searchedEvents);
        showDynamicEventCards(searchedEvents);
    });
}

function showAvailableEvents(eventList = []) {
    const eventsBody = document.querySelector("#eventsBody");
    const hiddenEventMessage = document.querySelector("#hiddenEventMessage");

    eventsBody.innerHTML = "";
    let hiddenCount = 0;

    eventList.forEach(function(eventItem) {
        const { code, name, date, location, category, fee, seats } = eventItem;

        if (eventItem.checkAvailability()) {
            eventsBody.innerHTML += `
                <tr>
                    <td>${name}</td>
                    <td>${date}</td>
                    <td>${location}</td>
                    <td>${category}</td>
                    <td>${fee}</td>
                    <td>${seats}</td>
                    <td>
                        <button type="button" class="detailsBtn" onclick="showEventDetails('${code}')">Details</button>
                        <button type="button" onclick="selectEvent('${code}')">Register</button>
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

function showDynamicEventCards(eventList = []) {
    const cardsContainer = document.querySelector("#cardsContainer");
    cardsContainer.innerHTML = "";

    eventList.forEach(function(eventItem) {
        const { code, name, date, location, fee, seats } = eventItem;

        if (eventItem.checkAvailability()) {
            const card = document.createElement("div");
            card.className = "dynamicCard";

            const title = document.createElement("h3");
            title.innerHTML = name;

            const dateText = document.createElement("p");
            dateText.innerHTML = "<b>Date:</b> " + date;

            const locationText = document.createElement("p");
            locationText.innerHTML = "<b>Location:</b> " + location;

            const feeText = document.createElement("p");
            feeText.innerHTML = "<b>Fee:</b> " + fee;

            const seatsText = document.createElement("p");
            seatsText.innerHTML = "<b>Seats:</b> " + seats;

            const detailsButton = document.createElement("button");
            detailsButton.innerHTML = "Details";
            detailsButton.className = "detailsBtn";
            detailsButton.onclick = function() {
                showEventDetails(code);
            };

            const registerButton = document.createElement("button");
            registerButton.innerHTML = "Register";
            registerButton.onclick = function() {
                selectEvent(code);
            };

            card.appendChild(title);
            card.appendChild(dateText);
            card.appendChild(locationText);
            card.appendChild(feeText);
            card.appendChild(seatsText);
            card.appendChild(detailsButton);
            card.appendChild(registerButton);

            cardsContainer.appendChild(card);
        }
    });
}

function findEventByCode(eventCode = "") {
    return events.find(function(eventItem) {
        return eventItem.code == eventCode;
    });
}

function showEventDetails(eventCode = "") {
    const eventItem = findEventByCode(eventCode);

    if (eventItem != null) {
        showObjectEntries(eventItem);
        document.querySelector("#eventObjectDetails").scrollIntoView();
    }
}

function selectEvent(eventCode = "") {
    selectedEvent = findEventByCode(eventCode);

    if (selectedEvent != null) {
        const { name, date } = selectedEvent;

        document.querySelector("#eventType").value = name;
        document.querySelector("#date").value = date;

        clearFormErrors();
        showObjectEntries(selectedEvent);
        document.querySelector("#register").scrollIntoView();
    }
}

function showObjectEntries(eventObject = {}) {
    const objectOutput = document.querySelector("#objectOutput");
    const objectData = Object.entries(eventObject);

    objectOutput.innerHTML = "<h3>Event Details</h3>";

    objectData.forEach(function(entry) {
        const [key, value] = entry;
        objectOutput.innerHTML += `<p><b>${key}:</b> ${value}</p>`;
    });

    objectOutput.innerHTML += `<p><b>Available:</b> ${eventObject.checkAvailability()}</p>`;
}

function registerUser(name = "", email = "", date = "", eventType = "", message = "") {
    if (selectedEvent == null) {
        throw "Please select an event from Available Events.";
    }

    if (!selectedEvent.checkAvailability()) {
        throw "No seats available for this event.";
    }

    selectedEvent.seats--;
    registrationCount++;

    const { code, location, category, fee } = selectedEvent;
    const categoryTotal = countCategoryRegistration(category);

    const registeredData = {
        id: registrationCount,
        eventCode: code,
        name: name,
        email: email,
        eventName: eventType,
        eventDate: date,
        eventLocation: location,
        eventCategory: category,
        eventFee: fee,
        message: message,
        categoryTotal: categoryTotal
    };

    registeredEvents.push(registeredData);

    return registeredData;
}

const eventForm = document.querySelector("#eventForm");
const result = document.querySelector("#result");

eventForm.addEventListener("submit", function(event) {
    event.preventDefault();

    clearFormErrors();

    const form = event.target;
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const date = form.elements["date"].value;
    const eventType = form.elements["eventType"].value;
    const message = form.elements["message"].value.trim();

    const valid = validateRegistrationForm(name, email, date, eventType);

    if (!valid) {
        result.style.color = "red";
        result.innerHTML = "Please correct the errors above.";
        return;
    }

    try {
        const registeredData = registerUser(name, email, date, eventType, message);
        const { eventCategory, categoryTotal } = registeredData;

        result.style.color = "green";
        result.innerHTML = "Form submitted successfully.";

        document.querySelector("#categoryCount").innerHTML =
            `${eventCategory} category registrations: ${categoryTotal}`;

        updateFullUI();
        sendRegistrationToServer(registeredData);

        eventForm.reset();
        selectedEvent = null;

        console.log(`${registeredData.name} registered for ${registeredData.eventName}`);
    } catch (error) {
        result.style.color = "red";
        result.innerHTML = error;
        console.log("Registration error:", error);
    }
});

function validateRegistrationForm(name, email, date, eventType) {
    let valid = true;

    const namePattern = /^[A-Za-z ]{3,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name == "") {
        showFieldError("name", "nameError", "Name is required.");
        valid = false;
    } else if (!namePattern.test(name)) {
        showFieldError("name", "nameError", "Name must contain only letters and minimum 3 characters.");
        valid = false;
    }

    if (email == "") {
        showFieldError("email", "emailError", "Email is required.");
        valid = false;
    } else if (!emailPattern.test(email)) {
        showFieldError("email", "emailError", "Enter a valid email address like abc@gmail.com.");
        valid = false;
    }

    if (date == "") {
        showFieldError("date", "dateError", "Event date is required.");
        valid = false;
    }

    if (eventType == "") {
        showFieldError("eventType", "eventTypeError", "Please select an event.");
        valid = false;
    }

    return valid;
}

function showFieldError(inputId, errorId, message) {
    document.querySelector("#" + errorId).innerHTML = message;
    document.querySelector("#" + inputId).classList.add("inputError");
}

function clearFormErrors() {
    document.querySelector("#nameError").innerHTML = "";
    document.querySelector("#emailError").innerHTML = "";
    document.querySelector("#dateError").innerHTML = "";
    document.querySelector("#eventTypeError").innerHTML = "";

    document.querySelector("#name").classList.remove("inputError");
    document.querySelector("#email").classList.remove("inputError");
    document.querySelector("#date").classList.remove("inputError");
    document.querySelector("#eventType").classList.remove("inputError");

    const serverMessage = document.querySelector("#serverMessage");
    serverMessage.innerHTML = "";
    serverMessage.className = "";
}

function updateFullUI() {
    applyFilters();
    showRegisteredEvents();
}

function showRegisteredEvents() {
    const registeredList = document.querySelector("#registeredList");

    registeredList.innerHTML = "";

    registeredEvents.forEach(function(eventData) {
        const { id, name, eventName } = eventData;

        const item = document.createElement("div");
        item.className = "registeredItem";

        const text = document.createElement("p");
        text.innerHTML = `${name} registered for ${eventName}`;

        const detailsButton = document.createElement("button");
        detailsButton.innerHTML = "View Details";
        detailsButton.className = "detailsBtn";
        detailsButton.onclick = function() {
            showRegisteredDetails(id);
        };

        const cancelButton = document.createElement("button");
        cancelButton.innerHTML = "Cancel";
        cancelButton.className = "cancelBtn";
        cancelButton.onclick = function() {
            cancelRegistration(id);
        };

        item.appendChild(text);
        item.appendChild(detailsButton);
        item.appendChild(cancelButton);

        registeredList.appendChild(item);
    });
}

function showRegisteredDetails(id = 0) {
    const registeredDetails = document.querySelector("#registeredDetails");

    const eventData = registeredEvents.find(function(item) {
        return item.id == id;
    });

    if (eventData != null) {
        const {
            name,
            email,
            eventName,
            eventDate,
            eventLocation,
            eventCategory,
            eventFee,
            message
        } = eventData;

        registeredDetails.innerHTML = `
            <h3>Registered Event Details</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Event:</b> ${eventName}</p>
            <p><b>Date:</b> ${eventDate}</p>
            <p><b>Location:</b> ${eventLocation}</p>
            <p><b>Category:</b> ${eventCategory}</p>
            <p><b>Fee:</b> ${eventFee}</p>
            <p><b>Message:</b> ${message}</p>
        `;
    }
}

function cancelRegistration(id = 0) {
    const cancelledEvent = registeredEvents.find(function(item) {
        return item.id == id;
    });

    if (cancelledEvent != null) {
        const originalEvent = findEventByCode(cancelledEvent.eventCode);

        if (originalEvent != null) {
            originalEvent.seats++;
        }

        registeredEvents = registeredEvents.filter(function(item) {
            return item.id != id;
        });

        document.querySelector("#registeredDetails").innerHTML = "";
        result.style.color = "green";
        result.innerHTML = "Registration cancelled successfully.";

        updateFullUI();
    }
}

function addEventFromPopup() {
    const name = prompt("Enter event name:");
    const date = prompt("Enter event date in YYYY-MM-DD format:");
    const location = prompt("Enter event location:");
    const category = prompt("Enter event category:");
    const fee = prompt("Enter event fee:");
    const seatsText = prompt("Enter available seats:");

    if (name == null || date == null || location == null || category == null || fee == null || seatsText == null) {
        return;
    }

    if (name == "" || date == "" || location == "" || category == "" || fee == "" || seatsText == "") {
        document.querySelector("#arrayOutput").innerHTML = "<p>Please enter all event details.</p>";
        return;
    }

    const seats = Number(seatsText);

    if (isNaN(seats) || seats <= 0) {
        document.querySelector("#arrayOutput").innerHTML = "<p>Please enter valid seats.</p>";
        return;
    }

    const code = name.toLowerCase().replaceAll(" ", "") + Date.now();

    addEvent(code, name, date, location, category, fee, seats);
    applyFilters();

    document.querySelector("#arrayOutput").innerHTML =
        `<p>${name} added successfully.</p>`;
}

function showEventSummaryCards() {
    const clonedEvents = [...events];

    const formattedCards = clonedEvents.map(function(eventItem) {
        const { name, date, location, category, fee, seats } = eventItem;

        return `
            <div class="arrayCard">
                <h3>${name}</h3>
                <p><b>Date:</b> ${date}</p>
                <p><b>Location:</b> ${location}</p>
                <p><b>Category:</b> ${category}</p>
                <p><b>Fee:</b> ${fee}</p>
                <p><b>Seats:</b> ${seats}</p>
            </div>
        `;
    });

    document.querySelector("#arrayOutput").innerHTML =
        "<h3>Event Summary Cards</h3>" + formattedCards.join("");
}

function showLoading() {
    document.querySelector("#loadingBox").style.display = "block";
}

function hideLoading() {
    document.querySelector("#loadingBox").style.display = "none";
}

function showRemoteEvents(remoteEvents = [], methodName = "fetch") {
    const remoteEventsContainer = document.querySelector("#remoteEventsContainer");
    remoteEventsContainer.innerHTML = "";

    remoteEvents.forEach(function(eventItem) {
        const { name, date, location, category, fee, seats } = eventItem;

        const card = document.createElement("div");
        card.className = "remoteCard";

        card.innerHTML = `
            <span class="remoteBadge">Loaded using ${methodName}</span>
            <h3>${name}</h3>
            <p><b>Date:</b> ${date}</p>
            <p><b>Location:</b> ${location}</p>
            <p><b>Category:</b> ${category}</p>
            <p><b>Fee:</b> ${fee}</p>
            <p><b>Seats:</b> ${seats}</p>
        `;

        remoteEventsContainer.appendChild(card);
    });
}

function addRemoteEventsToMainList(remoteEvents = []) {
    const clonedRemoteEvents = [...remoteEvents];

    clonedRemoteEvents.forEach(function(eventItem) {
        const { code, name, date, location, category, fee, seats } = eventItem;
        addEvent(code, name, date, location, category, fee, seats);
    });

    applyFilters();
}

function loadEventsUsingThen() {
    const remoteMessage = document.querySelector("#remoteMessage");

    remoteMessage.style.color = "#003366";
    remoteMessage.innerHTML = "Loading other events using then/catch...";

    fetch("events.json")
        .then(function(response) {
            if (!response.ok) {
                throw "Unable to load event data.";
            }

            return response.json();
        })
        .then(function(data) {
            showRemoteEvents(data, "then/catch");
            addRemoteEventsToMainList(data);

            remoteMessage.style.color = "green";
            remoteMessage.innerHTML = "Other events loaded successfully using then/catch.";
        })
        .catch(function(error) {
            remoteMessage.style.color = "red";
            remoteMessage.innerHTML = error;
            console.log("Fetch error:", error);
        });
}

async function loadEventsUsingAsync() {
    const remoteMessage = document.querySelector("#remoteMessage");

    try {
        showLoading();

        remoteMessage.style.color = "#003366";
        remoteMessage.innerHTML = "Loading other events using async/await...";

        const response = await fetch("events.json");

        if (!response.ok) {
            throw "Unable to load event data.";
        }

        const data = await response.json();

        showRemoteEvents(data, "async/await");
        addRemoteEventsToMainList(data);

        remoteMessage.style.color = "green";
        remoteMessage.innerHTML = "Other events loaded successfully using async/await.";
    } catch (error) {
        remoteMessage.style.color = "red";
        remoteMessage.innerHTML = error;
        console.log("Async fetch error:", error);
    } finally {
        hideLoading();
    }
}

function sendRegistrationToServer(userData) {
    const serverMessage = document.querySelector("#serverMessage");

    serverMessage.className = "serverLoading";
    serverMessage.innerHTML = "Sending registration to server...";

    setTimeout(function() {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(function(response) {
                if (!response.ok) {
                    throw "Server request failed.";
                }

                return response.json();
            })
            .then(function(data) {
                serverMessage.className = "serverSuccess";
                serverMessage.innerHTML = "Registration sent to mock server successfully. Server ID: " + data.id;
            })
            .catch(function(error) {
                serverMessage.className = "serverError";
                serverMessage.innerHTML = "Failed to send registration to server.";
                console.log("POST error:", error);
            });
    }, 1500);
}