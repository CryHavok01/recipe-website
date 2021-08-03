// include all of your models here using CommonJS requires
const User = require("./User.js")
const Ingredient = require("./Ingredient.js")
const Recipe = require("./Recipe.js")
const PantryMeasurement = require("./PantryMeasurement.js")
const Favorite = require("./Favorite.js")

module.exports = { User, Ingredient, Recipe, PantryMeasurement, Favorite };
