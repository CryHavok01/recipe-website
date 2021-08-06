import React from "react"
import { Link } from "react-router-dom"

const IngredientTile = (props) => {

  return(
    <Link to={`/ingredients/${props.ingredient.id}`}>
      <h3>{props.ingredient.name}</h3>
    </Link>
  )
}

export default IngredientTile