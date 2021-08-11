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
    <div className="grid-container">
      <h1>Your Home Page</h1>
      <p>You currently have {ingredientsNum} ingredients in your kitchen</p>
      <Link to="/ingredients">
        <button className="button misty-moss">Ingredients</button>
      </Link>
      <p>You have saved {recipesNum} recipes</p>
      <Link to="/recipes">
        <button className="button misty-moss">Recipes</button>
      </Link>
      <br />
      <Link to="/search">
        <button className="button misty-moss">Search for New Recipes</button>
      </Link>
    </div>
  )
}

export default HomePage