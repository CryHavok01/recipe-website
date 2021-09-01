import React, { useState } from "react"

const NewRecipeForm = (props) => {

  const [ formValues, setFormValues ] = useState({ 
    name: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "", description: "", other: false}],
    steps: [{ step: "" }]
  })

  let handleChange = (event) => {
      let newFormValues = {...formValues};
      newFormValues[event.target.name] = event.target.value;
      setFormValues(newFormValues);
    }
  
  let handleIngredientChange = (index, event) => {
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
  
  let handleStepChange = (index, event) => {
    let newFormValues = {...formValues}
    newFormValues.steps[index][event.target.name] = event.target.value
    setFormValues(newFormValues)
  }
  
  let addIngredientFormFields = () => {
      setFormValues({
        ...formValues,
        ingredients: [...formValues.ingredients, { name: "", amount: "", unit: "", description: ""}]
      })
    }
  
  let removeIngredientFormFields = (index) => {
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

  let removeStepFormFields = (index) => {
      let newFormValues = {...formValues};
      newFormValues.steps.splice(index, 1);
      setFormValues(newFormValues)
  }
  
  let handleSubmit = (event) => {
      event.preventDefault();
      alert(JSON.stringify(formValues));
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
        <div key={index}>
          <p>Ingredient {index+1}</p>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={ingredient.name}
            onChange={(event) => handleIngredientChange(index, event)}
          />

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
        <div key={index}>
          <p>Step {index+1}</p>
          <label>Instructions</label>
          <textarea
            form="recipe-form"
            name="step"
            value={step.step}
            onChange={(event) => handleStepChange(index, event)}
          />

          { index ? removeButton : null }
        </div>
      )
    })
  }

  return (
      <form id="recipe-form" onSubmit={handleSubmit}>
        <label>Recipe Name</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />

        <label>Description</label>
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
  )
}

export default NewRecipeForm