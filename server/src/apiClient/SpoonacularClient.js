import got from "got"
import dotenv from "dotenv"
dotenv.config()
const key = process.env.API_KEY

class SpoonacularClient {
  static async searchRecipes(searchQuery) {
    const url = `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${key}&query=${searchQuery}`
    try {
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      return responseBody
    } catch(err) {
      return { err }
    }
  }

  static async searchRecipePage(searchQuery, targetPage) {
    const url = `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${key}&query=${searchQuery}&offset=${targetPage*10}`
    try {
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      return responseBody
    } catch(err) {
      return { err }
    }
  }
}

export default SpoonacularClient