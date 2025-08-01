import React, { useState, useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'

const Player = () => {
  
  const {id} = useParams();

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-2); // Navigate back to the previous page
  };

  const [apiData, setApiData] = useState({  
    name: '',
    key: "",
    published_at: '',
    type: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQ3NzFhZjUwNWE5YmZmM2Q1NDBlNWVmNDM2MjhiMyIsIm5iZiI6MTc1Mzk2Nzc5NS4zOTUsInN1YiI6IjY4OGI2Y2IzZWYwMTdiZTE4ZGFkMmM3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.evCmdmkrJTT2QGdSzROMOL2iNJ_d_2lzFXmMY0cKh4k'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));

  }, []);

  
  return (
    <div className='player'>

      <img src={back_arrow_icon} alt="" onClick={handleBackClick} />

      <iframe width='90%' height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="Trailer" frameBorder="0" allowFullScreen></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>        
        <p>{apiData.type}</p>
      </div>

    </div>
  )
}

export default Player
