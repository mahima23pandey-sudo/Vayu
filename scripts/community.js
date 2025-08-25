const reviewsContainer = document.getElementById("reviewsContainer");
const reviewForm = document.getElementById("reviewForm");

let reviews = [
  {
    username: "Aarav",
    location: "Nainital",
    comment: "Beautiful place with peaceful vibes!",
    rating: 5,
  },
  {
    username: "Ishita",
    location: "Jaipur",
    comment: "Loved the forts and culture!",
    rating: 4,
  },
  {
    username: "Kabir",
    location: "Goa",
    comment: "Beaches are amazing!",
    rating: 5,
  },
];

// Function to render stars
function getStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? "⭐" : "☆";
  }
  return stars;
}

// Function to render reviews
function renderReviews() {
  reviewsContainer.innerHTML = "";
  reviews.forEach((review) => {
    const card = document.createElement("div");
    card.classList.add("review-card");
    card.innerHTML = `
      <h3>${review.username}</h3>
      <p><strong>Location:</strong> ${review.location}</p>
      <p class="stars">${getStars(review.rating)}</p>
      <p>${review.comment}</p>
    `;
    reviewsContainer.appendChild(card);
  });
}

// Handle form submit
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const location = document.getElementById("location").value;
  const comment = document.getElementById("comment").value;
  const rating = parseInt(document.getElementById("rating").value);

  reviews.unshift({ username, location, comment, rating });
  renderReviews();

  reviewForm.reset();
});

// Initial render
renderReviews();