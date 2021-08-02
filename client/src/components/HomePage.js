import React, { useEffect, useState } from "react"

const HomePage = (props) => {
  const [ownedIngredients, setOwnedIngredients] = useState([])

  const fetchIngredients = async () => {
    if(props.user) {
      try {
        const response = await fetch(`/api/v1/ownedIngredients/${props.user.id}`)
        const body = await response.json()
        setOwnedIngredients(body.ownedIngredients)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

useEffect(() => {
  fetchIngredients()
}, [props.user])

let ingredientsNum = 0
if (ownedIngredients.length > 0) {
  ingredientsNum = ownedIngredients.length
}

  return (
    <div>
      <h1>Your Home Kitchen</h1>
      <p>You currently have {ingredientsNum} ingredients in your kitchen</p>
    </div>
  )
}

export default HomePage