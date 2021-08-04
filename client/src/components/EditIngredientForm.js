import React, { useEffect, useState } from "react"
import FormError from "./layout/FormError"
import { Redirect } from "react-router-dom"

const EditIngredientForm = (props) => {

  const [showOther, setShowOther] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if(props.ingredient) {
      props.setFormData({
        name: props.ingredient.name,
        amount: props.ingredient.amount,
        unit: props.ingredient.unit,
        description: props.ingredient.description || ""
      })
    }
  }, [props.ingredient])

  const handleChange = (event) => {
    props.setFormData({
      ...props.formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSelect = (event) => {
    props.setFormData({
      ...props.formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
    if (event.currentTarget.value === "other") {
      setShowOther(true)
    } else {
      setShowOther(false)
    }
  }

  let otherField
  if (showOther) {
    otherField = (
      <div>
        <label htmlFor="other">Other: </label>
          <input 
            type="text" 
            id="other" 
            name="unit"
            value={props.formData.unit}
            onChange={handleChange}
          />
      </div>
    )
  }

  return(
    <div>
      <h2>Edit Details for {props.capName}</h2>
      <form className="callout secondary" onSubmit={props.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={props.formData.name}
          onChange={handleChange}
        />
        <FormError error={props.errors.name} />

        <label htmlFor="amount">Amount: </label>
        <input 
          type="number" 
          step="0.01"
          id="amount" 
          name="amount"
          min=".01"
          value={props.formData.amount}
          onChange={handleChange}
        />
        <FormError error={props.errors.amount} />

        <label htmlFor="unit">Units: </label>
        <select id="unit" name="unit" defaultValue="select" onChange={handleSelect}>
          <option hidden disabled value="select"> {props.formData.unit} </option>
          <option value="tsp">Teaspoon(s)</option>
          <option value="tbsp">Tablespoon(s)</option>
          <option value="oz">Ounce(s)</option>
          <option value="cup">Cup(s)</option>
          <option value="other">Other</option>
        </select>

        {otherField}
        <FormError error={props.errors.unit} />


        <label htmlFor="description">Description (optional): </label>
        <input 
          type="text"
          id="description"
          name="description"
          value={props.formData.description}
          onChange={handleChange}
        />

        <input 
          type="submit" 
          value="Submit"
          className="button"
        />
      </form>
    </div>
  )
}

export default EditIngredientForm