import React from 'react';



import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
               {/* <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"/> */}
               {/*https://icon-icons.com/pt/icone/netflix-oficial-logo/168085*/}
               <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/netflix_logo_icon_170918.png"/> 
               
            </div>
            <div className="header--user">
               <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"/>
            </div>
        </header>
    );
}