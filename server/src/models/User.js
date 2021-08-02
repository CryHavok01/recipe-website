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
    const { OwnedIngredient, Recipe } = require("./index.js")

    return {
      ownedIngredients: {
        relation: Model.HasManyRelation,
        modelClass: OwnedIngredient,
        join: {
          from: "users.id",
          to: "ownedIngredients.userId"
        }
      },
      recipes: {
        relation: Model.HasManyRelation,
        modelClass: Recipe,
        join: {
          from: "users.id",
          to: "recipes.userId"
        }
      }
    }
  }
}

module.exports = User;
