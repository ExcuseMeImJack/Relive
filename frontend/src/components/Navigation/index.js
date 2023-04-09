import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../imgs/LOGO.png';
import icon from '../../imgs/icon.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navBar'>
      <div className='nav-left'>
        <NavLink exact to="/"><img src={icon} alt='logo icon' className='navIcon'/></NavLink>
        <NavLink exact to="/"><img src={logo} alt='logo' className='navLogo'/></NavLink>
      </div>
      <div className='nav-right'>
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
