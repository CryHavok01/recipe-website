const getOwnedIngredients = async (userId) => {
  try {
    const response = await fetch(`/api/v1/ownedIngredients/${userId}`)
    const body = await response.json()
    return body.ownedIngredients
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default getOwnedIngredients