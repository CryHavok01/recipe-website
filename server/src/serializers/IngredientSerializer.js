class IngredientSerializer {
  static getIngredientInfo(ingredient) {
    const allowedAttributes = ["name", "id"]

    let serializedIngredient = {}
    allowedAttributes.forEach(attribute => {
      serializedIngredient[attribute] = ingredient[attribute]
    })

    return serializedIngredient
  }

  static async getIngredientWithPantryMeasurements(ingredient) {
    const allowedAttributes = ["name", "id"]

    let serializedIngredient = {}
    allowedAttributes.forEach(attribute => {
      serializedIngredient[attribute] = ingredient[attribute]
    })

    const pantryMeasurement = await ingredient.$relatedQuery("pantryMeasurement").first()

    serializedIngredient = {
      ...serializedIngredient,
      amount: pantryMeasurement.amount,
      unit: pantryMeasurement.unit,
      description: pantryMeasurement.description
    }

    return serializedIngredient
  }
}

export default IngredientSerializer