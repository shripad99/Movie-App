import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const MovieModal = ({movie, onClose}) => {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() =>{
        const fetchMovieDetails = async () =>{
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
                    params: {
                        api_key: 'af1c1097bb47cc72cb3fd701b8aea56e',
                    },
                });
                setMovieDetails(response.data);
            } catch(error){
                console.log("Error fetching movie details", error)
            }
        };
        fetchMovieDetails();
    }, [movie]);

    if(!movieDetails){
        return <div className='modal'>Loading...</div>
    }
  return (
    <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-[#2a385d] p-10 rounded-lg relative w-3/4 md:w-1/2 lg:w-1/3 max-h-screen">
        <button className="close-btn absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <RxCross2 size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">{movieDetails.title}</h2>
        <p className='text-gray-500'><strong className='text-white font-normal'>Genre:</strong> {movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
        <p className='text-gray-500 py-1'><strong className='text-white font-normal'>Summary:</strong> {movieDetails.overview}</p>
        <p className='text-gray-500 py-1'><strong className='text-white font-normal'>Rating:</strong> {movieDetails.vote_average}/10</p>
      </div>
    </div>
  )
}

export default MovieModal