import React, { useState } from "react"
import SearchedRecipeTile from "./SearchedRecipeTile"

const RecipeSearch = (props) => {
  const [formData, setFormData] = useState({
    searchQuery: ""
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  const [searchResults, setSearchResults] = useState(undefined)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/recipe-search", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(formData)
      })
      if(response.ok) {
        const body = await response.json()
        setSearchResults(body.searchResults)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handlePageClick = async (event) => {
    event.preventDefault()
    const targetPage = event.currentTarget.getAttribute("value")
    const pageData = {
      targetPage,
      searchQuery: searchResults.searchQuery
    }
    try {
      const response = await fetch("/api/v1/recipe-search/next", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(pageData)
      })
      if(response.ok) {
        const body = await response.json()
        setSearchResults(body.searchResults)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  let searchList
  if(searchResults) {
    searchList = searchResults.results.map(result => {
      return(
        <SearchedRecipeTile
          key={result.id} 
          result={result}
        />
      )
    })
  }

  let pagesDisplay
  if(searchResults) {
    const totalPages  = Math.ceil(searchResults.totalResults / 10)
    const currentPage = searchResults.offset/10
    let pageNums = []
    for (let x = 0; x < totalPages; x++) {
      if(x === currentPage) {
        pageNums.push(x+1)
      } else if(x >= currentPage - 3 && x <= currentPage + 3) {
        pageNums.push(
          <a
            key={x}
            value={x}
            onClick={handlePageClick}
          >
          {x+1}
          </a>
        )
      }
    }

    let backButton
    if(currentPage > 0) {
      backButton = (
        <button
          className="button"
          value={currentPage-1}
          onClick={handlePageClick}
        >
        Previous
        </button>
      )
    }
    let nextButton
    if(currentPage < totalPages-1) {
      nextButton = (
        <button
          className="button"
          value={currentPage+1}
          onClick={handlePageClick}
        >
        Next
        </button>
      )
    }
    
    pagesDisplay = (
      <div>
        {backButton}
        {pageNums}
        {nextButton}
      </div>
    )
  }

  return(
      <div>
      <h1>howdy</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Search: 
          <input type="text" name="searchQuery" value={formData.searchQuery} onChange={handleChange} />
        </label>
      </form>
      {searchList}
      {pagesDisplay}
    </div>
  )
}

export default RecipeSearch