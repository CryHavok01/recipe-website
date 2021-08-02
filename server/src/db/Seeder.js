import { connection } from "../boot.js"
import OwnedIngredientsSeeder from "./seeders/OwnedIngredientsSeeder.js"
import UsersSeeder from "./seeders/UsersSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding users...")
    await UsersSeeder.seed()

    console.log("Seeding ingredients...")
    await OwnedIngredientsSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder