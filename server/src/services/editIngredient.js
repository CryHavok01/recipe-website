import { User, Ingredient, PantryMeasurement } from "../models/index.js"


const editIngredient = async (user, ingredientId, cleanedIngredient) => {
  const currentIngredient = await Ingredient.query().findById(ingredientId)
  const existingIngredient = await Ingredient.query().findOne({ name: cleanedIngredient.name })

  if (existingIngredient) {
    const ingredientInPantry = await user.$relatedQuery("ingredients").where({ name: cleanedIngredient.name }).first()

    if (ingredientInPantry) {
      if (currentIngredient.name !== cleanedIngredient.name) {
        return "already in pantry"
      }
      return editInPantry(user, ingredientId, cleanedIngredient, existingIngredient)
    }
    return editExistingIngredient(user, ingredientId, cleanedIngredient, existingIngredient)
  }
  return editNewIngredient(user, ingredientId, cleanedIngredient)
}

const editInPantry = async (user, ingredientId, cleanedIngredient, existingIngredient) => {
  const editedMeasurement = await User.transaction(async (trx) => {
    const originalMeasurement = await user.$relatedQuery("pantryMeasurements", trx).where("ingredientId", ingredientId).first()
    const deleted = await PantryMeasurement.query(trx).deleteById(originalMeasurement.id)
    const currentMeasurement = await user.$relatedQuery("pantryMeasurements", trx).where("ingredientId", existingIngredient.id).first()
    let newMeasurement
    if (currentMeasurement) {
      newMeasurement = await PantryMeasurement.query(trx).updateAndFetchById(currentMeasurement.id, {
        amount: cleanedIngredient.amount,
        unit: cleanedIngredient.unit,
        description: cleanedIngredient.description
      })
    } else {
      newMeasurement = await PantryMeasurement.query(trx).insertAndFetch({
        userId: user.id,
        ingredientId: existingIngredient.id,
        amount: cleanedIngredient.amount,
        unit: cleanedIngredient.unit,
        description: cleanedIngredient.description
      })
    }
  })
  const updatedIngredient = await user.$relatedQuery("ingredients").where({ name: cleanedIngredient.name }).first()
  return updatedIngredient
}

const editExistingIngredient = async (user, ingredientId, cleanedIngredient, existingIngredient) => {
  const relatedIngredient = await User.transaction(async (trx) => {
    const measurement = await user.$relatedQuery("pantryMeasurements", trx).where("ingredientId", ingredientId).first()
    const deleted = await PantryMeasurement.query(trx).deleteById(measurement.id) 
    const relatedIngredient = await user.$relatedQuery("ingredients", trx).relate({
      id: existingIngredient.id,
      amount: cleanedIngredient.amount,
      unit: cleanedIngredient.unit,
      description: cleanedIngredient.description
    })
    return relatedIngredient
  })
  const updatedIngredient = await user.$relatedQuery("ingredients").where({ name: cleanedIngredient.name }).first()
  return updatedIngredient
}

const editNewIngredient = async (user, ingredientId, cleanedIngredient) => {
  const updatedIngredient = await User.transaction(async (trx) => {
    const measurement = await user.$relatedQuery("pantryMeasurements", trx).where("ingredientId", ingredientId).first()
    const deleted = await PantryMeasurement.query(trx).deleteById(measurement.id)
    const updatedIngredient = await user.$relatedQuery("ingredients", trx).insertAndFetch(cleanedIngredient)
    return updatedIngredient
  })
  return updatedIngredient
}

export default editIngredient