import React, { useState } from "react"

const NewIngredient = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    measurement: 0,
    unit: "",
    description: ""
  })

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
        />
        <input type="number" />
      </form>
    </div>
  )
}

export default NewIngredient