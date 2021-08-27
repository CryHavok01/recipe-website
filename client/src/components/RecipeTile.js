import React from "react"
import { Link } from "react-router-dom"

const RecipeTile = (props) => {

  let image
  if(props.recipe.image) {
    image = <img src={props.recipe.image} alt={`A picture of ${props.recipe.name}`}/>
  } else {
    image = <img src="http://thehalalworld.com/uploads/pages/Korean-Rice-Cake-and-Dumpling-Soup-Duk-Guk-and-Mandu.jpg" alt="A placeholder picture of a blurred out meal"/>
  }

  return (
    <div className="callout">
    <Link to={`/recipes/${props.recipe.id}`}>
      <div className="grid-x left">
        <div className="cell medium-8 text-middle">
          <h3>{props.recipe.name}</h3>
        </div>
        <div className="cell medium-4 border center">
          {image}
        </div>
      </div>
    </Link>
    </div>
  )
}

export default RecipeTile