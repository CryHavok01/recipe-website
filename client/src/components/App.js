import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import HomePage from "./HomePage";
import IngredientsList from "./ingredients/IngredientsList";
import IngredientShow from "./ingredients/IngredientShow";
import NewIngredient from "./ingredients/NewIngredient";
import RecipeList from "./recipes/RecipeList";
import RecipeShow from "./recipes/RecipeShow";
import EditRecipeForm from "./recipes/EditRecipeForm";
import NewRecipeForm from "./recipes/NewRecipeForm";
import RecipeSearch from "./search/RecipeSearch";
import SearchedRecipeShow from "./search/SearchedRecipeShow";

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

  const signUpButton = (
    <Link to="/users/new">
      <button className="button orange bold round" id="white-text">Sign Up Now!</button>
    </Link>
  )

  const homeButton = (
    <Link to="/home">
      <button className="button orange bold round" id="white-text">View your Profile</button>
    </Link>
  )

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <div className="grid-container front-page center">
            <div className="welcome-text callout">
              <h1 className="title">Welcome to Josh's Kitchen</h1>
              <p>This is a website designed to help you keep track of your favorite recipes, as well as all the various ingredients you have in your own kitchen.  Get started by adding information about the ingredients you own, and then you can search for recipes that look tasty.  Once you select a recipe, we'll let you know if you have enough ingredients to make it, or let you know which things you should go shopping for.  If you're ready to get cooking, you can press the Make this Recipe button and we'll automatically update your ingredients by subtracting the amounts you use in that recipe.  Sign up for a new account, or sign in to an existing one to get cooking!</p>
              <div className="center">
                {currentUser ? homeButton : signUpButton}
              </div>
            </div>
          </div>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/home" component={HomePage} user={currentUser} />
        <AuthenticatedRoute exact path="/ingredients" component={IngredientsList} user={currentUser} />
        <AuthenticatedRoute exact path="/ingredients/new" component={NewIngredient} user={currentUser} />
        <AuthenticatedRoute exact path="/ingredients/:id" component={IngredientShow} user={currentUser} />
        <AuthenticatedRoute exact path="/recipes" component={RecipeList} user={currentUser} />
        <AuthenticatedRoute exact path="/recipes/new" component={NewRecipeForm} user={currentUser} />
        <AuthenticatedRoute exact path="/recipes/edit/:id" component={EditRecipeForm} user={currentUser} />
        <AuthenticatedRoute exact path="/recipes/:id" component={RecipeShow} user={currentUser} />
        <AuthenticatedRoute exact path="/search" component={RecipeSearch} user={currentUser} />
        <AuthenticatedRoute exact path="/search/:id" component={SearchedRecipeShow} user={currentUser} /> 
      </Switch>
    </Router>
  );
};

export default hot(App);
