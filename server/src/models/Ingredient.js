const Model = require("./Model.js")

class Ingredient extends Model {
  static get tableName() {
    return "ingredients"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { User, PantryMeasurement } = require("./index.js")

    return {
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "ingredients.id",
          through: {
            from: "pantryMeasurements.ingredientId",
            to: "pantryMeasurements.userId",
            extra: ["amount", "unit", "description"]
          },
          to: "users.id"
        }
      },
      pantryMeasurement: {
        relation: Model.HasManyRelation,
        modelClass: PantryMeasurement,
        join: {
          from: "ingredients.id",
          to: "pantryMeasurements.ingredientId"
        }
      }
    }
  }
}

module.exports = Ingredient