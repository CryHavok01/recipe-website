import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const HomePage = (props) => {
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])

  const fetchDetails = async () => {
    try {
      const response = await fetch(`/api/v1/homePage/`)
      const body = await response.json()
      setIngredients(body.ingredients)
      setRecipes(body.recipes)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

useEffect(() => {
  fetchDetails()
}, [])

let ingredientsNum = 0
if (ingredients.length > 0) {
  ingredientsNum = ingredients.length
}

let recipesNum = 0
if (recipes.length > 0) {
  recipesNum = recipes.length
}

  return (
    <div className="grid-container center">
<<<<<<< HEAD
      <h1 className="title">Your Home Page</h1>
      <div className="callout">
        <div className="grid-x margin-x">
          <div className="cell small-4 left">
            <p>You currently have {ingredientsNum} ingredients in your kitchen</p>
=======
      <h1 className="title">Your Profile</h1>
        <div className="grid-x grid-margin-x">
          <div className="cell medium-6 callout pantry">
            <div className="pantry-text">
              <h2 className="title">Your Pantry</h2>
              <h4 className="title">Ingredients in Pantry: {ingredientsNum}</h4>
              <br />
              <Link to="/ingredients">
                <button className="button round blue bold">Ingredients</button>
              </Link>
            </div>
>>>>>>> main
          </div>
          <div className="cell medium-6 callout cookbook">
            <div className="cookbook-text">
              <h2 className="title">Your Cookbook</h2>
              <h4 className="title">Saved Recipes: {recipesNum}</h4>
              <br />
              <Link to="/recipes">
                <button className="button blue round bold">Recipes</button>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <Link to="/search">
          <button className="button orange round bold" id="white-text">Search for New Recipes</button>
        </Link>
    </div>
  )
}

export default HomePage