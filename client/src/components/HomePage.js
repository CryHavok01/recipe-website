import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const HomePage = (props) => {
  const [ownedIngredients, setOwnedIngredients] = useState([])
  const [recipes, setRecipes] = useState([])

  const fetchDetails = async () => {
    if(props.user) {
      try {
        const response = await fetch(`/api/v1/homePage/${props.user.id}`)
        const body = await response.json()
        setOwnedIngredients(body.ownedIngredients)
        setRecipes(body.recipes)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

useEffect(() => {
  fetchDetails()
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
      <h1>Your Home Page</h1>
      <p>You currently have {ingredientsNum} ingredients in your kitchen</p>
      <Link to="/ingredients">
        <button className="button">Ingredients</button>
      </Link>
      <p>You have saved {recipesNum} recipes</p>
      <button className="button">Recipes</button>
    </div>
  )
}

export default HomePage