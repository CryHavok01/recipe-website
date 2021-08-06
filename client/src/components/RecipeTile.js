import React from "react"
import { Link } from "react-router-dom"

const RecipeTile = (props) => {

  let capName
  if(props.recipe.name) {
    capName = props.recipe.name.charAt(0).toUpperCase() + props.recipe.name.slice(1)
  }

  return (
    <div>
      <Link to={`/recipes/${props.recipe.id}`}>
        <h3>{capName}</h3>
        <p>{props.recipe.description}</p>
      </Link>
    </div>
  )
}

export default RecipeTile