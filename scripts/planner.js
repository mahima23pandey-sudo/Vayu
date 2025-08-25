const stateSelect = document.getElementById("stateSelect");
const membersSelect = document.getElementById("membersSelect");
const topTravellers = document.getElementById("topTravellers");
const peopleCards = document.getElementById("peopleCards");

// Sample states
const states = ["Uttarakhand", "Rajasthan", "Kerala", "Goa"];



// Sample people data
const peopleData = [
  { name: "Rakshit Negi", from: "Delhi", state: "Uttarakhand", members: "solo", gender: "male", plans: "Trekking and Sightseeing", img: "images/profiles/rakshit.jpg" },
  { name: "Shashank", from: "Mumbai", state: "Goa", members: "friends", gender: "male", plans: "Beach and Adventure Sports", img: "images/profiles/rohitverma.jpg" },
  { name: "Sunita & Family", from: "Bangalore", state: "Kerala", members: "family", gender: "female", plans: "Backwaters and Relaxation", img: "images/profiles/sunitafamily.jpg" },
  { name: "Yash", from: "Uttarakhand", state: "Rajasthan", members: "solo", gender: "male", plans: "Palace Tours and Photography", img: "images/profiles/amitsingh.jpg" },
  { name: "Priya & Friends", from: "Chennai", state: "Uttarakhand", members: "friends", gender: "female", plans: "Camping and Nature Walks", img: "images/profiles/priyafriends.jpg" },
  { name: "Karan Family", from: "Pune", state: "Goa", members: "family", gender: "male", plans: "Beach and Cultural Trips", img: "images/profiles/karanfamily.jpg" },
  { name: "Riya Kapoor", from: "Lucknow", state: "Kerala", members: "solo", gender: "female", plans: "Yoga and Nature Retreat", img: "images/profiles/riyakapoor.jpg" },
  { name: "Vikram & Friends", from: "Delhi", state: "Rajasthan", members: "friends", gender: "male", plans: "Fort Visits and Desert Safari", img: "images/profiles/vikramfriends.jpg" },
];

// Populate states dropdown
states.forEach(state => {
  const opt = document.createElement("option");
  opt.value = state;
  opt.textContent = state;
  stateSelect.appendChild(opt);
});

// Populate members dropdown
const membersOptions = ["solo", "friends", "family"];
membersOptions.forEach(m => {
  const opt = document.createElement("option");
  opt.value = m;
  opt.textContent = m.charAt(0).toUpperCase() + m.slice(1);
  membersSelect.appendChild(opt);
});

// Create Reset Filters button
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Filters";
resetBtn.className = "reset-btn";
membersSelect.parentElement.appendChild(resetBtn);

// Create card
function createCard(person, type = "buddy") {
  const card = document.createElement("div");
  card.className = "place-card";
  const imgSrc = person.img || "images/profiles/default.jpg";
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

// Load Top Travellers
function loadTopTravellers() {
  topTravellers.innerHTML = "";
  topTravellersData.forEach(person => {
    const card = createCard(person, "top");
    topTravellers.appendChild(card);
  });
  topTravellers.style.display = "grid"; // ensure visible by default
}

// Load People / Travel Buddy Cards
function loadPeopleCards() {
  const selectedState = stateSelect.value;
  const selectedMembers = membersSelect.value;

  // Hide Top Travellers if any filter is applied
  if (selectedState || selectedMembers) {
    topTravellers.style.display = "none";
  } else {
    topTravellers.style.display = "grid";
  }

  const filteredPeople = peopleData.filter(person => {
    return (!selectedState || person.state === selectedState) &&
           (!selectedMembers || person.members === selectedMembers);
  });

  peopleCards.innerHTML = "";
  filteredPeople.forEach(person => {
    const card = createCard(person, "buddy");
    peopleCards.appendChild(card);
  });
}

// Reset Filters
function resetFilters() {
  stateSelect.value = "";
  membersSelect.value = "";
  loadPeopleCards();
  topTravellers.style.display = "grid"; // show top travellers again
}

// Event listeners
stateSelect.addEventListener("change", loadPeopleCards);
membersSelect.addEventListener("change", loadPeopleCards);
resetBtn.addEventListener("click", resetFilters);

// Initial load
loadTopTravellers();
loadPeopleCards();
