/* ======================================
   SAMPLE BUS DATA
====================================== */

const buses = [

    {
        id: 1,

        name: "Airavat Club Class",

        number: "KA-01-F-1234",

        type: "ac",

        typeName: "AC",

        source: "Belagavi",

        destination: "Bengaluru",

        departure: "20:30",

        arrival: "06:30",

        duration: "10h",

        fare: 850,

        stops: [
            "Belagavi",
            "Dharwad",
            "Hubballi",
            "Davangere",
            "Tumakuru",
            "Bengaluru"
        ],

        coordinates: [
            [15.8497, 74.4977],
            [15.4589, 75.0078],
            [15.3647, 75.1240],
            [14.4644, 75.9218],
            [13.3379, 77.1173],
            [12.9716, 77.5946]
        ]
    },


    {
        id: 2,

        name: "Rajahamsa Executive",

        number: "KA-22-B-5678",

        type: "express",

        typeName: "Express",

        source: "Belagavi",

        destination: "Bengaluru",

        departure: "18:00",

        arrival: "05:30",

        duration: "11h 30m",

        fare: 620,

        stops: [
            "Belagavi",
            "Dharwad",
            "Hubballi",
            "Haveri",
            "Davangere",
            "Bengaluru"
        ],

        coordinates: [
            [15.8497, 74.4977],
            [15.4589, 75.0078],
            [15.3647, 75.1240],
            [14.7951, 75.3999],
            [14.4644, 75.9218],
            [12.9716, 77.5946]
        ]
    },


    {
        id: 3,

        name: "KSRTC Express",

        number: "KA-25-C-9012",

        type: "ordinary",

        typeName: "Ordinary",

        source: "Belagavi",

        destination: "Bengaluru",

        departure: "07:00",

        arrival: "18:00",

        duration: "11h",

        fare: 480,

        stops: [
            "Belagavi",
            "Dharwad",
            "Hubballi",
            "Ranebennur",
            "Davangere",
            "Chitradurga",
            "Tumakuru",
            "Bengaluru"
        ],

        coordinates: [
            [15.8497, 74.4977],
            [15.4589, 75.0078],
            [15.3647, 75.1240],
            [14.6197, 75.6213],
            [14.4644, 75.9218],
            [14.2267, 76.4003],
            [13.3379, 77.1173],
            [12.9716, 77.5946]
        ]
    },


    {
        id: 4,

        name: "Airavat Multi Axle",

        number: "KA-01-G-4455",

        type: "ac",

        typeName: "AC",

        source: "Bengaluru",

        destination: "Mysuru",

        departure: "09:30",

        arrival: "12:30",

        duration: "3h",

        fare: 550,

        stops: [
            "Bengaluru",
            "Kengeri",
            "Mandya",
            "Srirangapatna",
            "Mysuru"
        ],

        coordinates: [
            [12.9716, 77.5946],
            [12.9081, 77.4875],
            [12.5222, 76.8970],
            [12.4186, 76.6947],
            [12.2958, 76.6394]
        ]
    },


    {
        id: 5,

        name: "Express Service",

        number: "KA-09-D-8899",

        type: "express",

        typeName: "Express",

        source: "Bengaluru",

        destination: "Mysuru",

        departure: "14:00",

        arrival: "17:15",

        duration: "3h 15m",

        fare: 350,

        stops: [
            "Bengaluru",
            "Bidadi",
            "Ramanagara",
            "Mandya",
            "Mysuru"
        ],

        coordinates: [
            [12.9716, 77.5946],
            [12.8002, 77.3842],
            [12.7218, 77.2815],
            [12.5222, 76.8970],
            [12.2958, 76.6394]
        ]
    }

];


/* ======================================
   HOME PAGE SEARCH
====================================== */

function searchBuses() {

    const source =
        document
        .getElementById("source")
        ?.value
        .trim();

    const destination =
        document
        .getElementById("destination")
        ?.value
        .trim();

    const busType =
        document
        .getElementById("busType")
        ?.value;


    if (!source || !destination) {

        alert(
            "Please enter both starting location and destination."
        );

        return;

    }


    localStorage.setItem(
        "searchSource",
        source
    );

    localStorage.setItem(
        "searchDestination",
        destination
    );

    localStorage.setItem(
        "searchBusType",
        busType
    );


    window.location.href =
        "results.html";

}


/* ======================================
   QUICK SEARCH
====================================== */

function quickSearch(source, destination) {

    localStorage.setItem(
        "searchSource",
        source
    );

    localStorage.setItem(
        "searchDestination",
        destination
    );

    localStorage.setItem(
        "searchBusType",
        "all"
    );

    window.location.href =
        "results.html";

}


/* ======================================
   SWAP LOCATIONS
====================================== */

function swapLocations() {

    const source =
        document.getElementById("source");

    const destination =
        document.getElementById("destination");


    if (!source || !destination)
        return;


    const temp =
        source.value;

    source.value =
        destination.value;

    destination.value =
        temp;

}


/* ======================================
   DISPLAY RESULTS
====================================== */

function displayResults() {

    const container =
        document.getElementById(
            "busResults"
        );

    if (!container)
        return;


    const source =
        localStorage.getItem(
            "searchSource"
        ) || "";


    const destination =
        localStorage.getItem(
            "searchDestination"
        ) || "";


    const filter =
        document.getElementById(
            "filterType"
        )?.value || "all";


    const sort =
        document.getElementById(
            "sortBus"
        )?.value || "departure";


    let filtered =
        buses.filter(bus => {

            const routeMatch =

                bus.source
                .toLowerCase()
                .includes(
                    source.toLowerCase()
                )

                &&

                bus.destination
                .toLowerCase()
                .includes(
                    destination.toLowerCase()
                );


            const typeMatch =
                filter === "all"
                ||
                bus.type === filter;


            return routeMatch && typeMatch;

        });


    /*
        If exact route isn't found,
        show all buses for demo purposes.
    */

    if (filtered.length === 0) {

        filtered =
            buses.filter(bus => {

                return (
                    bus.type === filter
                    ||
                    filter === "all"
                );

            });

    }


    /* SORT */

    if (sort === "fare") {

        filtered.sort(
            (a,b) =>
                a.fare - b.fare
        );

    }


    if (sort === "duration") {

        filtered.sort(
            (a,b) =>
                parseDuration(a.duration)
                -
                parseDuration(b.duration)
        );

    }


    if (sort === "departure") {

        filtered.sort(
            (a,b) =>
                a.departure
                .localeCompare(
                    b.departure
                )
        );

    }


    container.innerHTML = "";


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="bus-card">

                <h2>
                    No buses found
                </h2>

                <p>
                    Try another source,
                    destination or bus type.
                </p>

            </div>

        `;

        return;

    }


    filtered.forEach(bus => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "bus-card";


        card.innerHTML = `

            <div class="bus-top">

                <div>

                    <div class="bus-name">

                        ${bus.name}

                    </div>

                    <span class="bus-type">

                        ${bus.typeName}

                    </span>

                </div>

                <strong>

                    ₹${bus.fare}

                </strong>

            </div>


            <div class="bus-route">

                <div>

                    <div class="bus-time">

                        ${bus.departure}

                    </div>

                    <div class="bus-location">

                        ${bus.source}

                    </div>

                </div>


                <div class="route-line">

                    ───── 🚌 ─────

                    <br>

                    ${bus.duration}

                </div>


                <div>

                    <div class="bus-time">

                        ${bus.arrival}

                    </div>

                    <div class="bus-location">

                        ${bus.destination}

                    </div>

                </div>

            </div>


            <div class="bus-info">

                <span>
                    🚌 ${bus.number}
                </span>

                <span>
                    📍 ${bus.stops.length} stops
                </span>

                <span>
                    ⏱️ ${bus.duration}
                </span>

            </div>


            <a
                href="details.html?id=${bus.id}"
                class="view-btn"
            >

                View Route & Details →

            </a>

        `;


        container.appendChild(card);

    });

}


/* ======================================
   PARSE DURATION
====================================== */

function parseDuration(duration) {

    let hours = 0;
    let minutes = 0;


    const h =
        duration.match(
            /(\d+)h/
        );

    const m =
        duration.match(
            /(\d+)m/
        );


    if (h)
        hours =
            parseInt(h[1]);


    if (m)
        minutes =
            parseInt(m[1]);


    return hours * 60 + minutes;

}


/* ======================================
   DETAILS PAGE
====================================== */

function loadDetails() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        parseInt(
            params.get("id")
        );


    const bus =
        buses.find(
            item => item.id === id
        );


    if (!bus)
        return;


    const details =
        document.getElementById(
            "busDetails"
        );


    details.innerHTML = `

        <div class="details-main">

            <div>

                <span class="small-title">

                    ${bus.typeName.toUpperCase()}

                </span>

                <h1>

                    ${bus.name}

                </h1>

                <p>

                    🚌 ${bus.number}

                </p>

            </div>


            <div>

                <div class="bus-time">

                    ₹${bus.fare}

                </div>

                <p>

                    Estimated Fare

                </p>

            </div>

        </div>


        <div class="detail-stats">

            <div class="stat">

                <span>
                    DEPARTURE
                </span>

                <strong>
                    ${bus.departure}
                </strong>

                <p>
                    ${bus.source}
                </p>

            </div>


            <div class="stat">

                <span>
                    JOURNEY TIME
                </span>

                <strong>
                    ${bus.duration}
                </strong>

                <p>
                    Estimated
                </p>

            </div>


            <div class="stat">

                <span>
                    ARRIVAL
                </span>

                <strong>
                    ${bus.arrival}
                </strong>

                <p>
                    ${bus.destination}
                </p>

            </div>

        </div>

    `;


    const route =
        document.getElementById(
            "routeStops"
        );


    route.innerHTML = "";


    bus.stops.forEach(
        (stop,index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "stop";


            div.innerHTML = `

                <div class="stop-dot"></div>

                <div>

                    <h3>

                        ${stop}

                    </h3>

                    <p>

                        ${
                            index === 0
                            ? "Starting Point"
                            :
                            index ===
                            bus.stops.length - 1
                            ? "Destination"
                            : "Intermediate Stop"
                        }

                    </p>

                </div>

            `;


            route.appendChild(div);

        }
    );


    createMap(bus);

}


/* ======================================
   CREATE LEAFLET MAP
====================================== */

function createMap(bus) {

    const mapElement =
        document.getElementById(
            "map"
        );


    if (!mapElement)
        return;


    const map =
        L.map("map");


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution:
                '&copy; OpenStreetMap contributors'

        }

    ).addTo(map);


    const line =
        L.polyline(
            bus.coordinates,
            {
                weight: 5
            }
        ).addTo(map);


    bus.coordinates.forEach(
        (coordinate,index) => {

            L.marker(
                coordinate
            )
            .addTo(map)
            .bindPopup(
                `<b>${bus.stops[index]}</b>`
            );

        }
    );


    map.fitBounds(
        line.getBounds(),
        {
            padding: [30,30]
        }
    );

}


/* ======================================
   MOBILE MENU
====================================== */

function toggleMenu() {

    const nav =
        document.querySelector(
            ".nav-links"
        );


    if (!nav)
        return;


    if (
        nav.style.display ===
        "flex"
    ) {

        nav.style.display =
            "none";

    } else {

        nav.style.display =
            "flex";

        nav.style.flexDirection =
            "column";

        nav.style.position =
            "absolute";

        nav.style.top =
            "75px";

        nav.style.right =
            "20px";

        nav.style.background =
            "white";

        nav.style.padding =
            "20px";

        nav.style.borderRadius =
            "15px";

    }

}


/* ======================================
   RESULTS PAGE INITIALIZATION
====================================== */

if (
    document.getElementById(
        "busResults"
    )
) {

    const source =
        localStorage.getItem(
            "searchSource"
        ) || "Your location";


    const destination =
        localStorage.getItem(
            "searchDestination"
        ) || "Destination";


    const title =
        document.getElementById(
            "routeTitle"
        );


    const info =
        document.getElementById(
            "searchInfo"
        );


    title.textContent =
        `${source} → ${destination}`;


    info.textContent =
        "Available KSRTC bus services";


    displayResults();

}


/* ======================================
   DETAILS PAGE INITIALIZATION
====================================== */

if (
    document.getElementById(
        "busDetails"
    )
) {

    loadDetails();

}