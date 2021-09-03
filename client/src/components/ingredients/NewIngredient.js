import React, { useState } from "react"
import translateServerErrors from "../../services/translateServerErrors"
import ErrorList from "../shared/ErrorList"
import FormError from "../layout/FormError"
import { Redirect } from "react-router-dom"

const NewIngredient = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    unit: "",
    description: ""
  })
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState([])
  const [showOther, setShowOther] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validateData = (formData) => {
    setErrors({});
    const { name, amount, unit } = formData
    let foundError = false
    let newErrors = {};
    if (name.trim() == "") {
      newErrors = {
        ...newErrors,
        name: "is required",
      };
      foundError = true
    }

    if (amount.trim() == "") {
      newErrors = {
        ...newErrors,
        amount: "is required",
      };
      foundError = true
    }


    if (unit.trim() == "") {
      newErrors = {
        ...newErrors,
        unit: "is required",
      };
      foundError = true
    }

    if (unit.trim() == "other") {
      newErrors = {
        ...newErrors,
        unit: "please enter units"
      }
    }

    setErrors(newErrors);
    return foundError
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const foundError = validateData(formData)
    if (!foundError) {
      const formPayload = { newIngredient: { ...formData } }
      try {
        const response = await fetch(`/api/v1/ingredients`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(formPayload)
        })
        if(!response.ok) {
          if(response.status === 422) {
            const body = await response.json()
            const newErrors = translateServerErrors(body.errors)
            return setServerErrors(newErrors)
          } else {
            const errorMessage = `${response.status}: (${response.statusText})`
            const error = new Error(errorMessage)
            throw(error)
          }
        } else {
          setShouldRedirect(true)
        }
      } catch(error) {
        console.error(`Error in Fetch: ${error.message}`)
      }
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSelect = (event) => {
    setFormData({
      ...formData,
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
          value={formData.unit}
          onChange={handleChange}
        />
      </div>
    )
  }

  if (shouldRedirect) {
    return (
      <Redirect push to="/ingredients" />
    )
  }

  return(
    <div className="grid-container">
      <h2 className="title">Add Your New Ingredient</h2>
      <form className="callout" onSubmit={handleSubmit}>
        <ErrorList errors={serverErrors} />
        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
        />
        <FormError error={errors.name} />

        <label htmlFor="amount">Amount: </label>
        <input 
          type="number" 
          step="0.01"
          id="amount" 
          name="amount"
          min=".01"
          value={formData.amount}
          onChange={handleChange}
        />
        <FormError error={errors.amount} />


        <label htmlFor="unit">Units: </label>
        <select id="unit" name="unit" defaultValue="select" onChange={handleSelect}>
          <option hidden disabled value="select"> -- select an option -- </option>
          <option value="tsp">Teaspoon(s)</option>
          <option value="tbsp">Tablespoon(s)</option>
          <option value="oz">Ounce(s)</option>
          <option value="cup">Cup(s)</option>
          <option value="gal">Gallon(s)</option>
          <option value="other">Other</option>
        </select>

        {otherField}
        <FormError error={errors.unit} />


        <label htmlFor="description">Description (optional): </label>
        <input 
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input 
          type="submit" 
          value="Submit"
          className="button blue round"
        />
      </form>
    </div>
  )
}

export default NewIngredient