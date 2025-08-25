const heroSection = document.getElementById("heroSection");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const stateTagline = document.getElementById("stateTagline");
const statePlaces = document.getElementById("statePlaces");
const stateSelect = document.getElementById("stateSelect");
const districtSelect = document.getElementById("districtSelect");
const placesContainer = document.getElementById("placesContainer");
const districtBg = document.getElementById("districtBg");
const districtText = document.getElementById("districtText");

// State background image mapping
const stateBackgrounds = {
  Uttarakhand: "images/states/uttarakhand.webp",
  Rajasthan:
    "https://images.unsplash.com/photo-1532664189809-02133fee698d?w=1600",
  Kerala: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=1600",
  Goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600",
  default:
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600",
};

// Optional: District-specific backgrounds
const districtBackgrounds = {
  Nainital: "images/uttarakhand/nainital-bg.jpg",
  Bhimtal: "images/uttarakhand/bhimtal-bg.webp",
  Rishikesh: "images/uttarakhand/rishikesh-bg.webp",
  Mussoorie: "images/uttarakhand/mussoorie-bg.webp",
  Haridwar: "images/uttarakhand/haridwar-bg.webp",
  Dehradun: "images/uttarakhand/dehradun-bg.webp",
  Auli: "images/uttarakhand/auli-bg.webp",
  "Jim Corbett National Park": "images/uttarakhand/corbett-bg.webp",
  Almora: "images/uttarakhand/almora-bg.webp",
  Pithoragarh: "images/uttarakhand/pithoragarh-bg.webp",
  Chopta: "images/uttarakhand/chopta-bg.webp",
  // Add other districts for Rajasthan, Kerala, Goa if needed
};

// State information (taglines and famous places)
const stateInfo = {
  Uttarakhand: {
    tagline: "Devbhumi - The Land of Gods",
    places: [
      "Nainital",
      "Rishikesh",
      "Mussoorie",
      "Haridwar",
      "Dehradun",
      "Auli",
    ],
  },
  Rajasthan: {
    tagline: "The Land of Kings",
    places: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Jaisalmer",
      "Pushkar",
      "Mount Abu",
    ],
  },
  Kerala: {
    tagline: "God's Own Country",
    places: ["Munnar", "Alleppey", "Kochi", "Thekkady", "Kovalam", "Wayanad"],
  },
  Goa: {
    tagline: "Pearl of the Orient",
    places: [
      "Calangute",
      "Baga",
      "Anjuna",
      "Old Goa",
      "Dudhsagar Falls",
      "Fontainhas",
    ],
  },
};

// States & Districts
const districts = {
  Uttarakhand: [
    "Nainital",
    "Dehradun",
    "Haridwar",
    "Rishikesh",
    "Mussoorie",
    "Almora",
    "Pithoragarh",
    "Chamoli",
    "Tehri Garhwal",
    "Pauri Garhwal",
  ],
  Rajasthan: [
    "Jaipur",
    "Udaipur",
    "Jodhpur",
    "Jaisalmer",
    "Bikaner",
    "Ajmer",
    "Mount Abu",
    "Pushkar",
    "Chittorgarh",
    "Bharatpur",
  ],
  Kerala: [
    "Kochi",
    "Munnar",
    "Alleppey",
    "Thekkady",
    "Wayanad",
    "Kovalam",
    "Kumarakom",
    "Varkala",
    "Kollam",
    "Thrissur",
  ],
  Goa: ["North Goa", "South Goa"],
};

// Sample places data
const placesData = {
  default: [
    {
      name: "Taj Mahal",
      image: "images/india/tajmahal.jpg",
      description: "The iconic symbol of love in India, located in Agra.",
      stats: ["UNESCO", "Mughal Architecture", "Agra"],
    },
    {
      name: "Jaipur City Palace",
      image: "images/india/jaipur.jpg",
      description: "Royal palace of Jaipur showcasing Rajasthani architecture.",
      stats: ["Palace", "Museum", "Heritage"],
    },
    {
      name: "Kerala Backwaters",
      image: "images/india/kerala-backwaters.jpg",
      description: "Scenic waterways with houseboats and lush greenery.",
      stats: ["Nature", "Boating", "Relaxation"],
    },
    {
      name: "Hampi",
      image: "images/india/hampi.jpg",
      description:
        "Ancient ruins and temples of Vijayanagara Empire in Karnataka.",
      stats: ["Heritage", "Ruins", "UNESCO"],
    },
    {
      name: "Varanasi Ghats",
      image: "images/india/varanasighats.jpg",
      description: "Sacred ghats along the Ganges, center of spiritual India.",
      stats: ["Spiritual", "Ganges", "Culture"],
    },
    {
      name: "Andaman Islands",
      image: "images/india/andaman.jpg",
      description:
        "Pristine beaches and turquoise waters in the Bay of Bengal.",
      stats: ["Beach", "Adventure", "Nature"],
    },
    {
      name: "Darjeeling",
      image: "images/india/darjeeling.jpg",
      description: "Hill station famous for tea gardens and Himalayan views.",
      stats: ["Hills", "Tea", "Viewpoints"],
    },
    {
      name: "Mysore Palace",
      image: "images/india/mysorepalace.webp",
      description: "Royal palace in Karnataka, known for grand architecture.",
      stats: ["Palace", "Heritage", "Museum"],
    },
  ],
  Uttarakhand: {
    default: [
      {
        name: "Nainital",
        image: "images/uttarakhand/nainital.webp",
        description:
          "Lake city surrounded by hills, popular for boating and trekking.",
        stats: ["Lake", "Hills", "Trekking"],
        featured: true,
      },
      {
        name: "Rishikesh",
        image: "images/uttarakhand/rishikesh.jpg",
        description: "Yoga capital and adventure sports hub on Ganges banks.",
        stats: ["Yoga", "Adventure", "Spiritual"],
      },
      {
        name: "Mussoorie",
        image: "images/uttarakhand/mussorie.webp",
        description:
          "Queen of Hills with Himalayan panoramas and scenic spots.",
        stats: ["Hills", "Himalayas", "Viewpoints"],
      },
      {
        name: "Haridwar",
        image: "images/uttarakhand/haridwar.avif",
        description:
          "Ancient city known for Ganga Aarti and spiritual significance.",
        stats: ["Spiritual", "Culture", "Rivers"],
      },
      {
        name: "Dehradun",
        image: "images/uttarakhand/dehradun.avif",
        description:
          "Capital city with pleasant weather, education hubs, and nearby hill stations.",
        stats: ["City", "Education", "Nature"],
      },
      {
        name: "Auli",
        image: "images/uttarakhand/auli.jpg",
        description:
          "Popular ski destination in the Himalayas with breathtaking views.",
        stats: ["Skiing", "Himalayas", "Adventure"],
      },
      {
        name: "Jim Corbett National Park",
        image: "images/uttarakhand/jimcorbett.jpg",
        description: "Famous wildlife sanctuary, home to Bengal Tigers.",
        stats: ["Wildlife", "Safari", "Nature"],
      },
      {
        name: "Almora",
        image: "images/uttarakhand/almora.jpg",
        description:
          "Hill town known for panoramic views and cultural heritage.",
        stats: ["Hills", "Culture", "Scenery"],
      },
      {
        name: "Pithoragarh",
        image: "images/uttarakhand/pithoragarh.webp",
        description:
          "Scenic town near the Indo-Nepal border, known as Little Kashmir.",
        stats: ["Hills", "Adventure", "Nature"],
      },
      {
        name: "Chopta",
        image: "images/uttarakhand/chopta.jpg",
        description:
          "Mini Switzerland of India, starting point for Tungnath trek.",
        stats: ["Trekking", "Hills", "Nature"],
      },
    ],
    Nainital: [
      {
        name: "Naini Lake",
        image: "images/uttarakhand/Nainital/naini-lake.jpg",
        description: "Heart of Nainital, perfect for boating and scenic walks.",
        stats: ["Lake", "Boating", "Nature"],
        featured: true,
      },
      {
        name: "Bhimtal",
        image: "images/uttarakhand/Nainital/bhimtal-lake.jpg",
        description: "Larger than Naini Lake with rich cultural heritage.",
        stats: ["Lake", "Culture", "Photography"],
      },
      {
        name: "Kainchi Dham",
        image: "images/uttarakhand/Nainital/kainchi-dham.jpg",
        description: "Famous Hanuman temple surrounded by serene hills.",
        stats: ["Temple", "Spiritual", "Hills"],
      },
      {
        name: "Sattal Lake",
        image: "images/uttarakhand/Nainital/sattal-lake.jpg",
        description:
          "Cluster of seven interconnected freshwater lakes amidst forests.",
        stats: ["Lake", "Nature", "Birdwatching"],
      },
      {
        name: "Naina Devi Temple",
        image: "images/uttarakhand/Nainital/naina-devi.jpg",
        description:
          "Ancient temple dedicated to Goddess Naina Devi overlooking Naini Lake.",
        stats: ["Temple", "Spiritual", "Culture"],
      },
      {
        name: "Snow View Point",
        image: "images/uttarakhand/Nainital/snow-view.jpg",
        description:
          "Popular viewpoint offering panoramic views of snow-capped Himalayan peaks.",
        stats: ["Viewpoint", "Snow", "Himalayas"],
      },
      {
        name: "China Peak",
        image: "images/uttarakhand/Nainital/china-peak.jpg",
        description:
          "Highest peak in Nainital, ideal for trekking and sunrise views.",
        stats: ["Trekking", "Peak", "Himalayas"],
      },
      {
        name: "Mukteshwar",
        image: "images/uttarakhand/Nainital/mukteshwar.jpg",
        description:
          "Hill town famous for panoramic views, temples, and adventure sports.",
        stats: ["Hill", "Adventure", "Nature"],
      },
      {
        name: "Land’s End",
        image: "images/uttarakhand/Nainital/lands-end.jpg",
        description: "Popular cliff-top viewpoint with dramatic valley vistas.",
        stats: ["Viewpoint", "Hills", "Photography"],
      },
      {
        name: "Tiffin Top",
        image: "images/uttarakhand/Nainital/tiffin-top.jpg",
        description:
          "Ideal trekking spot with panoramic views of Nainital and surrounding hills.",
        stats: ["Trekking", "Viewpoint", "Nature"],
      },
    ],
  },
  Rajasthan: {
    default: [
      {
        name: "Jaipur",
        image:
          "https://images.unsplash.com/photo-1532664189809-02133fee698d?w=500&h=300&fit=crop",
        description: "The Pink City known for its stunning palaces and forts.",
        stats: ["Palace", "Fort", "Heritage"],
        featured: true,
      },
      {
        name: "Udaipur",
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop",
        description: "City of Lakes with romantic settings and royal history.",
        stats: ["Lake", "Palace", "Romantic"],
      },
      {
        name: "Jaisalmer",
        image:
          "https://images.unsplash.com/photo-1582597327390-cc641b1c7c20?w=500&h=300&fit=crop",
        description: "Golden City in the heart of the Thar Desert.",
        stats: ["Desert", "Fort", "Adventure"],
      },
    ],
  },
  Kerala: {
    default: [
      {
        name: "Munnar",
        image:
          "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=500&h=300&fit=crop",
        description: "Hill station with tea plantations and misty mountains.",
        stats: ["Tea", "Hills", "Nature"],
        featured: true,
      },
      {
        name: "Alleppey",
        image:
          "https://images.unsplash.com/photo-1508317469940-e3de49ba902e?w=500&h=300&fit=crop",
        description: "Famous for its backwaters and houseboat cruises.",
        stats: ["Backwaters", "Boating", "Relaxation"],
      },
      {
        name: "Kochi",
        image:
          "https://images.unsplash.com/photo-1631538109914-8b7f29e6424c?w=500&h=300&fit=crop",
        description: "Port city with a blend of cultures and historic sites.",
        stats: ["Port", "History", "Culture"],
      },
    ],
  },
  Goa: {
    default: [
      {
        name: "Calangute Beach",
        image:
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop",
        description: "The Queen of Beaches with golden sands and water sports.",
        stats: ["Beach", "Water Sports", "Relaxation"],
        featured: true,
      },
      {
        name: "Old Goa",
        image:
          "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=300&fit=crop",
        description:
          "Historic Portuguese capital with churches and cathedrals.",
        stats: ["History", "Architecture", "Heritage"],
      },
      {
        name: "Dudhsagar Falls",
        image:
          "https://images.unsplash.com/photo-1591886803031-52bfe14b5d0a?w=500&h=300&fit=crop",
        description: "Majestic four-tiered waterfall resembling a sea of milk.",
        stats: ["Waterfall", "Nature", "Adventure"],
      },
    ],
  },
};

// Populate states dynamically
Object.keys(districts).forEach((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});

function init() {
  loadPlaces(placesData["default"]);
  stateSelect.addEventListener("change", handleStateChange);
  districtSelect.addEventListener("change", handleDistrictChange);
}

function handleStateChange() {
  const state = stateSelect.value;
  districtSelect.innerHTML = '<option value="">Choose District</option>';

  if (!state) {
    // Reset to default hero
    districtBg.style.display = "none";
    heroSection.style.display = "grid";
    heroTitle.textContent = "Discover Incredible India";
    heroSubtitle.textContent =
      "Explore the beauty, culture, and heritage of India's magnificent destinations";
    stateTagline.textContent = "";
    statePlaces.innerHTML = "";
    loadPlaces(placesData["default"]);
    return;
  }

  // Populate districts
  districts[state].forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    districtSelect.appendChild(opt);
  });

  // Update hero section with state information
  const bgImage = stateBackgrounds[state] || stateBackgrounds.default;
  heroSection.style.backgroundImage = `url('${bgImage}')`;
  heroTitle.textContent = state;

  if (stateInfo[state]) {
    stateTagline.textContent = stateInfo[state].tagline;

    // Create pills for famous places
    statePlaces.innerHTML = "";
    stateInfo[state].places.forEach((place) => {
      const pill = document.createElement("span");
      pill.className = "place-pill";
      pill.textContent = place;
      statePlaces.appendChild(pill);
    });
  } else {
    stateTagline.textContent = "";
    statePlaces.innerHTML = "";
  }

  heroSection.style.display = "grid";
  districtBg.style.display = "none";

  // Load state places
  if (placesData[state] && placesData[state]["default"]) {
    loadPlaces(placesData[state]["default"]);
  } else {
    loadPlaces(placesData["default"]);
  }
}

function handleDistrictChange() {
  const state = stateSelect.value;
  const district = districtSelect.value;

  if (district && placesData[state] && placesData[state][district]) {
    const bgImage =
      districtBackgrounds[district] ||
      placesData[state][district][0]?.image ||
      stateBackgrounds[state];
    districtBg.style.backgroundImage = `url('${bgImage}')`;
    districtText.textContent = district;
    districtBg.style.display = "flex";
    heroSection.style.display = "none";
    loadPlaces(placesData[state][district]);
  } else if (state) {
    // fallback to state view
    handleStateChange();
  } else {
    // reset
    districtBg.style.display = "none";
    heroSection.style.display = "grid";
    loadPlaces(placesData["default"]);
  }
}

function loadPlaces(places) {
  placesContainer.innerHTML = "";
  places.forEach((place, index) => {
    const card = document.createElement("div");
    card.className = `place-card ${place.featured ? "featured-card" : ""}`;
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
        <img src="${place.image}" alt="${place.name}" class="card-image">
        <div class="card-content">
          <h3 class="place-name">${place.name}</h3>
          ${
            place.stats
              ? `<div class="place-stats">${place.stats
                  .map((stat) => `<span class="stat">${stat}</span>`)
                  .join("")}</div>`
              : ""
          }
          <p class="place-description">${place.description}</p>
          <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(
            place.name
          )}" target="_blank" class="know-more-btn">Know More</a>
        </div>
      `;
    placesContainer.appendChild(card);
  });
}

init();
