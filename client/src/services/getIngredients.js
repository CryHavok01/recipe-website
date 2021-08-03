const getingredients = async (userId) => {
  try {
    const response = await fetch(`/api/v1/ingredients/list/${userId}`)
    const body = await response.json()
    return body.ingredients
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default getingredients