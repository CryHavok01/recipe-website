import { User } from "../../models/index.js"

class UsersSeeder {
  static async seed() {
    const userData = [
      {
        email: "test@test.com",
        password: "test"
      },
      {
        email: "josh@josh.com",
        password: "password"
      }
    ]

    for(const singleUser of userData) {
      const currentUser = await User.query().findOne({ email: singleUser.email })
      if(!currentUser) {
        await User.query().insert(singleUser)
      }
    }
  }
}

export default UsersSeeder