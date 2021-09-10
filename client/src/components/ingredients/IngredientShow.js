import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import EditIngredientForm from "./EditIngredientForm"

const IngredientShow = (props) => {
  const [ingredient, setIngredient] = useState({})
  const [showEdit, setShowEdit] = useState(false)
  const [shouldRedirectToIngredient, setShouldRedirectToIngredient] = useState(false)
  const [shouldRedirectToList, setShouldRedirectToList] = useState(false)
  const [noIngredient, setNoIngredient] = useState(false)

  let { id } = useParams()
  
  const fetchIngredientDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/ingredients/${id}`)
      const body = await response.json()
      if(body.ingredient) {
        setIngredient(body.ingredient)
      } else {
        setNoIngredient(true)
      }
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  } 

  useEffect(() => {
    fetchIngredientDetails()
  }, [])

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
        setShowEdit={setShowEdit}
        setShouldRedirectToIngredient={setShouldRedirectToIngredient}
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

  if (noIngredient) {
    return(
      <div>
        <h1>404 Error!</h1>
        <p>Uh oh, we can't find that ingredient!</p>
      </div>
    )
  }

  let measurement
  if (ingredient.amount > 0.01) {
    measurement = <h4>Measurement: {Number(ingredient.amount)} {ingredient.unit}</h4>
  } else {
    measurement = <h4>You're all out of this ingredient!</h4>
  }

  return(
    <div className="grid-container">
      <div className="callout" id="top-space">
        <h2 className="title">{ingredient.name}</h2>
        {measurement}
        <p>{ingredient.description}</p>
      </div>
      <div className="grid-x">
        <div className="cell small-2">
          <button className="button blue round bold margin-5" onClick={editClick}>{showEdit ? "Hide Edit Form" : "Edit Ingredient"}</button>
        </div>
        <div className="cell small-2">
          <button className="button bold round blue margin-5" onClick={handleDelete}>Delete Ingredient</button>
        </div>
      </div>
      {editForm}
    </div>
  )
}

export default IngredientShow