import React, { useState } from "react"
import FormError from "../layout/FormError"
import ErrorList from "../shared/ErrorList"
import translateServerErrors from "../../services/translateServerErrors"
import { Redirect } from "react-router-dom"

const NewRecipeForm = (props) => {

  const [ formValues, setFormValues ] = useState({ 
    name: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "", description: "", other: false}],
    steps: [{ step: "" }]
  })
  const [errors, setErrors] = useState({ ingredients: [], steps: [] })
  const [serverErrors, setServerErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newRecipeId, setNewRecipeId] = useState(null)

  const handleChange = (event) => {
      let newFormValues = {...formValues};
      newFormValues[event.target.name] = event.target.value;
      setFormValues(newFormValues);
    }
  
  const handleIngredientChange = (index, event) => {
    let newFormValues = {...formValues}
    newFormValues.ingredients[index][event.target.name] = event.target.value
    setFormValues(newFormValues)
  }

  const handleSelectUnit = (index, event) => {
    let newFormValues = {...formValues}
    newFormValues.ingredients[index][event.currentTarget.name] = event.currentTarget.value
    if (event.currentTarget.value === "other") {
      newFormValues.ingredients[index].other = true
    } else {
      newFormValues.ingredients[index].other = false
    }
    setFormValues(newFormValues)
  }
  
  const handleStepChange = (index, event) => {
    let newFormValues = {...formValues}
    newFormValues.steps[index][event.target.name] = event.target.value
    setFormValues(newFormValues)
  }
  
  const addIngredientFormFields = () => {
      setFormValues({
        ...formValues,
        ingredients: [...formValues.ingredients, { name: "", amount: "", unit: "", description: ""}]
      })
    }
  
  const removeIngredientFormFields = (index) => {
      let newFormValues = {...formValues};
      newFormValues.ingredients.splice(index, 1);
      setFormValues(newFormValues)
  }

  let addStepFormFields = () => {
    setFormValues({
      ...formValues,
      steps: [...formValues.steps, { step: "" }]
    })
  }

  const removeStepFormFields = (index) => {
      let newFormValues = {...formValues};
      newFormValues.steps.splice(index, 1);
      setFormValues(newFormValues)
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const foundErrors = validateData(formValues);
    if(!foundErrors) {
      try {
        const formPayload = { newRecipe: { ...formValues }}
        const response = await fetch(`/api/v1/recipes/new`, {
          method: "POST",
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
        const { recipe } = await response.json()
        setNewRecipeId(recipe.id)
        setShouldRedirect(true)
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
          className="button remove"
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
            <option hidden disabled value="select"> -- select an option -- </option>
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
          className="button remove"
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
      <div className="callout">
        <ErrorList errors={serverErrors} />
          <form id="recipe-form" onSubmit={handleSubmit}>
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

            {ingredientFields}
            <div className="button-section">
                <button
                  className="button add"
                  type="button"
                  onClick={addIngredientFormFields}
                >
                  Add Ingredient
                </button>
            </div>

            {stepFields}
              <button
                className="button add"
                type="button"
                onClick={addStepFormFields}
              >
                Add Step
              </button>

              <button
                className="button submit"
                type="submit"
              >
                Submit
              </button>
        </form>
      </div>
    </div>
  )
}

export default NewRecipeForm