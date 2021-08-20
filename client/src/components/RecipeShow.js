import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import RecipeIngredientTile from "./RecipeIngredientTile"
import IngredientMeasurementConverter from "../services/IngredientMeasurementConverter"
import { Link } from "react-router-dom"

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

    const newIngredientMatch = (pantryIngredientId, recipeIngredient) => {
      const matchIngredient = pantryIngredients.find(ingredient => ingredient.id === pantryIngredientId)
      const newIngredientInfo = {
        ...recipeIngredient,
        detail: IngredientMeasurementConverter.compareIngredient(matchIngredient, recipeIngredient)
      }
      delete newIngredientInfo.potentialMatches
      const recipeIngredientsCopy = [...recipeIngredients]
      const oldIngredientIndex = recipeIngredientsCopy.findIndex(ingredient => ingredient.id === newIngredientInfo.id)
      recipeIngredientsCopy.splice(oldIngredientIndex, 1, newIngredientInfo)
      setRecipeIngredients(recipeIngredientsCopy)

      const newUpdatedIngredient = IngredientMeasurementConverter.getUpdatedIngredientTotal(matchIngredient, recipeIngredient)
      const updatedIngredientsCopy = [...updatedIngredients]
      updatedIngredientsCopy.splice(updatedIngredients.indexOf(false), 1, newUpdatedIngredient)
      setUpdatedIngredients(updatedIngredientsCopy)
    }

    const noIngredientMatch = (recipeIngredient) => {
      const newIngredientInfo = {
        ...recipeIngredient,
        detail: "don't have"
      }
      delete newIngredientInfo.potentialMatches
      const recipeIngredientsCopy = [...recipeIngredients]
      const oldIngredientIndex = recipeIngredientsCopy.findIndex(ingredient => ingredient.id === newIngredientInfo.id)
      recipeIngredientsCopy.splice(oldIngredientIndex, 1, newIngredientInfo)
      setRecipeIngredients(recipeIngredientsCopy)
    }
    
    const ingredientsList = recipeIngredients.map(ingredient => {
      return (
        <RecipeIngredientTile 
          key={ingredient.id}
          ingredient={ingredient}
          newIngredientMatch={newIngredientMatch}
          noIngredientMatch={noIngredientMatch}
          pantryIngredients={pantryIngredients}
        />
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

  const madeNotice = (
      <div id="made-recipe">
        <p>We've updated your ingredients for you.  Enjoy your food!</p>
        <Link to="/ingredients">
          <button className="button round blue bold">View your Ingredients</button>
        </Link>
      </div>
    )
  const makeButton = (
    <div className="center">
      <button className="button blue round bold" onClick={makeRecipe}>Make this Recipe</button>
    </div>
  )

  return(
    <div className="grid-container center">
      <h1 className="title">{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      {recipeImage}
      <div className="grid-x grid-margin-x left" id="top-space">
        <div className="cell medium-6 callout">
          <h3>Ingredients: </h3>
          <div>
            {ingredientsList}
          </div>
        </div>
        <div className="cell medium-6 callout">
          <h3>Instructions: </h3>
          <ol>
            {stepsList}
          </ol>
          {made ? madeNotice : makeButton}
        </div>
      </div>
    </div>
  )
}

export default RecipeShow