import got from "got"
import dotenv from "dotenv"
dotenv.config()
const key = process.env.API_KEY

class SpoonacularClient {
  static baseUlr = "https://api.spoonacular.com/recipes/"
  
  static async searchRecipes(searchQuery, targetPage) {
    let url
    if(targetPage) {
      url = `${this.baseUrl}complexSearch/?apiKey=${key}&query=${searchQuery}&offset=${targetPage*10}`
    } else {
      url = `${this.baseUlr}complexSearch/?apiKey=${key}&query=${searchQuery}`
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