class IngredientSerializer {
  static getIngredientInfo(ingredient) {
    const allowedAttributes = ["name", "id"]

    let serializedIngredient = {}
    allowedAttributes.forEach(attribute => {
      serializedIngredient[attribute] = ingredient[attribute]
    })

    serializedIngredient.name = serializedIngredient.name.charAt(0).toUpperCase() + serializedIngredient.name.slice(1)
    if (serializedIngredient.description) {
      serializedIngredient.description = serializedIngredient.description.charAt(0).toUpperCase() + serializedIngredient.description.slice(1)
    }

    return serializedIngredient
  }

  static getIngredientWithDetails(ingredient) {
    const allowedAttributes = ["name", "id", "amount", "unit", "description"]

    let serializedIngredient = {}
    allowedAttributes.forEach(attribute => {
      serializedIngredient[attribute] = ingredient[attribute]
    })

    serializedIngredient.name = serializedIngredient.name.charAt(0).toUpperCase() + serializedIngredient.name.slice(1)
    if (serializedIngredient.description) {
      serializedIngredient.description = serializedIngredient.description.charAt(0).toUpperCase() + serializedIngredient.description.slice(1)
    }
    
    return serializedIngredient
  }
}

export default IngredientSerializer