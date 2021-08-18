import React, { useState, useEffect } from "react"
import { useParams } from "react-router"

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [pantryIngredients, setPantryIngredients] = useState([])
  const [updatedIngredients, setUpdatedIngredients] = useState([])
  const [made, setMade] = useState(false)

  const { id } = useParams()

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/recipes/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
      setRecipeIngredients(body.recipe.ingredients)
      setPantryIngredients(body.pantryIngredients)
      setUpdatedIngredients(body.updatedIngredients)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
      fetchRecipeDetails()
    }, [])

    const makeRecipe = async (event) => {
      let updatedIngredientData = updatedIngredients.filter(element => element)
      updatedIngredientData.forEach(ingredient => {
        ingredient.amount = Number(ingredient.amount.toFixed(2))
        if(ingredient.amount <= 0) {
          ingredient.amount = 0.01
        }
      })
      try {
        const response = await fetch("/api/v1/recipes/make", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(updatedIngredientData)
        })
        if(response.ok) {
          fetchRecipeDetails()
          setMade(true)
        }
      } catch(err) {
        console.error(`Error in Fetch: ${err.message}`)
      }
    }

    const ingredientsList = recipeIngredients.map(ingredient => {
      let amountNote
      if(ingredient.detail === "don't have") {
        amountNote = <p className="red">It looks like you don't have this ingredient</p>
      } else if(ingredient.detail === "need more") {
        amountNote = <p className="red">You don't have enough of this ingredient</p>
      } else if(ingredient.detail === "can't tell") {
        amountNote = <p className="yellow">We can't tell if you have enough of this ingredient</p>
      } else if(ingredient.detail === "it's close") {
        amountNote = <p className="yellow">You have just about enough, but you might run out of this ingredient</p>
    } else if(ingredient.detail === "have enough") {
      amountNote = <p className="green">You have more than enough of this ingredient</p>
    }
      return (
        <li key={ingredient.id}>
          <p>{ingredient.name}: {Number(ingredient.amount)} {ingredient.unit}</p>
          <p>{ingredient.description}</p>
          {amountNote}
        </li>
      )
    })

  let stepsList
  if(recipe.steps) {
    stepsList = recipe.steps.map(step => {
      return(
        <div key={step.id}>
          <li>{step.step}</li>
        </div>
      )
    })
  }
  
  let recipeImage
  if(recipe.image) {
    recipeImage = <img src={recipe.image} alt={`An image of ${recipe.name}`}/>
  }

  let madeNotice
  if(made) {
    madeNotice = <p>We've updated your ingredients for you.  Enjoy your food!</p>
  }

  return(
    <div className="grid-container center">
      <h1 className="title">{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      {recipeImage}
      <div className="grid-x grid-margin-x left">
        <div className="cell medium-6 callout">
          {madeNotice}
          <h3>Ingredients: </h3>
          <ul>
            {ingredientsList}
          </ul>
        </div>
        <div className="cell medium-6 callout">
          <h3>Instructions: </h3>
          <ol>
            {stepsList}
          </ol>
          <button className="button blue round" onClick={makeRecipe}>Make this Recipe</button>
        </div>
      </div>
    </div>
  )
}

export default RecipeShow