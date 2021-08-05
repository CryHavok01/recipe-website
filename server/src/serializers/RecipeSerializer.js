class RecipeSerializer {
  static getRecipeInfo(recipe) {
    const allowedAttributes = ["name", "description", "id"]

    let serializedRecipe = {}
    allowedAttributes.forEach(attribute => {
      serializedRecipe[attribute] = recipe[attribute]
    })

    return serializedRecipe
  }

  static async getRecipeWithDetails(recipe) {
    const allowedAttributes = ["name", "description", "id"]

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

      return serializedStep
    })

    const ingredients = await recipe.$relatedQuery("ingredients")
    const serializedIngredients = ingredients.map(ingredient => {
      const allowedAttributes = ["name", "id", "amount", "unit", "description"]

      let serializedIngredient = {}
      allowedAttributes.forEach(attribute => {
        serializedIngredient[attribute] = ingredient[attribute]
      })

      return serializedIngredient
    })

    serializedRecipe.steps = serializedSteps
    serializedRecipe.ingrediets = serializedIngredients

    return serializedRecipe
  }
}

export default RecipeSerializer