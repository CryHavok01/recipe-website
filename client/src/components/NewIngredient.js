import React, { useState } from "react"

const NewIngredient = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    measurement: 0,
    unit: "",
    description: ""
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return(
    <div>
      <h2>Add Your New Ingredient</h2>
      <form className="callout secondary">
        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          />
        <label htmlFor="measurement">Measurement: </label>
        <input 
          type="number" 
          step="0.01"
          id="measurement" 
          name="measurement"
          min="0"
          value={formData.measurement}
          onChange={handleChange}
          />
        <label htmlFor="unit">Units: </label>
        <input 
          type="text"
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          />
        <label htmlFor="description">Description (optional): </label>
        <input 
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          />
      </form>
    </div>
  )
}

export default NewIngredient