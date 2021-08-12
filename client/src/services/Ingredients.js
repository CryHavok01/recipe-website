class Ingredients {
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
    if(updatedTotal <= 0) {
      updatedTotal = 0.01
    }
    return updatedTotal
  }
}

export default Ingredients