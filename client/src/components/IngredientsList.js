import React, { useEffect, useState } from "react"
import getOwnedIngredients from "../services/getOwnedIngredients"

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

  return (
    <h1>Ingredients</h1>
  )
}

export default IngredientsList