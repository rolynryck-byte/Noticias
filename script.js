const botaoP = document.querySelector("#botao-pesquisa");
const pesquisaInput = document.getElementById("search-input");
const container = document.querySelector(".news-container");

// CHAVE GNEWS QUE VOCÊ PASSOU
const apiKey = "4d339ba55cd0c1703ad4a417a954ae07";
// A estrutura da URL precisa ser da GNews
let Api = `https://gnews.io/api/v4/search?q=world&lang=en&token=${apiKey}`;

// Busca inicial
buscarNoticias(Api);

// --- FUNÇÃO DE PESQUISA REESTRUTURADA ---
function buscarNoticias(urlApi) {
  fetch(urlApi)
    .then((resposta) => resposta.json())
    .then((dados) => {
      // GNews usa 'articles'
      if (!dados.articles || dados.articles.length === 0) {
        container.innerHTML = `<p>No news found for "${pesquisaInput.value}" in English.</p>`;
      } else {
        desenharCard(dados.articles);
      }
    })
    .catch((erro) => console.error("Erro na API:", erro));
}

function desenharCard(noticias) {
  container.innerHTML = "";
  const noticiasLimitadas = noticias.slice(0, 20);

  noticiasLimitadas.forEach((noticia) => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    // ATENÇÃO: GNews usa 'image', não 'urlToImage'
    card.innerHTML = `
      <img src="${noticia.image}" alt="News Image" />
      <div class="card-content">
        <h3>${noticia.title}</h3>
        <p>${noticia.description}</p>
        <a href="${noticia.url}" target="_blank" class="read-more">Read More</a>
      </div>`;
    container.appendChild(card);
  });
}

// --- EVENTOS ---

botaoP.addEventListener("click", function (event) {
  event.preventDefault();
  const termo = pesquisaInput.value;
  if (!termo) return;

  const novaApi = `https://gnews.io/api/v4/search?q=${termo}&lang=en&token=${apiKey}`;
  buscarNoticias(novaApi);
});

pesquisaInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    botaoP.click();
  }
});
