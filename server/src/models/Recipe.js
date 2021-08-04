const Model = require("./Model.js")

class Recipe extends Model {
  static get tableName() {
    return "recipes"
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
    const { User } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "recipes.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Recipe