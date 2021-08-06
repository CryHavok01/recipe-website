import React, { useState } from "react"

const RecipeSearch = (props) => {
  const [formData, setFormData] = useState({
    search: ""
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

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
    } catch(err) {

    }
  }

  return(
      <div>
      <h1>howdy</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Search: 
          <input type="text" name="search" value={formData.search} onChange={handleChange} />
        </label>
      </form>
    </div>
  )
}

export default RecipeSearch