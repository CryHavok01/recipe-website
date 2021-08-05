const getRecipes = async (userId) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}/recipes`)
    const body = await response.json()
    return body.recipes
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default getRecipes