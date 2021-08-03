const Model = require("./Model.js")

class OwnedIngredient extends Model {
  static get tableName() {
    return "ownedIngredients"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "measurement", "unit", "userId"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        measurement: { type: "number", minimum: 0 },
        unit: { type: "string" },
        userId: { type: "integer" }
      }
    }
  }

  static get relationMappings() {
    const { User } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modenClass: User,
        join: {
          from: "ownedIngredients.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = OwnedIngredient