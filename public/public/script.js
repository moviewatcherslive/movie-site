const apiKey = "cca39a1c2540c174b93f3cba8e58c992"; // तेरी API Key

async function fetchMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=hi-IN&page=1`);
    const data = await res.json();

    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = "";

    data.results.forEach(movie => {
      const movieEl = document.createElement("div");
      movieEl.className = "movie-card";
      movieEl.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}</p>
      `;
      moviesContainer.appendChild(movieEl);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchMovies);
