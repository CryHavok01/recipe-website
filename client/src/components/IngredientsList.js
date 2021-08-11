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
    <div className="grid-container fluid">
      <div className="grid-x align-center">
        <div className="cell small-9">
          <h1 className="title">What's in Your Pantry?</h1>
        </div>
        <div className="cell small-2">
          <Link to="/ingredients/new" className="button blue round middle">
            Add New Ingredient
          </Link>
        </div>
      </div>
      <div className="callout">
        {ingredientsList}
      </div>
    </div>
  )
}

export default IngredientsList