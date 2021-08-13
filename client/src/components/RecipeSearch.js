import React, { useState } from "react"
import apiSearch from "../services/apiSearch"
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
      const apiResults = await apiSearch(formData.searchQuery)
      setSearchResults(apiResults)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handlePageClick = async (event) => {
    event.preventDefault()
    const targetPage = event.currentTarget.getAttribute("value")
    try {
      const apiResults = await apiSearch(searchResults.searchQuery, targetPage)
      setSearchResults(apiResults)
      window.scrollTo(0, 0)
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
    if(totalPages <= 1) {
      pagesDisplay = (<p>1</p>)
    }
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
          className="button blue round"
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
          className="button blue round"
          value={currentPage+1}
          onClick={handlePageClick}
        >
        Next
        </button>
      )
    }
    
    pagesDisplay = (
      <div className="grid-x margin-x">
        <div className="cell auto"></div>
        <div className="cell small-1 right">
          {backButton}
        </div>
        <div className="cell small-1 center">
          {pageNums}
        </div>
        <div className="cell small-1">
          {nextButton}
        </div>
        <div className="cell auto"></div>
      </div>
    )
  }

  return(
    <div className="grid-container center">
      <h1 className="title">Search for New Recipes</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid-x">
          <div className="cell small-11">
            <input type="text" name="searchQuery" value={formData.searchQuery} onChange={handleChange} />
          </div>
          <div className="cell small-1">
            <input type="submit" className="button blue round" value="Search" />
          </div>
        </div>
      </form>
      {searchList}
      {pagesDisplay}
    </div>
  )
}

export default RecipeSearch