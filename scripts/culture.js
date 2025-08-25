// Array of states with name + image
const states = [
  { name: "Uttarakhand", image: "images/uttarakhand.jpg" },
  { name: "Punjab", image: "images/punjab.jpg" },
  { name: "Gujarat", image: "images/gujarat.jpg" },
  { name: "Karnataka", image: "images/karnataka.jpg" },
  { name: "Tamil Nadu", image: "images/tamilnadu.jpg" },
  { name: "Jammu and Kashmir", image: "images/jk.jpg" },
];

// Function to load state cards dynamically
function loadStateCards() {
  const container = document.getElementById("stateCards");
  container.innerHTML = ""; // clear any previous content

  states.forEach((state) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${state.image}" alt="${state.name}">
      <div class="card-body">
        <h3>${state.name}</h3>
      </div>
    `;
    card.addEventListener("click", () => openState(state.name));
    container.appendChild(card);
  });
}

// Function triggered on card click
function openState(stateName) {
  alert("You selected " + stateName + ". Details will be shown soon!");
  // Later: window.location.href = stateName.toLowerCase().replace(/ /g, '') + ".html";
}

// Placeholder auth function
function goAuth() {
  alert("Redirecting to login/signup...");
}

// Load cards on page load
document.addEventListener("DOMContentLoaded", loadStateCards);
