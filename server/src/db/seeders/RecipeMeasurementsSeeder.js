import { RecipeMeasurement } from "../../models/index.js"

class RecipeMeasurementsSeeder {
  static async seed() {
    const recipeMeasurementsData = [
      {
        amount: 2,
        unit: "halves",
        description: "preferably toasted",
        recipeId: 1,
        ingredientId: 4
      },
      {
        amount: 0.50,
        unit: "pounds",
        description: "thawed",
        recipeId: 1,
        ingredientId: 5
      },
      {
        amount: 1,
        unit: "slice",
        description: "kraft singles will do finely",
        recipeId: 1,
        ingredientId: 6
      },
      {
        amount: 4,
        unit: "slices",
        description: "can use white bread instead",
        recipeId: 2,
        ingredientId: 7
      },
      {
        amount: 2,
        unit: "whole",
        description: "use farm grade large eggs",
        recipeId: 2,
        ingredientId: 8
      },
      {
        amount: 8,
        unit: "cups",
        description: "vermont or canadian",
        recipeId: 2,
        ingredientId: 9
      },
      {
        amount: 1,
        unit: "lb",
        description: "can substitute linguine",
        recipeId: 3,
        ingredientId: 10
      },
      {
        amount: 0.50,
        unit: "gallon",
        description: "best with basil and oregano",
        recipeId: 3,
        ingredientId: 11
      },
      {
        amount: 1,
        unit: "dozen",
        description: "ikea makes pretty good ones",
        recipeId: 3,
        ingredientId: 12
      },
    ]

    for(const singleMeasurement of recipeMeasurementsData) {
      await RecipeMeasurement.query().insert(singleMeasurement)
    }
  }
}

export default RecipeMeasurementsSeeder