import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

const IngredientShow = (props) => {
  const [ingredient, setIngredient] = useState({})

  const { id } = useParams()
  const fetchIngredientDetails = async () => {
    try {
      const response = await fetch(`/api/v1/ingredients/${id}`)
      const body = await response.json()
      setIngredient(body.ingredient)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  } 

  useEffect(() => {
    fetchIngredientDetails()
  }, [])

  let capName
  let description
  if(ingredient.name) {
    capName = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
    description = ingredient.description.charAt(0).toUpperCase() + ingredient.description.slice(1)
  }

  return(
    <div>
      <h2>{capName}</h2>
      <h4>Measurement: {Number(ingredient.amount)} {ingredient.unit}</h4>
      {description}
    </div>
  )
}

export default IngredientShow