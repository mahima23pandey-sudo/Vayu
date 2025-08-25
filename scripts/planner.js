const stateSelect = document.getElementById("stateSelect");
const membersSelect = document.getElementById("membersSelect");
const topTravellers = document.getElementById("topTravellers");
const peopleCards = document.getElementById("peopleCards");

// Sample states
const states = ["Uttarakhand", "Rajasthan", "Kerala", "Goa"];

// Sample top travellers data (3 default cards)
const topTravellersData = [
  {
    name: "Anubhav Shukla",
    state: "Uttarakhand",
    places: "Kedarnath,Nainital, chopta",
    img: "images/profiles/anubhav.jpg",
  },
  {
    name: "Mahima Pandey",
    state: "Goa",
    places: "Baga Beach, Fort Aguada",
    img: "images/profiles/mahima.jpg",
  },
  {
    name: "Himesh Pant",
    state: "Kerala",
    places: "Alleppey, Munnar",
    img: "images/profiles/himesh.jpg",
  },
];

// Sample people data (8 default cards)
const peopleData = [
  {
    name: "Rakshit Negi",
    from: "Delhi",
    state: "Uttarakhand",
    members: "solo",
    gender: "male",
    plans: "Trekking and Sightseeing",
    img: "images/profiles/rakshit.jpg",
  },
  {
    name: "Shashank",
    from: "Mumbai",
    state: "Goa",
    members: "friends",
    gender: "male",
    plans: "Beach and Adventure Sports",
    img: "images/profiles/rohitverma.jpg",
  },
  {
    name: "Sunita & Family",
    from: "Bangalore",
    state: "Kerala",
    members: "family",
    gender: "female",
    plans: "Backwaters and Relaxation",
    img: "images/profiles/sunitafamily.jpg",
  },
  {
    name: "Yash",
    from: "Uttarakhand",
    state: "Rajasthan",
    members: "solo",
    gender: "male",
    plans: "Palace Tours and Photography",
    img: "images/profiles/amitsingh.jpg",
  },
  {
    name: "Priya & Friends",
    from: "Chennai",
    state: "Uttarakhand",
    members: "friends",
    gender: "female",
    plans: "Camping and Nature Walks",
    img: "images/profiles/priyafriends.jpg",
  },
  {
    name: "Karan Family",
    from: "Pune",
    state: "Goa",
    members: "family",
    gender: "male",
    plans: "Beach and Cultural Trips",
    img: "images/profiles/karanfamily.jpg",
  },
  {
    name: "Riya Kapoor",
    from: "Lucknow",
    state: "Kerala",
    members: "solo",
    gender: "female",
    plans: "Yoga and Nature Retreat",
    img: "images/profiles/riyakapoor.jpg",
  },
  {
    name: "Vikram & Friends",
    from: "Delhi",
    state: "Rajasthan",
    members: "friends",
    gender: "male",
    plans: "Fort Visits and Desert Safari",
    img: "images/profiles/vikramfriends.jpg",
  },
];

// Populate states dynamically
states.forEach((state) => {
  const opt = document.createElement("option");
  opt.value = state;
  opt.textContent = state;
  stateSelect.appendChild(opt);
});

// Function to create a card element
function createCard(person, type = "buddy") {
  const card = document.createElement("div");
  card.className = "place-card";
  const imgSrc = person.img || "images/profiles/default.jpg"; // fallback image
  card.innerHTML = `
    <img src="${imgSrc}" alt="${person.name}">
    <div class="card-content">
      <h3 class="place-name">${person.name}</h3>
      ${
        type === "top"
          ? `<p class="place-description"><strong>State:</strong> ${person.state}</p>
           <p class="place-description"><strong>Places:</strong> ${person.places}</p>`
          : `<p class="place-description"><strong>From:</strong> ${person.from}</p>
           <p class="place-description"><strong>State:</strong> ${person.state}</p>
           <p class="place-description"><strong>Plan:</strong> ${person.plans}</p>
           <p class="place-description"><strong>Members:</strong> ${person.members}</p>
           <p class="place-description"><strong>Gender:</strong> ${person.gender}</p>`
      }
      <a href="#" class="connect-btn">Connect Now</a>
    </div>
  `;
  return card;
}

// Load Top Travellers (default 3)
function loadTopTravellers() {
  topTravellers.innerHTML = "";
  topTravellersData.forEach((person) => {
    const card = createCard(person, "top");
    topTravellers.appendChild(card);
  });
}

// Load People / Travel Buddy Cards dynamically
function loadPeopleCards() {
  const selectedState = stateSelect.value;
  const selectedMembers = membersSelect.value;

  // Filter people based on selection
  const filteredPeople = peopleData.filter((person) => {
    return (
      (!selectedState || person.state === selectedState) &&
      (!selectedMembers || person.members === selectedMembers)
    );
  });

  peopleCards.innerHTML = "";

  filteredPeople.forEach((person) => {
    const card = createCard(person, "buddy");
    peopleCards.appendChild(card);
  });
}

// Initial load
loadTopTravellers();
loadPeopleCards();

// Event listeners
stateSelect.addEventListener("change", loadPeopleCards);
membersSelect.addEventListener("change", loadPeopleCards);
