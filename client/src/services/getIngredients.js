const getIngredients = async (userId) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}/ingredients`)
    const body = await response.json()
    return body.ingredients
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default getIngredients