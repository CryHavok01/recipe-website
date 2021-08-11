import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getIngredients from "../services/getIngredients"
import IngredientTile from "./IngredientTile"

const IngredientsList = (props) => {
  const [ingredients, setIngredients] = useState([])

  const fetchIngredients = async () => {
    const ingredients = await getIngredients()
    setIngredients(ingredients)
  }

  useEffect(() => {
    fetchIngredients()
  }, [])

  const ingredientsList = ingredients.map(ingredient => {
    return (
      <IngredientTile 
        key={ingredient.id}
        ingredient={ingredient}
      />
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x align-center">
        <div className="cell small-8">
          <h1>What's in Your Pantry?</h1>
        </div>
        <div className="cell small-4">
          <Link to="/ingredients/new" className="button misty-moss middle">
            Add New Ingredient
          </Link>
        </div>
      </div>
      <div className="callout khaki">
        {ingredientsList}
      </div>
    </div>
  )
}

export default IngredientsList