import got from "got"
import dotenv from "dotenv"
dotenv.config()
const key = process.env.API_KEY

class SpoonacularClient {
  static test() {
    console.log(key)
  }
}

export default SpoonacularClient