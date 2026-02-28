/**
 * 📰 PROJECT: NEWS APPLICATION
 * Description: Fetches real-time news using GNews API and a CORS Anywhere Proxy.
 */

// --- 1. DOM ELEMENTS SELECTION ---
const searchButton = document.querySelector("#botao-pesquisa");
const searchInput = document.getElementById("search-input");
const newsContainer = document.querySelector(".news-container");

// --- 2. API CONFIGURATION ---
const API_KEY = "4d339ba55cd0c1703ad4a417a954ae07";
// Using CORS Anywhere Proxy to bypass security restrictions in production (GitHub Pages)
const PROXY = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://gnews.io/api/v4/search";

// Initial URL: Search for "world" news in English
const initialUrl = `${PROXY}${BASE_URL}?q=world&lang=en&token=${API_KEY}`;

// --- 3. INITIALIZATION ---
// Fetch initial news when the page loads
fetchNews(initialUrl);

// --- 4. MAIN FUNCTIONS ---

/**
 * Makes the request to the API and manages the response
 * @param {string} apiUrl - The full API URL to fetch data from
 */
function fetchNews(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Checks if the API returned articles
      if (!data.articles || data.articles.length === 0) {
        newsContainer.innerHTML = `<p>No news found for "${searchInput.value}" in English.</p>`;
      } else {
        renderCards(data.articles);
      }
    })
    .catch((error) => {
      console.error("API Request Error:", error);
      newsContainer.innerHTML = `<p>Error loading news. Please try again later.</p>`;
    });
}

/**
 * Creates and inserts news cards into the HTML
 * @param {Array} newsList - List of articles received from the API
 */
function renderCards(newsList) {
  // Clear the container before adding new cards
  newsContainer.innerHTML = "";
  
  // Limit display to the first 20 results
  const limitedNews = newsList.slice(0, 20);

  limitedNews.forEach((news) => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    // HTML Structure of the Card (GNews API specific fields)
    card.innerHTML = `
      <img src="${news.image}" alt="News Image" onerror="this.src='placeholder.jpg'" />
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
  if (!query) return; // Do nothing if input is empty

  // New search URL with the typed query
  const searchUrl = `${PROXY}${BASE_URL}?q=${query}&lang=en&token=${API_KEY}`;
  fetchNews(searchUrl);
}

// Click on Search Button
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevents form submission
  handleSearch();
});

// "Enter" Key on Search Input
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});
