class GameDisplay {
  constructor() {
    this.games = [];
    this.initEventListeners();
    this.loadGamesFromLocalStorage("MMORPG");
  }

  initEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          navLinks.forEach((link) => link.classList.remove("active"));
          event.target.classList.add("active");
          const category = event.target.getAttribute("data-category");
          this.getGames(category);
        });
      });
    });

    document.getElementById("row").addEventListener("click", (event) => {
      let target = event.target.closest(".card");
      if (target) {
        const gameId = target.getAttribute("data-game-id");
        window.location.href = `details.html?id=${gameId}`;
      }
    });

    window.addEventListener("load", () => {
      var loader = document.getElementById("loader");
      loader.style.display = "none";
    });
  }

  async getGames(category) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "77fd14a197mshc9d47d642c5b18ap1c00c8jsn2ffaaaf33c61",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const response = await api.json();
    console.log(response);
    localStorage.setItem(`games_${category}`, JSON.stringify(response));
    this.displayGames(response);
  }

  loadGamesFromLocalStorage(category) {
    const gamesData = localStorage.getItem(`games_${category}`);
    if (gamesData) {
      this.games = JSON.parse(gamesData);
      this.displayGames(this.games);
    } else {
      this.getGames(category);
    }
  }

  displayGames(games, limit = games.length) {
    let content = "";
    let limitedGames = games.slice(0, limit);
    for (let i = 0; i < limitedGames.length; i++) {
      let thumbnailUrl = limitedGames[i].thumbnail;
      let description = limitedGames[i].short_description
        .split(" ")
        .slice(0, 8)
        .join(" ");
      let platformWords = limitedGames[i].platform
        .split(" ")
        .slice(0, 2)
        .join(" ");
      let gameId = limitedGames[i].id;
      content += `
        <div class="col-md-3">
          <div class="card my-4" data-game-id="${gameId}">
            <img class="thumbnail" src="${thumbnailUrl}" alt="${limitedGames[i].title} Thumbnail">
            <h6 class="title">${limitedGames[i].title}</h6>
            <button class="btn btn-info">Free</button>
            <p class="description">${description}...</p>
            <hr>
            <div class="details">
              <span class="genre">${limitedGames[i].genre}</span>
              <span class="platform">${platformWords}</span>
            </div>
          </div>
        </div>
      `;
    }
    document.getElementById("row").innerHTML = content;
  }
}


const gameDisplay = new GameDisplay();
