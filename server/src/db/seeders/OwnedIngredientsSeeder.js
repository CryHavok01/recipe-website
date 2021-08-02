import { OwnedIngredient } from "../../models/index.js"

class OwnedIngredientsSeeder {
  static async seed() {
    const ownedIngredientsData = [
      {
        name: "garlic",
        measurement: 3,
        unit: "cups",
        description: "minced",
        userId: 1
      },
      {
        name: "pepper",
        measurement: 2,
        unit: "tablespoons",
        description: "fresh ground",
        userId: 2
      },
      {
        name: "salt",
        measurement: 5,
        unit: "ounces",
        description: "kosher sea salt",
        userId: 2
      }
    ]

    for(const singleOwnedIngredient of ownedIngredientsData) {
      const currentOwnedIngredient = await OwnedIngredient.query().findOne({ name: singleOwnedIngredient.name })
      if(!currentOwnedIngredient) {
        await OwnedIngredient.query().insert(singleOwnedIngredient)
      }
    }
  }
}

export default OwnedIngredientsSeeder