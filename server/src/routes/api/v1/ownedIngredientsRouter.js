import express from "express"
import { User } from "../../../models/index.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"

const ownedIngredientsRouter = new express.Router()

export default ownedIngredientsRouter