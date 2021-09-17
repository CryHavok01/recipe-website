class RecipeSerializer {
  static getRecipeInfo(recipe) {
    const allowedAttributes = ["name", "id", "image"]

    let serializedRecipe = {}
    allowedAttributes.forEach(attribute => {
      serializedRecipe[attribute] = recipe[attribute]
    })

    serializedRecipe.name = this.capitalize(serializedRecipe.name)

    return serializedRecipe
  }

  static async getRecipeWithDetails(recipe) {
    const allowedAttributes = ["name", "description", "id", "image", "spoonacularId"]

    let serializedRecipe = {}
    allowedAttributes.forEach(attribute => {
      serializedRecipe[attribute] = recipe[attribute]
    })

    const steps = await recipe.$relatedQuery("recipeSteps")
    const serializedSteps = steps.map(step => {
      const allowedAttributes = ["number", "step", "id"]

      let serializedStep = {}
      allowedAttributes.forEach(attribute => {
        serializedStep[attribute] = step[attribute]
      })
      serializedStep.step = this.capitalize(serializedStep.step)
      
      return serializedStep
    })

    const ingredients = await recipe.$relatedQuery("ingredients")
    const serializedIngredients = ingredients.map(ingredient => {
      const allowedAttributes = ["name", "id", "amount", "unit", "description"]

      let serializedIngredient = {}
      allowedAttributes.forEach(attribute => {
        serializedIngredient[attribute] = ingredient[attribute]
      })
      serializedIngredient.name = this.capitalize(serializedIngredient.name)
      if (serializedIngredient.description) {
        serializedIngredient.description = this.capitalize(serializedIngredient.description)
      }

      return serializedIngredient
    })

    serializedRecipe.steps = serializedSteps
    serializedRecipe.ingredients = serializedIngredients

    return serializedRecipe
  }

  static capitalize(serializedData) {
    serializedData = serializedData.charAt(0).toUpperCase() + serializedData.slice(1)
    return serializedData
  }
}

export default RecipeSerializer