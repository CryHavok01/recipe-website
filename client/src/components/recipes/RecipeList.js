import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import getRecipes from "../../services/getRecipes"
import RecipeTile from "./RecipeTile"

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    const recipes = await getRecipes()
    setRecipes(recipes)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  const recipesList = recipes.map(recipe => {
    return (
      <RecipeTile 
        key={recipe.id}
        recipe={recipe}
      />
    )
  })

  return(
    <div className="grid-container center">
      <div className="grid-x align-center">
        <div className="cell medium-9 left">
          <h1 className="title">Recipes in Your Cookbook</h1>
        </div>
        <div className="cell medium-2">
          <Link to="/recipes/new" className="button blue round bold" id="top-space">
            New Recipe
          </Link>
        </div>
      </div>
      <div>
        {recipesList}
      </div>
    </div>

  )
}

export default RecipeList