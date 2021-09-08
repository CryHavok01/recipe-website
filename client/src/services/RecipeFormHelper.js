class RecipeFormHelper {
  static handleChange = (event, formValues) => {
    let newFormValues = {...formValues};
    newFormValues[event.target.name] = event.target.value;
    return newFormValues;
  }

  static handleIngredientChange = (index, event, formValues) => {
    let newFormValues = {...formValues}
    newFormValues.ingredients[index][event.target.name] = event.target.value
    return newFormValues
  }

  static handleSelectUnit = (index, event, formValues) => {
    let newFormValues = {...formValues}
    newFormValues.ingredients[index][event.currentTarget.name] = event.currentTarget.value
    if (event.currentTarget.value === "other") {
      newFormValues.ingredients[index].other = true
    } else {
      newFormValues.ingredients[index].other = false
    }
    return newFormValues
  }

  static handleStepChange = (index, event, formValues) => {
    let newFormValues = {...formValues}
    newFormValues.steps[index][event.target.name] = event.target.value
    return newFormValues
  }

  static addIngredientFormFields = (formValues) => {
    let newFormValues = {
      ...formValues,
      ingredients: [...formValues.ingredients, { name: "", amount: "", unit: "", description: ""}]
    }
    return newFormValues
  }

  static removeIngredientFormFields = (index, formValues) => {
    let newFormValues = {...formValues};
    newFormValues.ingredients.splice(index, 1);
    return newFormValues
  }

  static addStepFormFields = (formValues) => {
    let newFormValues = {
      ...formValues,
      steps: [...formValues.steps, { step: "" }]
    }
    return newFormValues
  }

  static removeStepFormFields = (index, formValues) => {
    let newFormValues = {...formValues};
    newFormValues.steps.splice(index, 1);
    return newFormValues
  }
}

export default RecipeFormHelper