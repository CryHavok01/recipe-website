class RecipeSerializer {
  static getSummary(recipe) {
    const allowedAttributes = ["name", "description", "id"]

    let serializedRecipe = {}
    allowedAttributes.forEach(attribute => {
      serializedRecipe[attribute] = recipe[attribute]
    })

    serializedRecipe.name = serializedRecipe.name.charAt(0).toUpperCase() + serializedRecipe.name.slice(1)

    return serializedRecipe
  }
}

export default RecipeSerializer