import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import RecipeFormHelper from "../../services/RecipeFormHelper";
import FormError from "../layout/FormError"
import ErrorList from "../shared/ErrorList"
import translateServerErrors from "../../services/translateServerErrors"
import { Redirect } from "react-router-dom"

const EditRecipeForm = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "", description: "", other: false}],
    steps: [{ step: "" }]
  })
  const [errors, setErrors] = useState({ ingredients: [], steps: [] })
  const [serverErrors, setServerErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newRecipeId, setNewRecipeId] = useState(null)

  const { id } = useParams()

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${id}`)
      const body = await response.json()
      setFormValues(body.recipe)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
      fetchRecipeDetails()
    }, [])

  
    const handleChange = (event) => {
        setFormValues(RecipeFormHelper.handleChange(event, formValues));
      }
    
    const handleIngredientChange = (index, event) => {
      setFormValues(RecipeFormHelper.handleIngredientChange(index, event, formValues))
    }
  
    const handleSelectUnit = (index, event) => {
      setFormValues(RecipeFormHelper.handleSelectUnit(index, event, formValues))
    }
    
    const handleStepChange = (index, event) => {
      setFormValues(RecipeFormHelper.handleStepChange(index, event, formValues))
    }
    
    const addIngredientFormFields = () => {
        setFormValues(RecipeFormHelper.addIngredientFormFields(formValues))
      }
    
    const removeIngredientFormFields = (index) => {
        setFormValues(RecipeFormHelper.removeIngredientFormFields(index, formValues))
    }
  
    let addStepFormFields = () => {
      setFormValues(RecipeFormHelper.addStepFormFields(formValues))
    }
  
    const removeStepFormFields = (index) => {
        setFormValues(RecipeFormHelper.removeStepFormFields(index, formValues))
    }
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const foundErrors = validateData(formValues);
      if(!foundErrors) {
        try {
          const formPayload = { editedRecipe: { ...formValues } }
          const response = await fetch(`/api/v1/recipes/edit`, {
            method: "PATCH",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            body: JSON.stringify(formPayload)
          })
          if(!response.ok) {
            if(response.status === 422) {
              const body = await response.json()
              const newErrors = translateServerErrors(body.errors)
              return setServerErrors(newErrors)
            } else {
              const errorMessage = `${response.status}: (${response.statusText})`
              const error = new Error(errorMessage)
              throw(error)
            }
          }
      //     const { recipe } = await response.json()
      //     setNewRecipeId(recipe.id)
      //     setShouldRedirect(true)
        } catch(error) {
          console.error(`Error in Fetch: ${error.message}`)
        }
      }
    }
  
    const validateData = (formValues) => {
      setErrors({ ingredients: [], steps: [] });
      const { name, ingredients, steps } = formValues
      let foundError = false
      let newErrors = { ingredients: [], steps: [] };
      if (name.trim() == "") {
        newErrors = {
          ...newErrors,
          name: "is required",
        };
        foundError = true
      }
  
      ingredients.forEach((ingredient, index) => {
        newErrors = { ...newErrors }
        newErrors.ingredients.push({})
        if (ingredient.name.trim() == "") {
          newErrors = { ...newErrors }
          newErrors.ingredients[index].name = "is required"
          foundError = true
        }
  
        if (ingredient.amount.trim() == "") {
          newErrors = { ...newErrors };
          newErrors.ingredients[index].amount = "is required"
          foundError = true
        }
        
        if (ingredient.unit.trim() == "") {
          newErrors = { ...newErrors };
          newErrors.ingredients[index].unit = "is required"
          foundError = true
        }
      })
  
      steps.forEach((step, index) => {
        newErrors = { ...newErrors }
        newErrors.steps.push({})
        if (step.step.trim() == "") {
          newErrors = { ...newErrors }
          newErrors.steps[index].step = "is required"
          foundError = true
        }
      })
  
      setErrors(newErrors);
      return foundError
    }
  
    let ingredientFields 
    if(formValues) {
      ingredientFields = formValues.ingredients.map((ingredient, index) => {
        const otherField = (
          <div>
          <label htmlFor="other">Other: </label>
          <input 
            type="text" 
            id="other" 
            name="unit"
            value={ingredient.unit}
            onChange={(event) => handleIngredientChange(index, event)}
          />
          </div>
        )
  
        const removeButton = (
          <button
            type="button"
            className="button blue round remove"
            onClick={() => removeIngredientFormFields(index)}
          >
            Remove
          </button>
        )
        return (
          <div key={index} className="callout secondary">
            <p>Ingredient {index+1}</p>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            { errors.ingredients[index] ? 
              <FormError error={errors.ingredients[index].name} />
              : null
            }
  
            <label>Amount:</label>
            <input
              type="number" 
              step="0.01"
              id="amount" 
              name="amount"
              min=".01"
              value={ingredient.amount}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            { errors.ingredients[index] ? 
              <FormError error={errors.ingredients[index].amount} />
              : null
            }
  
            <label>Units:</label>
            <select id="unit" name="unit" defaultValue="select" onChange={(event) => handleSelectUnit(index, event)}>
              <option hidden disabled value="select"> {ingredient.unit} </option>
              <option value="tsp">Teaspoon(s)</option>
              <option value="tbsp">Tablespoon(s)</option>
              <option value="oz">Ounce(s)</option>
              <option value="cup">Cup(s)</option>
              <option value="gal">Gallon(s)</option>
              <option value="other">Other</option>
            </select>
            {ingredient.other ? otherField : null}
            { errors.ingredients[index] ? 
              <FormError error={errors.ingredients[index].unit} />
              : null
            }
  
            <label>Description (optional):</label>
            <input
              type="text"
              name="description"
              value={ingredient.description}
              onChange={(event) => handleIngredientChange(index, event)}
            />
  
            { index ? removeButton : null }
          </div>
        )
      })
    }
  
    let stepFields
    if(formValues) {
      stepFields = formValues.steps.map((step, index) => {
        const removeButton = (
          <button
            type="button"
            className="button blue round remove"
            onClick={() => removeStepFormFields(index)}
          >
            Remove
          </button>
        )
  
        return (
          <div key={index} className="callout secondary">
            <p>Step {index+1}</p>
            <label>Instructions</label>
            <textarea
              form="recipe-form"
              name="step"
              value={step.step}
              onChange={(event) => handleStepChange(index, event)}
            />
            { errors.steps[index] ? 
              <FormError error={errors.steps[index].step} />
              : null
            }
  
            { index ? removeButton : null }
          </div>
        )
      })
    }
  
    if(shouldRedirect) {
      return (
        <Redirect push to={`/recipes/${newRecipeId}`} />
      )
    }
  
    return (
      <div className="grid-container">
        <h2 className="title">Edit Your Recipe</h2>
        <div className="callout">
          <ErrorList errors={serverErrors} />
            <form id="recipe-form" onSubmit={handleSubmit}>
              <h4>Recipe</h4>
              <label>Recipe Name:</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              <FormError error={errors.name} />
  
              <label>Description (optional):</label>
              <input
                type="text"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
  
              <h4>Ingredients</h4>
              {ingredientFields}
              <div className="button-section">
                  <button
                    className="button blue round add"
                    type="button"
                    onClick={addIngredientFormFields}
                  >
                    Add Ingredient
                  </button>
              </div>
  
              <h4>Steps</h4>
              {stepFields}
                <button
                  className="button blue round add margin-5"
                  type="button"
                  onClick={addStepFormFields}
                >
                  Add Step
                </button>
  
                <button
                  className="button blue round submit margin-5"
                  type="submit"
                >
                  Submit
                </button>
          </form>
        </div>
      </div>
    )
}

export default EditRecipeForm