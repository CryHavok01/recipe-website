import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import EditIngredientForm from "./EditIngredientForm"

const IngredientShow = (props) => {
  const [ingredient, setIngredient] = useState({})  
  const { id } = useParams()
  let userId
  if (props.user) {
    userId = props.user.id
  }
  const fetchIngredientDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/ingredients/${id}`)
      const body = await response.json()
      setIngredient(body.ingredient)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  } 

  useEffect(() => {
    if (props.user) {
      fetchIngredientDetails()
    }
  }, [props.user])

  let capName
  let description
  if(ingredient.name) {
    capName = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
  }
  if(ingredient.description) {
    description = ingredient.description.charAt(0).toUpperCase() + ingredient.description.slice(1)
  }

  const redirect = (newId) => {
    console.log(newId)
    return (
      <Redirect push to={`/ingredients/${newId}`} />
    )
  }


  return(
    <div>
      <h2>{capName}</h2>
      <h4>Measurement: {Number(ingredient.amount)} {ingredient.unit}</h4>
      {description}
      <EditIngredientForm 
        redirect={redirect}
        ingredient={ingredient}
        capName={capName}
        user={props.user}  
      />
    </div>
  )
}

export default IngredientShow