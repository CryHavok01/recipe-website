import { PantryMeasurement } from "../../models/index.js"

class PantryMeasurementsSeeder {
  static async seed() {
    const pantryMeasurementsData = [
      {
        amount: 3,
        unit: "cups",
        description: "minced",
        userId: 1,
        ingredientId: 1
      },
      {
        amount: 2.22,
        unit: "tablespoons",
        description: "fresh ground",
        userId: 2,
        ingredientId: 2
      },
      {
        amount: 5,
        unit: "ounces",
        description: "kosher sea salt",
        userId: 2,
        ingredientId: 3
      }
    ]

    for(const singleIngredient of pantryMeasurementsData) {
      await PantryMeasurement.query().insert(singleIngredient)
    }
  }
}

export default PantryMeasurementsSeeder