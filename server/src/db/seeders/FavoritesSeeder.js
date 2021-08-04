import { Favorite } from "../../models/index.js"

class FavoriteSeeder {
  static async seed() {
    const favoritesData = [
      {
        userId: 1,
        recipeId: 1
      },
      {
        userId: 2,
        recipeId: 2
      },
      {
        userId: 2,
        recipeId: 3
      }
    ]

    for(const singleFavorite of favoritesData) {
      await Favorite.query().insert(singleFavorite)
    }
  }
}

export default FavoriteSeeder