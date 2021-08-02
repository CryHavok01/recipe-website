import express from "express"
import { User } from "../../../models/index.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

const recipesRouter = new express.Router()

export default recipesRouter