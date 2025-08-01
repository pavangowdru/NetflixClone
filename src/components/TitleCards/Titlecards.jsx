import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const Titlecards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsref = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  };

  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => { 
    const handleWheel = (e) => {
      e.preventDefault();
      cardsref.current.scrollLeft += e.deltaY;
    };

    const currentRef = cardsref.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    // Cleanup function - removes listener on unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [])

  return (
    
    <div className='title-cards'>
      
      <h2>{title?title:"Popular on Netflix"}</h2>
      
      <div className="card-list" ref={cardsref}>
        
        {apiData.map((card, index) => (
          
          <Link to={`/player/${card.id}`} className="card" key={index}>
            
            <img src={`https://image.tmdb.org/t/p/original` + card.backdrop_path} alt="" />
            
            <p>{card.original_title}</p>
          </Link>
        ))}
        
      </div>
    
    </div>
  )
}

export default Titlecards
