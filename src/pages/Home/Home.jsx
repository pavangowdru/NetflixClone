import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Titlecards from '../../components/TitleCards/Titlecards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
            <img src={hero_title} alt="" className="caption-img" />
            <p>
                Discovering a world of entertainment has never been easier.
                Explore a vast library of movies, TV shows, and more, all at your fingertips.
            </p>        
            <div className="hero_btns">
              <button className='btn'><img src={play_icon} alt="" />Play</button>
              <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
            </div>
            <Titlecards />
        </div>
      </div>
      <div className="more-cards">
        <Titlecards title={"Trending Now"} category={"now_playing"} />
        <Titlecards title={"Popular"} category={"popular"} />
        <Titlecards title={"Top Rated"} category={"top_rated"} />        
        <Titlecards title={"Upcoming"} category={"upcoming"} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
