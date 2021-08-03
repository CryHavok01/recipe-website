import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getOwnedIngredients from "../services/getOwnedIngredients"
import IngredientTile from "./IngredientTile"

const IngredientsList = (props) => {
  const [ownedIngredients, setOwnedIngredients] = useState([])

  const fetchIngredients = async () => {
    if(props.user) {
      const ingredients = await getOwnedIngredients(props.user.id)
      setOwnedIngredients(ingredients)
    }
  }

  useEffect(() => {
    fetchIngredients()
  }, [props.user])

  const ingredientsList = ownedIngredients.map(ingredient => {
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
        <h1 className="same_line">What's in Your Cupboard?</h1>
        <Link to="/addIngredient" className="button same_line align_right">
          Add New Ingredient
        </Link>
      </div>
      <p>Hello</p>
      {ingredientsList}
    </div>
  )
}

export default IngredientsList