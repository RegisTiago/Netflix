import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header/Header';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, serFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] =  useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pagando a lista total
      let list = await tmdb.getHomeList();
      /*console.log(list);*/
      setMovieList(list);
      //Pegamdo o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      //console.log(chosen);
      let chosenInfo = await tmdb.getMovieInfo(chosen.id,'tv');
      //console.log(chosenInfo);
      serFeaturedData(chosenInfo);
    }
    loadAll();
  },[]);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll',scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return (
    <div className= "page">

      <Header black={blackHeader} />
       
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
      <section className= "lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Direitos de Imagens para NetFlix. <br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading"> 
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div>
      }
    </div>
  )
}