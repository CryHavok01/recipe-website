class IngredientSerializer {
  static getIngredientInfo(ingredient) {
    const allowedAttributes = ["name", "measurement", "unit", "description", "id"]

    let serializedIngredient = {}
    allowedAttributes.forEach(attribute => {
      serializedIngredient[attribute] = ingredient[attribute]
    })

    return serializedIngredient
  }
}

export default IngredientSerializer