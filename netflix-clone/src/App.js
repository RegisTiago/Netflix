import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, serFeaturedData] = useState(null);

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

  return (
    <div className= "page">
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
      <section className= "lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}