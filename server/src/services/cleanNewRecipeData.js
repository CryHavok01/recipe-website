const cleanNewRecipeData = (newRecipe) => {
  let recipe = {}
  recipe.name = newRecipe.name.toLowerCase();
  if(newRecipe.description) {
    recipe.description = newRecipe.description.trim().toLowerCase();
  }

  const ingredients = newRecipe.ingredients.map(newIngredient => {
    let ingredient = {}
    ingredient.name = newIngredient.name.trim().toLowerCase();
    ingredient.amount = Number(newIngredient.amount);
    ingredient.unit = newIngredient.unit.trim().toLowerCase();
    if(newIngredient.description) {
      ingredient.description = newIngredient.description.trim().toLowerCase();
    }
    return ingredient;
  })

  const steps = newRecipe.steps.map((newStep, index) => {
    let step = {};
    step.number = index + 1;
    step.step = newStep.step.trim();
    return step;
  })

  return { recipe, ingredients, steps }
}

export default cleanNewRecipeData