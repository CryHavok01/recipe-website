import { Recipe } from "../../models/index.js"

class RecipeSeeder {
  static async seed() {
    const recipesData = [
      {
        name: "Cheeseburger",
        description: "Tasty burger on a toasted bun",
        userId: 1
      },
      {
        name: "French Toast",
        description: "Delicious breakfast treat",
        userId: 2
      },
      {
        name: "Spaghetti",
        description: "Classic Italian recipe",
        userId: 2
      }
    ]

    for(const singleRecipe of recipesData) {
      const currentRecipe = await Recipe.query().findOne({ name: singleRecipe.name })
      if(!currentRecipe) {
        await Recipe.query().insert(singleRecipe)
      }
    }
  }
}

export default RecipeSeeder