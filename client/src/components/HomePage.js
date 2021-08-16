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
      <h1 className="title">Your Kitchen</h1>
      <div className="callout">
        <div className="grid-x margin-x">
          <div className="cell small-4 left">
            <p>You currently have {ingredientsNum} ingredients in your kitchen</p>
          </div>
          <div className="cell small-4"></div>
          <div className="cell small-4">
            <Link to="/ingredients">
              <button className="button round blue">Ingredients</button>
            </Link>
          </div>
        </div>
        <div className="grid-x margin-x">
          <div className="cell small-4 left">
            <p>You have {recipesNum} saved recipes</p>
          </div>
          <div className="cell small-4"></div>
          <div className="cell small-4">
            <Link to="/recipes">
              <button className="button blue round">Recipes</button>
            </Link>
          </div>
        </div>
        <br />
        <Link to="/search">
          <button className="button orange round bold" id="white-text">Search for New Recipes</button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage