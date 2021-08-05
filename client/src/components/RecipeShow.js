import React, { useState, useEffect } from "react"
import { useParams } from "react-router"

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})

  const { id } = useParams()
  let userId
  if (props.user) {
    userId = props.user.id
  }

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/recipes/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    if (props.user) {
      fetchRecipeDetails()
    }
  }, [props.user])


  return(
    <h1>Hello</h1>
  )
}

export default RecipeShow