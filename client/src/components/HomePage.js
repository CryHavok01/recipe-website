import React, { useEffect, useState } from "react"

const HomePage = (props) => {
  const [ownedIngredients, setOwnedIngredients] = useState([])
  const [recipes, setRecipes] = useState([])

  const fetchIngredients = async () => {
    if(props.user) {
      try {
        const response = await fetch(`/api/v1/ownedIngredients/${props.user.id}`)
        const body = await response.json()
        setOwnedIngredients(body.ownedIngredients)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

  const fetchRecipes = async () => {
    if(props.user) {
      try {
        const response = await fetch(`/api/v1/recipes/${props.user.id}`)
        const body = await response.json()
        setRecipes(body.recipes)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

useEffect(() => {
  fetchIngredients()
  fetchRecipes()
}, [props.user])

let ingredientsNum = 0
if (ownedIngredients.length > 0) {
  ingredientsNum = ownedIngredients.length
}

let recipesNum = 0
if (recipes.length > 0) {
  recipesNum = recipes.length
}

  return (
    <div>
      <h1>Your Home Kitchen</h1>
      <p>You currently have {ingredientsNum} ingredients in your kitchen</p>
      <p>You have saved {recipesNum} recipes</p>
    </div>
  )
}

export default HomePage