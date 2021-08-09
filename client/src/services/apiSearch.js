const apiSearch = async (searchQuery, targetPage) => {
  let url
  if(targetPage) {
    url = `/api/v1/recipe-search/?searchQuery=${searchQuery}&targetPage=${targetPage}`
  } else {
    url = `/api/v1/recipe-search/?searchQuery=${searchQuery}`
  }
  try {
    const response = await fetch(url)
    if(response.ok) {
      const body = await response.json()
      return body.searchResults
    }
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default apiSearch