/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static get relationMappings() {
    const { Ingredient, Recipe, PantryMeasurement, Favorite } = require("./index.js")

    return {
      ingredients: {
        relation: Model.ManyToManyRelation,
        modelClass: Ingredient,
        join: {
          from: "users.id",
          through: {
            from: "pantryMeasurements.userId",
            to: "pantryMeasurements.ingredientId",
            extra: ["amount", "unit", "description"]
          },
          to: "ingredients.id"
        }
      },
      pantryMeasurements: {
        relation: Model.HasManyRelation,
        modelClass: PantryMeasurement,
        join: {
          from: "users.id",
          to: "pantryMeasurements.userId"
        }
      },
      recipes: {
        relation: Model.ManyToManyRelation,
        modelClass: Recipe,
        join: {
          from: "users.id",
          through: {
            from: "favorites.userId",
            to: "favorites.recipeId"
          },
          to: "recipes.id"
        }
      },
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: Favorite,
        join: {
          from: "users.id",
          to: "favorites.userId"
        }
      }
    }
  }
}

module.exports = User;
