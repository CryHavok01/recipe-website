import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import Ingredients from "../services/Ingredients"

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
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  const fetchPantryIngredients = async () => {
    try {
      const response = await fetch(`/api/v1/users/ingredients/all`)
      const body = await response.json()
      setPantryIngredients(body.ingredients)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
      fetchRecipeDetails()
      fetchPantryIngredients()
    }, [])

    useEffect(() => {
      if(recipeIngredients.length > 0) {
        getNewTotals()
      }
    }, [recipeIngredients, pantryIngredients])

    const getNewTotals = () => {
      let ingredientsToUpdate = recipeIngredients.map(ingredient => {
        const ingredientInPantry = pantryIngredients.find(pantryIngredient => pantryIngredient.name.toLowerCase() === ingredient.name)
        if(ingredientInPantry) {
          if(ingredientInPantry.unit === ingredient.unit) {
            const updatedIngredient = {
              ...ingredientInPantry,
              amount: ingredientInPantry.amount - ingredient.amount
            }
            return updatedIngredient
            } else {
            const convertedRecipeIngredient = Ingredients.convertIngredient(ingredient)
            const convertedPantryIngredient = Ingredients.convertIngredient(ingredientInPantry)
            if (!convertedRecipeIngredient || !convertedPantryIngredient) {
              return false
            } else {
              const newTotal = Ingredients.convertAndUpdate(ingredientInPantry, ingredient)
              const updatedIngredient = {
                ...ingredientInPantry,
                amount: newTotal
              }
              return updatedIngredient
            }
          }
        } else {
          return false
        }
      })
      setUpdatedIngredients(ingredientsToUpdate)
    }
    
    const compareIngredient = (ingredient) => {
      const ingredientInPantry = pantryIngredients.find(pantryIngredient => pantryIngredient.name.toLowerCase() === ingredient.name)
      if(ingredientInPantry) {
        if(ingredientInPantry.unit === ingredient.unit) {
          if(ingredientInPantry.amount >= ingredient.amount) {
            return "have enough"
          } else {
            return "need more"
          }
        } else {
          const convertedRecipeIngredient = Ingredients.convertIngredient(ingredient)
          const convertedPantryIngredient = Ingredients.convertIngredient(ingredientInPantry)
          if (!convertedRecipeIngredient || !convertedPantryIngredient) {
            return "can't tell"
          } else {
            if (convertedPantryIngredient - 3 >= convertedRecipeIngredient) {
              return "have enough"
            } else if (convertedPantryIngredient + 3 <= convertedRecipeIngredient) {
              return "need more"
            } else {
              return "it's close"
            }
          }
        }
      } else {
        return "don't have"
      }
    }

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
          fetchPantryIngredients()
          setMade(true)
        }
      } catch(err) {
        console.error(`Error in Fetch: ${err.message}`)
      }
    }

    const ingredientsList = recipeIngredients.map(ingredient => {
      const ingredientInPantry = compareIngredient(ingredient)
      let amountNote
      if(ingredientInPantry === "don't have") {
        amountNote = <p className="red">It looks like you don't have this ingredient</p>
      } else if(ingredientInPantry === "need more") {
        amountNote = <p className="red">You don't have enough of this ingredient</p>
      } else if(ingredientInPantry === "can't tell") {
        amountNote = <p className="yellow">I can't tell if you have enough of this ingredient</p>
      } else if(ingredientInPantry === "it's close") {
        amountNote = <p className="yellow">You have just about enough, but you might run out of this ingredient</p>
    } else if(ingredientInPantry === "have enough") {
      amountNote = <p className="green">You have more than enough of this ingredient</p>
    }
      return (
        <div key={ingredient.id}>
          <p>{ingredient.name}: {Number(ingredient.amount)} {ingredient.unit}</p>
          <p>{ingredient.description}</p>
          {amountNote}
        </div>
      )
    })

  let stepsList
  if(recipe.steps) {
    stepsList = recipe.steps.map(step => {
      return(
        <div key={step.id}>
          <p>{step.number}: {step.step}</p>
        </div>
      )
    })
  }

  let madeNotice
  if(made) {
    madeNotice = <p>We've updated your ingredients for you.  Enjoy your food!</p>
  }

  return(
    <div>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      {madeNotice}
      <h3>Ingredients: </h3>
      {ingredientsList}
      <h3>Instructions: </h3>
      {stepsList}
      <button className="button blue round" onClick={makeRecipe}>Make this Recipe</button>
    </div>
  )
}

export default RecipeShow