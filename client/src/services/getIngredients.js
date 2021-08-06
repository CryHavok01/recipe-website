const getIngredients = async () => {
  try {
    const response = await fetch(`/api/v1/users/ingredients`)
    const body = await response.json()
    return body.ingredients
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default getIngredients