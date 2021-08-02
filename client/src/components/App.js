import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import HomePage from "./HomePage";
import IngredientsList from "./ingredientsList";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>Welcome to Josh's Kitchen</h2>
          <p>This is a website designed to help you keep track of your favorite recipes, as well as all the various ingredients you have in your own kitchen.  Get started by adding information about the ingredients you own, and then you can search for recipes that look tasty or add your own.  Once you select a recipe, we'll let you know if you have enough ingredients to make it, or let you know which things you should go shopping for.  If you're ready to get cooking, you can press the big green button and we'll automatically update your ingredients by subtracting the amounts you use in that recipe.  Sign up for a new account, or sign in to an existing one to get cooking!</p>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/home" component={HomePage} user={currentUser} />
        <AuthenticatedRoute exact path="/ingredients" component={IngredientsList} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
