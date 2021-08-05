import React, { useState, useEffect } from "react"
import getRecipes from "../services/getRecipes"
import RecipeTile from "./RecipeTile"

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    if(props.user) {
      const recipes = await getRecipes(props.user.id)
      setRecipes(recipes)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [props.user])

  const recipesList = recipes.map(recipe => {
    return (
      <RecipeTile 
        key={recipe.id}
        recipe={recipe}
      />
    )
  })

  return(
    <div>
      <h1>Recipes in Your Cookbook</h1>
      {recipesList}
    </div>

  )
}

export default RecipeList