const tmdbKey = '113d1eba133c299a441d16e8895e2d0d';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch =`${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  }
  catch(error){console.log(error);}
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch =`${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`; 
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
  }
  catch(error){console.log(error);}
};


const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch =`${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
  }
  catch(error){console.log(error);}
};

const getMovieCast = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch =`${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const castInfo = jsonResponse.cast;
      let castName = '<strong>Starring:</strong> ';
      for (let i = 0; i < castInfo.length; i++){
        castName += castInfo[i].name + ', ';
      };
      return castName;
    }
  }
  catch(error){
    console.log(error);
    }
}


// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = await getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  const cast = await getMovieCast(randomMovie);
  displayMovie(info,cast);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;