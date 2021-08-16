import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="light-text bold">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button grey bold">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  let homeButton
  if(user) {
    homeButton = (
      <li>
        <Link to="/home" className="light-text">Home</Link>
      </li>
    )
  }

  return (
    <div className="top-bar light-text">
      <div className="top-bar-left">
        <ul className="menu">
          <Link to ="/" className="menu-text">Josh's Kitchen</Link>
          {homeButton}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
