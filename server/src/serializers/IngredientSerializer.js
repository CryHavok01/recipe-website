class IngredientSerializer {
  static getIngredientInfo(ingredient) {
    const allowedAttributes = ["name", "id"]

    let serializedIngredient = {}
    allowedAttributes.forEach(attribute => {
      serializedIngredient[attribute] = ingredient[attribute]
    })

    return serializedIngredient
  }

  static getIngredientWithDetails(ingredient) {
    const allowedAttributes = ["name", "id", "amount", "unit", "description"]

    let serializedIngredient = {}
    allowedAttributes.forEach(attribute => {
      serializedIngredient[attribute] = ingredient[attribute]
    })

    return serializedIngredient
  }
}

export default IngredientSerializer