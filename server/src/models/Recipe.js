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
        name: { type: "string" },
        description: { type: "string" },
        spoonacularId: { type: "integer" }
      }
    }
  }

  static get relationMappings() {
    const { User, Favorite, RecipeStep, Ingredient, RecipeMeasurement } = require("./index.js")

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "recipes.id",
          through: {
            from: "favorites.recipeId",
            to: "favorites.userId"
          },
          to: "users.id"
        }
      },
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: Favorite,
        join: {
          from: "recipes.id",
          to: "favorites.recipeId"
        }
      },
      recipeSteps: {
        relation: Model.HasManyRelation,
        modelClass: RecipeStep,
        join: {
          from: "recipes.id",
          to: "recipeSteps.recipeId"
        }
      },
      ingredients: {
        relation: Model.ManyToManyRelation,
        modelClass: Ingredient,
        join: {
          from: "recipes.id",
          through: {
            from: "recipeMeasurements.recipeId",
            to: "recipeMeasurements.ingredientId",
            extra: ["amount", "unit", "description"]
          },
          to: "ingredients.id"
        }
      },
      recipeMeasurements: {
        relation: Model.HasManyRelation,
        modelClass: RecipeMeasurement,
        join: {
          from: "recipes.id",
          to: "recipeMeasurements.recipeId"
        }
      }
    }
  }
}

module.exports = Recipe