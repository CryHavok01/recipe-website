import { connection } from "../boot.js"
import FavoriteSeeder from "./seeders/FavoritesSeeder.js"
import OwnedIngredientsSeeder from "./seeders/IngredientsSeeder.js"
import PantryMeasurementsSeeder from "./seeders/PantryMeasurementsSeeder.js"
import RecipeSeeder from "./seeders/RecipesSeeder.js"
import UsersSeeder from "./seeders/UsersSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding users...")
    await UsersSeeder.seed()

    console.log("Seeding recipes...")
    await RecipeSeeder.seed()

    console.log("Seeding favorites...")
    await FavoriteSeeder.seed()

    console.log("Seeding ingredients...")
    await OwnedIngredientsSeeder.seed()

    console.log("Seeding pantry measurements...")
    await PantryMeasurementsSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder