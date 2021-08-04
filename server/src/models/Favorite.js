const Model = require("./Model.js")

class Favorite extends Model {
  static get tableName() {
    return "favorites"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "recipeId"],
      properties: {
        userId: { type: "integer" },
        recipeId: { type: "integer" }
      }
    }
  }

  static get relationMappings() {
    const { User, Recipe } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "favorites.userId",
          to: "users.id"
        }
      },
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: "favorites.recipeId",
          to: "recipes.id"
        }
      }
    }
  }
}

module.exports = Favorite