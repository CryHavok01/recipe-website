const Model = require("./Model.js")

class PantryMeasurement extends Model {
  static get tableName() {
    return "pantryMeasurements"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "unit"],
      properties: {
        amount: { type: "number", minimum: 0 },
        unit: { type: "string" },
        description: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { User, Ingredient } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "pantryMeasurements.userId",
          to: "users.id"
        }
      },
      Ingredient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ingredient,
        join: {
          from: "pantryMeasurements.ingredientId",
          to: "ingredients.id"
        }
      }
    }
  }
}

module.exports = PantryMeasurement