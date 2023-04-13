import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { useHistory } from "react-router";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? " shown" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profile-menu-button changeCursor">
        <div className="profile-menu">
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle profile-circle" />
        </div>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <div className="divider">
              <p className="text">Hello, {user.firstName}</p>
              <p className="text">{user.email}</p>
            </div>
            <div className="divider">
              <button className="manage-spots-button" onClick={() => history.push(`/spots/current`)}>Manage Spots</button>
            </div>
            <div className="logoutButtonDiv">
              <button className="el-button" onClick={logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />

          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
