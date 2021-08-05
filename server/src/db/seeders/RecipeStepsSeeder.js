import { RecipeStep } from "../../models/index.js"

class RecipeStepsSeeder {
  static async seed() {
    const recipeStepsData = [
      {
        number: 1,
        step: "Form the ground beef into a round patty",
        recipeId: 1
      },
      {
        number: 2,
        step: "Grill the patty over a medium flame for 3 minutes on each side",
        recipeId: 1
      },
      {
        number: 3,
        step: "Place a slice of cheese on top of the patty for 30 seconds",
        recipeId: 1
      },
      {
        number: 4,
        step: "Remove the patty from the grill and place it on the bun.  Add condiments as desired",
        recipeId: 1
      },
      {
        number: 1,
        step: "Crack the eggs into a bowl and mix them",
        recipeId: 2
      },
      {
        number: 2,
        step: "Dip the bread into the eggs, coating both sides",
        recipeId: 2
      },
      {
        number: 3,
        step: "Place the bread onto a lightly oiled pan over medium heat for 1 minute per side",
        recipeId: 2
      },
      {
        number: 4,
        step: "Place the bread on a plate and drench it with maple syrup",
        recipeId: 2
      },
      {
        number: 1,
        step: "Heat a large pot of lightly salted water to boiling",
        recipeId: 3
      },
      {
        number: 2,
        step: "Put the spaghetti in the boiling water and cook for 9-10 minutes until soft",
        recipeId: 3
      },
      {
        number: 3,
        step: "While spaghetti is cooking, heat tomato sauce in a pot over medium heat",
        recipeId: 3
      },
      {
        number: 4,
        step: "Put the meatballs into the pot of sauce to heat",
        recipeId: 3
      },
      {
        number: 5,
        step: "When the pasta is done, strain out the water, then pour sauce and meatballs onto the pasta.  Stir liberally, then serve",
        recipeId: 3
      },
    ]

    for(const singleStep of recipeStepsData) {
      await RecipeStep.query().insert(singleStep)
    }
  }
}

export default RecipeStepsSeeder