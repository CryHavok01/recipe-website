import React, { useState } from "react"

const NewRecipeForm = (props) => {

  const [ formValues, setFormValues ] = useState({ 
    name: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "", description: ""}],
    steps: [{ step: "" }]
  })

  let handleChange = (e) => {
      let newFormValues = {...formValues};
      newFormValues[e.target.name] = e.target.value;
      setFormValues(newFormValues);
    }
  
  let handleIngredientChange = (i, e) => {
    let newFormValues = {...formValues}
    newFormValues.ingredients[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }
  
  let handleStepChange = (i, e) => {
    let newFormValues = {...formValues}
    newFormValues.steps[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }
  
  let addIngredientFormFields = () => {
      setFormValues({
        ...formValues,
        ingredients: [...formValues.ingredients, { name: "", amount: "", unit: "", description: ""}]
      })
    }
  
  let removeIngredientFormFields = (i) => {
      let newFormValues = {...formValues};
      newFormValues.ingredients.splice(i, 1);
      setFormValues(newFormValues)
  }

  let addStepFormFields = () => {
    setFormValues({
      ...formValues,
      steps: [...formValues.steps, { step: "" }]
    })
  }

  let removeStepFormFields = (i) => {
      let newFormValues = {...formValues};
      newFormValues.steps.splice(i, 1);
      setFormValues(newFormValues)
  }
  
  let handleSubmit = (event) => {
      event.preventDefault();
      alert(JSON.stringify(formValues));
  }

  let ingredientFields 
  if(formValues) {
    ingredientFields = formValues.ingredients.map((ingredient, index) => {
      return (
        <div key={index}>
          <p>Ingredient {index+1}</p>
          <label>Name</label>
          <input type="text" name="name" value={ingredient.name || ""} />
          <label>Amount</label>
          <input type="text" name="amount" value={ingredient.amount || ""} />
          <label>Unit</label>
          <input type="text" name="unit" value={ingredient.unit || ""} />
          <label>Description</label>
          <input type="text" name="description" value={ingredient.description || ""} />
          {
            index ? 
              <button type="button"  className="button remove" onClick={() => removeIngredientFormFields(index)}>Remove</button> 
            : null
          }
        </div>
      )
    })
  }

  let stepFields
  if(formValues) {
    stepFields = formValues.steps.map((step, index) => {
      return (
        <div key={index}>
          <p>Step {index+1}</p>
          <label>Instructions</label>
          <textarea form="recipe-form" name="step" value={step.step || ""} />
          {
            index ? 
              <button type="button"  className="button remove" onClick={() => removeStepFormFields(index)}>Remove</button> 
            : null
          }
        </div>
      )
    })
  }

  return (
      <form id="recipe-form" onSubmit={handleSubmit}>
        <label>Recipe Name</label>
        <input type="text" name="name" value={formValues.name} />
        <label>Description</label>
        <input type="text" name="description" value={formValues.description} />
        {ingredientFields}
        <div className="button-section">
            <button className="button add" type="button" onClick={addIngredientFormFields}>Add Ingredient</button>
        </div>
        {stepFields}
        <div className="button-section">
            <button className="button add" type="button" onClick={addStepFormFields}>Add Step</button>
            <button className="button submit" type="submit">Submit</button>
        </div>
    </form>
  )
}

export default NewRecipeForm