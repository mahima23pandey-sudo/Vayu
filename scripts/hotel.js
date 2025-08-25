/* =========================
   DATA (sample)
   ========================= */
const HERO_BG_DEFAULT = "images/hotels-bg.jpg";

const STATE_BACKGROUNDS = {
  "Uttarakhand": "images/bg/uttarakhand-hotels.jpg",
  "Rajasthan": "images/bg/rajasthan-hotels.jpg",
  "Kerala": "images/bg/kerala-hotels.jpg",
  "Goa": "images/bg/goa-hotels.jpg",
  "Delhi": "images/bg/delhi-hotels.jpg"
};

// 12 sample stays (state, district, type)
const STAYS = [
  { id:1,  name:"Taj Palace",           state:"Delhi",       district:"New Delhi",      type:"hotel",    rating:5, img:"images/hotels/taj-palace.jpg",    tags:["Luxury","City Center"] },
  { id:2,  name:"ITC Maurya",           state:"Delhi",       district:"New Delhi",      type:"hotel",    rating:4, img:"images/hotels/itc-maurya.jpg",   tags:["Premium","Dining"] },
  { id:3,  name:"Leela Palace",         state:"Karnataka",   district:"Bengaluru",      type:"hotel",    rating:5, img:"images/hotels/leela-blr.jpg",    tags:["Business","Spa"] },
  { id:4,  name:"Wildflower Hall",      state:"Himachal",    district:"Shimla",         type:"resort",   rating:5, img:"images/hotels/wildflower.jpg",   tags:["Mountain","Spa"] },
  { id:5,  name:"Taj Lake Palace",      state:"Rajasthan",   district:"Udaipur",        type:"resort",   rating:5, img:"images/hotels/taj-lake.jpg",     tags:["Lakefront","Royal"] },
  { id:6,  name:"Oberoi Udaivilas",     state:"Rajasthan",   district:"Udaipur",        type:"resort",   rating:5, img:"images/hotels/udaivilas.jpg",    tags:["Heritage","Luxury"] },
  { id:7,  name:"Radisson Blu",         state:"Tamil Nadu",  district:"Chennai",        type:"hotel",    rating:4, img:"images/hotels/radisson.jpg",     tags:["Airport","Pool"] },
  { id:8,  name:"Zostel Rishikesh",     state:"Uttarakhand", district:"Rishikesh",      type:"homestay", rating:4, img:"images/hotels/zostel-rishikesh.jpg", tags:["Backpack","Ganges"] },
  { id:9,  name:"Airbnb Homestay",      state:"Goa",         district:"North Goa",      type:"homestay", rating:4, img:"images/hotels/goa-homestay.jpg", tags:["Beachy","Budget"] },
  { id:10, name:"The Fern Residency",   state:"Rajasthan",   district:"Jaipur",         type:"hotel",    rating:4, img:"images/hotels/fern-jaipur.jpg",  tags:["Family","City"] },
  { id:11, name:"Tea County",           state:"Kerala",      district:"Munnar",         type:"resort",   rating:4, img:"images/hotels/tea-county.jpg",   tags:["Hills","Views"] },
  { id:12, name:"Trident Cochin",       state:"Kerala",      district:"Kochi",          type:"hotel",    rating:4, img:"images/hotels/trident-kochi.jpg",tags:["Port","Comfort"] },
];

/* =========================
   ELEMENTS
   ========================= */
const hero = document.getElementById("heroSection");
const stateSelect = document.getElementById("stateSelect");
const districtSelect = document.getElementById("districtSelect");
const roomSelect = document.getElementById("roomSelect");
const cardsContainer = document.getElementById("statePlaces");

/* =========================
   INIT
   ========================= */
function init() {
  // Set default hero background
  setHeroBg();

  // Populate state dropdown from data
  const states = Array.from(new Set(STAYS.map(s => s.state))).sort();
  states.forEach(st => {
    const opt = document.createElement("option");
    opt.value = st; opt.textContent = st;
    stateSelect.appendChild(opt);
  });

  // Render default 10 cards
  renderCards(STAYS.slice(0, 10));

  // Events
  stateSelect.addEventListener("change", onStateChange);
  districtSelect.addEventListener("change", applyFilters);
  roomSelect.addEventListener("change", applyFilters);
}

function setHeroBg(state) {
  const src = state ? (STATE_BACKGROUNDS[state] || HERO_BG_DEFAULT) : HERO_BG_DEFAULT;
  hero.style.backgroundImage = `url('${src}')`;
}

/* =========================
   DROPDOWN HANDLERS
   ========================= */
function onStateChange() {
  const state = stateSelect.value;
  setHeroBg(state);

  // Populate districts for selected state
  districtSelect.innerHTML = `<option value="">Choose District</option>`;
  if (state) {
    const districts = Array.from(new Set(
      STAYS.filter(s => s.state === state).map(s => s.district)
    )).sort();

    districts.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d; opt.textContent = d;
      districtSelect.appendChild(opt);
    });
  }
  applyFilters();
}

/* =========================
   FILTER + RENDER
   ========================= */
function applyFilters() {
  const st = stateSelect.value;
  const dist = districtSelect.value;
  const type = roomSelect.value;

  let list = STAYS.slice();

  if (st)    list = list.filter(i => i.state === st);
  if (dist)  list = list.filter(i => i.district === dist);
  if (type)  list = list.filter(i => i.type === type);

  // If no result, show a graceful empty state
  if (!list.length) {
    cardsContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; color:#9aa4b2; padding:1rem;">
        No stays found. Try changing filters.
      </div>`;
    return;
  }
  renderCards(list);
}

function renderCards(items) {
  cardsContainer.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="thumb">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="body">
        <h3>${item.name}</h3>
        <div class="meta">${item.district}, ${item.state} &middot; ${capitalize(item.type)}</div>
        <div class="stars">${renderStars(item.rating)}</div>
        <div class="pills">
          ${item.tags?.map(t => `<span class="pill">${t}</span>`).join("") || ""}
        </div>
        <div class="card-actions">
          <a class="book-btn" href="${bestPriceLink(item)}" target="_blank" rel="noopener">Book Now</a>
          <span class="price-hint">Find best price ↗</span>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

function renderStars(rating){
  const full = Math.round(rating);
  let html = "";
  for(let i=1;i<=5;i++){
    html += `<span class="${i<=full?'on':'off'}">★</span>`;
  }
  return html;
}

function capitalize(s){ return s ? s[0].toUpperCase()+s.slice(1) : s }

/* =========================
   "CHEAPEST" LINK (meta-search)
   - Opens Google Hotels search for that stay
   - Easy to swap with a real API later
   ========================= */
function bestPriceLink(item){
  // Google Hotels meta-search with hotel name + district + state
  const q = encodeURIComponent(`${item.name} ${item.district} ${item.state}`);
  return `https://www.google.com/travel/hotels?q=${q}`;
}

/* =========================
   START
   ========================= */
document.addEventListener("DOMContentLoaded", init);
