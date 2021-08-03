import React from "react"
import { Link } from "react-router-dom"

const IngredientTile = (props) => {
  
  const capName = props.ingredient.name.charAt(0).toUpperCase() + props.ingredient.name.slice(1)

  return(
    <Link to={`/ingredients/${props.ingredient.id}`}>
      <h3>{capName}</h3>
    </Link>
  )
}

export default IngredientTile