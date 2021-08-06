import { Ingredient } from "../../models/index.js"

class IngredientsSeeder {
  static async seed() {
    const ingredientsData = [
      { name: "garlic" },
      { name: "pepper" },
      { name: "salt" },
      { name: "burger bun" },
      { name: "ground beef" },
      { name: "american cheese" },
      { name: "challah bread" },
      { name: "eggs" },
      { name: "maple syrup" },
      { name: "spaghetti" },
      { name: "tomato sauce" },
      { name: "meatballs" }
    ]

    for(const singleIngredient of ingredientsData) {
      const currentIngredient = await Ingredient.query().findOne({ name: singleIngredient.name })
      if(!currentIngredient) {
        await Ingredient.query().insert(singleIngredient)
      }
    }
  }
}

export default IngredientsSeeder