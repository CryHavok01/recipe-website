import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"

const recipeSearchRouter = new express.Router()

recipeSearchRouter.post("/", async (req, res) => {
  const { searchQuery } = req.body
  try {
    const spoonResponse = await SpoonacularClient.searchRecipes(searchQuery)
    const spoonData = JSON.parse(spoonResponse)
    spoonData.searchQuery = searchQuery
    return res.status(200).json({ searchResults: spoonData })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

recipeSearchRouter.post("/next", async (req, res) => {
  const { targetPage, searchQuery } = req.body
  try {
    const spoonResponse = await SpoonacularClient.searchRecipePage(searchQuery, targetPage)
    const spoonData = JSON.parse(spoonResponse)
    spoonData.searchQuery = searchQuery
    return res.status(200).json({ searchResults: spoonData })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default recipeSearchRouter