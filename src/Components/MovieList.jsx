import React, { useState, useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import MovieModal from './MovieModal';

const MovieList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [sortBy, setSortBy] = useState('popularity.desc');

    useEffect(() => {
      const fetchMovies = async() =>{
          const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
              params: {
                  api_key: 'af1c1097bb47cc72cb3fd701b8aea56e',
                  sort_by: sortBy,
                  page: 1,
              }
          });
          setMovies(response.data.results);
      }
      fetchMovies();
  },[searchQuery, sortBy])

  const handleSearchQuery = async(e) =>{
    try{
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params:{
                api_key: 'af1c1097bb47cc72cb3fd701b8aea56e',
                query: searchQuery,
            }
        })
        setMovies(response.data.results);
    }catch(error){
        console.log("Error found", error)
    }
  }

  const handleSortChange = (e) =>{
    setSortBy(e.target.value);
  }

  return (
    <div className='bg-[#2a385d] min-h-screen'>
        <h1 className='text-center p-5 text-2xl font-semibold text-white'>Movies.com</h1>
        <div className='search-bar mx-2 md:mx-auto border h-12 drop-shadow-xl p-4 rounded-full flex items-center justify-between max-w-xl bg-white'>
            <input type='text' placeholder='Search Movies...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='search-input bg-transparent outline-none w-full'/>
            <button className='text-gray-500 text-2xl' onClick={handleSearchQuery}>
                <IoIosSearch />
            </button>
        </div>
        <div className='max-w-7xl mx-auto mt-3 flex justify-center md:justify-end'>
          <select id="sort-by" className="bg-[#202A44] shadow-md text-white text-sm rounded-lg outline-none block p-2.5 " value={sortBy} onChange={handleSortChange}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
          </select>
        </div>
        <div className='max-w-7xl mx-auto'>
          <div className='movie-list mt-2 md:mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {movies.length > 0 ? (
              movies.map((movie) =>(
                <div className="group relative p-3 rounded-md" key={movie.id} onClick={() => setSelectedMovie(movie)}>
                  <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://bookstore.ams.org/images/not_found.png"} alt={movie.title} className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-85 shadow-md" />
                  <h3 className='truncate text-md pt-2 text-gray-400'>{movie.title}</h3>
                  <p className='text-sm text-gray-500'>{movie.release_date.split("-")[0]}</p>
                </div>
              ))
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </div>
        {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)}/>
        )}
    </div>
  )
}

export default MovieList