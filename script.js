/**
 * 📰 PROJECT: NEWS APPLICATION (Currents API)
 */

// --- 1. DOM ELEMENTS SELECTION ---
const searchButton = document.querySelector("#botao-pesquisa");
const searchInput = document.getElementById("search-input");
const newsContainer = document.querySelector(".news-container");

// --- 2. API CONFIGURATION ---
const API_KEY = "2YOZXDn-rk4Aifxd4s5JOT4HQSGxCGuuOSRx9nGo8TdeqC0F"; 
const BASE_URL = "https://api.currentsapi.services/v1/search";

// Initial URL: Search for "technology" news in English
const initialUrl = `${BASE_URL}?keywords=technology&language=en&apiKey=${API_KEY}`;

// --- 3. INITIALIZATION ---
fetchNews(initialUrl);

// --- 4. MAIN FUNCTIONS ---

/**
 * Fetches news from the API and manages the response
 * @param {string} apiUrl - The full API URL to fetch data from
 */
function fetchNews(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Currents API uses 'news' instead of 'articles'
      if (!data.news || data.news.length === 0) {
        newsContainer.innerHTML = `<p>No news found for "${searchInput.value}" in English.</p>`;
      } else {
        renderCards(data.news);
      }
    })
    .catch((error) => {
      console.error("API Request Error:", error);
      newsContainer.innerHTML = `<p>Error loading news. Check console.</p>`;
    });
}

/**
 * Creates and inserts news cards into the HTML
 * @param {Array} newsList - List of articles received from the API
 */
function renderCards(newsList) {
  newsContainer.innerHTML = "";
  
  // Limit display to the first 20 results
  const limitedNews = newsList.slice(0, 20);

  limitedNews.forEach((news) => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    // Handling missing images with a placeholder
    const imageUrl = news.image && news.image !== "None" ? news.image : "placeholder.jpg";

    card.innerHTML = `
      <img src="${imageUrl}" alt="News Image" onerror="this.src='placeholder.jpg'" />
      <div class="card-content">
        <h3>${news.title}</h3>
        <p>${news.description}</p>
        <a href="${news.url}" target="_blank" class="read-more">Read More</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

// --- 5. EVENTS (USER INTERACTION) ---

// Helper function to process the search
function handleSearch() {
  const query = searchInput.value;
  if (!query) return;

  // Search URL with the typed query
  const searchUrl = `${BASE_URL}?keywords=${query}&language=en&apiKey=${API_KEY}`;
  fetchNews(searchUrl);
}

// Click on Search Button
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  handleSearch();
});

// "Enter" Key on Search Input
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});
