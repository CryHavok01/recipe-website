class IngredientMeasurementConverter {
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
  
  static compareIngredient(pantryIngredient, recipeIngredient) {
    let detail
      if(recipeIngredient.unit === pantryIngredient.unit) {
        detail = this.compareSameUnits(pantryIngredient, recipeIngredient)
      } else {
        detail = this.compareDifferentUnits(pantryIngredient, recipeIngredient)
      }
    return detail
  }
  
  static compareSameUnits(pantryIngredient, recipeIngredient) {
    if(pantryIngredient.amount >= recipeIngredient.amount) {
      return "have enough"
    } else {
      return "need more"
    }
  }
  
  static compareDifferentUnits(pantryIngredient, recipeIngredient) {
    const convertedRecipeIngredient = this.convertIngredient(recipeIngredient)
    const convertedPantryIngredient = this.convertIngredient(pantryIngredient)
    if (!convertedRecipeIngredient || !convertedPantryIngredient) {
      return "can't tell"
    } else {
      if (convertedPantryIngredient - 3 >= convertedRecipeIngredient) {
        return "have enough"
      } else if (convertedPantryIngredient + 3 <= convertedRecipeIngredient) {
        return "need more"
      } else {
        return "it's close"
      }
    }
  }

  static getUpdatedIngredientTotal = (pantryIngredient, recipeIngredient) => {
    if(pantryIngredient.unit === recipeIngredient.unit) {
      const updatedIngredient = {
        ...pantryIngredient,
        amount: pantryIngredient.amount - recipeIngredient.amount
      }
      return updatedIngredient
      } else {
      const convertedRecipeIngredient = this.convertIngredient(recipeIngredient)
      const convertedPantryIngredient = this.convertIngredient(pantryIngredient)
      if (!convertedRecipeIngredient || !convertedPantryIngredient) {
        return false
      } else {
        const newTotal = this.convertAndUpdate(pantryIngredient, recipeIngredient)
        const updatedIngredient = {
          ...pantryIngredient,
          amount: newTotal
        }
        return updatedIngredient
      }
    }
  }
}

export default IngredientMeasurementConverter