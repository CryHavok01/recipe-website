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
    <div>
        <h1>What's in Your Cupboard?</h1>
      {ingredientsList}
    </div>
  )
}

export default IngredientsList