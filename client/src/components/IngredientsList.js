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
    <div className="callout">
      <div>
        <h1 className="same_line">What's in Your Pantry?</h1>
        <Link to="/ingredients/new" className="button same_line align_right">
          Add New Ingredient
        </Link>
      </div>
      {ingredientsList}
    </div>
  )
}

export default IngredientsList