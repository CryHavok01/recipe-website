const getRecipes = async () => {
  try {
    const response = await fetch(`/api/v1/users/recipes`)
    const body = await response.json()
    return body.recipes
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default getRecipes