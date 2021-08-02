import { connection } from "../boot.js"
import OwnedIngredientsSeeder from "./seeders/OwnedIngredientsSeeder.js"
import RecipeSeeder from "./seeders/RecipesSeeder.js"
import UsersSeeder from "./seeders/UsersSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding users...")
    await UsersSeeder.seed()

    console.log("Seeding ingredients...")
    await OwnedIngredientsSeeder.seed()

    console.log("Seeding recipes...")
    await RecipeSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder