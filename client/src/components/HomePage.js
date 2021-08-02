import React, { useEffect, useState } from "react"
import getOwnedIngredients from "../services/getOwnedIngredients"
import getRecipes from "../services/getRecipes"

const HomePage = (props) => {
  const [ownedIngredients, setOwnedIngredients] = useState([])
  const [recipes, setRecipes] = useState([])

  const fetchDetails = async () => {
    const fetchedIngredients = await getOwnedIngredients(props.user.id)
    setOwnedIngredients(fetchedIngredients)
    const fetchedRecipes = await getRecipes(props.user.id)
    setRecipes(fetchedRecipes)
  }

useEffect(() => {
  if(props.user) {
    fetchDetails()
  }
}, [props.user])

let ingredientsNum = 0
if (ownedIngredients.length > 0) {
  ingredientsNum = ownedIngredients.length
}

let recipesNum = 0
if (recipes.length > 0) {
  recipesNum = recipes.length
}

  return (
    <div>
      <h1>Your Home Page</h1>
      <p>You currently have {ingredientsNum} ingredients in your kitchen</p>
      <button className="button">Ingredients</button>
      <p>You have saved {recipesNum} recipes</p>
      <button className="button">Recipes</button>
    </div>
  )
}

export default HomePage