class IngredientsConversion {
  static teaspoons = ["tsp", "tsps", "teaspoon", "teaspoons"]
  static tablespoons = ["tbs", "tbsp", "tbsps", "tablespoon", "tablespoons"]
  static ounces = ["oz", "ounce", "ounces", "oz."]
  static cups = ["c", "cup", "cups"]
  static gallons = ["gl", "gal", "gallon", "gallons"]

  static convertIngredient(ingredient) {
    let converted
    if (this.gallons.includes(ingredient.unit)) {
      converted = ingredient.amount * 768
    } else if(this.cups.includes(ingredient.unit)) {
      converted = ingredient.amount * 48
    } else if (this.ounces.includes(ingredient.unit)) {
      converted = ingredient.amount * 6
    } else if (this.tablespoons.includes(ingredient.unit)) {
      converted = ingredient.amount * 3
    } else if (this.teaspoons.includes(ingredient.unit)) {
      converted = ingredient.amount
    }
    return converted
  }

  static convertAndUpdate(ingredientTotal, ingredientUsed) {
    const convertedTotal = this.convertIngredient(ingredientTotal)
    const convertedUsed = this.convertIngredient(ingredientUsed)
    const newConvertedTotal = convertedTotal - convertedUsed
    let updatedTotal
    if (this.gallons.includes(ingredientTotal.unit)) {
      updatedTotal = newConvertedTotal / 768
    } else if(this.cups.includes(ingredientTotal.unit)) {
      updatedTotal = newConvertedTotal / 48
    } else if (this.ounces.includes(ingredientTotal.unit)) {
      updatedTotal = newConvertedTotal / 6
    } else if (this.tablespoons.includes(ingredientTotal.unit)) {
      updatedTotal = newConvertedTotal / 3
    } else if (this.teaspoons.includes(ingredientTotal.unit)) {
      updatedTotal = newConvertedTotal
    }
    return updatedTotal
  }

  static compareIngredients(recipe, pantryIngredients) {
    recipe.ingredients.forEach(ingredient => {
      const ingredientInPantry = pantryIngredients.find(pantryIngredient => pantryIngredient.name.toLowerCase() === ingredient.name)
      if(ingredientInPantry) {
        if(ingredientInPantry.unit === ingredient.unit) {
          if(ingredientInPantry.amount >= ingredient.amount) {
            ingredient.detail = "have enough"
          } else {
            ingredient.detail = "need more"
          }
        } else {
          const convertedRecipeIngredient = this.convertIngredient(ingredient)
          const convertedPantryIngredient = this.convertIngredient(ingredientInPantry)
          if (!convertedRecipeIngredient || !convertedPantryIngredient) {
            ingredient.detail = "can't tell"
          } else {
            if (convertedPantryIngredient - 3 >= convertedRecipeIngredient) {
              ingredient.detail = "have enough"
            } else if (convertedPantryIngredient + 3 <= convertedRecipeIngredient) {
              ingredient.detail = "need more"
            } else {
              ingredient.detail = "it's close"
            }
          }
        }
      } else {
        ingredient.detail = "don't have"
      }
    })
    return recipe
  }

  static getUpdatedIngredientTotals = (recipe, pantryIngredients) => {
    let updatedIngredients = recipe.ingredients.map(ingredient => {
      const ingredientInPantry = pantryIngredients.find(pantryIngredient => pantryIngredient.name.toLowerCase() === ingredient.name)
      if(ingredientInPantry) {
        if(ingredientInPantry.unit === ingredient.unit) {
          const updatedIngredient = {
            ...ingredientInPantry,
            amount: ingredientInPantry.amount - ingredient.amount
          }
          return updatedIngredient
          } else {
          const convertedRecipeIngredient = this.convertIngredient(ingredient)
          const convertedPantryIngredient = this.convertIngredient(ingredientInPantry)
          if (!convertedRecipeIngredient || !convertedPantryIngredient) {
            return false
          } else {
            const newTotal = this.convertAndUpdate(ingredientInPantry, ingredient)
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
    return updatedIngredients
  }
}

export default IngredientsConversion