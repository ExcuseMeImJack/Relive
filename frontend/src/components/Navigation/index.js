import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../imgs/LOGO.png';
import icon from '../../imgs/icon.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  return (
    <nav className='navBar'>
      <div className='nav-left'>
        <NavLink exact to="/"><img src={icon} className='navIcon'/></NavLink>
        <NavLink exact to="/"><img src={logo} className='navLogo'/></NavLink>
      </div>

      {sessionUser &&
      <div className='create-spot-div'>
        <button className='create-spot-button-nav changeCursor' onClick={() => history.push('/spots/new')}>Create a New Spot</button>
      </div>}

      <div className='nav-right'>
        <div className="social-links">
          <a href="https://github.com/ExcuseMeImJack" target='_blank'>
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/jroybaldev/" target='_blank'>
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
