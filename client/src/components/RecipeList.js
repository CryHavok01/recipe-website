import React, { useState, useEffect } from "react"
import getRecipes from "../services/getRecipes"
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
    <div className="grid-container">
      <h1>Recipes in Your Cookbook</h1>
      <div className="callout khaki">
        {recipesList}
      </div>
    </div>

  )
}

export default RecipeList