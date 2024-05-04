const options = [
  "Palestine",
  "India",
  "General",
  "Health",
  "Science",
  "Technology",
];

const apiKey = "4ba6d5fe315e4f088de608c93ca84e21";
const apiUrl = "https://newsapi.org/v2/everything?q=";
const container = document.querySelector(".container");
const btnsContainer = document.querySelector(".btns");

async function renderData(topic) {
  try {
    const res = await fetch(
      `${apiUrl}${topic}&from=2024-04-30&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    console.log(data);
    renderBox(data.articles);
  } catch (error) {
    console.log(error);
  }
}
function renderBox(articles) {
  container.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    const html = `   <div class="news">
    <img src="${article.urlToImage}" alt="" />
    <div class="info-box">
    <div class="info">
      <h3>${article.title}</h3> </div>
      <div>
      <p>
       ${article.description}
      </p></div>
      <div>
      <button class="readmore"><a href="${article.url}"  target="_blank">Read More</a></button>
    </div>
      </div>
  </div>`;
    container.insertAdjacentHTML("beforeend", html);
  });
}

options.forEach((option) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#";
  a.textContent = option.charAt(0).toUpperCase() + option.slice(1);
  if (option === "Palestine") {
    li.classList.add("reading");
  }
  a.addEventListener("click", () => {
    const allLiElements = document.querySelectorAll(".btns li");
    allLiElements.forEach((li) => {
      li.classList.remove("reading");
    });
    renderData(option);
    li.classList.add("reading");
  });

  li.appendChild(a);
  btnsContainer.appendChild(li);
});
renderData(options[0]);
