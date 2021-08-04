import { Recipe } from "../../models/index.js"

class RecipeSeeder {
  static async seed() {
    const recipesData = [
      {
        name: "Cheeseburger",
        description: "Tasty burger on a toasted bun",
      },
      {
        name: "French Toast",
        description: "Delicious breakfast treat",
      },
      {
        name: "Spaghetti",
        description: "Classic Italian recipe",
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