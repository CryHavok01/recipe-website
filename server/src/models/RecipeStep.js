const Model = require("./Model.js")

class RecipeStep extends Model {
  static get tableName() {
    return "recipeSteps"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["step", "recipeId"],
      properties: {
        number: { type: "integer" },
        step: { type: "string" },
        recipeId: { type: "ingeger" }
      }
    }
  }

  static get relationMappings() {
    const { Recipe } = require("./index.js")

    return {
      relation: Model.BelongsToOneRelation,
      modelClass: Recipe,
      join: {
        from: "recipeSteps.recipeId",
        to: "recipes.id"
      }
    }
  }
}

module.exports = RecipeStep