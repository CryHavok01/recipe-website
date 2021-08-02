class UserSerializer {
  static getSummary(user) {
    const allowedAttributes = ["email", "id"]

    let serializedUser = {}
    allowedAttributes.forEach(attribute => {
      serializedUser[attribute] = user[attribute]
    })

    return serializedUser
  }
}

export default UserSerializer