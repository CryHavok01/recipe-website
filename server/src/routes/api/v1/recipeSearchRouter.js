import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"

const recipeSearchRouter = new express.Router()

recipeSearchRouter.post("/", async (req, res) => {
  const { search } = req.body
  const spoonResponse = await SpoonacularClient.test()
})

export default recipeSearchRouter