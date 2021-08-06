const Model = require("./Model.js")

class RecipeMeasurement extends Model {
  static get tableName() {
    return "recipeMeasurements"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "unit"],
      properties: {
        amount: { type: "number", exclusiveMinimum: 0 },
        unit: { type: "string" },
        description: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { Recipe, Ingredient } = require("./index.js")

    return {
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: "recipeMeasurements.recipeId",
          to: "recipes.id"
        }
      },
      ingredient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ingredient,
        join: {
          from: "recipeMeasurements.ingredientId",
          to: "ingredients.id"
        }
      }
    }
  }
}

module.exports = RecipeMeasurement