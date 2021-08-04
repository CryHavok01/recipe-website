import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import EditIngredientForm from "./EditIngredientForm"

const IngredientShow = (props) => {
  const [ingredient, setIngredient] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    unit: "",
    description: ""
  })
  const [errors, setErrors] = useState({})
  const [showEdit, setShowEdit] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id } = useParams()
  let userId
  if (props.user) {
    userId = props.user.id
  }
  const fetchIngredientDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/ingredients/${id}`)
      const body = await response.json()
      setIngredient(body.ingredient)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  } 

  useEffect(() => {
    if (props.user) {
      fetchIngredientDetails()
    }
  }, [props.user])

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
        editedIngredient: { ...formData, id: ingredient.id },
        userId: props.user.id
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
          setIngredient(body.editedIngredient)
        }
      } catch(error) {
        console.error(`Error in Fetch: ${error.message}`)
      }
    }
  }

  const handleDelete = (event) => {
    const confirmed = confirm("Are you sure you want to remove this Ingredient from your Pantry?")
    if (confirmed) {
      const deletePayload = { userId, ingredientId: id}
      try {
        const response = fetch("/api/v1/ingredients", {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(deletePayload)
        })
        setShouldRedirect(true)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

  let capName
  let description
  if(ingredient.name) {
    capName = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
  }
  if(ingredient.description) {
    description = ingredient.description.charAt(0).toUpperCase() + ingredient.description.slice(1)
  }

  const editClick = (event) => {
    setShowEdit(!showEdit)
  }

  let editForm
  if (showEdit) {
    editForm = (
      <EditIngredientForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      errors={errors}
      ingredient={ingredient}
      capName={capName}
      user={props.user}  
    />
    )
  }

  if (shouldRedirect) {
    return (
      <Redirect push to="/ingredients" />
    )
  }

  return(
    <div>
      <h2>{capName}</h2>
      <h4>Measurement: {Number(ingredient.amount)} {ingredient.unit}</h4>
      {description}
      <div>
        <button className="button margin" onClick={editClick}>{showEdit ? "Hide Edit Form" : "Edit Ingredient"}</button>
        <button className="button margin" onClick={handleDelete}>Delete Ingredient</button>
      </div>
      {editForm}
    </div>
  )
}

export default IngredientShow