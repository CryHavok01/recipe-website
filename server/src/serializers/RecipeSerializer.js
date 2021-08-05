class RecipeSerializer {
  static getRecipeInfo(recipe) {
    const allowedAttributes = ["name", "description", "id"]

    let serializedRecipe = {}
    allowedAttributes.forEach(attribute => {
      serializedRecipe[attribute] = recipe[attribute]
    })

    return serializedRecipe
  }
}

export default RecipeSerializer