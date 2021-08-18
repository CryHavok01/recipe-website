import React, { useState } from "react"

const RecipeIngredientTile = (props) => {
  const [showDetails, setShowDetails] = useState(false)

  let amountNote
  const onDetailsClick = () => {
    setShowDetails(!showDetails)
  }

  if(props.ingredient.detail === "don't have") {
    amountNote = <button className="red" onClick={onDetailsClick}>X</button>
  } else if(props.ingredient.detail === "need more") {
    amountNote = <button className="red" onClick={onDetailsClick}>X</button>
  } else if(props.ingredient.detail === "can't tell") {
    amountNote = <button className="yellow" onClick={onDetailsClick}>?</button>
  } else if(props.ingredient.detail === "possible match") {
    amountNote = <button className="yellow" onClick={onDetailsClick}>?</button>
  } else if(props.ingredient.detail === "it's close") {
    amountNote = <button className="yellow" onClick={onDetailsClick}>?</button>
  } else if(props.ingredient.detail === "have enough") {
    amountNote = <button className="green" onClick={onDetailsClick}>&#x2713;</button>
  }

  let ingredientDetails
  if(showDetails) {
    if(props.ingredient.detail === "don't have") {
      ingredientDetails = (
        <div className="ingredient-note-red">
          <p>You don't have this ingredient</p>
        </div>
      )
    } else if(props.ingredient.detail === "need more") {
      ingredientDetails = (
        <div className="ingredient-note-red">
          <p>You need more of this ingredient</p>
        </div>
      )
    } else if(props.ingredient.detail === "can't tell") {
      ingredientDetails = (
        <div className="ingredient-note-yellow">
          <p>We can't tell if you have enough of this ingredient</p>
        </div>
      )
    } else if(props.ingredient.detail === "possible match") {
      ingredientDetails = (
        <div className="ingredient-note-yellow">
          <p>Is {props.ingredient.name} the same as this?</p>
        </div>
      )
    } else if(props.ingredient.detail === "it's close") {
      ingredientDetails = (
        <div className="ingredient-note-yellow">
          <p>You have just about enough of this ingredient, but might run out</p>
        </div>
      )
    } else if(props.ingredient.detail === "have enough") {
      ingredientDetails = (
        <div className="ingredient-note-green">
          <p>You have more than enough of this ingredient</p>
        </div>
      )
    }
  }

  return (
    <div className="grid-x list-border" key={props.ingredient.id}>
      <div className="cell small-11">
        <p>{props.ingredient.name}: {Number(props.ingredient.amount)} {props.ingredient.unit}</p>
        <p>{props.ingredient.description}</p>
      </div>
      <div className="cell small-1">
          {amountNote}
          {ingredientDetails}
      </div>
    </div>
  )
}

export default RecipeIngredientTile