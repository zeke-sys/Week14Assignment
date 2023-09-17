import logo from './logo.svg';
import './App.css';
import movieData from './components/Movie';
import MovieData from './components/MovieList';

function App() {
  const movieList = movieData.map(movie => {
    return (
      <MovieData
        key={movie.id}
        movie={movie} />
    )
  })
  return (
    <div className="App">
      <div>
        <h2>Movie Reviews</h2>
        <section className='card-container'>{movieList}</section>
      </div>
    </div>
  );
}

export default App;
