import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const EditRecipeForm = (props) => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "", description: "", other: false}],
    steps: [{ step: "" }]
  })

  const { id } = useParams()

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
      fetchRecipeDetails()
    }, [])

  return (
    <p>{recipe.name}</p>
  )
}

export default EditRecipeForm