/**
 * 📰 PROJECT: NEWS APPLICATION
 * Description: Fetches real-time news using GNews API.
 */

// --- 1. DOM ELEMENTS SELECTION ---
const searchButton = document.querySelector("#botao-pesquisa");
const searchInput = document.getElementById("search-input");
const newsContainer = document.querySelector(".news-container");

// --- 2. API CONFIGURATION ---
// --- 2. CONFIGURAÇÃO DA API ---
const API_KEY = "4d339ba55cd0c1703ad4a417a954ae07";
// Novo proxy para evitar bloqueio de CORS
const PROXY = "https://api.allorigins.win/raw?url=";
const BASE_URL = "https://gnews.io/api/v4/search";

// URL Inicial com codificação correta para o proxy
const initialUrl = `${PROXY}${encodeURIComponent(`${BASE_URL}?q=world&lang=en&token=${API_KEY}`)}`;

// --- 3. INITIALIZATION ---
fetchNews(initialUrl);

// --- 4. MAIN FUNCTIONS ---

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
      newsContainer.innerHTML = `<p>Error loading news. Check console for details.</p>`;
    });
}

function renderCards(newsList) {
  newsContainer.innerHTML = "";
  
  const limitedNews = newsList.slice(0, 20);

  limitedNews.forEach((news) => {
    const card = document.createElement("div");
    card.classList.add("news-card");

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

function handleSearch() {
  const query = searchInput.value;
  if (!query) return;

  const searchUrl = `${BASE_URL}?q=${query}&lang=en&token=${API_KEY}`;
  fetchNews(searchUrl);
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  handleSearch();
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});

