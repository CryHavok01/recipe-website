import React, { useEffect, useState } from "react"
import FormError from "./layout/FormError"
import { Redirect, useParams } from "react-router-dom"

const EditIngredientForm = (props) => {
  const [showOther, setShowOther] = useState(false)
  const [ingredient, setIngredient] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    unit: "",
    description: ""
  })
  const [errors, setErrors] = useState({})

  const { id } = useParams()
  
  const fetchIngredientDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/ingredients/${id}`)
      if (response.ok) {
        const body = await response.json()
        setIngredient(body.ingredient)
      }
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  } 

  useEffect(() => {
    fetchIngredientDetails()
  }, [])

  useEffect(() => {
      setFormData({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        description: ingredient.description || ""
      })
  }, [ingredient])

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
      const formPayload = {
        editedIngredient: { ...formData, id: ingredient.id }
      }
      try {
        const response = await fetch(`/api/v1/ingredients`, {
          method: "PATCH",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(formPayload)
        })
        if(!response.ok) {
          const errorMessage = `${response.status}: (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        } else {
          const body = await response.json()
          props.setIngredient(body.editedIngredient)
          if(ingredient.id !== body.editedIngredient.id) {
            props.setShouldRedirectToIngredient(true)
          }
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

  return(
    <div>
      <h2 className="title">Edit Details for {ingredient.name}</h2>
      <form className="callout" onSubmit={handleSubmit}>
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
          <option hidden disabled value="select"> {formData.unit} </option>
          <option value="tsp">Teaspoon(s)</option>
          <option value="tbsp">Tablespoon(s)</option>
          <option value="oz">Ounce(s)</option>
          <option value="cup">Cup(s)</option>
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

export default EditIngredientForm