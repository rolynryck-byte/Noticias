const botaoP = document.querySelector("#botao-pesquisa");
const pesquisaInput = document.getElementById("search-input");
const container = document.querySelector(".news-container");

// API KEY ATUALIZADA, HTTPS E IDIOMA EM INGLÊS
const apiKey = "4d339ba55cd0c1703ad4a417a954ae07";
let Api = `https://newsapi.org/v2/everything?q=world&language=en&apiKey=${apiKey}`;

// Busca inicial
buscarNoticias(Api);

// --- FUNÇÃO DE PESQUISA REESTRUTURADA ---
function buscarNoticias(urlApi) {
  fetch(urlApi)
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.articles.length === 0) {
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

    card.innerHTML = `
      <img src="${noticia.urlToImage}" alt="News Image" />
      <div class="card-content">
        <h3>${noticia.title}</h3>
        <p>${noticia.description}</p>
        <a href="${noticia.url}" target="_blank" class="read-more">Read More</a>
      </div>`;
    container.appendChild(card);
  });
}

// --- EVENTOS ---

// Clique do Botão
botaoP.addEventListener("click", function (event) {
  event.preventDefault();
  const termo = pesquisaInput.value;
  if (!termo) return;

  // Nova busca mantendo o idioma inglês
  const novaApi = `https://newsapi.org/v2/everything?q=${termo}&language=en&apiKey=${apiKey}`;
  buscarNoticias(novaApi);
});

// Tecla Enter no Input
pesquisaInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    botaoP.click();
  }
});
