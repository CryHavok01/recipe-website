import express from "express"
import SpoonacularClient from "../../../apiClient/SpoonacularClient.js"

const recipeSearchRouter = new express.Router()

recipeSearchRouter.get("/", async (req, res) => {
  console.log("/")
  const { targetPage, searchQuery } = req.query
  console.log(targetPage, searchQuery)
  try {
    const spoonData = await SpoonacularClient.searchRecipes(searchQuery, targetPage)
    spoonData.searchQuery = searchQuery
    return res.status(200).json({ searchResults: spoonData })
  } catch(err) {
    console.log(err)
    return res.status(500).json({ err })
  }
})

recipeSearchRouter.get("/:id", async (req, res) => {
  console.log("/stuff")
  const { id } = req.params
  try {
    const spoonData = await SpoonacularClient.getRecipeData(id)
    return res.status(200).json({ recipe: spoonData })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default recipeSearchRouter