import React from "react"

const RecipeTile = (props) => {

  let capName
  if(props.recipe.name) {
    capName = props.recipe.name.charAt(0).toUpperCase() + props.recipe.name.slice(1)
  }

  return (
    <div>
      <h3>{capName}</h3>
      <p>{props.recipe.description}</p>
    </div>
  )
}

export default RecipeTile