import got from "got"
import dotenv from "dotenv"
dotenv.config()
const key = process.env.API_KEY

class SpoonacularClient {
  static async searchRecipes(searchQuery, targetPage) {
    let url
    if(targetPage) {
      url = `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${key}&query=${searchQuery}&offset=${targetPage*10}`
    } else {
      url = `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${key}&query=${searchQuery}`
    }
    try {
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      return JSON.parse(responseBody)
    } catch(err) {
      return { err }
    }
  }
}

export default SpoonacularClient