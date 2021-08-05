import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import EditIngredientForm from "./EditIngredientForm"

const IngredientShow = (props) => {
  const [ingredient, setIngredient] = useState({})
  const [showEdit, setShowEdit] = useState(false)
  const [shouldRedirectToIngredient, setShouldRedirectToIngredient] = useState(false)
  const [shouldRedirectToList, setShouldRedirectToList] = useState(false)

  let { id } = useParams()
  
  const fetchIngredientDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/ingredients/${id}`)
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

  const handleDelete = (event) => {
    const confirmed = confirm("Are you sure you want to remove this Ingredient from your Pantry?")
    if (confirmed) {
      const deletePayload = { ingredientId: ingredient.id}
      try {
        const response = fetch("/api/v1/ingredients", {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(deletePayload)
        })
        setShouldRedirectToList(true)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

  const editClick = (event) => {
    setShowEdit(!showEdit)
  }

  let editForm
  if (showEdit) {
    editForm = (
      <EditIngredientForm
        setIngredient={setIngredient}
        setShouldRedirectToIngredient={setShouldRedirectToIngredient}
        user={props.user}  
      />
    )
  }

  if (shouldRedirectToList) {
    return (
      <Redirect push to="/ingredients" />
    )
  }

  if (shouldRedirectToIngredient) {
    id = ingredient.id
    location.href = `/ingredients/${id}`
  }

  return(
    <div>
      <h2>{ingredient.name}</h2>
      <h4>Measurement: {Number(ingredient.amount)} {ingredient.unit}</h4>
      <p>{ingredient.description}</p>
      <div>
        <button className="button margin-5" onClick={editClick}>{showEdit ? "Hide Edit Form" : "Edit Ingredient"}</button>
        <button className="button margin-5" onClick={handleDelete}>Delete Ingredient</button>
      </div>
      {editForm}
    </div>
  )
}

export default IngredientShow