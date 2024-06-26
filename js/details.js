
class GameDetails {
  constructor() {
    this.initEventListeners();
    this.showDetails();
  }
  initEventListeners() {
    document.getElementById("btnClose").addEventListener("click", () => {
      window.location.href = "index.html"; 
    });

    window.addEventListener("load", () => {
      var loader = document.getElementById("loader");
      loader.style.display = "none";
    });
  }

  async showDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    console.log("Game ID:", gameId);

    if (!gameId) {
      console.error("Game ID is not defined");
      return;
    }

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "77fd14a197mshc9d47d642c5b18ap1c00c8jsn2ffaaaf33c61",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch game details");
      }

      const gameDetails = await response.json();
      console.log("Game Details:", gameDetails);
      this.displayGameDetails(gameDetails);
    } catch (error) {
      console.error("Error fetching game details:", error.message);
    }
  }

  displayGameDetails(gameDetails) {
    const content = `
      <div class="col-md-3 position-relative">    
        <img id="gameThumbnail" src="${gameDetails.thumbnail}" alt="${gameDetails.title} Thumbnail">
      </div>
      <div class="game-data col-md-9">
        <p><strong class="h3 gameTitle">Category:</strong><span class="gameTitle h3">${gameDetails.title}</span></p>
        <p><strong class="gameDetails">Genre:</strong> <span id="gameGenre" class="bg-info">${gameDetails.genre}</span></p>
        <p><strong class="gameDetails">Platform:</strong> <span id="gamePlatform" class="bg-info">${gameDetails.platform}</span></p>
        <p><strong class="gameDetails">Status:</strong> <span id="gamePublisher" class="bg-info">${gameDetails.status}</span></p>
        <div class="gameDetails" id="gameDescription">${gameDetails.description}</div>
      </div>
    `;

    document.getElementById("row").innerHTML = content;
  }
}
const gameDetails = new GameDetails();
