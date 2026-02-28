const botaoP = document.querySelector("#botao-pesquisa");
const pesquisaInput = document.getElementById("search-input");
const container = document.querySelector(".news-container"); // Defina o container aqui

let Api =
  "https://newsapi.org/v2/everything?q=brasil&language=pt&apiKey=785a99b011a948ac91156fb739e88775";

// Busca inicial
buscarNoticias(Api);

// --- FUNÇÃO DE PESQUISA REESTRUTURADA ---
function buscarNoticias(urlApi) {
  fetch(urlApi)
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.articles.length === 0) {
        container.innerHTML = `<p>Nenhuma notícia encontrada para "${pesquisaInput.value}" em português.</p>`;
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
      <img src="${noticia.urlToImage}" alt="Imagem Da noticia" />
      <div class="card-content">
        <h3>${noticia.title}</h3>
        <p>${noticia.description}</p>
        <a href="${noticia.url}" target="_blank" class="read-more">Leia na Fonte</a>
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

  const novaApi = `https://newsapi.org/v2/everything?q=${termo}&language=en&apiKey=785a99b011a948ac91156fb739e88775`;
  buscarNoticias(novaApi);
});

// Tecla Enter no Input
pesquisaInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    botaoP.click(); // Simula o clique do botão
  }
});
